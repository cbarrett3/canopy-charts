# Styling and Customization Guide

This guide explains how to customize the visual appearance of Canopy Charts using the **code-ownership model**. Unlike traditional libraries where you're limited to API options, you can modify any aspect of the styling directly.

## Code Ownership Approach

With Canopy Charts:

- You own the code and can modify any styling aspect
- The examples below show both API options and direct code modifications
- You can extend the styling system itself if needed

## Quick Reference

1. [Using Predefined Themes](#using-predefined-themes)
2. [Style Override System](#style-override-system)
3. [Direct Code Modification](#direct-code-modification)
4. [Custom Color Palettes](#custom-color-palettes)
5. [Advanced D3 Styling](#advanced-d3-styling)

## Using Predefined Themes

Canopy Charts comes with several built-in themes (called "vibes") that you can use to quickly style your charts:

```tsx
<BarChart
	data={data}
	vibe='evergreen' // Options: modern, evergreen, bamboo, midnight, pastel
/>
```

Each theme includes carefully selected color palettes, typography, and styling that work well together.

### Available Themes

- **modern** - Clean, professional style with blue tones
- **evergreen** - Nature-inspired with green accents
- **bamboo** - Earthy tones with subtle textures
- **midnight** - Dark theme with vibrant accents
- **pastel** - Soft, muted colors for a gentle appearance

## Style Override System

For more specific customization, use the `styleOverrides` prop to target specific elements:

```tsx
<LineChart
	data={data}
	vibe='modern'
	styleOverrides={{
		// Line styling
		line: {
			strokeWidth: 3,
			strokeLinecap: 'round',
			stroke: '#3b82f6', // Custom color
		},

		// Point styling
		point: {
			radius: 5,
			fill: '#3b82f6',
			stroke: 'white',
			strokeWidth: 2,
		},

		// Axis styling
		axis: {
			stroke: '#94a3b8',
			tickLength: 5,
		},

		// Grid styling
		grid: {
			stroke: '#e2e8f0',
			strokeDasharray: '2,2',
		},

		// Label styling
		label: {
			fontSize: 12,
			fontWeight: 500,
			fill: '#64748b',
		},
	}}
/>
```

The style override system uses a hierarchical approach, allowing you to override specific elements while keeping the rest of the theme intact.

## Direct Code Modification

Since you own the code, you can modify the theme definitions directly:

```tsx
// In themes/modern.ts
export const modernTheme = {
	colors: {
		primary: '#3b82f6',
		secondary: '#60a5fa',
		// Modify or add colors
	},
	elements: {
		bar: {
			cornerRadius: 4,
			// Modify default styling
		},
	},
};
```

## Custom Color Palettes

You can define custom color palettes for your data series:

```tsx
<BarChart
	data={data}
	colorPalette={[
		'#3b82f6', // Blue
		'#4ade80', // Green
		'#f472b6', // Pink
		'#facc15', // Yellow
		'#f97316', // Orange
	]}
/>
```

For more control, you can map specific categories to colors:

```tsx
<BarChart
	data={data}
	colorMapping={{
		Revenue: '#3b82f6',
		Expenses: '#f87171',
		Profit: '#4ade80',
	}}
/>
```

## Advanced D3 Styling

For unlimited styling control, use the `onD3Instance` prop to access the D3 instance directly:

```tsx
<BarChart
	data={data}
	onD3Instance={(d3, svg, data) => {
		// Add gradient fills to bars
		const gradient = d3
			.select(svg)
			.append('defs')
			.append('linearGradient')
			.attr('id', 'bar-gradient')
			.attr('x1', '0%')
			.attr('y1', '0%')
			.attr('x2', '0%')
			.attr('y2', '100%');

		gradient
			.append('stop')
			.attr('offset', '0%')
			.attr('stop-color', '#3b82f6');

		gradient
			.append('stop')
			.attr('offset', '100%')
			.attr('stop-color', '#60a5fa');

		// Apply gradient to bars
		d3.select(svg)
			.selectAll('.bar')
			.attr('fill', 'url(#bar-gradient)');

		// Add drop shadow
		const filter = d3
			.select(svg)
			.append('defs')
			.append('filter')
			.attr('id', 'drop-shadow')
			.attr('height', '130%');

		filter
			.append('feGaussianBlur')
			.attr('in', 'SourceAlpha')
			.attr('stdDeviation', 3)
			.attr('result', 'blur');

		filter
			.append('feOffset')
			.attr('in', 'blur')
			.attr('dx', 0)
			.attr('dy', 3)
			.attr('result', 'offsetBlur');

		const feComponentTransfer = filter
			.append('feComponentTransfer')
			.attr('in', 'offsetBlur')
			.attr('result', 'offsetBlur');

		feComponentTransfer
			.append('feFuncA')
			.attr('type', 'linear')
			.attr('slope', 0.3);

		const feMerge = filter.append('feMerge');
		feMerge.append('feMergeNode').attr('in', 'offsetBlur');
		feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

		// Apply drop shadow to bars
		d3.select(svg)
			.selectAll('.bar')
			.attr('filter', 'url(#drop-shadow)');
	}}
/>
```

## Creating Custom Themes

You can create entirely new themes by adding a file to the themes directory:

```tsx
// In themes/corporate.ts
export const corporateTheme = {
	name: 'corporate',
	colors: {
		primary: '#0f172a',
		secondary: '#3b82f6',
		accent: '#f97316',
		background: '#ffffff',
		text: '#1e293b',
		grid: '#e2e8f0',
		series: ['#3b82f6', '#4ade80', '#f472b6', '#facc15', '#f97316'],
	},
	typography: {
		fontFamily: '"Roboto", sans-serif',
		// Typography settings
	},
	elements: {
		// Element styling
	},
};

// In themes/index.ts
export { corporateTheme } from './corporate';
```

## Next Steps

- Explore the [examples directory](../../examples/) for styling examples
- Check out the [custom theme example](../../examples/customization/custom-theme.tsx)
- See how to [create custom chart types](../../examples/customization/custom-chart-type.tsx)
