// Types for the Buffer Optimizer Playground

export interface SimulationParams {
  MinProcessingTime: number;          // Minimum processing time (in minutes)
  MaxProcessingTime: number;          // Maximum processing time (in minutes)
  MeanProcessingTime: number;         // Mean processing time (in minutes)
  ParentInputBufferCapacity: number;  // Parent input buffer capacity
  MemberInputBufferCapacity: number;  // Member input buffer capacity
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

