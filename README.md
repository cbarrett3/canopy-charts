# Canopy Charts

<div align="center">
  <img src="public/favicon.svg" width="180" height="180" alt="Canopy Charts Logo">
  
  <h2>Unlimited data visualization for the AI-native era</h2>
  
  <p align="center">
    <code>TypeScript</code> •
    <code>React</code> •
    <code>D3.js</code> •
    <code>MIT License</code>
  </p>
</div>

<p align="center">
  <a href="#vision">Vision</a> •
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#planned-charts">Planned Charts</a> •
  <a href="#future-directions">Future Directions</a> •
  <a href="#contributing">Contributing</a>
</p>

<br />

## Vision

Canopy Charts is a **foundation for building custom visualizations**, not a traditional charting library. Instead of installing a package with predefined constraints, you own and extend the code directly.

### Code Ownership Model

Unlike traditional npm packages, Canopy Charts embraces a code-ownership approach:

- **Fork & Own** — Start with our foundation and make it truly yours
- **Unlimited Extension** — No black boxes or limitations on what you can modify
- **Direct D3 Access** — Full control over the underlying visualization engine
- **AI-Assisted Customization** — Structure designed for easy extension via LLMs

<br />

## Features

- ⚛️ React components with D3.js integration
- 🔒 TypeScript for type safety and better developer experience
- 📱 Responsive design architecture
- 🧩 Extensible foundation for custom visualizations
- 🤖 Designed for AI-assisted customization

<br />

## Installation

```bash
# Clone the repository
git clone https://github.com/cbarrett3/canopy-charts.git

# Install dependencies
cd canopy-charts
npm install
```

<br />

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

<br />

## Planned Charts

We're actively developing these chart types:

- 📈 **Line** — Time series with custom interpolations
- 📊 **Bar** — Categorical data with transitions and interactions
- 🍩 **Donut** — Proportional visualization
- 📚 **Stacked Bar** — Multi-dimensional data
- 🌊 **Stream** — Flowing time series
- 🗂️ **TreeMap** — Hierarchical visualization

<br />

## Planned Themes

Our nature-inspired theme system is under development:

- 🌲 `evergreen` (default) - Fresh and professional
- 🌴 `palm` - Tropical and vibrant
- 🎋 `bamboo` - Calm and balanced
- 🌿 `willow` - Soft and elegant
- 🌵 `succulent` - Bold and modern
- ✨ `modern` - Clean and minimal

<br />

## Contributing

1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature`
5. Make your changes
6. Submit a pull request

<br />

## Future Directions

### Voice-Enabled Visualizations

We're exploring innovative ways to integrate voice capabilities with data visualization:

- 🔊 **Accessible Data Narration** — Charts that can explain themselves through natural speech
- 🎙️ **Voice-Controlled Customization** — Modify charts using voice commands like "Make the bars blue" or "Show me the trend line"
- 🧠 **AI-Generated Insights with Voice** — Hear intelligent observations about your data patterns
- 🎓 **Interactive Voice Tutorials** — Learn how to use advanced features through guided voice explanations
- 🎵 **Data Sonification** — Experience data through audio patterns and voice modulation
- 🌐 **Multilingual Chart Experiences** — Make visualizations accessible globally with multiple language support

<br />

## License

MIT © Canopy Charts Team

<br />

<p align="center">
  <sub>Made with 💚 by the Canopy Charts Team</sub>
</p>
