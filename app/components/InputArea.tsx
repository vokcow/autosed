'use client';

interface InputAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

const EXAMPLE_TEXT = "A line with 2 machines, arrivals every 30 seconds, buffer of 10 parts between them, 8-hour shift. Optimize the buffer size to keep utilization above 85% with minimal WIP.";

export default function InputArea({ value, onChange, onSubmit, disabled }: InputAreaProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const loadExample = () => {
    onChange(EXAMPLE_TEXT);
  };

  return (
    <div className="input-section">
      <form onSubmit={handleSubmit}>
        <div style={{ position: 'relative' }}>
          <textarea
            className="input-textarea"
            placeholder={`Example: ${EXAMPLE_TEXT}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            rows={6}
          />
          {!value && (
            <button
              type="button"
              onClick={loadExample}
              disabled={disabled}
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                padding: '4px 8px',
                fontSize: '12px',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '4px',
                color: '#3b82f6',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
              }}
            >
              Use Example
            </button>
          )}
        </div>
        <div className="input-footer">
          <p className="input-hint">
            Use plain English. We will translate your description into simulation parameters.
          </p>
          <button 
            type="submit" 
            className="btn-primary"
            disabled={disabled || !value.trim()}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4 L10 16 M4 10 L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Run Simulation
          </button>
        </div>
      </form>
    </div>
  );
}

