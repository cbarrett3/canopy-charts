# Styling and Customization Guide

This guide explains the various ways to customize the visual appearance of Canopy Charts. From simple theme selection to advanced D3 styling, you'll learn how to make your charts match your application's design system.

## Table of Contents

1. [Using Predefined Themes](#using-predefined-themes)
2. [Style Override System](#style-override-system)
3. [Custom Color Palettes](#custom-color-palettes)
4. [Typography Customization](#typography-customization)
5. [Advanced D3 Styling](#advanced-d3-styling)
6. [Creating Custom Themes](#creating-custom-themes)
7. [Responsive Design](#responsive-design)

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

## Typography Customization

Control the typography of your charts with the `typography` prop:

```tsx
<LineChart
	data={data}
	typography={{
		fontFamily: '"Inter", sans-serif',
		title: {
			fontSize: 18,
			fontWeight: 600,
			color: '#1e293b',
		},
		axis: {
			fontSize: 12,
			fontWeight: 400,
			color: '#64748b',
		},
		label: {
			fontSize: 10,
			fontWeight: 500,
			color: '#94a3b8',
		},
		tooltip: {
			fontSize: 12,
			fontWeight: 400,
			color: '#1e293b',
		},
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

You can create your own themes by defining a complete theme object:

```tsx
// Define a custom theme
const customTheme = {
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
		title: {
			fontSize: 18,
			fontWeight: 600,
			color: '#0f172a',
		},
		axis: {
			fontSize: 12,
			fontWeight: 400,
			color: '#64748b',
		},
		label: {
			fontSize: 10,
			fontWeight: 500,
			color: '#94a3b8',
		},
		tooltip: {
			fontSize: 12,
			fontWeight: 400,
			color: '#1e293b',
		},
	},
	elements: {
		bar: {
			cornerRadius: 4,
			fillOpacity: 0.8,
			stroke: 'none',
		},
		line: {
			strokeWidth: 2,
			strokeLinecap: 'round',
			fillOpacity: 0.1,
		},
		point: {
			radius: 4,
			fillOpacity: 1,
			stroke: 'white',
			strokeWidth: 2,
		},
		axis: {
			stroke: '#94a3b8',
			tickLength: 5,
		},
		grid: {
			stroke: '#e2e8f0',
			strokeDasharray: 'none',
		},
	},
};

// Register the custom theme
import { registerTheme } from '@canopy/charts';
registerTheme(customTheme);

// Use the custom theme
<BarChart
	data={data}
	vibe='corporate'
/>;
```

## Responsive Design

Canopy Charts is designed to be responsive by default. You can control the responsiveness with these props:

```tsx
<BarChart
	data={data}
	// Fixed dimensions
	width={800}
	height={400}
	// Or responsive with aspect ratio
	responsive={true}
	aspectRatio={16 / 9}
	// Control responsiveness behavior
	responsiveConfig={{
		breakpoints: {
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
		},
		behavior: {
			// Below sm breakpoint
			sm: {
				hideAxis: true,
				hideLabels: true,
				simplifyTooltip: true,
			},
			// Below md breakpoint
			md: {
				hideGridLines: true,
				reduceFontSize: true,
			},
		},
	}}
/>
```

## Combining Approaches

For the most control, you can combine these approaches:

```tsx
<BarChart
	data={data}
	vibe='modern'
	colorPalette={['#3b82f6', '#4ade80', '#f472b6']}
	styleOverrides={{
		bar: {
			cornerRadius: 4,
			fillOpacity: 0.8,
		},
	}}
	onD3Instance={(d3, svg, data) => {
		// Add custom D3 styling
	}}
/>
```

This layered approach gives you both convenience and unlimited customization potential.

## Next Steps

- Explore the [examples directory](../../examples/) for styling examples
- Check out the [custom theme example](../../examples/customization/custom-theme.tsx)
- Learn about [animations and transitions](../animations/animation-guide.md)
