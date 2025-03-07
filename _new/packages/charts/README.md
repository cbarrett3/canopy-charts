# Canopy Charts

A world-class, extensible charting library built with D3.js and React. Designed for modern web applications with a focus on performance, accessibility, and developer experience.

## Features

- 📊 Multiple chart types (Bar, Line, with more coming soon)
- 🎨 Consistent design language across all chart types
- 📱 Responsive and mobile-friendly with touch support
- 🔍 Interactive zoom and pan capabilities
- 🌓 Light and dark mode support
- 🎭 Multiple animation styles ("vibes")
- 🧩 Highly customizable through a consistent configuration API
- ♿ Accessible by default with proper ARIA attributes
- 🚀 Optimized for performance with efficient rendering

## Installation

```bash
npm install @canopy/charts
# or
yarn add @canopy/charts
```

## Quick Start

```tsx
import { BarChart, LineChart } from '@canopy/charts';

// Bar Chart Example
const MyBarChart = () => (
	<BarChart
		data={[
			{ label: 'A', value: 30 },
			{ label: 'B', value: 45 },
			{ label: 'C', value: 25 },
			{ label: 'D', value: 60 },
			{ label: 'E', value: 35 },
		]}
		themeColor='#3b82f6'
		vibe='coral'
		config={{
			chartTitle: 'Monthly Distribution',
			showLegend: true,
			enableZoom: true,
		}}
	/>
);

// Line Chart Example
const MyLineChart = () => (
	<LineChart
		data={[
			{ name: 'Jan', value: 30, secondary: 20 },
			{ name: 'Feb', value: 45, secondary: 30 },
			{ name: 'Mar', value: 25, secondary: 40 },
			{ name: 'Apr', value: 60, secondary: 35 },
			{ name: 'May', value: 35, secondary: 50 },
			{ name: 'Jun', value: 50, secondary: 45 },
		]}
		datasets={['value', 'secondary']}
		themeColor='#10b981'
		vibe='rainforest'
		config={{
			chartTitle: 'Performance Metrics',
			showPoints: true,
			lineCurve: 'cardinal',
			enableZoom: true,
		}}
	/>
);
```

## Chart Types

### Bar Chart

The `BarChart` component displays categorical data with rectangular bars.

```tsx
<BarChart
	data={[
		{ label: 'A', value: 30 },
		{ label: 'B', value: 45 },
		{ label: 'C', value: 25 },
	]}
	themeColor='#3b82f6'
	config={{
		chartTitle: 'Sample Distribution',
		showLegend: true,
	}}
/>
```

### Line Chart

The `LineChart` component displays data as a series of points connected by straight line segments.

```tsx
<LineChart
	data={[
		{ name: 'Jan', value: 30, secondary: 20 },
		{ name: 'Feb', value: 45, secondary: 30 },
		{ name: 'Mar', value: 25, secondary: 40 },
	]}
	datasets={['value', 'secondary']}
	themeColor='#10b981'
	config={{
		chartTitle: 'Performance Metrics',
		showPoints: true,
	}}
/>
```

## Configuration

All chart types share a consistent configuration API through the `config` prop. Here are the common configuration options:

### Common Options

| Option              | Type                | Default     | Description                       |
| ------------------- | ------------------- | ----------- | --------------------------------- |
| `showXAxis`         | boolean             | `true`      | Show/hide the X axis              |
| `showYAxis`         | boolean             | `true`      | Show/hide the Y axis              |
| `showXGrid`         | boolean             | `true`      | Show/hide the X grid lines        |
| `showYGrid`         | boolean             | `true`      | Show/hide the Y grid lines        |
| `showAxisLabels`    | boolean             | `true`      | Show/hide axis labels             |
| `showTooltip`       | boolean             | `true`      | Show/hide tooltips on hover       |
| `showLegend`        | boolean             | `true`      | Show/hide the legend              |
| `legendPosition`    | 'left' \| 'right'   | `'right'`   | Position of the legend            |
| `labelSize`         | number              | `12`        | Font size for axis labels         |
| `gridStyle`         | 'solid' \| 'dashed' | `'dashed'`  | Style of grid lines               |
| `gridOpacity`       | number              | `0.08`      | Opacity of grid lines             |
| `axisOpacity`       | number              | `0.5`       | Opacity of axis lines             |
| `chartTitle`        | string              | `undefined` | Title of the chart                |
| `enableZoom`        | boolean             | `false`     | Enable zoom and pan functionality |
| `animationDuration` | number              | `750`       | Duration of animations in ms      |

### Bar Chart Specific Options

| Option         | Type   | Default | Description                |
| -------------- | ------ | ------- | -------------------------- |
| `barPadding`   | number | `0.2`   | Padding between bars (0-1) |
| `cornerRadius` | number | `4`     | Radius for bar corners     |

### Line Chart Specific Options

| Option         | Type                                 | Default      | Description                 |
| -------------- | ------------------------------------ | ------------ | --------------------------- |
| `lineWidth`    | number                               | `2`          | Width of the line           |
| `lineCurve`    | 'linear' \| 'cardinal' \| 'monotone' | `'cardinal'` | Type of curve interpolation |
| `lineOpacity`  | number                               | `0.8`        | Opacity of the line         |
| `showPoints`   | boolean                              | `true`       | Show/hide data points       |
| `pointSize`    | number                               | `4`          | Size of data points         |
| `pointOpacity` | number                               | `0.8`        | Opacity of data points      |

## Animation Vibes

The library supports different animation styles through the `vibe` prop:

- `rainforest` - Organic, lush feel with gentle swaying
- `savanna` - Warm, expansive with radiant movements
- `tundra` - Crisp, cool with crystalline transitions
- `coral` - Fluid, flowing with wave-like motions
- `volcanic` - Intense, dynamic with rising effects
- `dunes` - Subtle, smooth transitions

## Accessibility

All charts include proper ARIA attributes and keyboard navigation support. The library follows best practices for creating accessible data visualizations.

## Browser Support

The library supports all modern browsers including:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT © Canopy
