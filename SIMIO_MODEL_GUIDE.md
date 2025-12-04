# Simio Model Setup Guide

This guide helps you create the Simio model that the backend will use.

## 📋 Model Requirements

Your Simio model should be configured to accept parameters and output the necessary metrics.

## 🏗️ Basic Model Structure

### Objects Needed

1. **Source** (for part arrivals)
2. **Server** objects (machines)
3. **Buffer** (between machines)
4. **Sink** (completed parts)

### Example Two-Machine Line

```
[Source] → [Machine1] → [Buffer] → [Machine2] → [Sink]
```

## ⚙️ Model Properties

Define these properties so the API can set them:

### Input Properties

| Property Name | Type | Description | Example |
|--------------|------|-------------|---------|
| `ArrivalRate` | Expression | Parts per hour | 120 |
| `BufferCapacity` | Integer | Max parts in buffer | 10 |
| `Machine1ProcessTime` | Expression | Minutes per part | 0.45 |
| `Machine2ProcessTime` | Expression | Minutes per part | 0.48 |
| `ShiftDuration` | Expression | Hours | 8 |

### How to Create Properties

1. Select the **Model** in the Navigation window
2. Go to **Definitions** tab → **Properties**
3. Click **Standard Property**
4. Name it (e.g., `BufferCapacity`)
5. Set **Default Value**
6. Click **OK**

## 📊 Response Variables

Define these to capture simulation results:

### Key Metrics to Track

| Response Name | Expression | Description |
|--------------|------------|-------------|
| `Throughput` | `Sink.OutputBuffer.NumberExited / (RunSetup.ReplicationLength / 1.0[Hours])` | Parts per hour |
| `Utilization` | `(Machine1.Capacity.Allocated.Average + Machine2.Capacity.Allocated.Average) / 2` | Average utilization |
| `AverageWIP` | `Buffer.Buffer.Contents.Average` | Avg parts in buffer |
| `AverageWaitTime` | `Buffer.Buffer.Contents.TimeInSystem.Average` | Avg wait time |
| `Machine1BlockedTime` | `Machine1.Capacity.ScheduledUtilization.Blocked / Machine1.Capacity.ScheduledUtilization.Scheduled` | % time blocked |
| `Machine2StarvedTime` | `Machine2.Capacity.ScheduledUtilization.Starved / Machine2.Capacity.ScheduledUtilization.Scheduled` | % time starved |

### How to Create Responses

1. Select **Model** → **Definitions** → **Response**
2. Click **Add**
3. Name it (e.g., `Throughput`)
4. Set **Expression** (see table above)
5. Click **OK**

## 🧪 Create Experiment

### Setup Experiment

1. In **Project Home**, click **New Experiment**
2. Name it `BufferOptimizationExperiment`
3. Select your model

### Configure Controls

Add these controls so the API can modify them:

| Control Name | Type | Property Reference | Range |
|-------------|------|-------------------|-------|
| `ArrivalRateControl` | Expression | `Model.ArrivalRate` | 60-200 |
| `BufferSizeControl` | Integer | `Model.BufferCapacity` | 5-50 |
| `NumMachinesControl` | Integer | `Model.NumMachines` | 2-10 |

### Configure Responses

Add all response variables from your model:

1. In experiment, go to **Responses**
2. Click **Add Response**
3. Select each response variable you created

### Scenarios

Create at least one scenario:

1. **Baseline Scenario**
   - ArrivalRate: 120
   - BufferCapacity: 10
   - ShiftDuration: 8

## 🔧 Model Configuration

### Source Settings

**Source Object** (part arrivals):
- **Interarrival Time**: `Math.Max(0, Random.Exponential(60.0 / Model.ArrivalRate))[Minutes]`
- **Entity Type**: `ModelEntity`
- **Entities Per Arrival**: `1`

### Machine Settings

**Server Objects** (Machine1, Machine2):
- **Processing Time**: `Model.Machine1ProcessTime[Minutes]`
- **Initial Capacity**: `1`
- **Ranking Rule**: `FirstInFirstOut`

### Buffer Settings

**Server Object** (configured as buffer):
- **Initial Capacity**: `Model.BufferCapacity`
- **Processing Time**: `0` (no processing, just storage)
- OR use **OutputBuffer** with `MaximumContents`: `Model.BufferCapacity`

### Sink Settings

**Sink Object**:
- Just place at end - default settings are fine

## 📁 Save Model

1. **Save As**: `BufferOptimization.spfx`
2. **Location**: `C:\SimioModels\BufferOptimization.spfx` (or your preferred path)
3. Note the path - you'll need it for the backend configuration

## 🧪 Test in Simio

Before integrating with the API:

### Manual Test

1. Open the model
2. Go to the **Experiment**
3. Run a few scenarios manually
4. Verify responses are calculated correctly
5. Check that all properties work as expected

### Verify Responses

In the experiment results, you should see:
- ✅ Throughput (positive number, makes sense)
- ✅ Utilization (0-1 range)
- ✅ WIP (positive, reasonable for buffer size)
- ✅ Wait times (positive)
- ✅ Blocked/starved percentages (0-1 range)

## 🔌 API Integration Points

The backend will:

```csharp
// Load your model
var project = SimioProjectFactory.LoadProject(
    @"C:\SimioModels\BufferOptimization.spfx", 
    out var warnings
);

// Access the model
var model = project.Models[0];

// Access the experiment
var experiment = project.Experiments["BufferOptimizationExperiment"];

// Set properties
experiment.Properties["ArrivalRate"].Value = 120;
model.Properties["BufferCapacity"].Value = 15;

// Run scenario
var scenario = experiment.Scenarios[0];
scenario.RunAsync();

// Wait for completion
while (scenario.State == ScenarioState.Running)
{
    await Task.Delay(100);
}

// Get results
var throughput = (double)scenario.Responses["Throughput"].Value;
var utilization = (double)scenario.Responses["Utilization"].Value;
```

## 📚 Advanced Features

### Multiple Machine Types

Define arrays or lists:
- `Machine1ProcessTime`, `Machine2ProcessTime`, etc.
- Or use **Object Lists** and **Process Logic**

### Dynamic Arrivals

Create a **RateTable** for time-varying arrivals:
- Time-of-day variations
- Shift changes
- Demand patterns

### Failures and Maintenance

Add **Failures** to machines:
- **Uptime Distribution**: `Random.Exponential(120)[Minutes]`
- **Time to Repair**: `Random.Triangular(5, 10, 20)[Minutes]`

### Custom Add-On Processes

For complex logic:
- **Blocking/Starving** custom tracking
- **Quality checks**
- **Batch processing**

## 🐛 Troubleshooting

### Model won't load in API

- Check file path is correct
- Ensure Simio is installed on the server
- Verify .spfx file isn't corrupted
- Check file permissions

### Properties not updating

- Ensure property names match exactly (case-sensitive)
- Check property is marked as **Changeable**
- Verify it's a **Model** property, not a hardcoded value

### Responses return NaN or 0

- Check expression syntax
- Verify objects exist with correct names
- Ensure simulation runs long enough to collect data
- Check **Warm-up Period** settings

### Simulation runs too slow

- Reduce **ReplicationLength**
- Simplify model logic
- Remove unnecessary animations/graphics
- Use **Express Mode**

## ✅ Checklist

Before integrating:

- [ ] Model has all required properties
- [ ] All responses are defined and working
- [ ] Experiment is created and configured
- [ ] Model saved as `.spfx` file
- [ ] File path is accessible from backend server
- [ ] Manually tested multiple scenarios
- [ ] Results make sense and are consistent
- [ ] Property ranges are validated

## 📖 Resources

- [Simio API Documentation](https://www.simio.com/resources/api-documentation.php)
- [Simio User Forums](https://www.simio.com/forums/)
- [Simio Academy](https://www.simio.com/academy/)
- [API Examples](https://www.simio.com/resources/white-papers/api-examples.php)

## 💡 Tips

1. **Start Simple**: Test with 2 machines first, then expand
2. **Naming Conventions**: Use clear, consistent names
3. **Document**: Add descriptions to properties and responses
4. **Version Control**: Save model versions as you develop
5. **Testing**: Test edge cases (very small/large buffers)

