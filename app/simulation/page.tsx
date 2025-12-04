'use client';

import Link from 'next/link';

export default function SimulationPage() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: '#0a0e27'
    }}>
      <div style={{
        padding: '1rem 2rem',
        background: '#141925',
        borderBottom: '1px solid #2d3548',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link 
          href="/" 
          style={{
            color: '#14b8a6',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          ← Back to Landing
        </Link>
        <Link 
          href="/simulator" 
          style={{
            color: '#84cc16',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          Try FlowBuffer →
        </Link>
      </div>
      <iframe 
        src="/simulacion_produccion.html" 
        style={{ 
          width: '100%', 
          height: '100%', 
          border: 'none'
        }}
        title="Production Simulation"
      />
    </div>
  );
}

