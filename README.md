# Canopy Charts

<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/D3.js-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white" alt="D3.js" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="License" />
</div>

<p align="center">
  A modern charting library for data-driven applications
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#charts">Charts</a> •
  <a href="#themes">Themes</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## Features

- Six chart types: Line, Bar, Donut, Stacked Bar, Stream, and TreeMap
- Responsive design with interactive elements
- Smooth transitions and animations
- Nature-inspired themes
- Full TypeScript support
- Accessibility-focused
- Framework-agnostic
- Tree-shakeable

## Installation

```bash
npm install canopy-charts

# Or with CLI
npx canopy-charts init my-project
```

## Usage

### Line Chart

```tsx
import { D3LineChart } from 'canopy-charts';

const SalesChart = () => (
	<D3LineChart
		data={[
			{ name: 'Jan', dataset1: 2430, dataset2: 2000 },
			{ name: 'Feb', dataset1: 2800, dataset2: 2400 },
			{ name: 'Mar', dataset1: 3200, dataset2: 2800 },
			{ name: 'Apr', dataset1: 2950, dataset2: 2600 },
		]}
		datasets={['dataset1', 'dataset2']}
		xAxisTitle='Month'
		yAxisTitle='Sales ($)'
		themeColor='#4f46e5'
		vibe='evergreen'
		showGrid={true}
	/>
);
```

### Bar Chart

```tsx
import { D3BarChart } from 'canopy-charts';

const RevenueChart = () => (
	<D3BarChart
		data={[
			{ label: 'Product A', value: 12000 },
			{ label: 'Product B', value: 8000 },
			{ label: 'Product C', value: 15000 },
			{ label: 'Product D', value: 9000 },
		]}
		width={800}
		height={400}
		title='Revenue by Product'
		themeColor='#4f46e5'
		vibe='modern'
	/>
);
```

## Charts

| Chart                 | Description                | Key Features                              |
| --------------------- | -------------------------- | ----------------------------------------- |
| **D3LineChart**       | Multi-dataset line chart   | Multiple datasets, customizable axes      |
| **D3BarChart**        | Animated bar chart         | Vertical/horizontal orientation, tooltips |
| **D3DonutChart**      | Interactive donut chart    | Customizable labels, interactive segments |
| **D3StackedBarChart** | Stacked bar chart          | Multiple categories, legend               |
| **D3StreamChart**     | Stream/Flow chart          | Time-series visualization                 |
| **D3TreeMap**         | Hierarchical visualization | Nested data, drill-down capability        |

## Themes

Available themes through the `vibe` prop:

- `evergreen` (default) - Fresh and professional
- `palm` - Tropical and vibrant
- `bamboo` - Calm and balanced
- `willow` - Soft and elegant
- `succulent` - Bold and modern
- `modern` - Clean and minimal
- `savanna` - Warm and earthy
- `rainforest` - Rich and diverse

## Configuration

```tsx
<D3BarChart
	// Core
	data={data}
	width={800}
	height={400}
	// Style
	themeColor='#4f46e5'
	vibe='modern'
	// Layout
	marginTop={20}
	marginRight={20}
	marginBottom={40}
	marginLeft={40}
	// Features
	showGrid={true}
	showLabels={true}
	showLegend={true}
	legendPosition='right'
	// Interaction
	enableZoom={true}
	enableTooltip={true}
/>
```

## Contributing

1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature`
5. Make your changes
6. Submit a pull request

See our [CLI documentation](cli/README.md) for development setup.

## License

MIT © Canopy Charts Team

---

<p align="center">
  Made with 💚 by the Canopy Charts Team
</p>
