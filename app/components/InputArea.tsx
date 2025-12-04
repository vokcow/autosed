'use client';

interface InputAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

export default function InputArea({ value, onChange, onSubmit, disabled }: InputAreaProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="input-section">
      <form onSubmit={handleSubmit}>
        <textarea
          className="input-textarea"
          placeholder="Example: A line with 2 machines, arrivals every 30 seconds, buffer of 10 parts between them, 8-hour shift. Optimize the buffer size to keep utilization above 85% with minimal WIP."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          rows={6}
        />
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

