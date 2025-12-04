'use client';

import { useState } from 'react';
import Header from '../components/Header';
import InputArea from '../components/InputArea';
import StatusPanel from '../components/StatusPanel';
import ResultsDashboard from '../components/ResultsDashboard';
import ScenarioHistory from '../components/ScenarioHistory';
import { Scenario, SimulationResults } from '../types';
import { parseUserDescriptionToSimulationParams, runSimioSimulation } from '../lib/simulation';

type AppState = 'idle' | 'processing' | 'results';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [userInput, setUserInput] = useState('');
  const [currentResults, setCurrentResults] = useState<SimulationResults | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [currentScenarioId, setCurrentScenarioId] = useState<string | undefined>();

  const handleRunSimulation = async () => {
    if (!userInput.trim()) return;

    setAppState('processing');

    try {
      // Parse user input into simulation parameters
      const params = await parseUserDescriptionToSimulationParams(userInput);
      
      // Run simulation (mock for now, will call real Simio API later)
      const results = await runSimioSimulation(params);
      
      // Create new scenario
      const newScenario: Scenario = {
        id: Date.now().toString(),
        userInput: userInput,
        results: results,
        timestamp: Date.now(),
      };

      setCurrentResults(results);
      setScenarios(prev => [newScenario, ...prev]);
      setCurrentScenarioId(newScenario.id);
      setAppState('results');
    } catch (error) {
      console.error('Simulation error:', error);
      alert('An error occurred while running the simulation. Please try again.');
      setAppState('idle');
    }
  };

  const handleStatusComplete = () => {
    // This is called when the status animation completes
    // The actual results are already set, so we just wait for the animation
  };

  const handleSelectScenario = (scenario: Scenario) => {
    setCurrentResults(scenario.results);
    setCurrentScenarioId(scenario.id);
    setUserInput(scenario.userInput);
    setAppState('results');
  };

  const handleNewSimulation = () => {
    setAppState('idle');
    setUserInput('');
    setCurrentScenarioId(undefined);
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <div className="content-grid">
          <div className="primary-column">
            {appState === 'idle' && (
              <InputArea
                value={userInput}
                onChange={setUserInput}
                onSubmit={handleRunSimulation}
                disabled={false}
              />
            )}

            {appState === 'processing' && (
              <StatusPanel onComplete={handleStatusComplete} />
            )}

            {appState === 'results' && currentResults && (
              <>
                <div className="results-actions">
                  <button className="btn-secondary" onClick={handleNewSimulation}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 8 L14 8 M8 2 L8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    New Simulation
                  </button>
                </div>
                <ResultsDashboard results={currentResults} />
              </>
            )}
          </div>

          {scenarios.length > 0 && (
            <div className="sidebar-column">
              <ScenarioHistory
                scenarios={scenarios}
                onSelectScenario={handleSelectScenario}
                currentScenarioId={currentScenarioId}
              />
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>
          Buffer Optimizer Playground • Built for Simio Integration
        </p>
      </footer>
    </div>
  );
}

