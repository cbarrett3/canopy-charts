"use client"

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { defaultThemeColor } from '@/app/_components/charts/utils/colors';
import { useChartDimensions } from '@/app/_components/charts/hooks/use-chart-dimensions';
import { ChartStyle } from './types';
import { withLoading } from './with-loading';

interface DataPoint {
   name: string;
   value: number;
}

interface D3LineChartProps {
   data?: DataPoint[];
   themeColor?: string;
   vibe?: ChartStyle;
   showAxes?: boolean;
   showGrid?: boolean;
   showLabels?: boolean;
   labelSize?: number;
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
         .domain(data.map(d => d.name))
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

      // Create line generator
      const line = d3.line<DataPoint>()
         .x(d => (xScale(d.name) || 0) + xScale.bandwidth() / 2)
         .y(d => yScale(d.value))
         .curve(d3.curveMonotoneX);

      // Add the line path
      const path = g.append('path')
         .datum(data)
         .attr('class', 'line')
         .attr('fill', 'none')
         .attr('stroke', themeColor)
         .attr('stroke-width', 2)
         .attr('d', line)
         .style('opacity', 0);

      // Animate the line
      const pathLength = path.node()?.getTotalLength() || 0;
      path
         .attr('stroke-dasharray', `${pathLength} ${pathLength}`)
         .attr('stroke-dashoffset', pathLength)
         .style('opacity', 1)
         .transition()
         .duration(1500)
         .ease(d3.easeQuadOut)
         .attr('stroke-dashoffset', 0);

      // Add dots at each data point
      g.selectAll('.dot')
         .data(data)
         .join('circle')
         .attr('class', 'dot')
         .attr('cx', d => (xScale(d.name) || 0) + xScale.bandwidth() / 2)
         .attr('cy', d => yScale(d.value))
         .attr('r', 4)
         .attr('fill', themeColor)
         .style('opacity', 0)
         .transition()
         .delay((_, i) => i * 100)
         .duration(500)
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
         aria-label="Line chart visualization"
      >
         <svg
            ref={svgRef}
            style={{ width: '100%', height: '100%', overflow: 'visible' }}
         />
      </div>
   );
};

export default withLoading(D3LineChart);
