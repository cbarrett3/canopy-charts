# 🌿 Canopy Charts

<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/D3.js-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white" alt="D3.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="License" />
</div>

<p align="center">
  <strong>Beautiful D3 charts with zero hassle for modern web applications</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-available-charts">Available Charts</a> •
  <a href="#-themes">Themes</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</p>

---

## 🌟 Features

- **Six Essential Chart Types** - Line, Bar, Donut, Stacked Bar, Stream, and TreeMap
- **Responsive & Interactive** - All charts adapt to container size and include interactive elements
- **Beautiful Animations** - Smooth transitions and animations enhance data visualization
- **Multiple Theme Options** - Eight nature-inspired themes to match your application's design
- **TypeScript Support** - Full type definitions for enhanced developer experience
- **Accessibility Built-in** - ARIA attributes and keyboard navigation included
- **Framework Agnostic** - Works with React, Next.js, Remix, Astro, Expo, and Electron
- **Tree-shakeable** - Only import what you need for optimized bundle size

## 🚀 Quick Start

```bash
# Install the package
npm install canopy-charts

# Or use our CLI to scaffold a new project
npx canopy-charts init my-chart-project
```

## 📊 Usage

### Line Chart Example

```tsx
import { D3LineChart } from 'canopy-charts';

const SalesChart = () => {
	const data = [
		{ name: 'Jan', dataset1: 2430, dataset2: 2000 },
		{ name: 'Feb', dataset1: 2800, dataset2: 2400 },
		{ name: 'Mar', dataset1: 3200, dataset2: 2800 },
		{ name: 'Apr', dataset1: 2950, dataset2: 2600 },
	];

	return (
		<D3LineChart
			data={data}
			datasets={['dataset1', 'dataset2']}
			xAxisTitle='Month'
			yAxisTitle='Sales ($)'
			themeColor='#4f46e5'
			vibe='evergreen'
			showGrid={true}
			showLabels={true}
		/>
	);
};
```

### Bar Chart Example

```tsx
import { D3BarChart } from 'canopy-charts';

const RevenueChart = () => {
	const data = [
		{ label: 'Product A', value: 12000 },
		{ label: 'Product B', value: 8000 },
		{ label: 'Product C', value: 15000 },
		{ label: 'Product D', value: 9000 },
	];

	return (
		<D3BarChart
			data={data}
			width={800}
			height={400}
			title='Revenue by Product'
			themeColor='#4f46e5'
			vibe='modern'
		/>
	);
};
```

## 📈 Available Charts

| Chart Type            | Description                     | Key Features                                           |
| --------------------- | ------------------------------- | ------------------------------------------------------ |
| **D3LineChart**       | Multi-dataset line chart        | Multiple datasets, customizable axes, grid options     |
| **D3BarChart**        | Animated bar chart              | Vertical/horizontal orientation, animations, tooltips  |
| **D3DonutChart**      | Interactive donut chart         | Customizable labels, interactive segments, center text |
| **D3StackedBarChart** | Stacked bar chart               | Multiple categories, legend, hover interactions        |
| **D3StreamChart**     | Stream/Flow chart               | Time-series visualization, smooth transitions          |
| **D3TreeMap**         | Hierarchical data visualization | Nested data, drill-down capability, size encoding      |

## 🎨 Themes

Canopy Charts offers eight nature-inspired themes through the `vibe` prop:

- `evergreen` (default) - Fresh and professional
- `palm` - Tropical and vibrant
- `bamboo` - Calm and balanced
- `willow` - Soft and elegant
- `succulent` - Bold and modern
- `modern` - Clean and minimal
- `savanna` - Warm and earthy
- `rainforest` - Rich and diverse

Each theme includes carefully selected color palettes, typography, and styling that work harmoniously together.

## 🛠️ Advanced Configuration

Canopy Charts provides extensive configuration options for each chart type:

```tsx
<D3BarChart
	// Basic props
	data={data}
	width={800}
	height={400}
	// Styling
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
	// Animation
	animationDuration={500}
/>
```

## 🤝 Contributing

We welcome contributions! To get started:

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/canopy-charts.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`
5. Make your changes
6. Submit a pull request

For more details, see our [CLI documentation](cli/README.md) for development setup and guidelines.

## 📄 License

MIT © Canopy Charts Team

---

<p align="center">
  Made with 💚 by the Canopy Charts Team
</p>
