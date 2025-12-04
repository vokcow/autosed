# Integration Guide

This guide explains how to integrate the Buffer Optimizer Playground with real backend services.

## 🧠 LLM Integration (Natural Language Processing)

### Current State

The app currently uses a simple text parser in `app/lib/simulation.ts`:

```typescript
export function parseUserDescriptionToSimulationParams(userText: string): SimulationParams {
  // Simple mock parsing - looks for numbers in text
  // ...
}
```

### Integration Steps

#### Option 1: OpenAI GPT-4

1. **Get API Key**: Sign up at [platform.openai.com](https://platform.openai.com)

2. **Create API Service** (Next.js API route or separate backend):

```typescript
// Example: app/api/parse-description/route.ts
import OpenAI from 'openai';
import { SimulationParams } from '@/app/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { userText } = await request.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are an expert in manufacturing simulation. Extract simulation parameters from user descriptions.
        
        Return JSON with:
        - arrivalRate: parts per hour (number)
        - numMachines: count of machines (number)
        - bufferSizeMin: minimum buffer to test (number)
        - bufferSizeMax: maximum buffer to test (number)
        - shiftDurationHours: shift length in hours (number)
        - targetUtilization: target utilization as decimal (number, e.g. 0.85 for 85%)
        
        Example:
        Input: "2 machines, arrivals every 30 seconds, 8 hour shift, target 85% utilization"
        Output: {"arrivalRate": 120, "numMachines": 2, "bufferSizeMin": 5, "bufferSizeMax": 30, "shiftDurationHours": 8, "targetUtilization": 0.85}`
      },
      {
        role: "user",
        content: userText
      }
    ],
    response_format: { type: "json_object" }
  });

  const params = JSON.parse(completion.choices[0].message.content || '{}');
  return Response.json(params);
}
```

3. **Update Frontend** (`app/lib/simulation.ts`):

```typescript
export async function parseUserDescriptionToSimulationParams(userText: string): SimulationParams {
  const response = await fetch('/api/parse-description', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userText })
  });
  
  return await response.json();
}
```

#### Option 2: Claude (Anthropic)

Similar approach using the Anthropic API:

```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  const { userText } = await request.json();

  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Extract simulation parameters from this manufacturing scenario description and return as JSON:

${userText}

Required fields:
- arrivalRate (parts per hour)
- numMachines
- bufferSizeMin
- bufferSizeMax  
- shiftDurationHours
- targetUtilization (0-1)`
      }
    ]
  });

  // Parse JSON from Claude's response
  const params = JSON.parse(message.content[0].text);
  return Response.json(params);
}
```

## 🏭 Simio Integration

### Architecture

```
Frontend (Next.js)
      ↓ HTTP POST
Simio Backend API (ASP.NET Core on Windows)
      ↓ .NET API
Simio Desktop (SimioAPI.dll)
```

### Backend Setup

#### 1. Create ASP.NET Core Web API

Create a new ASP.NET Core project on a Windows machine with Simio installed:

```bash
dotnet new webapi -n SimioBackend
cd SimioBackend
```

#### 2. Reference Simio DLLs

Add references to Simio assemblies (typically in `C:\Program Files\Simio\`):

```xml
<!-- SimioBackend.csproj -->
<ItemGroup>
  <Reference Include="SimioAPI">
    <HintPath>C:\Program Files\Simio\SimioAPI.dll</HintPath>
  </Reference>
  <Reference Include="SimioAPI.Extensions">
    <HintPath>C:\Program Files\Simio\SimioAPI.Extensions.dll</HintPath>
  </Reference>
</ItemGroup>
```

#### 3. Create Simulation Controller

```csharp
// Controllers/SimulationController.cs
using Microsoft.AspNetCore.Mvc;
using SimioAPI;
using SimioAPI.Extensions;

namespace SimioBackend.Controllers
{
    [ApiController]
    [Route("api/simio")]
    public class SimulationController : ControllerBase
    {
        private readonly ILogger<SimulationController> _logger;
        private readonly string _modelPath = @"C:\SimioModels\BufferOptimization.spfx";

        public SimulationController(ILogger<SimulationController> logger)
        {
            _logger = logger;
        }

        [HttpPost("simulate")]
        public async Task<ActionResult<SimulationResults>> RunSimulation(
            [FromBody] SimulationParams parameters)
        {
            try
            {
                // Initialize Simio
                SimioProjectFactory.SetDesktopInstallFolder(@"C:\Program Files\Simio\");
                
                // Load model
                var project = SimioProjectFactory.LoadProject(_modelPath, out var warnings);
                var model = project.Models[0]; // Assuming first model

                // Get experiment
                var experiment = project.Experiments["BufferOptimizationExperiment"];
                
                // Configure experiment parameters
                experiment.Properties["ArrivalRate"].Value = parameters.ArrivalRate;
                experiment.Properties["NumMachines"].Value = parameters.NumMachines;
                experiment.Properties["ShiftDuration"].Value = parameters.ShiftDurationHours;

                // Create scenarios for different buffer sizes
                var results = new List<BufferResult>();
                
                for (int bufferSize = parameters.BufferSizeMin; 
                     bufferSize <= parameters.BufferSizeMax; 
                     bufferSize += 5)
                {
                    // Set buffer size
                    model.Properties["BufferCapacity"].Value = bufferSize;
                    
                    // Run scenario
                    var scenario = experiment.Scenarios[0];
                    scenario.RunAsync();
                    
                    while (scenario.State == ScenarioState.Running)
                    {
                        await Task.Delay(100);
                    }
                    
                    // Extract results
                    var throughput = (double)scenario.Responses["Throughput"].Value;
                    var utilization = (double)scenario.Responses["Utilization"].Value;
                    
                    results.Add(new BufferResult
                    {
                        BufferSize = bufferSize,
                        Throughput = Math.Round(throughput),
                        Utilization = Math.Round(utilization, 2)
                    });
                }

                // Find optimal buffer
                var optimal = results.OrderByDescending(r => r.Throughput).First();

                // Extract KPIs from optimal scenario
                var kpis = new KPIs
                {
                    AverageWIP = (double)model.Elements["Buffer"].StateStatistics["NumberInSystem"].Average,
                    AverageWaitingTime = (double)model.Elements["Buffer"].StateStatistics["TimeInSystem"].Average,
                    BlockingTime = (double)model.Elements["Machine1"].StateStatistics["BlockedTime"].Average,
                    StarvationTime = (double)model.Elements["Machine2"].StateStatistics["StarvedTime"].Average
                };

                var response = new SimulationResults
                {
                    OptimalBufferSize = optimal.BufferSize,
                    EstimatedThroughput = optimal.Throughput,
                    AverageUtilization = optimal.Utilization,
                    BufferComparison = results,
                    KPIs = kpis,
                    Explanation = GenerateExplanation(optimal, parameters)
                };

                // Cleanup
                project.Dispose();

                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error running simulation");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        private string GenerateExplanation(BufferResult optimal, SimulationParams parameters)
        {
            return $"With a buffer size of {optimal.BufferSize} units, " +
                   $"the system balances machine utilization and WIP effectively. " +
                   $"Using a smaller buffer ({parameters.BufferSizeMin}) would increase blocking, " +
                   $"while larger buffers add WIP with diminishing returns. " +
                   $"The current configuration maintains {optimal.Utilization * 100:F0}% utilization with optimal flow.";
        }
    }

    // DTOs
    public class SimulationParams
    {
        public double ArrivalRate { get; set; }
        public int NumMachines { get; set; }
        public int BufferSizeMin { get; set; }
        public int BufferSizeMax { get; set; }
        public double ShiftDurationHours { get; set; }
        public double TargetUtilization { get; set; }
    }

    public class SimulationResults
    {
        public int OptimalBufferSize { get; set; }
        public int EstimatedThroughput { get; set; }
        public double AverageUtilization { get; set; }
        public List<BufferResult> BufferComparison { get; set; }
        public KPIs KPIs { get; set; }
        public string Explanation { get; set; }
    }

    public class BufferResult
    {
        public int BufferSize { get; set; }
        public int Throughput { get; set; }
        public double Utilization { get; set; }
    }

    public class KPIs
    {
        public double AverageWIP { get; set; }
        public double AverageWaitingTime { get; set; }
        public double BlockingTime { get; set; }
        public double StarvationTime { get; set; }
    }
}
```

#### 4. Configure CORS

```csharp
// Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("https://your-app.vercel.app", "http://localhost:3000")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

app.UseCors("AllowFrontend");
```

#### 5. Deploy Backend

Deploy to:
- **Azure Windows VM** (Recommended)
- **AWS EC2 Windows**
- **On-premises Windows Server**

### Frontend Integration

Update `app/lib/simulation.ts`:

```typescript
export async function runSimioSimulation(params: SimulationParams): Promise<SimulationResults> {
  const response = await fetch(process.env.NEXT_PUBLIC_SIMIO_API_URL + '/simulate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SIMIO_API_KEY}`
    },
    body: JSON.stringify(params)
  });

  if (!response.ok) {
    throw new Error(`Simulation failed: ${response.statusText}`);
  }

  return await response.json();
}
```

## 🧪 Testing Integration

### 1. Test LLM Integration

```bash
curl -X POST http://localhost:3000/api/parse-description \
  -H "Content-Type: application/json" \
  -d '{"userText": "2 machines, arrivals every 30 seconds, 8 hour shift"}'
```

### 2. Test Simio Backend

```bash
curl -X POST http://localhost:5000/api/simio/simulate \
  -H "Content-Type: application/json" \
  -d '{
    "arrivalRate": 120,
    "numMachines": 2,
    "bufferSizeMin": 5,
    "bufferSizeMax": 30,
    "shiftDurationHours": 8,
    "targetUtilization": 0.85
  }'
```

### 3. Test Full Flow

Use the frontend locally and verify:
1. Natural language input is parsed correctly
2. Simulation runs without errors
3. Results are displayed correctly

## 📊 Monitoring & Logging

### Frontend

Add error tracking with Sentry:

```typescript
// app/lib/simulation.ts
import * as Sentry from "@sentry/nextjs";

try {
  const results = await runSimioSimulation(params);
  return results;
} catch (error) {
  Sentry.captureException(error);
  throw error;
}
```

### Backend

Add logging in ASP.NET:

```csharp
_logger.LogInformation($"Starting simulation with parameters: {JsonSerializer.Serialize(parameters)}");
_logger.LogInformation($"Simulation completed. Optimal buffer: {optimal.BufferSize}");
```

## 🔒 Security Considerations

1. **API Authentication**: Use API keys or OAuth
2. **Rate Limiting**: Prevent abuse
3. **Input Validation**: Sanitize all user inputs
4. **CORS**: Restrict to specific origins
5. **HTTPS**: Use SSL certificates
6. **Secrets Management**: Use environment variables

## 📚 Additional Resources

- [Simio API Documentation](https://www.simio.com/resources/api-documentation.php)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [ASP.NET Core Web API](https://learn.microsoft.com/en-us/aspnet/core/web-api/)

