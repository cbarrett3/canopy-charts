# Canopy Charts LLM Guide

This guide is designed to help you effectively use Large Language Models (LLMs) like Claude, ChatGPT, or GitHub Copilot to customize and extend Canopy Charts for your specific visualization needs.

## How to Use This Guide

- **For developers**: Use the prompts and patterns in this guide to effectively communicate with LLMs about your visualization needs
- **For LLMs**: This document contains information about the architecture, customization patterns, and best practices for extending Canopy Charts

## Repository Structure

Canopy Charts is organized to be easily understood and extended:

```
packages/
  charts/                # Core visualization library
    src/
      components/        # Chart components (Bar, Line, etc.)
        bar-chart/       # Bar chart implementation
        line-chart/      # Line chart implementation
      hooks/             # React hooks for chart functionality
      types/             # TypeScript type definitions
      utils/             # Utility functions for data processing and rendering

examples/                # Example implementations
  basic/                 # Simple chart examples
  advanced/              # Complex visualization examples
  customization/         # Examples of different customization approaches

guides/                  # Detailed guides on specific topics
  customization/         # How to customize different aspects of charts
  data-handling/         # Working with different data formats
  animations/            # Creating custom animations
  interactions/          # Adding interactive elements
```

## Effective Prompts for LLMs

When working with LLMs to customize Canopy Charts, these prompt templates can help you get the most useful responses:

### 1. Creating a Basic Chart

```
I want to create a [CHART TYPE] using Canopy Charts to visualize [DESCRIBE YOUR DATA].
My data looks like this:
[PROVIDE SAMPLE DATA]

Can you help me set up the basic chart with appropriate configuration?
```

### 2. Customizing Visual Appearance

```
I have a basic [CHART TYPE] set up with Canopy Charts. I want to customize its appearance to:
- [CUSTOMIZATION GOAL 1]
- [CUSTOMIZATION GOAL 2]
- [CUSTOMIZATION GOAL 3]

Here's my current code:
[PASTE YOUR CURRENT CODE]

How can I achieve these customizations?
```

### 3. Adding Interactions

```
I want to add the following interactions to my Canopy Chart:
- [INTERACTION 1]
- [INTERACTION 2]

Here's my current implementation:
[PASTE YOUR CURRENT CODE]

How should I implement these interactions?
```

### 4. Data Transformations

```
I need to transform my data before visualizing it with Canopy Charts.
My raw data looks like this:
[PASTE SAMPLE RAW DATA]

I want to transform it to:
[DESCRIBE DESIRED TRANSFORMATION]

Can you show me how to implement this transformation?
```

### 5. Custom Extensions

```
I want to extend Canopy Charts to create a custom visualization that:
[DESCRIBE CUSTOM VISUALIZATION]

I'm starting with the [CHART TYPE] component. How can I extend it to achieve my goals?
```

## Customization Patterns

Canopy Charts supports several patterns for customization, from simple to advanced:

### 1. Configuration Props

The simplest way to customize charts is through their configuration props:

```tsx
<BarChart
	data={myData}
	vibe='modern'
	axisConfig={{
		x: { tickFormat: (d) => format(d, 'MMM yyyy'), gridLines: true },
		y: { domain: [0, 'auto'], tickCount: 5 },
	}}
	styleOverrides={{
		bar: { cornerRadius: 4, fillOpacity: 0.8 },
	}}
/>
```

### 2. Render Props

For custom rendering of specific elements:

```tsx
<LineChart
	data={timeSeriesData}
	renderTooltip={(point) => (
		<CustomTooltip
			value={point.value}
			date={point.date}
			additionalData={externalData[point.id]}
		/>
	)}
/>
```

### 3. D3 Instance Access

For unlimited customization with direct D3 access:

```tsx
<BarChart
	data={sampleData}
	onD3Instance={(d3Instance, svg, data) => {
		// Unlimited customization with direct D3 access
		d3Instance
			.select(svg)
			.selectAll('.bar')
			.style('stroke-width', (d, i) => i * 0.5)
			.attr('filter', 'url(#glow)');
	}}
/>
```

### 4. Component Composition

For building complex visualizations from primitives:

```tsx
<ChartContainer
	dimensions={{
		width: 800,
		height: 400,
		margin: { top: 20, right: 30, bottom: 40, left: 50 },
	}}
>
	<XAxis scale='time' />
	<YAxis scale='linear' />
	<LineSeries data={dataset1} />
	<LineSeries data={dataset2} />
	<Tooltip />
	<Legend position='bottom' />
</ChartContainer>
```

### 5. Custom Chart Creation

For creating entirely new chart types:

```tsx
// See the examples/customization/custom-chart-type directory for a complete example
```

## Common Extension Points

These are the most common ways to extend Canopy Charts:

1. **Custom Tooltips**: Create rich, interactive tooltips with additional data
2. **Custom Animations**: Define entrance, update, and exit animations
3. **Interaction Handlers**: Add click, hover, and drag interactions
4. **Data Transformations**: Process and transform data before visualization
5. **Custom Styling**: Apply unique visual styles to chart elements
6. **Composite Visualizations**: Combine multiple chart types into a single visualization

## Troubleshooting with LLMs

When you encounter issues, provide the following information to your LLM:

1. The specific error message (if any)
2. Your current code
3. What you expected to happen
4. What actually happened
5. Any relevant data samples

Example prompt:

```
I'm having an issue with my Canopy Chart. Here's my code:
[PASTE YOUR CODE]

The error I'm seeing is:
[PASTE ERROR MESSAGE]

I expected the chart to [EXPECTED BEHAVIOR], but instead it [ACTUAL BEHAVIOR].
Here's a sample of my data:
[PASTE DATA SAMPLE]

Can you help me identify and fix the issue?
```

## Next Steps

- Explore the `examples/` directory for inspiration
- Check out the interactive playground at [canopy-charts.vercel.app](https://canopy-charts.vercel.app)
- Use the CLI to scaffold a new project: `npx create-canopy-chart@latest my-visualization`

---

This guide is continuously improved. If you have suggestions for making it more helpful, please open an issue or pull request!
