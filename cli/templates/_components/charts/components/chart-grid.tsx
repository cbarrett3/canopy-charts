import React, { memo } from 'react';
import * as d3 from 'd3';
import { ChartDimensions } from '../types';

interface ChartGridProps {
  dimensions: ChartDimensions;
  yScale: d3.ScaleLinear<number, number>;
  gridColor: string;
}

export const ChartGrid = memo(({ dimensions, yScale, gridColor }: ChartGridProps) => {
  const ticks = yScale.ticks(5);

  return (
    <g className="grid" role="presentation">
      {ticks.map((tick) => (
        <line
          key={tick}
          x1={0}
          x2={dimensions.boundedWidth}
          y1={yScale(tick)}
          y2={yScale(tick)}
          stroke={gridColor}
          strokeDasharray="2,2"
        />
      ))}
    </g>
  );
});

ChartGrid.displayName = 'ChartGrid';
