import { SimulationParams, SimulationResults } from '../types';

/**
 * Parse user description into simulation parameters using LLM
 * 
 * Uses OpenRouter API with Amazon Nova 2 Lite to extract simulation parameters
 * from natural language descriptions.
 * 
 * The LLM extracts:
 * - Number of machines in the line
 * - Arrival rates (parts per hour/minute)
 * - Buffer sizes
 * - Shift duration
 * - Target utilization or throughput goals
 * - MTBF (Mean Time Between Failures)
 * - MTTR (Mean Time To Repair)
 * - Processing hours
 */
export async function parseUserDescriptionToSimulationParams(userText: string): Promise<SimulationParams> {
  try {
    // Para que process.env tenga la API key, debes agregar una línea como esta en tu archivo .env en la raíz del proyecto:
    // OPENROUTER_API_KEY=tu_api_key_aqui
    const apiKey = "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";
    
    if (!apiKey) {
      console.warn('OPENROUTER_API_KEY not found, using fallback parsing');
      return fallbackParse(userText);
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://autosed.app',
        'X-Title': 'AutoSed Buffer Optimizer'
      },
      body: JSON.stringify({
        model: 'amazon/nova-2-lite-v1:free',
        messages: [
          {
            role: 'system',
            content: 'Eres un asistente especializado en extraer parámetros de simulación de manufactura. Siempre respondes en formato JSON válido.'
          },
          {
            role: 'user',
            content: `A partir del texto input genera un JSON con los siguientes parámetros: MTBF (Mean Time Between Failures en horas), MTTR (Mean Time To Repair en horas) y processing hours (horas de procesamiento). También extrae: arrivalRate (piezas por hora), numMachines (número de máquinas), bufferSizeMin, bufferSizeMax, shiftDurationHours, y targetUtilization (entre 0 y 1).

Texto input: "${userText}"

Responde ÚNICAMENTE con un objeto JSON válido con esta estructura:
{
  "arrivalRate": number,
  "numMachines": number,
  "bufferSizeMin": number,
  "bufferSizeMax": number,
  "shiftDurationHours": number,
  "targetUtilization": number,
  "mtbf": number,
  "mttr": number,
  "processingHours": number
}

Si algún valor no está especificado en el texto, usa valores por defecto razonables para manufactura.`
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('data', data)
    const respuesta = data.choices?.[0]?.message?.content || '';
    console.log('respuesta', respuesta)
    // Parse JSON response
    const jsonMatch = respuesta.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in LLM response');
    }
    
    const params = JSON.parse(jsonMatch[0]) as SimulationParams;
    
    // Validate and sanitize parameters
    return {
      arrivalRate: params.arrivalRate || 120,
      numMachines: Math.max(1, Math.min(10, params.numMachines || 2)),
      bufferSizeMin: params.bufferSizeMin || 5,
      bufferSizeMax: params.bufferSizeMax || 30,
      shiftDurationHours: params.shiftDurationHours || 8,
      targetUtilization: Math.max(0, Math.min(1, params.targetUtilization || 0.85)),
      mtbf: params.mtbf,
      mttr: params.mttr,
      processingHours: params.processingHours
    };
    
  } catch (error) {
    console.error('Error parsing with LLM:', error);
    return fallbackParse(userText);
  }
}

/**
 * Fallback parser when LLM is not available or fails
 */
function fallbackParse(userText: string): SimulationParams {
  // Simple mock parsing - look for numbers in the text
  const numbers = userText.match(/\d+/g)?.map(Number) || [];
  
  return {
    arrivalRate: numbers[0] || 120,
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

export async function runJaamSimSimulation(
  params: SimulationParams
): Promise<SimulationResults> {
  const response = await fetch('/api/jaamsim/simulate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error(`JaamSim backend error: ${response.statusText}`);
  }

  const data = (await response.json()) as SimulationResults;
  return data;
}
