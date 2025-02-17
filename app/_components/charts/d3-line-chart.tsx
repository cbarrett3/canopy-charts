"use client"

import React, { useRef, memo } from 'react';
import * as d3 from 'd3';
import { defaultThemeColor } from '@/app/_components/charts/utils/colors';
import { DataPoint, VibeType } from './types';
import { useChartDimensions } from './hooks/use-chart-dimensions';
import { useChartScales } from './hooks/use-chart-scales';
import { useChartColors, getChartColorScheme } from './hooks/use-chart-colors';
import { useChartAnimation } from './hooks/use-chart-animation';
import { useChartTooltip } from './hooks/use-chart-tooltip';
import { ChartAxis } from './components/chart-axis';
import { ChartGrid } from './components/chart-grid';
import { ChartTooltip } from './components/chart-tooltip';
import { ChartLines } from './components/chart-lines';

interface D3LineChartProps {
  data?: DataPoint[];
  datasets?: string[];
  axisColor?: string;
  tooltipBackgroundColor?: string;
  tooltipTextColor?: string;
  gridColor?: string;
  labelColor?: string;
  xAxisTitle?: string;
  yAxisTitle?: string;
  themeColor?: string;
  vibe?: VibeType;
  showAxes?: boolean;
  showGrid?: boolean;
  showLabels?: boolean;
  showTooltips?: boolean;
  labelSize?: number;
}

const D3LineChart = memo(({
  data = [
    { name: 'oceans', dataset1: 50, dataset2: 40 },
    { name: 'forests', dataset1: 70, dataset2: 65 },
    { name: 'deserts', dataset1: 90, dataset2: 80 },
  ],
  datasets = ['dataset1', 'dataset2'],
  axisColor = 'rgba(105, 105, 105, 0.8)',
  tooltipBackgroundColor = '#1A458E',
  tooltipTextColor = 'white',
  gridColor = 'rgba(105, 105, 105, 0.1)',
  labelColor = 'rgba(105, 105, 105, 0.8)',
  xAxisTitle,
  yAxisTitle,
  themeColor = defaultThemeColor,
  vibe = 'default',
  showAxes = true,
  showGrid = true,
  showLabels = true,
  showTooltips = true,
  labelSize = 12
}: D3LineChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Custom hooks
  const { dimensions, updateDimensions } = useChartDimensions();
  const { xScale, yScale } = useChartScales({ data, dimensions, datasets });
  const colors = useChartColors({
    baseColor: themeColor,
    count: datasets.length,
    scheme: getChartColorScheme('line')
  });
  const { tooltipData, handleMouseMove, handleMouseLeave } = useChartTooltip(xScale);

  // Apply animations
  useChartAnimation(svgRef, datasets, vibe);

  return (
    <div 
      ref={containerRef} 
      style={{ width: '100%', height: '400px' }}
      role="figure" 
      aria-label="Line chart visualization"
    >
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ overflow: 'visible' }}
      >
        <g transform={`translate(${dimensions.margin.left},${dimensions.margin.top})`}>
          {showGrid && (
            <ChartGrid
              dimensions={dimensions}
              yScale={yScale}
              gridColor={gridColor}
            />
          )}

          <ChartLines
            data={data}
            datasets={datasets}
            colors={colors}
            xScale={xScale}
            yScale={yScale}
            onMouseMove={(e, dataset) => handleMouseMove(e, dataset, data)}
          />

          {showAxes && (
            <>
              <ChartAxis
                dimensions={dimensions}
                scale={xScale}
                type="x"
                label={xAxisTitle}
                axisColor={axisColor}
                labelColor={labelColor}
                labelSize={labelSize}
                showLabels={showLabels}
              />
              <ChartAxis
                dimensions={dimensions}
                scale={yScale}
                type="y"
                label={yAxisTitle}
                axisColor={axisColor}
                labelColor={labelColor}
                labelSize={labelSize}
                showLabels={showLabels}
              />
            </>
          )}
        </g>
      </svg>

      {showTooltips && tooltipData && (
        <ChartTooltip
          data={tooltipData.data}
          datasets={datasets}
          position={tooltipData.position}
          visible={true}
          backgroundColor={tooltipBackgroundColor}
          textColor={tooltipTextColor}
        />
      )}
    </div>
  );
});

D3LineChart.displayName = 'D3LineChart';

export default D3LineChart;
