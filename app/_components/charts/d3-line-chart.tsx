"use client"

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { defaultThemeColor } from '@/app/_components/charts/utils/colors';
import { useChartDimensions } from '@/app/_components/charts/hooks/use-chart-dimensions';
import { ChartStyle } from './types';
import { withLoading } from './with-loading';

interface DataPoint {
   name: string;
   [key: string]: string | number; // Allow any string key for multiple series
}

interface D3LineChartProps {
   data?: DataPoint[];
   datasets?: string[]; // Array of dataset keys to plot
   themeColor?: string;
   vibe?: ChartStyle;
   showAxes?: boolean;
   showGrid?: boolean;
   showLabels?: boolean;
   labelSize?: number;
   showTitle?: boolean;
   showLegend?: boolean;
   showTooltips?: boolean;
}

const D3LineChart: React.FC<D3LineChartProps> = ({
   data = [
      { name: 'Jan', value: 30 },
      { name: 'Feb', value: 45 },
      { name: 'Mar', value: 25 },
      { name: 'Apr', value: 60 },
      { name: 'May', value: 35 },
      { name: 'Jun', value: 50 }
   ],
   datasets = ['value'],
   themeColor = defaultThemeColor,
   vibe = 'evergreen',
   showAxes = true,
   showGrid = true,
   showLabels = true,
   labelSize = 12,
   showTitle = true,
   showLegend = true,
   showTooltips = true
}) => {
   const svgRef = useRef<SVGSVGElement>(null);
   const { dimensions, containerRef } = useChartDimensions({
      marginTop: 20,
      marginRight: 20,
      marginBottom: 40,
      marginLeft: 40
   });

   useEffect(() => {
      if (!svgRef.current || !dimensions.width || !dimensions.height) return;

      // Clear previous content
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      // Get all series keys (excluding 'name')
      const seriesKeys = datasets.filter(key => key in data[0]);

      // Set up scales
      const xScale = d3.scaleBand()
         .domain(data.map(d => d.name))
         .range([0, dimensions.boundedWidth])
         .padding(0.3);

      const yScale = d3.scaleLinear()
         .domain([0, d3.max(data, d => Math.max(...seriesKeys.map(key => Number(d[key])))) || 0])
         .range([dimensions.boundedHeight, 0])
         .nice();

      // Create the SVG group with margins
      const g = svg
         .attr('width', dimensions.width)
         .attr('height', dimensions.height)
         .append('g')
         .attr('transform', `translate(${dimensions.margin.left},${dimensions.margin.top})`);

      // Add grid lines if enabled
      if (showGrid) {
         g.append('g')
            .attr('class', 'grid')
            .call(
               d3.axisLeft(yScale)
                  .tickSize(-dimensions.boundedWidth)
                  .tickFormat(() => '')
            )
            .style('stroke', 'rgba(255,255,255,0.1)')
            .style('stroke-dasharray', '2,2');
      }

      // Create line generator
      const line = d3.line<any>()
         .x(d => (xScale(d.name) || 0) + xScale.bandwidth() / 2)
         .y(d => yScale(d.value))
         .curve(d3.curveCardinal.tension(0.4));

      // Add lines for each series
      seriesKeys.forEach((key, i) => {
         const seriesData = data.map(d => ({
            name: d.name,
            value: Number(d[key])
         }));

         // Add the line path
         const path = g.append('path')
            .datum(seriesData)
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', i === 0 ? themeColor : `${themeColor}${Math.round(80 - i * 20).toString(16)}`)
            .attr('stroke-width', 2)
            .attr('d', line);

         // Animate the line
         const pathLength = path.node()?.getTotalLength() || 0;
         path
            .attr('stroke-dasharray', `${pathLength} ${pathLength}`)
            .attr('stroke-dashoffset', pathLength)
            .transition()
            .duration(1000)
            .ease(d3.easeQuadOut)
            .attr('stroke-dashoffset', 0);

         // Add dots for each data point
         g.selectAll(`.dot-${key}`)
            .data(seriesData)
            .join('circle')
            .attr('class', `dot-${key}`)
            .attr('cx', d => (xScale(d.name) || 0) + xScale.bandwidth() / 2)
            .attr('cy', d => yScale(d.value))
            .attr('r', 0)
            .attr('fill', i === 0 ? themeColor : `${themeColor}${Math.round(80 - i * 20).toString(16)}`)
            .transition()
            .delay((_, i) => i * 100)
            .duration(500)
            .attr('r', 4);
      });

      // Add axes if enabled
      if (showAxes) {
         // X Axis
         g.append('g')
            .attr('transform', `translate(0,${dimensions.boundedHeight})`)
            .call(d3.axisBottom(xScale))
            .style('color', 'var(--text)')
            .style('font-size', `${labelSize}px`);

         // Y Axis
         g.append('g')
            .call(d3.axisLeft(yScale))
            .style('color', 'var(--text)')
            .style('font-size', `${labelSize}px`);
      }
   }, [data, dimensions, themeColor, showAxes, showGrid, showLabels, labelSize, datasets]);

   return (
      <div ref={containerRef} className="w-full h-full min-h-[300px]">
         <svg ref={svgRef} className="w-full h-full" />
      </div>
   );
};

export default withLoading(D3LineChart);
