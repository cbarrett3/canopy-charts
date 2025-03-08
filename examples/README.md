# Canopy Charts Examples

This directory contains examples demonstrating how to use and extend Canopy Charts for various visualization needs. These examples are designed to be both educational and practical, serving as starting points for your own visualizations.

## Directory Structure

- **basic/** - Simple implementations with minimal configuration
- **advanced/** - More complex examples with multiple features
- **customization/** - Examples showing how to extend and customize charts

## Basic Examples

These examples demonstrate the simplest implementations of each chart type:

- **bar-chart.tsx** - Basic bar chart with minimal configuration
- **line-chart.tsx** - Simple line chart for time series data
- **donut-chart.tsx** - Basic donut chart for proportional data

## Advanced Examples

These examples show more complex implementations with multiple features:

- **interactive-line-chart.tsx** - Line chart with custom tooltips and interactions
- **multi-series-bar.tsx** - Bar chart with multiple data series and animations
- **dashboard-example.tsx** - Multiple charts combined in a dashboard layout

## Customization Examples

These examples demonstrate how to extend and customize Canopy Charts:

- **custom-chart-type.tsx** - Creating a custom chart type (bubble chart)
- **custom-theme.tsx** - Implementing a custom theme for consistent styling
- **d3-extensions.tsx** - Using direct D3 access for advanced customization

## How to Use These Examples

1. **Browse the code** - Each example is heavily commented to explain what's happening
2. **Copy and adapt** - Use these examples as starting points for your own visualizations
3. **Experiment** - Try modifying the examples to see how different configurations work

## Working with LLMs

These examples are designed to be LLM-friendly. When asking an LLM to help you customize a chart, you can:

1. Share the relevant example code
2. Describe your specific customization needs
3. Ask the LLM to adapt the example for your use case

For more guidance on working with LLMs, see the [LLM-GUIDE.md](../LLM-GUIDE.md) in the root directory.

## Running the Examples

To run these examples locally:

```bash
# Clone the repository
git clone https://github.com/cbarrett3/canopy-charts.git
cd canopy-charts

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then navigate to the examples in your browser at `http://localhost:3000/examples`.
