# Canopy Charts LLM Guide

This guide helps you use Large Language Models (LLMs) to customize and extend Canopy Charts for your specific visualization needs.

## Code Ownership Model

Canopy Charts uses a **code-ownership model** rather than a traditional package distribution approach:

- You **own and modify** the code directly, not just consume an API
- The codebase is designed to be **forked and extended**
- There are **no black boxes** - everything can be customized
- The structure is **optimized for LLM comprehension** and extension

## Repository Structure

```
components/        # Core visualization components
  bar-chart/       # Bar chart implementation
  line-chart/      # Line chart implementation
hooks/             # React hooks for chart functionality
types/             # TypeScript type definitions
utils/             # Utility functions for data processing

examples/          # Example implementations
  basic/           # Simple chart examples
  advanced/        # Complex visualization examples
  customization/   # Extension examples

guides/            # Detailed guides on specific topics
```

## Effective Prompts for LLMs

### Creating a Basic Chart

```
I want to create a [CHART TYPE] using Canopy Charts to visualize [DESCRIBE DATA].
My data looks like this:
[PROVIDE SAMPLE DATA]

How should I implement this using the code-ownership model?
```

### Customizing a Chart

```
I've forked the Canopy Charts repository and want to customize the [COMPONENT] to:
- [CUSTOMIZATION GOAL 1]
- [CUSTOMIZATION GOAL 2]

Here's my current code:
[PASTE CODE]

How should I modify the code to achieve these customizations?
```

### Creating a Custom Chart Type

```
I want to create a custom chart type that [DESCRIBE VISUALIZATION].
I'm starting with the Canopy Charts codebase.

What files should I create/modify to implement this custom chart?
```

## Customization Patterns

### 1. Configuration Props

```tsx
<BarChart
	data={myData}
	vibe='modern'
	axisConfig={{
		x: { tickFormat: (d) => format(d, 'MMM yyyy'), gridLines: true },
		y: { domain: [0, 'auto'], tickCount: 5 },
	}}
/>
```

### 2. Direct Code Modification

Since you own the code, you can directly modify the component implementations:

```tsx
// In components/bar-chart/component.tsx
// Modify the rendering logic to implement custom behavior
```

### 3. D3 Instance Access

```tsx
<BarChart
	data={sampleData}
	onD3Instance={(d3Instance, svg, data) => {
		// Add custom D3 code here
		d3Instance
			.select(svg)
			.selectAll('.bar')
			.style('stroke-width', (d, i) => i * 0.5);
	}}
/>
```

### 4. Component Composition

```tsx
<ChartContainer dimensions={{ width: 800, height: 400 }}>
	<XAxis scale='time' />
	<YAxis scale='linear' />
	<LineSeries data={dataset1} />
	<Tooltip />
</ChartContainer>
```

## Common Extension Points

1. **Visual Styling** - Modify theme files or style overrides
2. **Data Transformations** - Extend data processing utilities
3. **Interactions** - Add custom event handlers
4. **Animations** - Modify transition configurations
5. **Custom Elements** - Add new visual elements to charts

## Next Steps

- Explore the [examples directory](./examples/) for implementation ideas
- Check out the [customization guides](./guides/customization/) for detailed techniques
- Use the [interactive playground](https://canopy-charts.vercel.app) to experiment

---

This guide is continuously improved. If you have suggestions, please open an issue or pull request!
