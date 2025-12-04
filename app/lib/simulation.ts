import { SimulationParams, SimulationResults } from '../types';




/**
 * Parse user description into simulation parameters using LLM
 * 
 * - ParentInputBufferCapacity: Parent input buffer capacity
 * - MemberInputBufferCapacity: Member input buffer capacity
 * 
 */
export async function parseUserDescriptionToSimulationParams(userText: string): Promise<SimulationParams> {
  try {
    // Para que process.env tenga la API key, debes agregar una línea como esta en tu archivo .env en la raíz del proyecto:
    // OPENROUTER_API_KEY=tu_api_key_aqui
    const apiKey = "noKey";
    
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
            content: `A partir del texto input genera un JSON con los siguientes parámetros para simulación de manufactura:
- MinProcessingTime: tiempo mínimo de procesamiento (en minutos)
- MaxProcessingTime: tiempo máximo de procesamiento (en minutos)
- MeanProcessingTime: tiempo promedio de procesamiento (en minutos)
- ParentInputBufferCapacity: capacidad del buffer de entrada principal
- MemberInputBufferCapacity: capacidad del buffer de entrada de miembros

Texto input: "${userText}"

Responde ÚNICAMENTE con un objeto JSON válido con esta estructura:
{
  "MinProcessingTime": number,
  "MaxProcessingTime": number,
  "MeanProcessingTime": number,
  "ParentInputBufferCapacity": number,
  "MemberInputBufferCapacity": number
}

Si algún valor no está especificado en el texto, usa valores por defecto razonables para manufactura (por ejemplo: MinProcessingTime: 5, MaxProcessingTime: 15, MeanProcessingTime: 10, ParentInputBufferCapacity: 10, MemberInputBufferCapacity: 5).`
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
    
    const params = JSON.parse(jsonMatch[0]) as any;
    
    // Validate and sanitize parameters
    return {
      MinProcessingTime: Math.max(0, params.MinProcessingTime || 5),
      MaxProcessingTime: Math.max(params.MinProcessingTime || 5, params.MaxProcessingTime || 15),
      MeanProcessingTime: params.MeanProcessingTime || 10,
      ParentInputBufferCapacity: Math.max(1, params.ParentInputBufferCapacity || 10),
      MemberInputBufferCapacity: Math.max(1, params.MemberInputBufferCapacity || 5)
    } as SimulationParams;
    
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
    MinProcessingTime: numbers[0] || 5,
    MaxProcessingTime: numbers[1] || 15,
    MeanProcessingTime: numbers[2] || 10,
    ParentInputBufferCapacity: numbers[3] || 10,
    MemberInputBufferCapacity: numbers[4] || 5
  } as SimulationParams;
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
  
  // Generate mock results based on new parameters
  const optimalBuffer = params.ParentInputBufferCapacity;
  const cycleTime = params.MeanProcessingTime / 60; // Convert to hours
  const baselineThroughput = Math.round(60 / cycleTime); // parts per hour
  
  // Generate comparison data for different buffer sizes
  const bufferComparison = [];
  const minBuffer = Math.max(1, params.MemberInputBufferCapacity);
  const maxBuffer = Math.max(minBuffer + 20, params.ParentInputBufferCapacity + 10);
  
  for (let size = minBuffer; size <= maxBuffer; size += 5) {
    const efficiency = Math.min(1, 0.6 + (size - minBuffer) / (maxBuffer - minBuffer) * 0.4);
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
      averageWaitingTime: Math.round(params.MeanProcessingTime * 2), // seconds
      blockingTime: Math.round(Math.random() * 5 + 2), // percentage
      starvationTime: Math.round(Math.random() * 4 + 1), // percentage
    },
    explanation: `With a buffer size of ${optimalBuffer} units and processing time range of ${params.MinProcessingTime}-${params.MaxProcessingTime} minutes (mean: ${params.MeanProcessingTime} min), the system balances machine utilization and WIP effectively. The parent buffer capacity (${params.ParentInputBufferCapacity}) and member buffer capacity (${params.MemberInputBufferCapacity}) maintain ${Math.round(optimalResult.utilization * 100)}% utilization with optimal flow.`,
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
