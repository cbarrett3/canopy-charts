import React, { memo, useCallback } from 'react';
import * as d3 from 'd3';
import { DataPoint } from '../types';

interface ChartLinesProps {
  data: DataPoint[];
  datasets: string[];
  colors: string[];
  xScale: d3.ScaleBand<string>;
  yScale: d3.ScaleLinear<number, number>;
  onMouseMove: (event: React.MouseEvent<SVGPathElement>, dataset: string) => void;
}

export const ChartLines = memo(({
  data,
  datasets,
  colors,
  xScale,
  yScale,
  onMouseMove,
}: ChartLinesProps) => {
  const createLineGenerator = useCallback((dataset: string) => 
    d3.line<DataPoint>()
      .x(d => xScale(d.name)! + xScale.bandwidth() / 2)
      .y(d => yScale(d[dataset] as number))
      .curve(d3.curveMonotoneX),
    [xScale, yScale]
  );

  return (
    <g className="chart-lines">
      {datasets.map((dataset, i) => {
        const lineGen = createLineGenerator(dataset);
        return (
          <path
            key={dataset}
            className={`line line-${dataset}`}
            d={lineGen(data)!}
            fill="none"
            stroke={colors[i]}
            strokeWidth={2}
            onMouseMove={(e) => onMouseMove(e, dataset)}
            style={{ transition: 'all 0.3s ease' }}
          />
        );
      })}
    </g>
  );
});

ChartLines.displayName = 'ChartLines';
