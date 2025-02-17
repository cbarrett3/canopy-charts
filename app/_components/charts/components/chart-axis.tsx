import React, { memo, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ChartDimensions } from '../types';

interface ChartAxisProps {
  dimensions: ChartDimensions;
  scale: d3.ScaleBand<string> | d3.ScaleLinear<number, number>;
  type: 'x' | 'y';
  label?: string;
  axisColor: string;
  labelColor: string;
  labelSize: number;
  showLabels: boolean;
}

export const ChartAxis = memo(({
  dimensions,
  scale,
  type,
  label,
  axisColor,
  labelColor,
  labelSize,
  showLabels,
}: ChartAxisProps) => {
  const axisRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!axisRef.current) return;

    const isXAxis = type === 'x';
    const axis = isXAxis
      ? d3.axisBottom(scale as d3.ScaleBand<string>)
      : d3.axisLeft(scale as d3.ScaleLinear<number, number>);

    d3.select(axisRef.current)
      .call(axis)
      .style('color', axisColor)
      .style('font-size', `${labelSize}px`);

    // Style the axis lines and ticks
    d3.select(axisRef.current)
      .selectAll('line')
      .style('stroke', axisColor);

    d3.select(axisRef.current)
      .selectAll('path')
      .style('stroke', axisColor);

    d3.select(axisRef.current)
      .selectAll('text')
      .style('fill', labelColor)
      .style('font-size', `${labelSize}px`);
  }, [scale, type, axisColor, labelColor, labelSize]);

  const isXAxis = type === 'x';

  return (
    <g
      className={`axis axis-${type}`}
      transform={
        isXAxis
          ? `translate(0,${dimensions.boundedHeight})`
          : 'translate(0,0)'
      }
      ref={axisRef}
      role="presentation"
    >
      {showLabels && label && (
        <text
          className="axis-label"
          style={{ fill: labelColor, fontSize: labelSize }}
          transform={
            isXAxis
              ? `translate(${dimensions.boundedWidth / 2},${
                  dimensions.margin.bottom - 10
                })`
              : `translate(${-dimensions.margin.left + 20},${
                  dimensions.boundedHeight / 2
                }) rotate(-90)`
          }
          textAnchor="middle"
        >
          {label}
        </text>
      )}
    </g>
  );
});

ChartAxis.displayName = 'ChartAxis';
