// Types for the Buffer Optimizer Playground

export interface SimulationParams {
  arrivalRate: number;        // parts per hour
  numMachines: number;
  bufferSizeMin: number;
  bufferSizeMax: number;
  shiftDurationHours: number;
  targetUtilization: number;
  mtbf?: number;              // Mean Time Between Failures (hours)
  mttr?: number;              // Mean Time To Repair (hours) - note: changed from MTBR to MTTR as it's more standard
  processingHours?: number;   // Processing hours
}

export interface BufferResult {
  bufferSize: number;
  throughput: number;
  utilization: number;
}

export interface SimulationResults {
  optimalBufferSize: number;
  estimatedThroughput: number;
  averageUtilization: number;
  bufferComparison: BufferResult[];
  kpis: {
    averageWIP: number;
    averageWaitingTime: number;
    blockingTime: number;
    starvationTime: number;
  };
  explanation: string;
}

export interface Scenario {
  id: string;
  userInput: string;
  results: SimulationResults;
  timestamp: number;
}

export type SimulationStep = 
  | 'understanding'
  | 'preparing'
  | 'running'
  | 'collecting';

