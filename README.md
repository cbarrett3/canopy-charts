# Canopy Charts

<div align="center">
  <svg viewBox="0 0 500 500" width="150" height="150">
    <defs>
      <linearGradient id="themeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#3b82f6" />
        <stop offset="50%" stop-color="#60a5fa" />
        <stop offset="100%" stop-color="#3b82f6" />
      </linearGradient>
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#3b82f6" />
      </filter>
    </defs>
    
    <!-- Logo Group - centered -->
    <g transform="translate(250, 250)">
      <!-- Main path -->
      <path
        d="M -150 0 A 100 100 0 1 1 100 0 A 50 50 0 1 1 -100 0"
        stroke="url(#themeGradient)"
        stroke-width="32"
        stroke-linecap="round"
        fill="none"
        filter="url(#shadow)"
      />
    </g>
  </svg>
  
  <p><strong>Note:</strong> The Canopy Charts logo is a React component located at <code>app/_components/ui/logo.tsx</code></p>
  <p>To use the animated logo in your application:</p>
  <pre><code>import { Logo } from '@/app/_components/ui/logo';

export default function MyComponent() {
return (
&lt;Logo className="w-32 h-32" /&gt;
);
}</code></pre>

</div>

```
Unlimited data visualization for the AI-native era
React • D3 • TypeScript • Agent-Ready • v0.1.0
```

**The foundation for infinitely customizable, AI-extensible data visualization**

---

## Design philosophy

Canopy Charts provides the structure for building beautiful visualizations without imposing limitations. It's designed for:

- **AI-native development** — Structured for easy extension via LLMs and agents
- **Unlimited customization** — Full access to the underlying D3 instance
- **Future-proof architecture** — Scales from simple charts to complex, interactive data applications
- **Zero constraints** — Unlike other libraries, nothing is off-limits

## Quick implementation

```tsx
import { BarChart } from '@canopy/charts';

// Simple implementation
export default () => (
	<BarChart
		data={[
			{ label: 'Q1', value: 12000 },
			{ label: 'Q2', value: 8000 },
			{ label: 'Q3', value: 15000 },
			{ label: 'Q4', value: 9000 },
		]}
		vibe='evergreen'
	/>
);

// With direct D3 access for unlimited customization
export const CustomizedChart = () => (
	<BarChart
		data={sampleData}
		vibe='modern'
		onD3Instance={(d3Instance, svg, data) => {
			// Unlimited customization with direct D3 access
			d3Instance
				.select(svg)
				.selectAll('.bar')
				.style('stroke-width', (d, i) => i * 0.5)
				.attr('filter', 'url(#glow)');
		}}
	/>
);
```

## Installation

```
npm install @canopy/charts
```

## Agent-ready architecture

Canopy Charts is designed from the ground up to work seamlessly with AI agents and LLMs:

| Feature                      | Description                                                                     |
| :--------------------------- | :------------------------------------------------------------------------------ |
| **Semantic props**           | Intuitive prop naming that's easily understood by AI agents                     |
| **Consistent patterns**      | Uniform API design across all chart types for predictable extension             |
| **Explicit escape hatches**  | Clear pathways for AI to extend functionality beyond defaults                   |
| **Structured customization** | Organized override system for targeted modifications                            |
| **Self-documenting**         | TypeScript interfaces designed for optimal code completion and AI comprehension |

## Core visualization types

Each visualization provides both high-level abstractions and unlimited low-level control:

- **Line** — Time series with support for unlimited datasets and custom interpolations
- **Bar** — Categorical data with extensible transitions and interactions
- **Donut** — Proportional visualization with customizable segmentation and animations _(coming soon)_
- **Stacked Bar** — Multi-dimensional categorical data with flexible stacking strategies _(coming soon)_
- **Stream** — Flowing time series with dynamic area generation and custom path definitions _(coming soon)_
- **TreeMap** — Hierarchical visualization with programmable nesting and sizing algorithms _(coming soon)_

## Unlimited customization

Unlike other libraries that lock you into specific patterns, Canopy Charts provides multiple layers of customization:

```tsx
<LineChart
	// 1. High-level configuration
	data={timeSeriesData}
	vibe='bamboo'
	// 2. Mid-level customization
	axisConfig={{
		x: { tickFormat: (d) => format(d, 'MMM yyyy'), gridLines: true },
		y: { domain: [0, 'auto'], tickCount: 5 },
	}}
	// 3. Direct style overrides
	styleOverrides={{
		line: { strokeWidth: 3, strokeLinecap: 'round' },
		point: { radius: 4, fillOpacity: 0.8 },
	}}
	// 4. Complete D3 access
	onD3Instance={(d3, svg, data) => {
		// Unlimited customization with direct D3 access
		// Add custom interactions, animations, or visual elements
	}}
	// 5. Custom rendering logic
	renderTooltip={(point) => (
		<CustomTooltip
			value={point.value}
			date={point.date}
			additionalData={externalData[point.id]}
		/>
	)}
/>
```

## AI extension examples

Canopy Charts is designed to be extended by AI. Here are examples of prompts that work well:

```
// Example LLM prompt for extending a chart
Create a LineChart with Canopy Charts that shows stock price data with
a moving average overlay, custom tooltips showing volume data, and
highlighting regions where the price is above the moving average.
```

```
// Example agent task
Analyze this dataset and create a Canopy Charts visualization that best
represents the key trends, with appropriate annotations highlighting
significant data points.
```

## Performance at scale

Built for modern data-intensive applications:

- **Virtualized rendering** for datasets with thousands of points
- **Incremental updates** to avoid full re-renders
- **WebGL acceleration** for complex visualizations
- **Worker thread support** for computation-heavy transformations
- **Optimized bundle size** with tree-shakeable imports

## Project Structure

The Canopy Charts library is organized as a monorepo with the following structure:

```
packages/
  charts/           # Core visualization library
    src/
      components/   # Chart components (Bar, Line, etc.)
      hooks/        # Shared React hooks
      types/        # TypeScript type definitions
      utils/        # Utility functions
```

## Development

```bash
git clone https://github.com/cbarrett3/canopy-charts.git
cd canopy-charts
npm install
npm run dev
```

See [CLI documentation](cli/README.md) for additional development options.

---

<div align="center">
  <a href="https://github.com/cbarrett3/canopy-charts/issues">Issues</a> •
  <a href="https://github.com/cbarrett3/canopy-charts/blob/main/LICENSE">License</a>
</div>
