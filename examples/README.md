# Canopy Charts Examples

This directory contains examples demonstrating how to use and extend Canopy Charts through the **code-ownership model**. These examples serve as starting points that you can copy, modify, and extend for your own visualizations.

## Code Ownership Approach

Unlike traditional libraries where you're limited to the provided API, with Canopy Charts:

- You **own and modify** the code directly
- These examples are meant to be **copied and customized**
- You have **complete freedom** to change any aspect of the implementation
- The structure is designed for **easy extension**

## Directory Structure

- **basic/** - Simple implementations to get started
- **advanced/** - More complex examples showing multiple features
- **customization/** - Examples showing how to extend and create custom charts

## Key Examples

### Basic Examples

- [**bar-chart.tsx**](basic/bar-chart.tsx) - Simple bar chart implementation
- [**line-chart.tsx**](basic/line-chart.tsx) - Basic line chart for time series

### Advanced Examples

- [**interactive-line-chart.tsx**](advanced/interactive-line-chart.tsx) - Chart with tooltips and interactions
- [**dashboard-example.tsx**](advanced/dashboard-example.tsx) - Multiple charts in a dashboard

### Customization Examples

- [**custom-chart-type.tsx**](customization/custom-chart-type.tsx) - Creating a custom bubble chart
- [**custom-theme.tsx**](customization/custom-theme.tsx) - Implementing a custom theme

## Working with LLMs

When using an LLM to help customize these examples:

1. Share the relevant example code
2. Explain what you want to modify or extend
3. Ask for specific code changes you can implement

For more guidance, see the [LLM Guide](../LLM-GUIDE.md).

## Running the Examples

```bash
# Clone the repository
git clone https://github.com/cbarrett3/canopy-charts.git
cd canopy-charts

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then navigate to `http://localhost:3000/examples`.
