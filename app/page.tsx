'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="landing-container">
      {/* Fixed Header with CTA Buttons */}
      <div className="landing-fixed-header">
        <div className="landing-fixed-header-content">
          <div className="landing-fixed-logo">
            <span className="logo-text">EcoBuffer</span>
          </div>
          <div className="landing-fixed-buttons">
            <Link href="/simulation" className="header-cta-button header-cta-primary">
              ▶️ View simulation
            </Link>
            <Link href="/simulator" className="header-cta-button header-cta-secondary">
              🧪 Try it now
            </Link>
          </div>
        </div>
      </div>
      
      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="landing-header-spacer"></div>
      <div className="landing-hero">
        <h1 className="landing-title">
        Imagine that a decision as simple as choosing how many parts to store can change the climate footprint of an entire factory
        </h1>
        
        <div className="hero-visual">
          <div className="hero-problem-statement">
            <h2 className="problem-title">The problem:</h2>
            <p className="problem-lead">Factories waste energy, time, and resources.</p>
            <p className="problem-lead">Not because of mechanical failures... but because machines WAIT.</p>
            <p className="problem-lead">Each wait produces:</p>
            <ul className="problem-list">
              <li>Wasted energy</li>
              <li>Wasted material</li>
              <li>Unnecessary CO₂</li>
              <li>Higher operating costs</li>
            </ul>
          </div>
          <svg viewBox="0 0 800 200" className="hero-svg">
            {/* Production Line with Buffers */}
            <defs>
              <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#14b8a6', stopOpacity: 0.8}}>
                  <animate attributeName="stop-opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" style={{stopColor: '#84cc16', stopOpacity: 0.8}}>
                  <animate attributeName="stop-opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" style={{stopColor: '#14b8a6', stopOpacity: 0.8}}>
                  <animate attributeName="stop-opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            
            {/* Flow Line */}
            <line x1="50" y1="100" x2="750" y2="100" stroke="url(#flow-gradient)" strokeWidth="6" strokeLinecap="round"/>
            
            {/* Station 1 */}
            <rect x="80" y="70" width="80" height="60" fill="#14b8a6" rx="8" opacity="0.8"/>
            <text x="120" y="105" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">Station 1</text>
            
            {/* Buffer 1 */}
            <g>
              <rect x="180" y="60" width="60" height="80" fill="#065f46" opacity="0.3" rx="6" stroke="#14b8a6" strokeWidth="2"/>
              <rect x="190" y="110" width="12" height="25" fill="#14b8a6" rx="2">
                <animate attributeName="height" values="25;35;25" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="y" values="110;100;110" dur="1.5s" repeatCount="indefinite" />
              </rect>
              <rect x="207" y="105" width="12" height="30" fill="#14b8a6" rx="2">
                <animate attributeName="height" values="30;40;30" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="y" values="105;95;105" dur="1.8s" repeatCount="indefinite" />
              </rect>
              <rect x="224" y="100" width="12" height="35" fill="#14b8a6" rx="2">
                <animate attributeName="height" values="35;45;35" dur="2s" repeatCount="indefinite" />
                <animate attributeName="y" values="100;90;100" dur="2s" repeatCount="indefinite" />
              </rect>
              <text x="220" y="55" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold">Buffer</text>
            </g>
            
            {/* Station 2 */}
            <rect x="270" y="70" width="80" height="60" fill="#84cc16" rx="8" opacity="0.8"/>
            <text x="310" y="105" textAnchor="middle" fill="#000" fontSize="14" fontWeight="bold">Station 2</text>
            
            {/* Buffer 2 */}
            <g>
              <rect x="370" y="60" width="60" height="80" fill="#3f6212" opacity="0.3" rx="6" stroke="#84cc16" strokeWidth="2"/>
              <rect x="380" y="115" width="12" height="20" fill="#84cc16" rx="2">
                <animate attributeName="height" values="20;30;20" dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="y" values="115;105;115" dur="1.6s" repeatCount="indefinite" />
              </rect>
              <rect x="397" y="108" width="12" height="27" fill="#84cc16" rx="2">
                <animate attributeName="height" values="27;37;27" dur="2.1s" repeatCount="indefinite" />
                <animate attributeName="y" values="108;98;108" dur="2.1s" repeatCount="indefinite" />
              </rect>
              <rect x="414" y="112" width="12" height="23" fill="#84cc16" rx="2">
                <animate attributeName="height" values="23;33;23" dur="1.7s" repeatCount="indefinite" />
                <animate attributeName="y" values="112;102;112" dur="1.7s" repeatCount="indefinite" />
              </rect>
              <text x="410" y="55" textAnchor="middle" fill="#bef264" fontSize="11" fontWeight="bold">Buffer</text>
            </g>
            
            {/* Station 3 */}
            <rect x="460" y="70" width="80" height="60" fill="#3b82f6" rx="8" opacity="0.8"/>
            <text x="500" y="105" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">Station 3</text>
            
            {/* Buffer 3 */}
            <g>
              <rect x="560" y="60" width="60" height="80" fill="#1e3a8a" opacity="0.3" rx="6" stroke="#3b82f6" strokeWidth="2"/>
              <rect x="570" y="108" width="12" height="27" fill="#3b82f6" rx="2">
                <animate attributeName="height" values="27;37;27" dur="1.9s" repeatCount="indefinite" />
                <animate attributeName="y" values="108;98;108" dur="1.9s" repeatCount="indefinite" />
              </rect>
              <rect x="587" y="113" width="12" height="22" fill="#3b82f6" rx="2">
                <animate attributeName="height" values="22;32;22" dur="2.2s" repeatCount="indefinite" />
                <animate attributeName="y" values="113;103;113" dur="2.2s" repeatCount="indefinite" />
              </rect>
              <rect x="604" y="105" width="12" height="30" fill="#3b82f6" rx="2">
                <animate attributeName="height" values="30;40;30" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="y" values="105;95;105" dur="1.8s" repeatCount="indefinite" />
              </rect>
              <text x="600" y="55" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">Buffer</text>
            </g>
            
            {/* Output */}
            <rect x="650" y="70" width="80" height="60" fill="#f59e0b" rx="8" opacity="0.8"/>
            <text x="690" y="105" textAnchor="middle" fill="#000" fontSize="14" fontWeight="bold">Output</text>
            
            {/* Metrics Icons */}
            <g opacity="0.7">
              <text x="120" y="165" textAnchor="middle" fill="#14b8a6" fontSize="24">⚡</text>
              <text x="120" y="194" textAnchor="middle" fill="#9aa0b0" fontSize="28">Wasted energy</text>
              
              <text x="310" y="165" textAnchor="middle" fill="#84cc16" fontSize="24">📊</text>
              <text x="310" y="194" textAnchor="middle" fill="#9aa0b0" fontSize="28">Throughput</text>
              
              <text x="500" y="165" textAnchor="middle" fill="#3b82f6" fontSize="24">🌱</text>
              <text x="500" y="194" textAnchor="middle" fill="#9aa0b0" fontSize="28">CO₂</text>
              
              <text x="690" y="165" textAnchor="middle" fill="#f59e0b" fontSize="24">💰</text>
              <text x="690" y="194" textAnchor="middle" fill="#9aa0b0" fontSize="28">Savings</text>
            </g>
          </svg>
        </div>

        <div className="hero-visual">
            <h2 className="problem-title">The key question:</h2>
            <p className="problem-lead">
              What is the OPTIMAL buffer size to minimize CO₂, energy, and waiting time,<br />
              and maximize productivity?
            </p>
        </div>

        <div className="hero-visual">
            <h2 className="problem-title">Why does buffer size matter?</h2>
            <svg
            className="buffer-diagram"
            viewBox="0 0 600 135"
            width="100%"
            height="auto"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
            aria-label="Visual example of two machines and a buffer"
          >
            {/* Machine 1: Filling */}
            <rect x="20" y="40" width="100" height="60" rx="14" fill="#60a5fa" />
            <text x="70" y="62" fill="#fff" fontSize="15" textAnchor="middle" fontWeight="bold">Machine 1</text>
            <text x="70" y="83" fill="#dbeafe" fontSize="12" textAnchor="middle">Fill beer</text>

            {/* Arrow to buffer */}
            <polygon points="125,70 150,70 150,65 165,75 150,85 150,80 125,80" fill="#a7f3d0" />
            <text x="143" y="60" fill="#38bdf8" fontSize="13" textAnchor="middle">↠</text>
            
            {/* Cap Buffer */}
            <rect x="170" y="55" width="80" height="35" rx="8" fill="#fef3c7" stroke="#fde68a" strokeWidth="2" opacity="0.95"/>
            <text x="210" y="77" fill="#ca8a04" fontSize="14" textAnchor="middle" fontWeight="bold">Buffer</text>
            {/* Caps in the buffer */}
            {[0, 1, 2, 3, 4].map(i => (
              <circle
                key={i}
                cx={180 + i*15}
                cy={95}
                r="7"
                fill="#fbbf24"
                stroke="#eab308"
                strokeWidth="1"
                opacity={i < 4 ? 1 : 0.4} // simulates extra space for more caps
              />
            ))}

            {/* Arrow to machine 2 */}
            <polygon points="255,70 280,70 280,65 295,75 280,85 280,80 255,80" fill="#a7f3d0" />
            <text x="268" y="60" fill="#38bdf8" fontSize="13" textAnchor="middle">↠</text>

            {/* Machine 2: Capping */}
            <rect x="300" y="40" width="110" height="60" rx="14" fill="#34d399" />
            <text x="355" y="62" fill="#fff" fontSize="15" textAnchor="middle" fontWeight="bold">Machine 2</text>
            <text x="355" y="83" fill="#d1fae5" fontSize="12" textAnchor="middle">Put cap</text>

            {/* Bottled (capped) */}
            <rect x="440" y="53" width="20" height="34" rx="5" fill="#a3e635" />
            <ellipse cx="450" cy="52" rx="10" ry="7" fill="#fbbf24" stroke="#eab308" strokeWidth="1"/>
            <text x="450" y="110" fill="#64748b" fontSize="13" textAnchor="middle">Done!</text>
          </svg>
            <p className="problem-lead">
              Imagine a small brewery:<br/>
              <strong>Machine 1</strong> fills the beer bottles.<br/>
              <strong>Machine 2</strong> puts a cap on each bottle.<br/>
              Between them, there’s a <strong>buffer</strong>: a tray where extra caps are stored.
            </p>
            <p className="problem-lead">
              <strong>What happens if the buffer is too small?</strong><br />
              The capping machine will have to stop and wait, losing productivity.<br/>
              <strong>And if it’s too big?</strong><br />
              We waste space, energy, and unnecessary materials.
            </p>
            <p className="problem-lead">
              <em>The challenge is to find the <strong>optimal buffer size</strong>!</em>
            </p>
          </div>


        <div className="hero-visual">
            <h2 className="problem-title">Introducing: EcoBuffer</h2>
            <p className="problem-lead">The <strong>ideal buffer</strong> is found through simulations done with <strong>SED software</strong></p>
            <p className="problem-lead">Thanks to <strong>generative AI</strong>, EcoBuffer makes it easy to use and <strong>accessible for everyone</strong></p>
            <p className="problem-lead">Natural language prompt</p>
            <p className="problem-lead">Parameter and scenario generation</p>
            <p className="problem-lead">Simulation and optimization</p>
        </div>

        <div className="hero-visual">
            <h2 className="problem-title">Expected Outcomes</h2>
            <p className="problem-lead"><strong>Drastic reduction</strong> in downtime.</p>
            <p className="problem-lead"><strong>Lower energy consumption</strong>.</p>
            <p className="problem-lead"><strong>Elimination</strong> of overproduction.</p>
            <p className="problem-lead"><strong>Reduction</strong> in emissions.</p>
            <p className="problem-lead">More <strong>stable</strong> and <strong>predictable operations</strong>.</p>
        </div>

        <div className="hero-visual">
            <h2 className="problem-title">Environmental and Economic Impact</h2>
            <p className="problem-lead"><strong>Aligns production</strong> with sustainability goals.</p>
            <p className="problem-lead"><strong>Less CO₂</strong> &rarr; <strong>Lower energy costs</strong> &rarr; <strong>Increased competitiveness</strong>.</p>
        </div>

        <p className="landing-intro">
          <strong>EcoBuffer</strong>, the first discrete event simulation companion focused on{' '}
          <strong>buffer optimization</strong>, <strong>energy efficiency</strong>, and{' '}
          <strong>real environmental impact</strong>.
        </p>
      </div>

      <section className="landing-section landing-section-alt">
        <h2>AI-powered integration with your existing tools</h2>
        <p className="section-intro">From natural language to simulation results - EcoBuffer bridges the gap</p>
        
        <div className="integration-visual">
          <svg viewBox="0 0 900 280" className="integration-svg">
            {/* User creating prompt */}
            <g>
              <text x="90" y="25" textAnchor="middle" fill="#9aa0b0" fontSize="14" fontWeight="bold">User Input</text>
              
              {/* User icon */}
              <circle cx="90" cy="100" r="35" fill="#1e2535" stroke="#8b5cf6" strokeWidth="3"/>
              <circle cx="90" cy="90" r="12" fill="#8b5cf6"/>
              <path d="M 65 115 Q 65 105 90 105 Q 115 105 115 115 L 115 125 Q 115 130 90 130 Q 65 130 65 125 Z" fill="#8b5cf6"/>
              
              {/* Prompt bubble */}
              <rect x="30" y="150" width="120" height="60" fill="#1e2535" stroke="#8b5cf6" strokeWidth="2" rx="8"/>
              <text x="90" y="172" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="bold">💬 Natural</text>
              <text x="90" y="188" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="bold">Language</text>
              <text x="90" y="204" textAnchor="middle" fill="#9aa0b0" fontSize="9">"Optimize buffers..."</text>
            </g>
            
            {/* EcoBuffer Core with AI */}
            <g>
              <rect x="300" y="60" width="300" height="160" fill="#065f46" stroke="#14b8a6" strokeWidth="4" rx="12"/>
              
              <text x="450" y="100" textAnchor="middle" fill="#6ee7b7" fontSize="24" fontWeight="bold">EcoBuffer AI</text>
              <text x="450" y="125" textAnchor="middle" fill="#9aa0b0" fontSize="13">Buffer Optimization Engine</text>
              <text x="450" y="145" textAnchor="middle" fill="#14b8a6" fontSize="11">🤖 AI-Powered Analysis</text>
              <text x="450" y="165" textAnchor="middle" fill="#14b8a6" fontSize="11">⚡ Energy & CO₂ Tracking</text>
              <text x="450" y="185" textAnchor="middle" fill="#84cc16" fontSize="11">📈 Real-time KPIs</text>
              <text x="450" y="205" textAnchor="middle" fill="#c4b5fd" fontSize="11">🎯 Smart Recommendations</text>
            </g>
            
            {/* Data Sources & DES Software */}
            <g>
              <text x="780" y="25" textAnchor="middle" fill="#9aa0b0" fontSize="14" fontWeight="bold">Data & Simulation</text>
              
              {/* Data Sources */}
              <rect x="710" y="45" width="140" height="35" fill="#1e2535" stroke="#3b82f6" strokeWidth="2" rx="6"/>
              <text x="780" y="67" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">📄 CSV / SQL / API</text>
              
              {/* Arrow to DES */}
              <path d="M 780 80 L 780 95" stroke="#9aa0b0" strokeWidth="2" strokeDasharray="4"/>
              
              {/* DES Software */}
              <text x="780" y="110" textAnchor="middle" fill="#9aa0b0" fontSize="12" fontWeight="bold">↓ DES Engines</text>
              
              <rect x="710" y="120" width="140" height="35" fill="#1e2535" stroke="#f59e0b" strokeWidth="2" rx="6"/>
              <text x="780" y="142" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Simio</text>
              
              <rect x="710" y="165" width="140" height="35" fill="#1e2535" stroke="#f59e0b" strokeWidth="2" rx="6"/>
              <text x="780" y="187" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">JaamSim</text>
              
              <rect x="710" y="210" width="140" height="35" fill="#1e2535" stroke="#f59e0b" strokeWidth="2" rx="6"/>
              <text x="780" y="232" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Simul8 / Witness</text>
            </g>
            
            {/* Arrows */}
            <defs>
              <marker id="arrow-purple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6" />
              </marker>
              <marker id="arrow-teal" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#14b8a6" />
              </marker>
              <marker id="arrow-orange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
              </marker>
            </defs>
            
            {/* User to EcoBuffer */}
            <path d="M 125 100 L 300 130" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrow-purple)"/>
            <path d="M 150 180 L 300 160" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrow-purple)"/>
            
            {/* EcoBuffer to CSV/SQL/API */}
            <path d="M 600 100 L 710 62" stroke="#14b8a6" strokeWidth="3" markerEnd="url(#arrow-teal)"/>
          </svg>
        </div>
        
        <ul className="landing-list">
          <li>Start with <strong>natural language prompts</strong> - describe your optimization goals in plain text.</li>
          <li>EcoBuffer's <strong>AI engine</strong> translates your requests into simulation parameters and scenarios.</li>
          <li>Automatically connects to <strong>Simio, JaamSim, Simul8, Witness</strong> and other DES engines.</li>
          <li>Pulls real data from CSV, SQL, and APIs to feed accurate simulations.</li>
        </ul>
        <p className="landing-highlight">
          No coding required. Just describe what you want to optimize, and let EcoBuffer handle the complexity.
        </p>
      </section>

      <section className="landing-section">
        <h2>Why buffers matter more than you think</h2>
        
        <div className="visual-comparison">
          <div className="comparison-side bad">
            <h3>❌ Poorly Sized Buffer</h3>
            <div className="buffer-diagram">
              <svg viewBox="0 0 500 280" className="diagram-svg">
                <defs>
                  <marker id="arrowred" markerWidth="12" markerHeight="12" refX="10" refY="4" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,8 L12,4 z" fill="#f97316" />
                  </marker>
                  <filter id="glow-red">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Machine A - Running */}
                <g>
                  <rect x="30" y="100" width="110" height="80" fill="#f97316" opacity="0.9" rx="8" stroke="#fb923c" strokeWidth="3"/>
                  <text x="85" y="135" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold">Machine A</text>
                  <text x="85" y="158" textAnchor="middle" fill="#fff" fontSize="14">Running</text>
                  <circle cx="60" cy="115" r="6" fill="#22c55e">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
                  </circle>
                </g>
                
                {/* Buffer - TOO SMALL */}
                <g>
                  <rect x="170" y="80" width="80" height="120" fill="#991b1b" opacity="0.2" rx="8" stroke="#ef4444" strokeWidth="3" strokeDasharray="8,4"/>
                  <text x="210" y="60" textAnchor="middle" fill="#ef4444" fontSize="16" fontWeight="bold">⚠️ TOO SMALL</text>
                  
                  {/* Only 2 small items in buffer */}
                  <rect x="185" y="150" width="20" height="35" fill="#f87171" rx="3" opacity="0.6"/>
                  <rect x="225" y="155" width="20" height="30" fill="#f87171" rx="3" opacity="0.6"/>
                  
                  <text x="210" y="230" textAnchor="middle" fill="#fca5a5" fontSize="13">Capacity: 2</text>
                </g>
                
                {/* Machine B - STARVING */}
                <g filter="url(#glow-red)">
                  <rect x="280" y="100" width="110" height="80" fill="#f97316" opacity="0.3" rx="8" stroke="#dc2626" strokeWidth="3"/>
                  <text x="335" y="135" textAnchor="middle" fill="#fca5a5" fontSize="20" fontWeight="bold">Machine B</text>
                  <text x="335" y="158" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">⚠️ STARVING</text>
                  <circle cx="310" cy="115" r="6" fill="#ef4444">
                    <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite" />
                  </circle>
                </g>
                
                {/* Flow arrows */}
                <path d="M 145 140 L 165 140" stroke="#f97316" strokeWidth="5" markerEnd="url(#arrowred)">
                  <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
                </path>
                <path d="M 255 140 L 275 140" stroke="#ef4444" strokeWidth="2" strokeDasharray="6,6" markerEnd="url(#arrowred)" opacity="0.5">
                  <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite" />
                </path>
                
                {/* Warning indicators */}
                <text x="210" y="260" textAnchor="middle" fill="#ef4444" fontSize="18" fontWeight="bold">⚡ High Energy Waste</text>
              </svg>
            </div>
            <p>↑ Energy waste, stop-go cycles</p>
          </div>
          
          <div className="comparison-side good">
            <h3>✅ Optimized Buffer</h3>
            <div className="buffer-diagram">
              <svg viewBox="0 0 500 280" className="diagram-svg">
                <defs>
                  <marker id="arrowgreen" markerWidth="12" markerHeight="12" refX="10" refY="4" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,8 L12,4 z" fill="#14b8a6" />
                  </marker>
                  <filter id="glow-green">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Machine A - Running */}
                <g>
                  <rect x="30" y="100" width="110" height="80" fill="#14b8a6" opacity="0.9" rx="8" stroke="#5eead4" strokeWidth="3"/>
                  <text x="85" y="135" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold">Machine A</text>
                  <text x="85" y="158" textAnchor="middle" fill="#fff" fontSize="14">Running</text>
                  <circle cx="60" cy="115" r="6" fill="#22c55e">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
                  </circle>
                </g>
                
                {/* Buffer - RIGHT SIZE */}
                <g filter="url(#glow-green)">
                  <rect x="170" y="70" width="100" height="140" fill="#065f46" opacity="0.3" rx="8" stroke="#14b8a6" strokeWidth="3"/>
                  <text x="220" y="55" textAnchor="middle" fill="#6ee7b7" fontSize="16" fontWeight="bold">✓ RIGHT SIZE</text>
                  
                  {/* Multiple items showing good capacity */}
                  <rect x="182" y="145" width="18" height="50" fill="#14b8a6" rx="3" opacity="0.9">
                    <animate attributeName="height" values="50;55;50" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="y" values="145;140;145" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <rect x="205" y="135" width="18" height="60" fill="#14b8a6" rx="3" opacity="0.9">
                    <animate attributeName="height" values="60;65;60" dur="2.3s" repeatCount="indefinite" />
                    <animate attributeName="y" values="135;130;135" dur="2.3s" repeatCount="indefinite" />
                  </rect>
                  <rect x="228" y="125" width="18" height="70" fill="#14b8a6" rx="3" opacity="0.9">
                    <animate attributeName="height" values="70;75;70" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="y" values="125;120;125" dur="1.8s" repeatCount="indefinite" />
                  </rect>
                  <rect x="251" y="130" width="18" height="65" fill="#14b8a6" rx="3" opacity="0.9">
                    <animate attributeName="height" values="65;70;65" dur="2.1s" repeatCount="indefinite" />
                    <animate attributeName="y" values="130;125;130" dur="2.1s" repeatCount="indefinite" />
                  </rect>
                  
                  <text x="220" y="230" textAnchor="middle" fill="#6ee7b7" fontSize="13">Capacity: 8</text>
                </g>
                
                {/* Machine B - Running smoothly */}
                <g>
                  <rect x="300" y="100" width="110" height="80" fill="#14b8a6" opacity="0.9" rx="8" stroke="#5eead4" strokeWidth="3"/>
                  <text x="355" y="135" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold">Machine B</text>
                  <text x="355" y="158" textAnchor="middle" fill="#fff" fontSize="14">Running</text>
                  <circle cx="330" cy="115" r="6" fill="#22c55e">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
                  </circle>
                </g>
                
                {/* Flow arrows - smooth */}
                <path d="M 145 140 L 165 140" stroke="#14b8a6" strokeWidth="5" markerEnd="url(#arrowgreen)">
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
                </path>
                <path d="M 275 140 L 295 140" stroke="#14b8a6" strokeWidth="5" markerEnd="url(#arrowgreen)">
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
                </path>
                
                {/* Success indicator */}
                <text x="250" y="260" textAnchor="middle" fill="#6ee7b7" fontSize="18" fontWeight="bold">✓ Smooth Flow</text>
              </svg>
            </div>
            <p>↑ Stable utilization, less waste</p>
          </div>
        </div>
        
        <ul className="landing-list">
          <li>A poorly sized buffer can increase energy use through idle starts, stop–go cycles, and unplanned overtime.</li>
          <li>Right-sized buffers can reduce inventory, stabilize flow, and cut emissions by smoothing machine utilization and logistics.</li>
          <li>Discrete Event Simulation (DES) lets you test dozens of "what‑if" scenarios without touching the real line.</li>
        </ul>
        <p className="landing-highlight">
          With EcoBuffer, operations teams can finally play with buffers like sliders, not source code.
        </p>
      </section>

      <section className="landing-section landing-section-alt">
        
        <div className="landing-two-col">
          <div>
            <h3>Traditional DES tools are powerful but hard to use:</h3>
            <ul>
              <li>Steep learning curve, heavy models, specialist-only interfaces.</li>
              <li>Weeks to build a model, days to test alternative buffer configurations.</li>
              <li>Little guidance on energy and carbon implications.</li>
            </ul>
          </div>
          <div>
            <h3>EcoBuffer sits on top of your existing simulation tools and translates complexity into:</h3>
            <ul>
              <li>Simple buffer and policy controls.</li>
              <li>Visual, factory-style dashboards.</li>
              <li>Clear KPIs like throughput, WIP, lead time, and energy use per unit.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="landing-section landing-impact">
        <h2>Tangible impact in weeks, not years</h2>
        <p className="section-intro">Operations and sustainability teams use EcoBuffer to:</p>
        
        <div className="impact-visual">
          <svg viewBox="0 0 800 300" className="impact-chart">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#14b8a6', stopOpacity: 0.8}} />
                <stop offset="100%" style={{stopColor: '#14b8a6', stopOpacity: 0.2}} />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#84cc16', stopOpacity: 0.8}} />
                <stop offset="100%" style={{stopColor: '#84cc16', stopOpacity: 0.2}} />
              </linearGradient>
              <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 0.8}} />
                <stop offset="100%" style={{stopColor: '#3b82f6', stopOpacity: 0.2}} />
              </linearGradient>
              <linearGradient id="grad4" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#f59e0b', stopOpacity: 0.8}} />
                <stop offset="100%" style={{stopColor: '#f59e0b', stopOpacity: 0.2}} />
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            <line x1="50" y1="50" x2="50" y2="250" stroke="#2d3548" strokeWidth="2"/>
            <line x1="50" y1="250" x2="750" y2="250" stroke="#2d3548" strokeWidth="2"/>
            
            {/* Throughput Bar */}
            <rect x="80" y="100" width="140" height="150" fill="url(#grad1)" rx="8"/>
            <text x="150" y="85" textAnchor="middle" fill="#14b8a6" fontSize="28" fontWeight="bold">+15%</text>
            <text x="150" y="270" textAnchor="middle" fill="#9aa0b0" fontSize="14">Throughput</text>
            
            {/* WIP Reduction Bar */}
            <rect x="250" y="70" width="140" height="180" fill="url(#grad2)" rx="8"/>
            <text x="320" y="55" textAnchor="middle" fill="#84cc16" fontSize="28" fontWeight="bold">-30%</text>
            <text x="320" y="270" textAnchor="middle" fill="#9aa0b0" fontSize="14">WIP</text>
            
            {/* CO₂ Reduction Bar */}
            <rect x="420" y="120" width="140" height="130" fill="url(#grad3)" rx="8"/>
            <text x="490" y="105" textAnchor="middle" fill="#3b82f6" fontSize="28" fontWeight="bold">-12%</text>
            <text x="490" y="270" textAnchor="middle" fill="#9aa0b0" fontSize="14">CO₂/unit</text>
            
            {/* EBITDA Bar */}
            <rect x="590" y="110" width="140" height="140" fill="url(#grad4)" rx="8"/>
            <text x="660" y="95" textAnchor="middle" fill="#f59e0b" fontSize="28" fontWeight="bold">+8%</text>
            <text x="660" y="270" textAnchor="middle" fill="#9aa0b0" fontSize="14">EBITDA</text>
          </svg>
        </div>
        
        <div className="landing-metrics">
          <div className="landing-metric">
            <div className="metric-icon">📈</div>
            <div className="metric-value">5–15%</div>
            <div className="metric-label">Increase line throughput without new machines, just smarter buffers</div>
          </div>
          <div className="landing-metric">
            <div className="metric-icon">📦</div>
            <div className="metric-value">10–30%</div>
            <div className="metric-label">Cut average WIP and inventory, freeing working capital</div>
          </div>
          <div className="landing-metric">
            <div className="metric-icon">🌱</div>
            <div className="metric-value">5–12%</div>
            <div className="metric-label">Reduce energy-related CO₂ per unit through smoother utilization</div>
          </div>
          <div className="landing-metric">
            <div className="metric-icon">💰</div>
            <div className="metric-value">3–8%</div>
            <div className="metric-label">EBITDA uplift from better operations and lower costs</div>
          </div>
        </div>
        <p className="landing-highlight">
          All of this comes from better decisions about <strong>where</strong> to place buffers,{' '}
          <strong>how big</strong> they should be, and <strong>how</strong> they are replenished.
        </p>
      </section>

      <section className="landing-section">
        <h2>Key capabilities</h2>
        <div className="landing-capabilities">
          <div className="capability-card">
            <h3>🎯 Buffer optimization assistant</h3>
            <p>Interactively tune buffer sizes, reorder points, and control rules. See the impact on throughput, WIP, and service level in minutes.</p>
          </div>
          <div className="capability-card">
            <h3>⚡ Energy & CO₂ overlay</h3>
            <p>Attach energy profiles and emission factors to resources. Instantly see how each scenario affects kWh, CO₂e, and cost per unit.</p>
          </div>
          <div className="capability-card">
            <h3>🧪 Scenario lab for "what‑ifs"</h3>
            <p>Run multiple scenarios in parallel: demand spikes, machine outages, shift changes, and layout variants.</p>
          </div>
          <div className="capability-card">
            <h3>🏭 Factory-grade visuals</h3>
            <p>Industrial but friendly interface: line diagrams, Sankey-style flow, heat maps for bottlenecks and energy hotspots.</p>
          </div>
          <div className="capability-card">
            <h3>👥 Collaboration ready</h3>
            <p>Share scenarios, annotate risks and assumptions, and export reports for operations, finance, and sustainability teams.</p>
          </div>
        </div>
      </section>


      <section className="landing-section landing-section-alt">
        <h2>Designed for engineers, friendly for everyone</h2>
        <p>EcoBuffer is built to feel like modern industrial software:</p>
        <ul className="landing-list">
          <li>Dark, workshop-inspired palettes with clear color coding for flow, queues, and bottlenecks.</li>
          <li>Minimal clutter; everything important fits into one main screen.</li>
          <li>Tooltips instead of manuals, presets instead of parameter jungles.</li>
          <li>Built-in templates for assembly lines, packaging cells, warehouses, and transport hubs.</li>
        </ul>
        <p className="landing-highlight">
          If you can read a simple process diagram, you can use EcoBuffer.
        </p>
      </section>

      <section className="landing-cta">
        <h2>Ready to see it in action?</h2>
        <p>Choose your next step:</p>
        <div className="landing-cta-buttons">
          <Link href="/simulation" className="cta-button cta-primary">
            ▶️ View simulation
          </Link>
          <Link href="/simulator" className="cta-button cta-secondary">
            🧪 Try it now
          </Link>
        </div>
      </section>

      <footer className="landing-footer">
        <p>EcoBuffer • Making Discrete Event Simulation accessible to everyone</p>
      </footer>
    </div>
  );
}
