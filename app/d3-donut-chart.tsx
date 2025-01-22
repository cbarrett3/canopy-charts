"use client"

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { applyChartStyle, getTransitionConfig, getShapeConfig } from './styles/chart-styles';
import { defaultThemeColor, generateColorVariations } from './utils/colors';

interface DataPoint {
   label: string;
   value: number;
}

interface D3DonutChartProps {
   width?: number;
   height?: number;
   data?: DataPoint[];
   title?: string;
   themeColor?: string;
   chartStyle?: string;
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
   themeColor = defaultThemeColor,
   chartStyle = 'evergreen'
}) => {
   const svgRef = useRef<SVGSVGElement | null>(null);
   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

      const arc = d3
         .arc<d3.PieArcDatum<DataPoint>>()
         .innerRadius(radius * 0.6) // Donut hole size
         .outerRadius(radius * 0.9)
         .cornerRadius(getShapeConfig(chartStyle).cornerRadius);

      const pie = d3
         .pie<DataPoint>()
         .value(d => d.value)
         .sort(null);

      const arcs = pie(data);

      // Create or update chart group
      const chartGroup = g.selectAll('g.chart-group').data([null]);
      const chartGroupEnter = chartGroup.enter().append('g').attr('class', 'chart-group');
      const chartGroupMerge = chartGroup.merge(chartGroupEnter);

      // Create or update paths
      const paths = chartGroupMerge.selectAll('path')
         .data(arcs, (d: any) => d.data.label);

      // Enter new paths
      const pathsEnter = paths.enter().append('path')
         .attr('fill', (d: any, i) => color(d.data.label))
         .attr('d', arc as any)
         .style('opacity', 0)
         .on('mouseenter', function(event, d) {
            const index = arcs.indexOf(d);
            setHoveredIndex(index);

            // Apply hover style
            applyChartStyle(d3.select(this), chartStyle, { 
               isHovered: true,
               animate: true 
            });
         })
         .on('mouseleave', function(event, d) {
            setHoveredIndex(null);

            // Remove hover style
            applyChartStyle(d3.select(this), chartStyle, { 
               isHovered: false,
               animate: true 
            });
         });

      // Update existing paths
      const { duration, ease } = getTransitionConfig(chartStyle);
      
      const pathsMerge = paths.merge(pathsEnter)
         .transition()
         .duration(duration)
         .ease(ease)
         .attr('d', arc as any)
         .style('opacity', 1);

      // Apply base style to all paths
      pathsMerge.each(function() {
         applyChartStyle(d3.select(this), chartStyle, { 
            animate: false 
         });
      });

      // Exit paths
      paths.exit()
         .transition()
         .duration(duration)
         .ease(ease)
         .style('opacity', 0)
         .remove();

      // Add labels
      const label = g
         .selectAll('text')
         .data(arcs)
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
            const pos = arc.centroid(d);
            pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
            return `translate(${pos})`;
         })
         .attr('text-anchor', d =>
            midAngle(d) < Math.PI ? 'start' : 'end'
         );

      // Add connecting lines
      g.selectAll('polyline')
         .data(arcs)
         .enter()
         .append('polyline')
         .attr('points', d => {
            const pos = arc.centroid(d);
            pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
            const points = [arc.centroid(d), arc.centroid(d), pos];
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

   }, [data, width, height, title, themeColor, chartStyle]);

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

export default D3DonutChart;
