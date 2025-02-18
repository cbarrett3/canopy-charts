'use client'

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { defaultThemeColor } from '@/app/_components/charts/utils/colors';
import { useChartDimensions } from '@/app/_components/charts/hooks/use-chart-dimensions';
import { ChartStyle } from './types';
import { withLoading } from './with-loading';

interface DataPoint {
   label: string;
   value: number;
}

interface D3BarChartProps {
   width?: number;
   height?: number;
   data?: DataPoint[];
   title?: string;
   themeColor?: string;
   vibe?: ChartStyle;
   showAxes?: boolean;
   showGrid?: boolean;
   showLabels?: boolean;
   labelSize?: number;
}

const D3BarChart: React.FC<D3BarChartProps> = ({
   data = [
      { label: 'A', value: 30 },
      { label: 'B', value: 45 },
      { label: 'C', value: 25 },
      { label: 'D', value: 60 },
      { label: 'E', value: 35 }
   ],
   themeColor = defaultThemeColor,
   vibe = 'evergreen',
   showAxes = true,
   showGrid = true,
   showLabels = true,
   labelSize = 12
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

      // Set up scales
      const xScale = d3.scaleBand()
         .domain(data.map(d => d.label))
         .range([0, dimensions.boundedWidth])
         .padding(0.3);

      const yScale = d3.scaleLinear()
         .domain([0, d3.max(data, d => d.value) || 0])
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
            .call(d3.axisLeft(yScale)
               .tickSize(-dimensions.boundedWidth)
               .tickFormat('')
            )
            .style('stroke', 'rgba(255,255,255,0.1)')
            .style('stroke-dasharray', '2,2');
      }

      // Draw bars
      g.selectAll('.bar')
         .data(data)
         .join('rect')
         .attr('class', 'bar')
         .attr('x', d => xScale(d.label) || 0)
         .attr('y', d => yScale(d.value))
         .attr('width', xScale.bandwidth())
         .attr('height', d => dimensions.boundedHeight - yScale(d.value))
         .attr('fill', themeColor)
         .attr('rx', 4)
         .attr('ry', 4)
         .style('opacity', 0)
         .transition()
         .duration(750)
         .style('opacity', 1);

      // Add axes if enabled
      if (showAxes) {
         // X Axis
         const xAxis = g.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${dimensions.boundedHeight})`)
            .call(d3.axisBottom(xScale));

         if (showLabels) {
            xAxis.selectAll('text')
               .style('font-size', `${labelSize}px`)
               .style('fill', 'rgba(255,255,255,0.8)');
         }

         // Y Axis
         const yAxis = g.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(yScale));

         if (showLabels) {
            yAxis.selectAll('text')
               .style('font-size', `${labelSize}px`)
               .style('fill', 'rgba(255,255,255,0.8)');
         }

         // Style axis lines
         g.selectAll('.domain, .tick line')
            .style('stroke', 'rgba(255,255,255,0.2)');
      }

   }, [dimensions, data, themeColor, showAxes, showGrid, showLabels, labelSize]);

   return (
      <div 
         ref={containerRef} 
         style={{ width: '100%', height: '100%' }}
         role="figure" 
         aria-label="Bar chart visualization"
      >
         <svg
            ref={svgRef}
            style={{ width: '100%', height: '100%', overflow: 'visible' }}
         />
      </div>
   );
};

export default withLoading(D3BarChart);
