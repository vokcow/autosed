'use client';

import { SimulationStep } from '../types';
import { useEffect, useState } from 'react';

interface StatusPanelProps {
  onComplete: () => void;
}

const STEPS: { key: SimulationStep; label: string; duration: number }[] = [
  { key: 'understanding', label: 'Understanding your description', duration: 800 },
  { key: 'preparing', label: 'Preparing Simio model', duration: 1000 },
  { key: 'running', label: 'Running simulation', duration: 2000 },
  { key: 'collecting', label: 'Collecting results', duration: 700 },
];

export default function StatusPanel({ onComplete }: StatusPanelProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= STEPS.length) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, STEPS[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  return (
    <div className="status-panel">
      <div className="status-content">
        <div className="loader">
          <div className="conveyor">
            <div className="box box-1"></div>
            <div className="box box-2"></div>
            <div className="box box-3"></div>
          </div>
        </div>
        <h2 className="status-title">Processing your scenario...</h2>
        <div className="status-steps">
          {STEPS.map((step, index) => (
            <div
              key={step.key}
              className={`status-step ${index < currentStep ? 'completed' : ''} ${index === currentStep ? 'active' : ''}`}
            >
              <div className="step-indicator">
                {index < currentStep ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 10 L8 14 L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className="step-label">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

