# Canopy Charts

<div align="center">
  <img src="https://raw.githubusercontent.com/cbarrett3/canopy-charts/main/public/logo.svg" alt="Canopy Charts Logo" width="120" height="120" />
</div>

```
A modern data visualization library built with D3 and React
TypeScript • MIT License • v0.1.0
```

**Create beautiful, interactive charts with minimal effort**

---

## At a glance

```tsx
import { BarChart } from 'canopy-charts';

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
```

## Installation

```
npm install canopy-charts
```

## Core concepts

| Concept            | Description                                                              |
| :----------------- | :----------------------------------------------------------------------- |
| **Vibes**          | Predefined visual themes that control colors, typography, and animations |
| **Responsiveness** | All charts automatically adapt to their container dimensions             |
| **Accessibility**  | ARIA attributes and keyboard navigation included by default              |
| **Interactivity**  | Tooltips, zooming, and hover states with minimal configuration           |

## Available charts

- **Line** — Time series, trends, and continuous data
- **Bar** — Categorical comparisons and distributions
- **Donut** — Part-to-whole relationships and proportions
- **Stacked Bar** — Nested categories and compositions
- **Stream** — Flowing time series and evolving distributions
- **TreeMap** — Hierarchical data and nested structures

## Configuration

Charts accept common props for consistent configuration:

```tsx
// Common props across all chart types
interface ChartProps {
	// Data
	data: DataPoint[];

	// Appearance
	vibe?:
		| 'evergreen'
		| 'palm'
		| 'bamboo'
		| 'willow'
		| 'succulent'
		| 'modern'
		| 'savanna'
		| 'rainforest';
	themeColor?: string;

	// Layout
	width?: number;
	height?: number;
	margin?: {
		top: number;
		right: number;
		bottom: number;
		left: number;
	};

	// Features
	showGrid?: boolean;
	showLabels?: boolean;
	showLegend?: boolean;
	enableZoom?: boolean;
	enableTooltip?: boolean;

	// Accessibility
	ariaLabel?: string;
	ariaDescription?: string;
}
```

## Examples

### Line Chart

```tsx
<LineChart
	data={[
		{ date: '2023-01', value: 2430 },
		{ date: '2023-02', value: 2800 },
		{ date: '2023-03', value: 3200 },
		{ date: '2023-04', value: 2950 },
	]}
	xKey='date'
	yKey='value'
	vibe='bamboo'
/>
```

### Donut Chart

```tsx
<DonutChart
	data={[
		{ label: 'Category A', value: 35 },
		{ label: 'Category B', value: 25 },
		{ label: 'Category C', value: 20 },
		{ label: 'Category D', value: 20 },
	]}
	innerRadius={0.6}
	vibe='palm'
/>
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
