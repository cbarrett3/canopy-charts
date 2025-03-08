# Canopy Charts

<div align="center">
  <img src="public/favicon.svg" width="180" height="180" alt="Canopy Charts Logo">
  
  <h2>Unlimited data visualization for the AI-native era</h2>
  
  <p>
    <strong>React</strong> • <strong>D3</strong> • <strong>TypeScript</strong> • <strong>Agent-Ready</strong> • <em>v0.1.0</em>
  </p>
</div>

---

## Vision

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
```

## Developer Workflow

1. **Explore** — Browse this repository to understand the architecture
2. **Experiment** — Try examples in our playground (coming soon)
3. **Extend** — Work with your favorite LLM to customize the code
4. **Own** — Ship your unique visualization with complete ownership

## Documentation

- [**LLM Guide**](LLM-GUIDE.md) — How to use AI assistants with Canopy Charts
- [**Philosophy**](docs/PHILOSOPHY.md) — Our design principles and approach

## Example (Coming Soon)

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

## Planned Visualization Types

- **Line** — Time series with custom interpolations
- **Bar** — Categorical data with transitions and interactions
- **Donut** — Proportional visualization
- **Stacked Bar** — Multi-dimensional data
- **Stream** — Flowing time series
- **TreeMap** — Hierarchical visualization

---

<div align="center">
  <a href="https://github.com/cbarrett3/canopy-charts/issues">Issues</a> •
  <a href="https://github.com/cbarrett3/canopy-charts/blob/main/LICENSE">License</a>
</div>
