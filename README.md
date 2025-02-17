# Canopy Charts

> This is the main project README for Canopy Charts, a beautiful charting library for modern web apps. 
>
> **App Developer?** Start with [Quick Start](#quick-start) below  
> **Library Contributor?** See the [CLI Documentation](cli/README.md) for development setup

Create beautiful D3 charts with zero hassle. Whether you're using React, Next.js, Remix, Astro, Expo, or Electron - we've got you covered.

## Resources

- [GitHub Repository](https://github.com/cbarrett3/canopy-charts)
- [Issue Tracker](https://github.com/cbarrett3/canopy-charts/issues)

## Quick Start

```bash
# Install the package
npm install canopy-charts

# Or use our CLI to scaffold a new project
npx canopy-charts init my-chart-project
```

## Usage

```typescript
import { D3LineChart, D3BarChart } from 'canopy-charts';

// Create a line chart with multiple datasets
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
      xAxisTitle="Month"
      yAxisTitle="Sales ($)"
      themeColor="#4f46e5"
      vibe="evergreen"
      showGrid={true}
      showLabels={true}
    />
  );
};

// Create a bar chart with custom styling
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
      title="Revenue by Product"
      themeColor="#4f46e5"
      vibe="modern"
    />
  );
};
```

## Available Charts

- **D3LineChart**: Multi-dataset line chart with customizable axes and grid
- **D3BarChart**: Animated bar chart with multiple style options
- **D3DonutChart**: Interactive donut chart with labels
- **D3StackedBarChart**: Stacked bar chart for comparing categories
- **D3StreamChart**: Stream/Flow chart for time-series data
- **D3TreeMap**: Hierarchical data visualization

Each chart supports multiple themes through the `vibe` prop:
- `evergreen` (default)
- `palm`
- `bamboo`
- `willow`
- `succulent`
- `modern`
- `savanna`
- `rainforest`

## Features

- Six essential D3-based chart components
- Responsive and interactive by default
- Built-in animations and transitions
- Multiple theme options
- TypeScript support with full type definitions
- Customizable colors and styles
- Accessible with ARIA attributes
- Tree-shakeable for optimized bundle size

## Contributing

We welcome contributions. See our [CLI documentation](cli/README.md) for development setup and guidelines.

## License

MIT Canopy Charts Team
