import React, { useRef, memo } from 'react';
import * as d3 from 'd3';
import { useChartDimensions } from '../../_components/charts/hooks/use-chart-dimensions';
import { useChartScales } from '../../_components/charts/hooks/use-chart-scales';
import { useChartColors } from '../../_components/charts/hooks/use-chart-colors';
import { useChartAnimation } from '../../_components/charts/hooks/use-chart-animation';
import { useChartTooltip } from '../../_components/charts/hooks/use-chart-tooltip';
import { ChartAxis } from '../../_components/charts/components/chart-axis';
import { ChartGrid } from '../../_components/charts/components/chart-grid';
import { ChartTooltip } from '../../_components/charts/components/chart-tooltip';
import { ChartLines } from '../../_components/charts/components/chart-lines';
import { DataPoint, VibeType } from '../../_components/charts/types';

interface LineChartProps {
  data?: DataPoint[];
  datasets?: string[];
  themeColor?: string;
  vibe?: VibeType;
  showAxes?: boolean;
  showGrid?: boolean;
  showTooltips?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const LineChart = memo(({
  data = [],
  datasets = [],
  themeColor = '#1A458E',
  vibe = 'default',
  showAxes = true,
  showGrid = true,
  showTooltips = true,
  width = '100%',
  height = 400,
  className
}: LineChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { dimensions } = useChartDimensions();
  const { xScale, yScale } = useChartScales({ data, dimensions, datasets });
  const colors = useChartColors({
    baseColor: themeColor,
    count: datasets.length,
    scheme: 'monochromatic'
  });
  const { tooltipData, handleMouseMove, handleMouseLeave } = useChartTooltip(xScale);

  useChartAnimation(svgRef, datasets, vibe);

  return (
    <div 
      ref={containerRef}
      className={`canopy-chart ${className || ''}`}
      style={{ width, height }}
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
              gridColor="rgba(105, 105, 105, 0.1)"
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
                axisColor="rgba(105, 105, 105, 0.8)"
                labelColor="rgba(105, 105, 105, 0.8)"
                labelSize={12}
                showLabels={true}
              />
              <ChartAxis
                dimensions={dimensions}
                scale={yScale}
                type="y"
                axisColor="rgba(105, 105, 105, 0.8)"
                labelColor="rgba(105, 105, 105, 0.8)"
                labelSize={12}
                showLabels={true}
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
          backgroundColor="#1A458E"
          textColor="white"
        />
      )}
    </div>
  );
});

LineChart.displayName = 'LineChart';
