# Quick Start Guide

Get the Buffer Optimizer Playground running in 5 minutes!

## 📋 Prerequisites

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- A code editor (VS Code recommended)

## 🚀 Installation

### 1. Clone or Download

If you have the project:
```bash
cd autosed
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

🎉 **You should see the Buffer Optimizer Playground!**

## 🎮 Try It Out

1. **Enter a scenario** in the text box, for example:
   ```
   A production line with 2 machines, parts arrive every 30 seconds, 
   current buffer holds 10 parts, running 8-hour shifts. 
   Optimize the buffer to maintain 85% utilization with minimal WIP.
   ```

2. **Click "Run Simulation"**

3. **Watch the processing animation** (Understanding → Preparing → Running → Collecting)

4. **View the results**:
   - Optimal buffer size
   - Throughput comparison chart
   - Utilization metrics
   - KPIs dashboard
   - Plain-language explanation

5. **Run more scenarios** - Previous runs appear in the sidebar for comparison

## 📁 Project Structure

```
autosed/
├── app/
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── InputArea.tsx
│   │   ├── StatusPanel.tsx
│   │   ├── ResultsDashboard.tsx
│   │   └── ScenarioHistory.tsx
│   ├── lib/
│   │   └── simulation.ts    # Mock simulation logic
│   ├── types.ts             # TypeScript types
│   ├── page.tsx             # Main page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Styles
├── public/                  # Static assets
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🛠️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🎨 Customization

### Change Colors

Edit `app/globals.css` CSS variables:

```css
:root {
  --accent-teal: #14b8a6;    /* Primary accent */
  --accent-lime: #84cc16;    /* Success/positive */
  --accent-orange: #f97316;  /* Warning/emphasis */
}
```

### Modify Mock Data

Edit `app/lib/simulation.ts`:

```typescript
export async function runSimioSimulation(params: SimulationParams) {
  // Modify the mock results here
  const optimalBuffer = 14; // Change this
  const baselineThroughput = params.arrivalRate * 0.8;
  // ...
}
```

### Add More KPIs

1. Update types in `app/types.ts`:
```typescript
export interface SimulationResults {
  // ... existing fields
  kpis: {
    // ... existing KPIs
    yourNewKPI: number;
  };
}
```

2. Update mock data in `app/lib/simulation.ts`

3. Display in `app/components/ResultsDashboard.tsx`

## 🌐 Deploy to Vercel

### One-Click Deploy

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com/new)

3. Import your repository

4. Click "Deploy" (no configuration needed!)

Your app will be live at `https://your-project.vercel.app`

### Deploy with CLI

```bash
npm i -g vercel
vercel
```

## 🔧 Troubleshooting

### Port 3000 already in use

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Module not found errors

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build fails

```bash
# Clean Next.js cache
rm -rf .next
npm run build
```

### TypeScript errors

Check that all files have proper type definitions. Most errors should be caught by the linter:

```bash
npm run lint
```

## 📚 Next Steps

- **Read the full [README.md](./README.md)** for detailed documentation
- **Check [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** to connect real backends
- **See [DEPLOYMENT.md](./DEPLOYMENT.md)** for production deployment options

## 💡 Tips

1. **Use Chrome DevTools** to inspect the app and see network requests
2. **Open the Console** to see any errors or debug messages
3. **Responsive Design** works on mobile - resize your browser to test
4. **Hot Reload** is enabled - save files to see changes instantly

## 🆘 Getting Help

Common issues:

| Problem | Solution |
|---------|----------|
| White screen | Check console for errors, ensure `npm install` completed |
| Styles not loading | Clear browser cache, restart dev server |
| Build errors | Delete `.next` folder and rebuild |
| Can't access localhost | Check firewall, try `127.0.0.1:3000` instead |

## 🎯 What's Mock vs Real?

Currently **MOCK** (fake data):
- ✅ Simulation results (random/calculated)
- ✅ Processing time (setTimeout)
- ✅ Natural language parsing (basic regex)

Ready for **REAL** integration:
- 🔌 LLM API for NLP (OpenAI, Claude)
- 🔌 Simio Backend (.NET service)
- 🔌 Database for storing scenarios
- 🔌 User authentication

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for details.

## ✅ Quick Checklist

- [ ] Node.js 18+ installed
- [ ] `npm install` completed successfully
- [ ] `npm run dev` running without errors
- [ ] Can access http://localhost:3000
- [ ] Tried running a simulation
- [ ] Saw the results dashboard

🎊 **You're all set!** Start experimenting with the Buffer Optimizer Playground!

