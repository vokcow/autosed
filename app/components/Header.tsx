'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-icon">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="12" width="12" height="8" rx="2" fill="currentColor" opacity="0.8"/>
            <rect x="26" y="12" width="12" height="8" rx="2" fill="currentColor" opacity="0.8"/>
            <rect x="16" y="8" width="8" height="16" rx="2" fill="currentColor"/>
            <path d="M14 16 L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M24 16 L26 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <h1 className="header-title">Buffer Optimizer Playground</h1>
          <p className="header-subtitle">Describe your system. We'll simulate it for you.</p>
        </div>
        <Link 
          href="/" 
          style={{
            color: 'var(--accent-teal)',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
            padding: '0.5rem 1rem',
            border: '1px solid var(--accent-teal)',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(20, 184, 166, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          ← Back to Home
        </Link>
      </div>
    </header>
  );
}

