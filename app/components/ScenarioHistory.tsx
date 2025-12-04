'use client';

import { Scenario } from '../types';

interface ScenarioHistoryProps {
  scenarios: Scenario[];
  onSelectScenario: (scenario: Scenario) => void;
  currentScenarioId?: string;
}

export default function ScenarioHistory({ scenarios, onSelectScenario, currentScenarioId }: ScenarioHistoryProps) {
  if (scenarios.length === 0) {
    return null;
  }

  return (
    <div className="scenario-history">
      <h3>Previous Scenarios</h3>
      <div className="scenario-list">
        {scenarios.map((scenario) => {
          const isActive = scenario.id === currentScenarioId;
          const truncatedInput = scenario.userInput.length > 80 
            ? scenario.userInput.substring(0, 80) + '...' 
            : scenario.userInput;

          return (
            <div
              key={scenario.id}
              className={`scenario-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectScenario(scenario)}
            >
              <div className="scenario-text">{truncatedInput}</div>
              <div className="scenario-badges">
                <span className="badge badge-buffer">
                  Buffer: {scenario.results.optimalBufferSize}
                </span>
                <span className="badge badge-throughput">
                  ↑ {scenario.results.estimatedThroughput} u/h
                </span>
              </div>
              <div className="scenario-time">
                {new Date(scenario.timestamp).toLocaleTimeString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

