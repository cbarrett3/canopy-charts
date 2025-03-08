# Canopy Charts

<div align="center">
  <img src="public/favicon.svg" width="180" height="180" alt="Canopy Charts Logo">
  
  <h2>Unlimited data visualization for the AI-native era</h2>
  
  <div>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/D3.js-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white" alt="D3.js" />
    <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="License" />
  </div>
</div>

<p align="center">
  <a href="#vision">Vision</a> •
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#planned-charts">Planned Charts</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## Vision

Canopy Charts is a **foundation for building custom visualizations**, not a traditional charting library. Instead of installing a package with predefined constraints, you own and extend the code directly.

### Code Ownership Model

Unlike traditional npm packages, Canopy Charts embraces a code-ownership approach:

- **Fork & Own** — Start with our foundation and make it truly yours
- **Unlimited Extension** — No black boxes or limitations on what you can modify
- **Direct D3 Access** — Full control over the underlying visualization engine
- **AI-Assisted Customization** — Structure designed for easy extension via LLMs

## Features

- React components with D3.js integration
- TypeScript for type safety and better developer experience
- Responsive design architecture
- Extensible foundation for custom visualizations
- Designed for AI-assisted customization

## Installation

```bash
# Clone the repository
git clone https://github.com/cbarrett3/canopy-charts.git

# Install dependencies
cd canopy-charts
npm install
```

## Usage

### Basic Chart Example (Coming Soon)

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

## Planned Charts

We're actively developing these chart types:

- **Line** — Time series with custom interpolations
- **Bar** — Categorical data with transitions and interactions
- **Donut** — Proportional visualization
- **Stacked Bar** — Multi-dimensional data
- **Stream** — Flowing time series
- **TreeMap** — Hierarchical visualization

## Planned Themes

Our nature-inspired theme system is under development:

- `evergreen` (default) - Fresh and professional
- `palm` - Tropical and vibrant
- `bamboo` - Calm and balanced
- `willow` - Soft and elegant
- `succulent` - Bold and modern
- `modern` - Clean and minimal

## Contributing

1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature`
5. Make your changes
6. Submit a pull request

## License

MIT © Canopy Charts Team

---

<p align="center">
  Made with 💚 by the Canopy Charts Team
</p>
