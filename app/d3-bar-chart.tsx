"use client"

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { defaultThemeColor } from './utils/colors';

interface DataPoint {
   label: string;
   value: number;
}

type ChartStyle = 'evergreen' | 'palm' | 'bamboo' | 'willow' | 'succulent' | 'modern';

interface D3BarChartProps {
   width?: number;
   height?: number;
   data?: DataPoint[];
   title?: string;
   themeColor?: string;
   vibe?: ChartStyle;
}

const chartStyles: Record<ChartStyle, {
   shapes: {
      cornerRadius: number;
   };
   interactivity: {
      hoverDuration: number;
      activeScale: number;
   };
   animation: {
      duration: number;
      delay: (d: any, i: number) => number;
      type: string;
   };
}> = {
   modern: {
      shapes: { cornerRadius: 8 },
      interactivity: { hoverDuration: 200, activeScale: 1.1 },
      animation: {
         duration: 750,
         delay: (_, i) => i * 50,
         type: 'fromBottom'
      }
   },
   evergreen: {
      shapes: { cornerRadius: 4 },
      interactivity: { hoverDuration: 200, activeScale: 1.1 },
      animation: {
         duration: 750,
         delay: (_, i) => i * 50,
         type: 'fromBottom'
      }
   },
   palm: {
      shapes: { cornerRadius: 8 },
      interactivity: { hoverDuration: 300, activeScale: 1.15 },
      animation: {
         duration: 1000,
         delay: (_, i) => i * 100,
         type: 'wave'
      }
   },
   bamboo: {
      shapes: { cornerRadius: 0 },
      interactivity: { hoverDuration: 150, activeScale: 1.05 },
      animation: {
         duration: 600,
         delay: (_, i) => i * 30,
         type: 'segments'
      }
   },
   willow: {
      shapes: { cornerRadius: 12 },
      interactivity: { hoverDuration: 400, activeScale: 1.2 },
      animation: {
         duration: 1200,
         delay: (_, i) => i * 150,
         type: 'cascade'
      }
   },
   succulent: {
      shapes: { cornerRadius: 20 },
      interactivity: { hoverDuration: 250, activeScale: 1.08 },
      animation: {
         duration: 800,
         delay: (_, i) => Math.pow(i, 2) * 20,
         type: 'spiral'
      }
   }
};

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
   themeColor = defaultThemeColor,
   vibe = 'evergreen'
}) => {
   const svgRef = useRef<SVGSVGElement | null>(null);
   const tooltip = useRef<HTMLDivElement | null>(null);

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

      // Add bars with style-specific animations
      const bars = svg.selectAll('rect')
         .data(data)
         .join('rect')
         .attr('x', (d: DataPoint) => xScale(d.label) ?? 0)
         .attr('width', xScale.bandwidth())
         .attr('fill', themeColor)
         .attr('rx', chartStyles[vibe]?.shapes.cornerRadius || 0);

      // Apply style-specific animations
      const style = chartStyles[vibe] || chartStyles.modern;
      switch (style.animation.type) {
         case 'fromBottom':
            // Evergreen: Sharp upward growth
            bars.attr('y', height - margin.bottom)
               .attr('height', 0)
               .transition()
               .duration(style.animation.duration)
               .delay(style.animation.delay)
               .ease(d3.easeExpOut)
               .attr('y', (d: DataPoint) => yScale(d.value) ?? height - margin.bottom)
               .attr('height', (d: DataPoint) => {
                  const y = yScale(d.value);
                  return y != null ? height - margin.bottom - y : 0;
               });
            break;

         case 'wave':
            // Palm: Flowing wave motion
            bars.attr('y', height)
               .attr('height', 0)
               .attr('transform', 'skewX(45)')
               .transition()
               .duration(style.animation.duration)
               .delay(style.animation.delay)
               .ease(d3.easeBounceOut)
               .attr('y', (d: DataPoint) => yScale(d.value) ?? height - margin.bottom)
               .attr('height', (d: DataPoint) => {
                  const y = yScale(d.value);
                  return y != null ? height - margin.bottom - y : 0;
               })
               .attr('transform', 'skewX(0)');
            break;

         case 'segments':
            // Bamboo: Segment by segment growth
            const segmentCount = 5;
            const segmentDuration = style.animation.duration / segmentCount;
            let transition = bars
               .attr('y', height - margin.bottom)
               .attr('height', 0)
               .style('opacity', 0.3);
            
            for (let i = 0; i < segmentCount; i++) {
               const progress = (i + 1) / segmentCount;
               transition = transition
                  .transition()
                  .duration(segmentDuration)
                  .delay((_, index) => style.animation.delay(_, index) + (i * 50))
                  .style('opacity', 0.3 + (0.7 * progress))
                  .attr('y', (d: DataPoint) => {
                     const targetY = yScale(d.value) ?? height - margin.bottom;
                     const currentHeight = height - margin.bottom - targetY;
                     return height - margin.bottom - (currentHeight * progress);
                  })
                  .attr('height', (d: DataPoint) => {
                     const y = yScale(d.value);
                     const fullHeight = y != null ? height - margin.bottom - y : 0;
                     return fullHeight * progress;
                  });
            }
            break;

         case 'cascade':
            // Willow: Gentle cascade with swaying
            bars.attr('y', (d: DataPoint) => yScale(d.value) ?? height - margin.bottom)
               .attr('height', (d: DataPoint) => {
                  const y = yScale(d.value);
                  return y != null ? height - margin.bottom - y : 0;
               })
               .attr('transform', 'scale(0.5, 0) translate(0, 100) rotate(10)')
               .style('opacity', 0)
               .transition()
               .duration(style.animation.duration)
               .delay(style.animation.delay)
               .ease(d3.easeElasticOut.amplitude(1).period(0.5))
               .attr('transform', 'scale(1, 1) translate(0, 0) rotate(0)')
               .style('opacity', 1);
            break;

         case 'spiral':
            // Succulent: Spiral unfold with scale
            bars.attr('y', (d: DataPoint) => yScale(d.value) ?? height - margin.bottom)
               .attr('height', (d: DataPoint) => {
                  const y = yScale(d.value);
                  return y != null ? height - margin.bottom - y : 0;
               })
               .attr('transform', (_, i) => `scale(0) rotate(${180 + (i * 45)})`)
               .style('opacity', 0)
               .transition()
               .duration(style.animation.duration)
               .delay(style.animation.delay)
               .ease(d3.easeBackOut.overshoot(2.5))
               .attr('transform', 'scale(1) rotate(0)')
               .style('opacity', 1);
            break;
      }

      // Add labels with matching animations
      const labels = svg.selectAll('.value-label')
         .data(data)
         .join('text')
         .attr('class', 'value-label')
         .attr('x', d => (xScale(d.label) ?? 0) + xScale.bandwidth() / 2)
         .attr('text-anchor', 'middle')
         .attr('fill', '#666')
         .text(d => d.value)
         .style('opacity', 0);

      // Animate labels with style-specific animations
      switch (style.animation.type) {
         case 'fromBottom':
         case 'wave':
            labels.attr('y', height - margin.bottom)
               .transition()
               .duration(style.animation.duration / 2)
               .delay((_, i) => style.animation.delay(_, i) + style.animation.duration)
               .attr('y', d => (yScale(d.value) ?? height - margin.bottom) - 5)
               .style('opacity', 1);
            break;
         case 'segments':
            labels.attr('y', d => (yScale(d.value) ?? height - margin.bottom) - 5)
               .transition()
               .duration(style.animation.duration)
               .delay((_, i) => style.animation.delay(_, i) + (style.animation.duration / 2))
               .style('opacity', 1);
            break;
         case 'cascade':
            labels.attr('y', d => (yScale(d.value) ?? height - margin.bottom) - 5)
               .attr('transform', 'translate(0, 20) scale(0.8)')
               .transition()
               .duration(style.animation.duration / 2)
               .delay((_, i) => style.animation.delay(_, i) + style.animation.duration)
               .attr('transform', 'translate(0, 0) scale(1)')
               .style('opacity', 1);
            break;
         case 'spiral':
            labels.attr('y', d => (yScale(d.value) ?? height - margin.bottom) - 5)
               .attr('transform', 'scale(0) rotate(180)')
               .transition()
               .duration(style.animation.duration / 2)
               .delay((_, i) => style.animation.delay(_, i) + style.animation.duration)
               .attr('transform', 'scale(1) rotate(0)')
               .style('opacity', 1);
            break;
      }

      // Add hover effects
      bars.on('mouseover', function(event, d) {
         const config = chartStyles[vibe] || chartStyles.modern;
         d3.select(this)
            .transition()
            .duration(config.interactivity.hoverDuration)
            .attr('opacity', 0.8)
            .attr('transform', `scale(1, ${config.interactivity.activeScale})`);
         
         tooltip.current && d3.select(tooltip.current)
            .style('visibility', 'visible')
            .html(`Value: ${d.value}`);
      })
      .on('mousemove', (event) => {
         tooltip.current && d3.select(tooltip.current)
            .style('top', `${event.pageY - 10}px`)
            .style('left', `${event.pageX + 10}px`);
      })
      .on('mouseout', function() {
         const config = chartStyles[vibe] || chartStyles.modern;
         d3.select(this)
            .transition()
            .duration(config.interactivity.hoverDuration)
            .attr('opacity', 1)
            .attr('transform', 'scale(1, 1)');
         
         tooltip.current && d3.select(tooltip.current)
            .style('visibility', 'hidden');
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
   }, [data, width, height, title, themeColor, vibe]);

   return (
      <div style={{ width: '100%', height: '100%' }}>
         <svg
            ref={svgRef}
            style={{ width: '100%', height: '100%' }}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
         />
         <div
            ref={tooltip}
            style={{
               position: 'absolute',
               visibility: 'hidden',
               backgroundColor: 'rgba(0, 0, 0, 0.7)',
               color: '#fff',
               padding: '5px',
               borderRadius: '5px',
               fontSize: '12px'
            }}
         />
      </div>
   );
};

export default D3BarChart;
