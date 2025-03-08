# Canopy Charts Architecture

This document outlines the core architecture of Canopy Charts, designed with the **code-ownership model** in mind.

## Code Ownership Philosophy

Canopy Charts is built on the principle that developers should have complete ownership and control over their visualization code. Unlike traditional libraries that hide implementation details behind APIs, Canopy Charts is designed to be:

- **Transparent** - All code is accessible and modifiable
- **Extensible** - Every component can be customized or extended
- **Comprehensible** - Code is structured to be easily understood
- **LLM-friendly** - Organization optimized for AI assistance

## Core Architecture

The architecture is organized around these key components:

```
components/           # Core visualization components
├── bar-chart/        # Bar chart implementation
│   ├── component.tsx # Main component
│   ├── types.ts      # TypeScript interfaces
│   └── utils.ts      # Chart-specific utilities
├── line-chart/       # Line chart implementation
│   └── ...
└── shared/           # Shared components (axes, legends, etc.)

hooks/                # React hooks for chart functionality
├── use-dimensions.ts # Responsive sizing hook
├── use-animation.ts  # Animation control hook
└── ...

utils/                # Utility functions
├── data-processing/  # Data transformation utilities
├── scales/           # Scale generation utilities
└── ...

themes/               # Theme definitions
├── modern.ts         # Modern theme
├── evergreen.ts      # Evergreen theme
└── ...
```

## Component Design

Each chart component follows a consistent pattern:

1. **Props Interface** - Clear TypeScript interface defining all options
2. **Component Implementation** - React component with D3 integration
3. **Utility Functions** - Helper functions for data processing and rendering
4. **Extension Points** - Clearly marked areas for customization

## Data Flow

1. **Input Data** → Component receives data through props
2. **Data Processing** → Data is transformed into a format suitable for visualization
3. **Scale Generation** → Scales are created based on data and configuration
4. **Rendering** → D3 is used to render the visualization
5. **Interaction** → Event handlers manage user interactions

## Extension Patterns

Canopy Charts supports several patterns for extension:

1. **Configuration** - Using props to configure behavior
2. **Direct Modification** - Changing the component code directly
3. **Composition** - Building new components from existing ones
4. **D3 Integration** - Using the D3 instance for custom rendering

## Next Steps

- Explore the [examples directory](../examples/) for implementation ideas
- Check out the [customization guides](../guides/customization/) for detailed techniques
- See the [LLM Guide](../LLM-GUIDE.md) for working with AI assistants
