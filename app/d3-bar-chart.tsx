"use client"

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { defaultThemeColor } from './utils/colors';

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
}

const D3BarChart: React.FC<D3BarChartProps> = ({
   width = 500,
   height = 275,
   data = [
      { label: 'A', value: 10 },
      { label: 'B', value: 20 },
      { label: 'C', value: 15 },
      { label: 'D', value: 25 },
      { label: 'E', value: 18 },
   ],
   title,
   themeColor = defaultThemeColor
}) => {
   const svgRef = useRef<SVGSVGElement | null>(null);

   useEffect(() => {
      if (!svgRef.current) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      // Create scales
      const xScale = d3
         .scaleBand()
         .domain(data.map(d => d.label))
         .range([0, innerWidth])
         .padding(0.3);

      const yScale = d3
         .scaleLinear()
         .domain([0, d3.max(data, d => d.value)!])
         .range([innerHeight, 0]);

      const g = svg
         .append('g')
         .attr('transform', `translate(${margin.left},${margin.top})`);

      // Create gradient
      const gradient = g
         .append('defs')
         .append('linearGradient')
         .attr('id', 'bar-gradient')
         .attr('gradientUnits', 'userSpaceOnUse')
         .attr('x1', 0)
         .attr('y1', yScale(0))
         .attr('x2', 0)
         .attr('y2', yScale(d3.max(data, d => d.value)!));

      const color = d3.color(themeColor)!;
      gradient
         .append('stop')
         .attr('offset', '0%')
         .attr('stop-color', color.copy({ opacity: 0.3 }).toString());

      gradient
         .append('stop')
         .attr('offset', '100%')
         .attr('stop-color', color.copy({ opacity: 0.8 }).toString());

      // Add bars
      g.selectAll('.bar')
         .data(data)
         .enter()
         .append('rect')
         .attr('class', 'bar')
         .attr('x', d => xScale(d.label)!)
         .attr('y', innerHeight)
         .attr('width', xScale.bandwidth())
         .attr('height', 0)
         .attr('fill', 'url(#bar-gradient)')
         .attr('rx', 4) // Rounded corners
         .transition()
         .duration(750)
         .attr('y', d => yScale(d.value))
         .attr('height', d => innerHeight - yScale(d.value));

      // Add hover effects
      g.selectAll('.bar')
         .on('mouseover', function() {
            d3.select(this)
               .transition()
               .duration(200)
               .attr('fill', themeColor);
         })
         .on('mouseout', function() {
            d3.select(this)
               .transition()
               .duration(200)
               .attr('fill', 'url(#bar-gradient)');
         });

      // Add axes
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      g.append('g')
         .attr('transform', `translate(0,${innerHeight})`)
         .attr('class', 'x-axis')
         .call(xAxis)
         .attr('color', 'white')
         .attr('opacity', 0.5);

      g.append('g')
         .attr('class', 'y-axis')
         .call(yAxis)
         .attr('color', 'white')
         .attr('opacity', 0.5);

      // Add title if provided
      if (title) {
         svg.append('text')
            .attr('x', width / 2)
            .attr('y', margin.top / 2)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .text(title);
      }

      // Add value labels on top of bars
      g.selectAll('.value-label')
         .data(data)
         .enter()
         .append('text')
         .attr('class', 'value-label')
         .attr('x', d => xScale(d.label)! + xScale.bandwidth() / 2)
         .attr('y', d => yScale(d.value) - 5)
         .attr('text-anchor', 'middle')
         .attr('fill', 'white')
         .attr('opacity', 0.8)
         .text(d => d.value);

   }, [data, width, height, title, themeColor]);

   return (
      <div style={{ width: '100%', height: '100%' }}>
         <svg
            ref={svgRef}
            style={{ width: '100%', height: '100%' }}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
         />
      </div>
   );
};

export default D3BarChart;
