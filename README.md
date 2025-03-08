# Canopy Charts

<div align="center">
  <img src="public/favicon.svg" width="180" height="180" alt="Canopy Charts Logo">
  
  <h2>Unlimited data visualization for the AI-native era</h2>
  
  <p>
    <strong>React</strong> • <strong>D3</strong> • <strong>TypeScript</strong> • <strong>Agent-Ready</strong> • <em>v0.1.0</em>
  </p>
</div>

---

## The Foundation

Canopy Charts is a **foundation for building custom visualizations**, not a traditional charting library. Instead of installing a package with predefined constraints, you own and extend the code directly.

### Code Ownership Model

Unlike traditional npm packages, Canopy Charts embraces a code-ownership approach:

- **Fork & Own** — Start with our foundation and make it truly yours
- **Unlimited Extension** — No black boxes or limitations on what you can modify
- **Direct D3 Access** — Full control over the underlying visualization engine
- **AI-Assisted Customization** — Structure designed for easy extension via LLMs

## Getting Started

```bash
# Clone the repository
git clone https://github.com/cbarrett3/canopy-charts.git

# Or use our minimal CLI to scaffold a project
npx create-canopy-chart@latest my-visualization
```

## Developer Workflow

<div align="center">
  <img src="docs/assets/workflow.png" width="600" alt="Developer Workflow" style="max-width: 100%;">
</div>

1. **Explore** — Browse this repository to understand the architecture
2. **Experiment** — Try examples in our [interactive playground](https://canopy-charts.vercel.app)
3. **Extend** — Work with your favorite LLM to customize the code
4. **Own** — Ship your unique visualization with complete ownership

## Documentation

- [**LLM Guide**](LLM-GUIDE.md) — How to use AI assistants with Canopy Charts
- [**Examples**](examples/README.md) — Sample implementations from basic to advanced
- [**Customization Guides**](guides/customization/styling-guide.md) — Detailed customization techniques
- [**Architecture**](docs/ARCHITECTURE.md) — Core concepts and design decisions

## Example Implementation

```tsx
import { BarChart } from './components';

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
```

## Core Visualization Types

- **Line** — Time series with custom interpolations
- **Bar** — Categorical data with transitions and interactions
- **Donut** — Proportional visualization _(coming soon)_
- **Stacked Bar** — Multi-dimensional data _(coming soon)_
- **Stream** — Flowing time series _(coming soon)_
- **TreeMap** — Hierarchical visualization _(coming soon)_

## Learn More

- [Design Philosophy](docs/PHILOSOPHY.md)
- [Performance Optimization](docs/PERFORMANCE.md)
- [Contributing](CONTRIBUTING.md)

---

<div align="center">
  <a href="https://github.com/cbarrett3/canopy-charts/issues">Issues</a> •
  <a href="https://github.com/cbarrett3/canopy-charts/blob/main/LICENSE">License</a>
</div>
