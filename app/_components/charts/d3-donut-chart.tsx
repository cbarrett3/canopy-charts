"use client"

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { defaultThemeColor, generateColorVariations } from '@/app/_components/charts/utils/colors';
import { useChartDimensions } from '@/app/_components/charts/hooks/use-chart-dimensions';
import { ChartStyle, ChartOptions } from './types';
import { withLoading } from './with-loading';

interface DataPoint {
   label: string;
   value: number;
}

interface D3DonutChartProps extends ChartOptions {
   width?: number;
   height?: number;
   data?: DataPoint[];
   themeColor?: string;
   vibe?: ChartStyle;
}

const D3DonutChart: React.FC<D3DonutChartProps> = ({
   width = 500,
   height = 275,
   data = [
      { label: 'A', value: 30 },
      { label: 'B', value: 20 },
      { label: 'C', value: 25 },
      { label: 'D', value: 15 },
      { label: 'E', value: 10 },
   ],
   title,
   themeColor = defaultThemeColor
}) => {
   const svgRef = useRef<SVGSVGElement | null>(null);

   useEffect(() => {
      if (!svgRef.current) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

      const margin = { top: 20, right: 20, bottom: 20, left: 20 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      const radius = Math.min(innerWidth, innerHeight) / 2;

      const g = svg
         .append('g')
         .attr(
            'transform',
            `translate(${width / 2},${height / 2})`
         );

      // Generate theme-based colors
      const colors = generateColorVariations(themeColor, data.length);
      const color = d3.scaleOrdinal(colors);

      const pie = d3
         .pie<DataPoint>()
         .value(d => d.value)
         .sort(null);

      const arc = d3
         .arc<d3.PieArcDatum<DataPoint>>()
         .innerRadius(radius * 0.6) // Donut hole size
         .outerRadius(radius * 0.9);

      const outerArc = d3
         .arc<d3.PieArcDatum<DataPoint>>()
         .innerRadius(radius * 0.9)
         .outerRadius(radius * 0.9);

      // Add the arcs
      const path = g
         .selectAll('path')
         .data(pie(data))
         .enter()
         .append('path')
         .attr('d', arc)
         .attr('fill', d => color(d.data.label))
         .attr('stroke', 'white')
         .attr('stroke-width', 2)
         .attr('opacity', 0.8)
         .on('mouseover', function() {
            d3.select(this)
               .transition()
               .duration(200)
               .attr('opacity', 1)
               .attr('outerRadius', radius * 0.95);
         })
         .on('mouseout', function() {
            d3.select(this)
               .transition()
               .duration(200)
               .attr('opacity', 0.8)
               .attr('outerRadius', radius * 0.9);
         });

      // Add labels
      const label = g
         .selectAll('text')
         .data(pie(data))
         .enter()
         .append('text')
         .attr('dy', '.35em');

      label
         .append('tspan')
         .attr('x', 0)
         .attr('y', '-0.7em')
         .text(d => d.data.label)
         .attr('fill', 'white')
         .attr('text-anchor', 'middle')
         .style('font-size', '12px');

      label
         .append('tspan')
         .attr('x', 0)
         .attr('y', '0.7em')
         .text(d => d.data.value)
         .attr('fill', 'white')
         .attr('text-anchor', 'middle')
         .style('font-size', '12px');

      function midAngle(d: d3.PieArcDatum<DataPoint>) {
         return d.startAngle + (d.endAngle - d.startAngle) / 2;
      }

      label
         .attr('transform', d => {
            const pos = outerArc.centroid(d);
            pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
            return `translate(${pos})`;
         })
         .attr('text-anchor', d =>
            midAngle(d) < Math.PI ? 'start' : 'end'
         );

      // Add connecting lines
      g.selectAll('polyline')
         .data(pie(data))
         .enter()
         .append('polyline')
         .attr('points', d => {
            const pos = outerArc.centroid(d);
            pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
            const points = [arc.centroid(d), outerArc.centroid(d), pos];
            return points.map(p => p.join(',')).join(' ');
         })
         .attr('stroke', 'white')
         .attr('fill', 'none')
         .attr('opacity', 0.3);

      // Add title if provided
      if (title) {
         svg.append('text')
            .attr('x', width / 2)
            .attr('y', margin.top)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .text(title);
      }

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

export default withLoading(D3DonutChart);
