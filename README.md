# Canopy Charts

<div align=\"center\">
  <img src=\"public/favicon.svg\" width=\"180\" height=\"180\" alt=\"Canopy Charts Logo\">
  
  <h2>Reimagining data visualization for the next decade</h2>
  
  <p align=\"center\">
    <code>TypeScript</code> •
    <code>React</code> •
    <code>D3.js</code> •
    <code>MIT License</code>
  </p>
</div>

<p align=\"center\">
  <a href=\"#vision\">Vision</a> •
  <a href=\"#core-principles\">Core Principles</a> •
  <a href=\"#getting-started\">Getting Started</a> •
  <a href=\"#development\">Development</a> •
  <a href=\"#future-directions\">Future Directions</a>
</p>

<br />

## Vision

Canopy Charts represents a fundamental shift in how developers approach data visualization. In a world increasingly shaped by AI, the traditional package-based approach is becoming obsolete. Instead, we offer a **foundation for building custom visualizations** that you own and extend directly.

This isn't just another charting library—it's a new paradigm designed for how developers will work over the next decade.

## Core Principles

**Code Ownership Model**

Unlike traditional npm packages, Canopy Charts embraces a code-ownership approach:

- **Fork & Own** — The codebase becomes yours, eliminating dependency concerns
- **Unlimited Extension** — No black boxes or artificial limitations on customization
- **Direct D3 Access** — Full control over the underlying visualization engine
- **AI-Assisted Customization** — Structure designed for seamless extension via LLMs

<br />

## Getting Started

The Canopy Charts CLI streamlines the integration process:

```bash
# Install the CLI tool
npm install -g @canopy-charts/cli

# Initialize in your project
canopy init

# Add the charts you need
canopy add line-chart
```

This approach gives you full ownership of the visualization code in your project, while maintaining a clean, efficient workflow.

## Development

Once installed, you own the code. Customize it to your exact needs:

```tsx
import { LineChart } from './canopy/charts';

export default function Dashboard() {
  return (
    <LineChart
      data={salesData}
      theme="modern"
      interactive={true}
      annotations={insights}
    />
  );
}
```

The structure is designed for both human developers and AI assistants to easily extend and modify.

<br />

## Future Directions

Canopy Charts is designed for the future of development, with several key innovations on our roadmap:

### AI-Native Visualization

We're building for a world where AI is a core part of the development process:

- **Intelligent Customization** — LLMs that understand and can modify visualization code
- **Context-Aware Rendering** — Charts that adapt to the data they're displaying
- **Natural Language Configuration** — Describe what you want in plain English

### Voice Integration

Voice represents the next frontier in data interaction:

- **Voice-Controlled Customization** — Modify charts using natural speech
- **Data Narration** — Charts that explain themselves and their insights
- **Multimodal Experiences** — Combining visual, voice, and interactive elements

<br />

## License

MIT © Canopy Charts

<p align=\"center\">
  <sub>Building the future of data visualization</sub>
</p>