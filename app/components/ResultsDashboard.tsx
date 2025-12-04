'use client';

import { SimulationResults } from '../types';

interface ResultsDashboardProps {
  results: SimulationResults;
}

export default function ResultsDashboard({ results }: ResultsDashboardProps) {
  const maxThroughput = Math.max(...results.bufferComparison.map(b => b.throughput));

  return (
    <div className="results-dashboard">
      <div className="results-header">
        <h2>Simulation Results</h2>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card accent-teal">
          <div className="card-icon">📦</div>
          <div className="card-content">
            <div className="card-value">{results.optimalBufferSize}</div>
            <div className="card-label">Optimal Buffer Size</div>
          </div>
        </div>
        <div className="summary-card accent-lime">
          <div className="card-icon">⚡</div>
          <div className="card-content">
            <div className="card-value">{results.estimatedThroughput}</div>
            <div className="card-label">Units/Hour</div>
          </div>
        </div>
        <div className="summary-card accent-orange">
          <div className="card-icon">📊</div>
          <div className="card-content">
            <div className="card-value">{Math.round(results.averageUtilization * 100)}%</div>
            <div className="card-label">Avg Utilization</div>
          </div>
        </div>
      </div>

      {/* Buffer Comparison Chart */}
      <div className="chart-section">
        <h3>Buffer Size Comparison</h3>
        <div className="chart">
          {results.bufferComparison.map((item, index) => {
            const height = (item.throughput / maxThroughput) * 100;
            const isOptimal = item.bufferSize === results.optimalBufferSize;
            
            return (
              <div key={index} className="chart-bar-container">
                <div className="chart-bar-wrapper">
                  <div
                    className={`chart-bar ${isOptimal ? 'optimal' : ''}`}
                    style={{ height: `${height}%` }}
                  >
                    <span className="bar-value">{item.throughput}</span>
                  </div>
                </div>
                <div className="chart-label">
                  <div className={`buffer-size ${isOptimal ? 'optimal' : ''}`}>
                    {item.bufferSize}
                    {isOptimal && <span className="optimal-badge">★</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="chart-axis-label">Buffer Size (units)</div>
      </div>

      {/* KPIs */}
      <div className="kpis-section">
        <h3>Key Performance Indicators</h3>
        <div className="kpis-grid">
          <div className="kpi-card">
            <div className="kpi-icon">🔄</div>
            <div className="kpi-value">{results.kpis.averageWIP}</div>
            <div className="kpi-label">Average WIP</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon">⏱️</div>
            <div className="kpi-value">{results.kpis.averageWaitingTime}s</div>
            <div className="kpi-label">Avg Waiting Time</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon">🚫</div>
            <div className="kpi-value">{results.kpis.blockingTime}%</div>
            <div className="kpi-label">Blocking Time</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon">⚠️</div>
            <div className="kpi-value">{results.kpis.starvationTime}%</div>
            <div className="kpi-label">Starvation Time</div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="explanation-section">
        <h3>Analysis</h3>
        <div className="explanation-box">
          <p>{results.explanation}</p>
        </div>
      </div>
    </div>
  );
}

