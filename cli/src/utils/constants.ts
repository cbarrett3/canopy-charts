export const CONFIG_FILES = [
  "canopy.config.json",
  "canopy.config.js",
  "canopy.config.cjs",
]

interface ChartInfo {
  name: string;
  description: string;
  category: string;
}

export const CHART_REGISTRY: Record<string, ChartInfo> = {
  'line-chart': {
    name: 'Line Chart',
    description: 'Trends over time',
    category: 'Time Series'
  },
  'bar-chart': {
    name: 'Bar Chart',
    description: 'Compare quantities',
    category: 'Comparison'
  },
  'donut-chart': {
    name: 'Donut Chart',
    description: 'Show proportions',
    category: 'Distribution'
  },
  'stacked-bar-chart': {
    name: 'Stacked Bar Chart',
    description: 'Parts of a whole',
    category: 'Composition'
  },
  'stream-chart': {
    name: 'Stream Chart',
    description: 'Changes over time',
    category: 'Time Series'
  },
  'tree-map': {
    name: 'Tree Map',
    description: 'Hierarchical data',
    category: 'Hierarchy'
  }
};

export type ChartType = keyof typeof CHART_REGISTRY;

export const REQUIRED_DEPENDENCIES: Record<string, string> = {
  'd3': '^7.8.5',
  'tailwindcss': '^3.3.0',
  '@types/d3': '^7.4.3',
  'react': '^18.0.0',
  'react-dom': '^18.0.0',
  '@types/react': '^18.0.0',
  '@types/react-dom': '^18.0.0',
  'typescript': '^5.0.0'
};

export const FRAMEWORKS = [
  {
    name: "next.js",
    display: "Next.js",
    color: "cyan",
  },
  {
    name: "react",
    display: "React",
    color: "blue",
  },
  {
    name: "remix",
    display: "Remix",
    color: "magenta",
  },
  {
    name: "astro",
    display: "Astro",
    color: "yellow",
  },
]
