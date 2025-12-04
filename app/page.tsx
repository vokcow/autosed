'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="landing-container">
      {/* Fixed Header with CTA Buttons */}
      <div className="landing-fixed-header">
        <div className="landing-fixed-header-content">
          <div className="landing-fixed-logo">
            <span className="logo-text">FlowBuffer</span>
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
          Make Discrete Event Simulation feel simple, powerful, and sustainable
        </h1>
        <p className="landing-tagline">
          Imagine that a decision as simple as choosing how many parts to store can change the climate footprint of an entire factory.
        </p>
        
        <div className="hero-visual">
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
              <text x="120" y="185" textAnchor="middle" fill="#9aa0b0" fontSize="10">Energy</text>
              
              <text x="310" y="165" textAnchor="middle" fill="#84cc16" fontSize="24">📊</text>
              <text x="310" y="185" textAnchor="middle" fill="#9aa0b0" fontSize="10">Throughput</text>
              
              <text x="500" y="165" textAnchor="middle" fill="#3b82f6" fontSize="24">🌱</text>
              <text x="500" y="185" textAnchor="middle" fill="#9aa0b0" fontSize="10">CO₂</text>
              
              <text x="690" y="165" textAnchor="middle" fill="#f59e0b" fontSize="24">💰</text>
              <text x="690" y="185" textAnchor="middle" fill="#9aa0b0" fontSize="10">EBITDA</text>
            </g>
          </svg>
        </div>
        
        <p className="landing-intro">
          Meet <strong>FlowBuffer</strong>, the first discrete event simulation companion focused on{' '}
          <strong>buffer optimization</strong>, <strong>energy efficiency</strong>, and{' '}
          <strong>real EBITDA impact</strong>.
        </p>
      </div>

      <section className="landing-section">
        <h2>Why buffers matter more than you think</h2>
        
        <div className="visual-comparison">
          <div className="comparison-side bad">
            <h3>❌ Poorly Sized Buffer</h3>
            <div className="buffer-diagram">
              <svg viewBox="0 0 300 150" className="diagram-svg">
                <rect x="10" y="60" width="60" height="30" fill="#f97316" opacity="0.8" rx="4"/>
                <text x="40" y="80" textAnchor="middle" fill="#fff" fontSize="12">Machine A</text>
                
                <rect x="90" y="50" width="40" height="50" fill="#991b1b" opacity="0.3" rx="4" strokeDasharray="4"/>
                <text x="110" y="80" textAnchor="middle" fill="#f87171" fontSize="10">Buffer</text>
                <text x="110" y="95" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">TOO SMALL</text>
                
                <rect x="150" y="60" width="60" height="30" fill="#f97316" opacity="0.4" rx="4"/>
                <text x="180" y="80" textAnchor="middle" fill="#fff" fontSize="12">Machine B</text>
                <text x="180" y="100" textAnchor="middle" fill="#fca5a5" fontSize="9">⚠️ Starving</text>
                
                <path d="M 70 75 L 90 75" stroke="#f97316" strokeWidth="3" markerEnd="url(#arrowred)"/>
                <path d="M 130 75 L 150 75" stroke="#f97316" strokeWidth="1" strokeDasharray="3" markerEnd="url(#arrowred)"/>
                
                <defs>
                  <marker id="arrowred" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#f97316" />
                  </marker>
                </defs>
              </svg>
            </div>
            <p>↑ Energy waste, stop-go cycles</p>
          </div>
          
          <div className="comparison-side good">
            <h3>✅ Optimized Buffer</h3>
            <div className="buffer-diagram">
              <svg viewBox="0 0 300 150" className="diagram-svg">
                <rect x="10" y="60" width="60" height="30" fill="#14b8a6" opacity="0.8" rx="4"/>
                <text x="40" y="80" textAnchor="middle" fill="#fff" fontSize="12">Machine A</text>
                
                <rect x="90" y="40" width="60" height="70" fill="#065f46" opacity="0.3" rx="4"/>
                <rect x="95" y="85" width="10" height="20" fill="#14b8a6" rx="2"/>
                <rect x="110" y="75" width="10" height="30" fill="#14b8a6" rx="2"/>
                <rect x="125" y="65" width="10" height="40" fill="#14b8a6" rx="2"/>
                <rect x="140" y="70" width="10" height="35" fill="#14b8a6" rx="2"/>
                <text x="120" y="55" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">RIGHT SIZE</text>
                
                <rect x="170" y="60" width="60" height="30" fill="#14b8a6" opacity="0.8" rx="4"/>
                <text x="200" y="80" textAnchor="middle" fill="#fff" fontSize="12">Machine B</text>
                <text x="200" y="100" textAnchor="middle" fill="#6ee7b7" fontSize="9">✓ Smooth Flow</text>
                
                <path d="M 70 75 L 90 75" stroke="#14b8a6" strokeWidth="3" markerEnd="url(#arrowgreen)"/>
                <path d="M 150 75 L 170 75" stroke="#14b8a6" strokeWidth="3" markerEnd="url(#arrowgreen)"/>
                
                <defs>
                  <marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#14b8a6" />
                  </marker>
                </defs>
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
          With FlowBuffer, operations teams can finally play with buffers like sliders, not source code.
        </p>
      </section>

      <section className="landing-section landing-section-alt">
        <h2>From complex SED tools to a friendly layer</h2>
        
        <div className="transformation-visual">
          <svg viewBox="0 0 900 200" className="transformation-svg">
            {/* Traditional tools side */}
            <g>
              <rect x="20" y="40" width="250" height="120" fill="#1e2535" stroke="#f97316" strokeWidth="2" rx="8"/>
              <text x="145" y="30" textAnchor="middle" fill="#f97316" fontSize="16" fontWeight="bold">Traditional DES</text>
              <text x="145" y="70" textAnchor="middle" fill="#9aa0b0" fontSize="13">&lt;Code/&gt;</text>
              <text x="145" y="95" textAnchor="middle" fill="#6b7280" fontSize="11">Complex models</text>
              <text x="145" y="115" textAnchor="middle" fill="#6b7280" fontSize="11">Weeks to configure</text>
              <text x="145" y="135" textAnchor="middle" fill="#6b7280" fontSize="11">Specialist-only</text>
            </g>
            
            {/* Arrow */}
            <g>
              <path d="M 290 100 L 380 100" stroke="#14b8a6" strokeWidth="4" markerEnd="url(#arrow)"/>
              <text x="335" y="90" textAnchor="middle" fill="#14b8a6" fontSize="14" fontWeight="bold">FlowBuffer</text>
              <defs>
                <marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#14b8a6" />
                </marker>
              </defs>
            </g>
            
            {/* FlowBuffer side */}
            <g>
              <rect x="400" y="20" width="120" height="50" fill="#065f46" stroke="#14b8a6" strokeWidth="2" rx="6"/>
              <text x="460" y="42" textAnchor="middle" fill="#6ee7b7" fontSize="12">Simple Controls</text>
              <text x="460" y="58" textAnchor="middle" fill="#9aa0b0" fontSize="10">🎚️ Sliders</text>
              
              <rect x="540" y="20" width="120" height="50" fill="#065f46" stroke="#84cc16" strokeWidth="2" rx="6"/>
              <text x="600" y="42" textAnchor="middle" fill="#bef264" fontSize="12">Visual Dashboard</text>
              <text x="600" y="58" textAnchor="middle" fill="#9aa0b0" fontSize="10">📊 Charts</text>
              
              <rect x="680" y="20" width="120" height="50" fill="#065f46" stroke="#3b82f6" strokeWidth="2" rx="6"/>
              <text x="740" y="42" textAnchor="middle" fill="#93c5fd" fontSize="12">Clear KPIs</text>
              <text x="740" y="58" textAnchor="middle" fill="#9aa0b0" fontSize="10">📈 Metrics</text>
              
              <rect x="400" y="90" width="180" height="50" fill="#065f46" stroke="#f59e0b" strokeWidth="2" rx="6"/>
              <text x="490" y="112" textAnchor="middle" fill="#fbbf24" fontSize="12">Energy & CO₂ Built-in</text>
              <text x="490" y="128" textAnchor="middle" fill="#9aa0b0" fontSize="10">⚡ Sustainability</text>
              
              <rect x="600" y="90" width="200" height="50" fill="#065f46" stroke="#14b8a6" strokeWidth="2" rx="6"/>
              <text x="700" y="112" textAnchor="middle" fill="#6ee7b7" fontSize="12">Results in Minutes</text>
              <text x="700" y="128" textAnchor="middle" fill="#9aa0b0" fontSize="10">⚡ Fast iteration</text>
            </g>
          </svg>
        </div>
        
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
            <h3>FlowBuffer sits on top of your existing simulation tools and translates complexity into:</h3>
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
        <p className="section-intro">Operations and sustainability teams use FlowBuffer to:</p>
        
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
        <h2>Works with the tools you already have</h2>
        <p className="section-intro">FlowBuffer integrates with common DES and data sources</p>
        
        <div className="integration-visual">
          <svg viewBox="0 0 900 280" className="integration-svg">
            {/* Data Sources */}
            <g>
              <text x="100" y="25" textAnchor="middle" fill="#9aa0b0" fontSize="14" fontWeight="bold">Data Sources</text>
              <rect x="30" y="40" width="70" height="50" fill="#1e2535" stroke="#3b82f6" strokeWidth="2" rx="6"/>
              <text x="65" y="65" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">CSV</text>
              <text x="65" y="80" textAnchor="middle" fill="#9aa0b0" fontSize="9">📄 Files</text>
              
              <rect x="30" y="100" width="70" height="50" fill="#1e2535" stroke="#3b82f6" strokeWidth="2" rx="6"/>
              <text x="65" y="125" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">SQL</text>
              <text x="65" y="140" textAnchor="middle" fill="#9aa0b0" fontSize="9">🗄️ Database</text>
              
              <rect x="30" y="160" width="70" height="50" fill="#1e2535" stroke="#3b82f6" strokeWidth="2" rx="6"/>
              <text x="65" y="185" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Time Series</text>
              <text x="65" y="200" textAnchor="middle" fill="#9aa0b0" fontSize="9">📊 Metrics</text>
            </g>
            
            {/* FlowBuffer Core */}
            <g>
              <rect x="300" y="80" width="300" height="120" fill="#065f46" stroke="#14b8a6" strokeWidth="4" rx="12"/>
              <text x="450" y="110" textAnchor="middle" fill="#6ee7b7" fontSize="24" fontWeight="bold">FlowBuffer</text>
              <text x="450" y="135" textAnchor="middle" fill="#9aa0b0" fontSize="13">Buffer Optimization Engine</text>
              <text x="450" y="155" textAnchor="middle" fill="#14b8a6" fontSize="11">⚡ Energy & CO₂ Analysis</text>
              <text x="450" y="175" textAnchor="middle" fill="#84cc16" fontSize="11">📈 Real-time KPIs</text>
            </g>
            
            {/* Simulation Engines */}
            <g>
              <text x="790" y="25" textAnchor="middle" fill="#9aa0b0" fontSize="14" fontWeight="bold">Simulation Engines</text>
              <rect x="730" y="40" width="120" height="40" fill="#1e2535" stroke="#f59e0b" strokeWidth="2" rx="6"/>
              <text x="790" y="65" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Simio</text>
              
              <rect x="730" y="90" width="120" height="40" fill="#1e2535" stroke="#f59e0b" strokeWidth="2" rx="6"/>
              <text x="790" y="115" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">JaamSim</text>
              
              <rect x="730" y="140" width="120" height="40" fill="#1e2535" stroke="#f59e0b" strokeWidth="2" rx="6"/>
              <text x="790" y="165" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Simul8 / Witness</text>
            </g>
            
            {/* Export Tools */}
            <g>
              <text x="790" y="215" textAnchor="middle" fill="#9aa0b0" fontSize="14" fontWeight="bold">Export to</text>
              <rect x="730" y="230" width="120" height="40" fill="#1e2535" stroke="#84cc16" strokeWidth="2" rx="6"/>
              <text x="790" y="255" textAnchor="middle" fill="#84cc16" fontSize="12" fontWeight="bold">BI Tools</text>
            </g>
            
            {/* Arrows */}
            <defs>
              <marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
              </marker>
              <marker id="arrow-teal" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#14b8a6" />
              </marker>
              <marker id="arrow-orange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
              </marker>
              <marker id="arrow-lime" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#84cc16" />
              </marker>
            </defs>
            
            <path d="M 110 65 L 300 110" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow-blue)"/>
            <path d="M 110 125 L 300 140" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow-blue)"/>
            <path d="M 110 185 L 300 170" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow-blue)"/>
            
            <path d="M 600 100 L 730 60" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-orange)"/>
            <path d="M 600 140 L 730 110" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-orange)"/>
            <path d="M 600 180 L 730 160" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-orange)"/>
            
            <path d="M 600 160 L 730 250" stroke="#84cc16" strokeWidth="3" markerEnd="url(#arrow-lime)"/>
          </svg>
        </div>
        
        <ul className="landing-list">
          <li>Compatible with <strong>Simio, JaamSim, Simul8, Witness</strong> and other SED engines through standard APIs.</li>
          <li>Imports structure, routing, and parameters from your existing models.</li>
          <li>Connects to CSV, SQL, and time-series data for demand and downtime.</li>
          <li>Exports results to your BI tools for cross-functional analysis.</li>
        </ul>
        <p className="landing-highlight">
          No need to rebuild your models. Start from what you already trust, then add a smarter buffer layer.
        </p>
      </section>

      <section className="landing-section">
        <h2>Who is using FlowBuffer?</h2>
        <div className="landing-testimonials">
          <div className="testimonial-card">
            <h3>GreenPress Components</h3>
            <p className="testimonial-subtitle">Automotive Tier 1 supplier</p>
            <p className="testimonial-quote">
              "With FlowBuffer we reduced WIP buffers by 22% while keeping service level above 98%, 
              freeing capital and stabilizing the line."
            </p>
          </div>
          <div className="testimonial-card">
            <h3>BlueWave Appliances</h3>
            <p className="testimonial-subtitle">Consumer goods factory network</p>
            <p className="testimonial-quote">
              "Optimizing decoupling buffers across three plants gave us a 9% throughput increase 
              and a measurable CO₂ reduction per unit."
            </p>
          </div>
          <div className="testimonial-card">
            <h3>NordicRail Logistics</h3>
            <p className="testimonial-subtitle">Intermodal transport operator</p>
            <p className="testimonial-quote">
              "Scenario testing helped right-size yard buffers and cut unproductive moves, 
              improving on-time performance and energy use."
            </p>
          </div>
          <div className="testimonial-card">
            <h3>SunCore Foods</h3>
            <p className="testimonial-subtitle">Beverage and packaging producer</p>
            <p className="testimonial-quote">
              "In less than a month we identified where small buffer changes could save energy without hurting output."
            </p>
          </div>
        </div>
        <p className="landing-note">*(All client names and quotes above are illustrative.)*</p>
      </section>

      <section className="landing-section landing-section-alt">
        <h2>Designed for engineers, friendly for everyone</h2>
        <p>FlowBuffer is built to feel like modern industrial software:</p>
        <ul className="landing-list">
          <li>Dark, workshop-inspired palettes with clear color coding for flow, queues, and bottlenecks.</li>
          <li>Minimal clutter; everything important fits into one main screen.</li>
          <li>Tooltips instead of manuals, presets instead of parameter jungles.</li>
          <li>Built-in templates for assembly lines, packaging cells, warehouses, and transport hubs.</li>
        </ul>
        <p className="landing-highlight">
          If you can read a simple process diagram, you can use FlowBuffer.
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
        <p>FlowBuffer • Making Discrete Event Simulation accessible to everyone</p>
      </footer>
    </div>
  );
}
