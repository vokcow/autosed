# Context
You are an expert full‑stack web developer.
Create a small, single‑page web app (pure HTML/CSS/JavaScript, no build step, easy to deploy on Vercel as a static site) that acts as a friendly front‑end to a Simio‑based discrete‑event simulation for optimizing a buffer.

# Overall goals
Purpose: Let non‑expert users describe, in natural language, the parameters for a buffer optimization simulation in Simio and then see the results in a very visual, intuitive way.

# Tech:

Single index.html with embedded CSS and JS, or index.html + style.css + app.js.

No backend required for the mock; all logic should run client‑side.

Use only vanilla JavaScript (no React/Vue/etc.).

Simulation: For now, mock everything related to Simio.

Simio connectivity should be represented as clearly separated placeholder functions with TODO comments that explain where and how to integrate with the real Simio API later.

The app must still behave plausibly with toy data (fake simulation results, fake progress, fake run time).

User experience
Design the UI to be extremely simple, reassuring, and playful, but still with a light industrial/operations theme.

Layout and flow
Header area

A top bar with:

App name: “Buffer Optimizer Playground”.

Short subtitle: “Describe your system. We’ll simulate it for you.”

Subtle industrial feel (e.g., icons or background shapes suggesting conveyor belts, containers, or factory blocks).

Input area (left or top‑center)

A large, friendly text area with placeholder text like:

“Example: A line with 2 machines, arrivals every 30 seconds, buffer of 10 parts between them, 8‑hour shift. Optimize the buffer size to keep utilization above 85% with minimal WIP.”

A primary button: “Run Simulation”.

A small hint text under the box: “Use plain English. We will translate your description into simulation parameters.”

Processing / waiting state

After clicking Run Simulation:

Disable the input and button.

Show a central “Processing your scenario…” panel with:

A simple animated loader (CSS animation, e.g. rotating cog, moving boxes along a conveyor, or progress bar).

Step labels:

“Understanding your description”

“Preparing Simio model”

“Running simulation”

“Collecting results”

Highlight steps as they “complete” using staged timeouts.

For the mock, simulate a 3–5 second overall processing time with progressive status updates.

Results area (right or bottom)

Once the fake simulation is “done”, hide the loader and show a results dashboard with:

A summary card at the top: e.g.

“Optimal buffer size: 14 units”

“Estimated throughput: 92 units/hour”

“Average utilization: 87%”

Below, show:

A small bar chart (drawn with plain HTML/CSS or <canvas>; no external chart libs) comparing throughput for a few candidate buffer sizes (toy data).

A KPIs section with cards for:

Average WIP

Average waiting time

Average blocking/starvation times

A plain‑language explanation panel, e.g.:

“With a buffer size of 14, the system balances machine utilization and WIP. Using a smaller buffer increases blocking at Machine 1, while larger buffers add WIP with little gain.”

History / scenario list (optional but preferred)

On the side or bottom, show a small list of previous runs in the same session:

Each item shows:

A truncated version of the user’s text.

The selected “optimal buffer” and a small badge for throughput (e.g. “↑ 92 u/h”).

Clicking an item should re‑display its mock results.

Visual style
Mood: “Industrial but chill”.

Colors: mix of dark blue / steel grey for the frame, with accents in teal, lime, or orange for buttons and highlights.

Use soft rounded corners, clear typography, and lots of whitespace.

Use SVG or CSS shapes to give the sense of:

A factory line, conveyor belts, containers, or pallets.

Add subtle hover effects and transitions:

Buttons slightly scale and change shade on hover.

Cards animate in with a small fade/slide.

Ensure responsive design:

On mobile, stack sections vertically: input → status → results.

Logic and architecture
For now everything must be mock‑driven, but the code must clearly show where a real LLM and Simio API would plug in.

Core JS structure
Create a small JS module‑like structure (even inside one file) with:

parseUserDescriptionToSimulationParams(userText)

For now, fake it:

Return a JSON object with plausible buffer optimization parameters derived in a very lightweight way from the text (e.g. parse integers in the string to guess arrival time, buffer range, shift length, etc.).

Example fields (feel free to extend):

arrivalRate

numMachines

bufferSizeMin

bufferSizeMax

shiftDurationHours

targetUtilization

Add a big // TODO comment explaining that in production this function would call an LLM API to convert natural language into structured Simio experiment parameters.

runSimioSimulation(params)

For now, this should not call any external service.

Instead:

Return a Promise that resolves after a simulated delay (e.g. setTimeout) with fake results, such as:

An array of candidate buffer sizes and associated throughput/utilization.

KPIs for the selected “best” buffer.

Inside this function, include explicit placeholder hooks for Simio integration, for example:

```js
// TODO: Replace this mock with a real call to a backend service
// that:
// 1) Uses Simio’s .NET API to load a model.
// 2) Applies the simulation parameters (buffer sizes, arrival rates, etc.).
// 3) Runs the experiment.
// 4) Reads back results and returns them as JSON.
Add a clear note in comments about where to integrate with:

A custom .NET service that wraps the Simio API and exposes a REST endpoint.​

renderResults(results)

Update all the result cards and the mock chart based on the results object.

Use smooth transitions when changing content.

updateStatusStep(stepIndex)

Drive the status UI (“Understanding…”, “Preparing Simio model…”, etc.).
```

API placeholders (for later real integration)
Add two placeholder async functions which are not used yet in the mock logic, but are clearly prepared for future wiring:

```js
// TODO: Call LLM backend to transform user text into simulation parameters
async function callLLMBackend(userText) {
  // Example shape of the expected response:
  // {
  //   arrivalRate: 120,           // parts per hour
  //   numMachines: 2,
  //   bufferSizeMin: 5,
  //   bufferSizeMax: 30,
  //   shiftDurationHours: 8,
  //   targetUtilization: 0.85
  // }
  throw new Error("Not implemented: integrate with LLM backend.");
}

// TODO: Call Simio backend to run actual simulation with given params
async function callSimioBackend(simParams) {
  // Expected to POST simParams to a .NET service that wraps Simio’s API
  // and returns JSON results that match the 'results' object used by renderResults().
  // See Simio API helpers and engine usage for reference. [web:4][web:8][web:9][web:20]
  throw new Error("Not implemented: integrate with Simio backend.");
}
```
Document near those functions (in comments) that:

A backend will likely be a small ASP.NET or similar service running on Windows with Simio installed, exposing an HTTP API.​

The front‑end is designed to remain unchanged once the endpoints exist; only the internals of runSimioSimulation would switch from mock data to real HTTP calls.

Implementation details
Files

Prefer three separate files:

index.html

style.css

app.js

Wire them normally with <link> and <script> tags.

index.html

Semantic structure:

<header> for title and subtitle.

<main> with:

Input section.

Status / loader section.

Results dashboard section.

Optional previous scenarios section.

Use data-* attributes or IDs to access elements from JS.

style.css

Define a CSS reset or minimal normalization.

Use CSS variables for the color palette (e.g. --bg, --accent, --card-bg).

Add responsive breakpoints for mobile and desktop.

Implement the loading animation and small transitions here.

app.js

On DOM load:

Attach event listeners to the form/button.

Initialize any dummy history state.

Handle:

Submit → disable input → show status → call mock parsing + mock simulation → show results → re‑enable input.

Updating and rendering a small “scenario history”.

Vercel readiness

Ensure the app works fully by just opening index.html in a browser.

No absolute paths, no server‑side code.

Mention in a brief code comment at the top of index.html that deployment to Vercel only requires:

Creating a new project and importing this repo.​

Deliverables
Full index.html, style.css, and app.js code, ready to run.

Use clear comments (// TODO: and explanatory comments) around:

Where LLM integration will go.

Where Simio API integration will go.

Keep the code clean, readable, and well‑structured so that it is easy to extend with real backends later.
