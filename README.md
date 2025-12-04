# Buffer Optimizer Playground

A friendly front-end for Simio-based discrete-event simulation for optimizing buffer sizes in manufacturing systems.

## 🎯 Overview

This application allows non-expert users to describe their manufacturing system in natural language and see simulation results in an intuitive, visual way. Built with Next.js and designed for easy deployment on Vercel.

## 🚀 Features

- **Natural Language Input**: Describe your system in plain English
- **Real-time Processing**: Visual feedback during simulation
- **Interactive Results**: Charts, KPIs, and plain-language explanations
- **Scenario History**: Compare multiple simulation runs
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Industrial Theme**: Clean, modern UI with an operations feel

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **CSS** (no external UI libraries)
- **Static Export** (ready for Vercel deployment)

## 📦 Installation

```bash
# Install dependencies
npm install

# Configure environment variables
# Create a .env.local file in the root directory and add:
# OPENROUTER_API_KEY=your_api_key_here
# Get your API key from: https://openrouter.ai/keys

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

- `OPENROUTER_API_KEY`: Required for LLM-based parameter extraction using Amazon Nova 2 Lite model via OpenRouter API

## 🎨 Project Structure

```
autosed/
├── app/
│   ├── components/
│   │   ├── Header.tsx              # App header with title
│   │   ├── InputArea.tsx           # Text input for user descriptions
│   │   ├── StatusPanel.tsx         # Processing animation
│   │   ├── ResultsDashboard.tsx    # Charts and KPIs
│   │   └── ScenarioHistory.tsx     # Previous simulation runs
│   ├── lib/
│   │   └── simulation.ts           # Mock simulation logic + API placeholders
│   ├── types.ts                    # TypeScript interfaces
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Main page component
│   └── globals.css                 # Global styles
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🔌 Integration Points

The app is currently running with **mock data** but is prepared for real backend integration:

### 1. LLM Integration (Natural Language Processing)

See `app/lib/simulation.ts`:

```typescript
export async function parseUserDescriptionToSimulationParams(userText: string): Promise<SimulationParams>
```

**STATUS**: ✅ **Implemented** - Now uses OpenRouter API with Amazon Nova 2 Lite to convert natural language descriptions into structured simulation parameters including:
- Arrival rates (parts per hour)
- Number of machines
- Buffer sizes (min/max)
- Shift duration
- Target utilization
- MTBF (Mean Time Between Failures)
- MTTR (Mean Time To Repair)
- Processing hours

**Requirements**: Set `OPENROUTER_API_KEY` environment variable. Falls back to basic parsing if not available.

### 2. Simio Integration (Simulation Engine)

See `app/lib/simulation.ts`:

```typescript
export async function callSimioBackend(simParams: SimulationParams): Promise<SimulationResults>
```

**TODO**: Call a .NET backend service that:
- Uses Simio's .NET API to load models
- Configures experiments with buffer parameters
- Runs simulations using the Simio Engine
- Returns results as JSON

**Backend Requirements**:
- ASP.NET Core service
- Windows server with Simio installed
- REST API endpoint (e.g., `POST /api/simio/simulate`)
- Uses `SimioAPI` namespace (`IModel`, `IExperiment`, `IScenario`)

## 🚢 Deployment

### Deploy to Vercel

This app is configured for static export and ready for Vercel deployment:

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Deploy (no configuration needed!)

The app will automatically build and deploy as a static site.

### Manual Build

```bash
npm run build
```

This creates a static export in the `out/` directory that can be hosted anywhere.

## 📝 Usage Example

1. Enter a description like:
   ```
   A line with 2 machines, arrivals every 30 seconds, 
   buffer of 10 parts between them, 8-hour shift. 
   Optimize the buffer size to keep utilization above 85% 
   with minimal WIP.
   ```

2. Click "Run Simulation"

3. View results:
   - Optimal buffer size
   - Throughput comparison chart
   - Utilization metrics
   - KPIs (WIP, waiting times, blocking, starvation)
   - Plain-language explanation

4. Previous runs are saved in the sidebar for comparison

## 🎨 Design Philosophy

**Industrial but chill**:
- Dark theme with steel grey and navy tones
- Teal, lime, and orange accents
- Soft rounded corners and whitespace
- Smooth transitions and hover effects
- Icons suggesting factory operations (conveyor belts, containers)

## 🔧 Development Notes

- **No external chart libraries**: Charts are built with pure CSS and HTML
- **No backend required** for the mock version
- **TypeScript**: Full type safety throughout
- **Responsive**: Mobile-first CSS with breakpoints
- **Animations**: CSS-based loading animations
- **State management**: React hooks (no Redux needed for this scale)

## 📚 Next Steps

1. **LLM Integration**: Connect to OpenAI or similar for NLP
2. **Simio Backend**: Build ASP.NET service wrapper for Simio API
3. **Authentication**: Add user accounts if needed
4. **Model Library**: Allow users to select different Simio models
5. **Advanced Scenarios**: Multi-buffer optimization, shift patterns, etc.
6. **Export Results**: PDF reports, CSV data download

## 📄 License

MIT

## 👤 Author

Built for Simio optimization workflows.

