import { SimulationParams, SimulationResults } from '../types';

/**
 * Parse user description into simulation parameters
 * 
 * TODO: In production, this function should call an LLM API (e.g., OpenAI GPT-4, Claude)
 * to convert natural language into structured Simio experiment parameters.
 * 
 * The LLM should be prompted to extract:
 * - Number of machines in the line
 * - Arrival rates (parts per hour/minute)
 * - Current buffer size (if mentioned)
 * - Shift duration
 * - Target utilization or throughput goals
 * - Any constraints mentioned
 * 
 * For now, this is a lightweight parser that looks for numbers in the text.
 */
export function parseUserDescriptionToSimulationParams(userText: string): SimulationParams {
  // Simple mock parsing - look for numbers in the text
  const numbers = userText.match(/\d+/g)?.map(Number) || [];
  
  return {
    arrivalRate: numbers[0] || 120, // parts per hour
    numMachines: numbers.length > 1 && numbers[1] <= 10 ? numbers[1] : 2,
    bufferSizeMin: 5,
    bufferSizeMax: 30,
    shiftDurationHours: numbers.find(n => n === 8 || n === 12) || 8,
    targetUtilization: 0.85,
  };
}

/**
 * Run Simio simulation with given parameters
 * 
 * TODO: Replace this mock with a real call to a backend service that:
 * 1. Uses Simio's .NET API to load a model (SimioAPI.IModel)
 * 2. Applies the simulation parameters (buffer sizes, arrival rates, processing times, etc.)
 * 3. Runs the experiment using the Simio Engine
 * 4. Reads back results (throughput, utilization, WIP, etc.) and returns them as JSON
 * 
 * Backend Integration Notes:
 * - A backend will likely be a small ASP.NET Core service running on Windows with Simio installed
 * - It should expose an HTTP API endpoint like POST /api/simulate
 * - The service should use the SimioAPI namespace to interact with Simio programmatically
 * - Reference: Simio API documentation for IModel, IExperiment, and IScenario interfaces
 * 
 * The front-end is designed to remain unchanged once the endpoints exist;
 * only the internals of this function would switch from mock data to real HTTP calls.
 */
export async function runSimioSimulation(params: SimulationParams): Promise<SimulationResults> {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Generate mock results based on parameters
  const optimalBuffer = Math.floor((params.bufferSizeMin + params.bufferSizeMax) / 2);
  const baselineThroughput = params.arrivalRate * 0.8;
  
  // Generate comparison data for different buffer sizes
  const bufferComparison = [];
  for (let size = params.bufferSizeMin; size <= params.bufferSizeMax; size += 5) {
    const efficiency = Math.min(1, 0.6 + (size - params.bufferSizeMin) / (params.bufferSizeMax - params.bufferSizeMin) * 0.4);
    const throughput = baselineThroughput * efficiency;
    const utilization = 0.7 + efficiency * 0.2;
    
    bufferComparison.push({
      bufferSize: size,
      throughput: Math.round(throughput),
      utilization: Math.round(utilization * 100) / 100,
    });
  }
  
  const optimalResult = bufferComparison.find(b => b.bufferSize === optimalBuffer) || bufferComparison[Math.floor(bufferComparison.length / 2)];
  
  return {
    optimalBufferSize: optimalBuffer,
    estimatedThroughput: optimalResult.throughput,
    averageUtilization: optimalResult.utilization,
    bufferComparison,
    kpis: {
      averageWIP: Math.round(optimalBuffer * 0.6 * 10) / 10,
      averageWaitingTime: Math.round(Math.random() * 30 + 10), // seconds
      blockingTime: Math.round(Math.random() * 5 + 2), // percentage
      starvationTime: Math.round(Math.random() * 4 + 1), // percentage
    },
    explanation: `With a buffer size of ${optimalBuffer} units, the system balances machine utilization and WIP effectively. Using a smaller buffer (${params.bufferSizeMin}) would increase blocking at upstream machines, while larger buffers add WIP with diminishing returns. The current configuration maintains ${Math.round(optimalResult.utilization * 100)}% utilization with optimal flow.`,
  };
}

// ============================================================================
// API PLACEHOLDERS FOR FUTURE INTEGRATION
// ============================================================================

/**
 * TODO: Call LLM backend to transform user text into simulation parameters
 * 
 * This function should make an HTTP POST request to an LLM service (e.g., OpenAI API)
 * with a carefully crafted prompt that extracts structured simulation parameters
 * from natural language descriptions.
 * 
 * Example API call:
 * ```
 * const response = await fetch('/api/llm/parse', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ userText })
 * });
 * return await response.json();
 * ```
 */
export async function callLLMBackend(userText: string): Promise<SimulationParams> {
  // Example shape of the expected response:
  // {
  //   arrivalRate: 120,           // parts per hour
  //   numMachines: 2,
  //   bufferSizeMin: 5,
  //   bufferSizeMax: 30,
  //   shiftDurationHours: 8,
  //   targetUtilization: 0.85
  // }
  throw new Error("Not implemented: integrate with LLM backend.");
}

/**
 * TODO: Call Simio backend to run actual simulation with given params
 * 
 * This function should make an HTTP POST request to a .NET service that wraps Simio's API.
 * 
 * The backend service should:
 * 1. Load the Simio model file (.spfx)
 * 2. Set up an experiment with the provided parameters
 * 3. Configure multiple scenarios to test different buffer sizes
 * 4. Run the simulation using the Simio Engine
 * 5. Extract results (throughput, utilization, WIP, queue times, etc.)
 * 6. Return structured JSON matching the SimulationResults interface
 * 
 * Example API call:
 * ```
 * const response = await fetch('http://localhost:5000/api/simio/simulate', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(simParams)
 * });
 * return await response.json();
 * ```
 * 
 * Backend should be hosted on a Windows server with Simio installed.
 * Reference the Simio API documentation for IModel, IExperiment, and related interfaces.
 */
export async function callSimioBackend(simParams: SimulationParams): Promise<SimulationResults> {
  // Expected to POST simParams to a .NET service that wraps Simio's API
  // and returns JSON results that match the 'SimulationResults' interface
  throw new Error("Not implemented: integrate with Simio backend.");
}

