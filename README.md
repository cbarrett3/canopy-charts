# Canopy Charts

<div align="center">
  <img src="public/favicon.svg" width="180" height="180" alt="Canopy Charts Logo">
  
  <h1>Data Visualization for the AI Era</h1>
</div>

---

## Vision

**Describe the chart you want. Get production-ready code you own.**

Canopy Charts is a paradigm shift in data visualization. Instead of importing libraries with limited customization, you describe what you need and get complete, customizable code directly in your project.

---

## How It Works

<table>
<tr>
<td width="33%" align="center">
  <h3>📝 Describe</h3>
  <p style="font-size: 18px;">Use the <code>/chart</code> command in your IDE</p>
  <p><em>"Create a time series with annotations for key events"</em></p>
</td>
<td width="33%" align="center">
  <h3>✨ Generate</h3>
  <p style="font-size: 18px;">Model Context Protocol (MCP)</p>
  <p><em>Tailored visualization code based on best practices</em></p>
</td>
<td width="33%" align="center">
  <h3>🔧 Own</h3>
  <p style="font-size: 18px;">Your code, your way</p>
  <p><em>Modify, extend, and integrate without limitations</em></p>
</td>
</tr>
</table>

---

## Core Principles

- **Complete Ownership** — No dependencies, no black boxes
- **Unlimited Customization** — Full access to modify any aspect of your visualizations
- **AI-Native Design** — Built from the ground up for the age of AI-assisted development
- **Developer-First** — Optimized for the modern development workflow

---

## Component Structure

```
chart-type/
├── src/
│   ├── component.tsx        # React component with hooks and rendering logic
│   ├── renderer.ts          # D3 implementation separated from React concerns
│   ├── data-adapter.ts      # Data transformation and preparation logic
│   ├── types.ts             # TypeScript interfaces and type definitions
│   ├── scales.ts            # Scale configuration and utilities
│   ├── animations.ts        # Animation definitions and utilities
│   ├── accessibility.ts     # A11y features and ARIA attributes
│   ├── vibes.ts             # Visual styling variations
│   ├── tooltip.tsx          # Chart-specific tooltip implementation
│   └── index.ts             # Public exports
├── demos/
│   ├── basic/
│   │   ├── code.tsx         # Simple implementation example
│   │   ├── data.ts          # Sample data for the demo
│   │   └── preview.png      # Static preview image
│   ├── advanced/
│   │   ├── code.tsx         # Complex implementation
│   │   ├── data.ts          # More complex sample data
│   │   └── preview.png      # Static preview image
│   └── index.ts             # Demo exports
├── tests/
│   ├── component.test.tsx   # Component tests
│   ├── renderer.test.ts     # D3 rendering tests
│   └── data-adapter.test.ts # Data transformation tests
└── docs/
    ├── api.md               # API documentation
    ├── examples.md          # Usage examples
    └── accessibility.md     # Accessibility guidelines
```

Each visualization follows this comprehensive structure with clear separation of concerns:

1. **React Layer** (`component.tsx`) - Handles component lifecycle, state, and DOM references
2. **D3 Layer** (`renderer.ts`) - Pure D3 implementation for SVG manipulation and animations
3. **Data Layer** (`data-adapter.ts`) - Transforms and prepares data for visualization
4. **Scale System** (`scales.ts`) - Configures D3 scales with sensible defaults and options
5. **Animation System** (`animations.ts`) - Defines transitions and interactive behaviors
6. **Accessibility** (`accessibility.ts`) - Ensures charts are usable by everyone
7. **Visual Styles** (`vibes.ts`) - Themeable visual variations with consistent API
8. **Demo Implementations** - Multiple examples from basic to advanced use cases
9. **Comprehensive Tests** - Ensures reliability across browsers and data scenarios
10. **Documentation** - Clear API docs, examples, and accessibility guidelines

Install and use with a single command:

```bash
npx canopy-charts add time-series
```

---

## Ecosystem

<div align="center">
  <h3>Reimagining Developer Productivity</h3>
</div>

### Core Value Proposition

- **AI-Powered Chart Generation** — Create custom visualizations from natural language descriptions
- **Data-Aware Design** — Intelligent chart selection based on your actual data structure
- **Code You Own** — No dependencies or black boxes, just clean code you control
- **IDE Integration** — Seamless workflow in VS Code, Cursor, and other environments

### How the MCP Server Works

1. **Analyze Your Request** — Understand what visualization you need
2. **Examine Your Data** — Determine the optimal chart type and configuration
3. **Generate Custom Code** — Create a tailored visualization component
4. **Deliver Ready-to-Use** — Provide complete, production-ready code
5. **Learn From Feedback** — Continuously improve based on your interactions

---

## Implementation Strategy

<div align="center">
  <h3>Building for the AI-Native Development Era</h3>
</div>

### Core Infrastructure

```
canopy-charts/
├── packages/
│   ├── cli/                  # Command-line installation tool
│   ├── components/           # Chart component library
│   ├── mcp-server/           # Model Context Protocol server
│   └── ide-extensions/       # VS Code and other IDE integrations
├── apps/
│   ├── website/              # Documentation and showcase
│   └── playground/           # Interactive testing environment
└── tools/
    ├── model-training/       # Visualization model fine-tuning
    └── templates/            # Scaffolding templates
```

### MCP Server Architecture

The Model Context Protocol server is the AI brain powering chart generation:

1. **Natural Language Understanding** — Processes `/chart` commands with context
2. **Data Structure Analysis** — Intelligently interprets data formats
3. **Visualization Selection** — Chooses optimal chart types for the data
4. **Code Generation** — Creates customized component code
5. **Continuous Learning** — Improves from user feedback and iterations

### Business Model

**Simple, Developer-Focused Pricing**

- **Free Tier** — Limited generations per month, basic chart types
- **Pro Tier** — Unlimited generations, all chart types, priority processing
- **Team Tier** — Shared dashboard, collaboration features, higher rate limits

The value is clear: dramatically increased productivity for data visualization tasks. What might take hours of configuration, trial and error, and debugging can be accomplished in seconds with a natural language command.

---

<div align="center">
  <h2>The Future of Data Visualization is Here</h2>
  <p><a href="#getting-started">Get Started</a> • <a href="#documentation">Documentation</a> • <a href="#community">Community</a></p>
  
  <sub>MIT © Canopy Charts</sub>
</div>
