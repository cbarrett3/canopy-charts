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
   animation: {
      duration: number;
      delay: (d: any, i: number) => number;
      type: 'fromBottom' | 'wave' | 'segments' | 'cascade' | 'spiral';
   };
   interactivity: {
      hoverDuration: number;
      hoverEffect: 'scale' | 'glow' | 'bounce' | 'sway' | 'pulse' | 'twist';
      activeScale: number;
      glowColor?: string;
      glowRadius?: number;
   };
}> = {
   modern: {
      shapes: { cornerRadius: 6 },
      animation: {
         duration: 1000,
         delay: (_, i) => i * 100,
         type: 'fromBottom'
      },
      interactivity: {
         hoverDuration: 200,
         hoverEffect: 'scale',
         activeScale: 1.1
      }
   },
   evergreen: {
      shapes: { cornerRadius: 4 },
      animation: {
         duration: 1000,
         delay: (_, i) => i * 100,
         type: 'fromBottom'
      },
      interactivity: {
         hoverDuration: 150,
         hoverEffect: 'glow',
         activeScale: 1.0,
         glowColor: '#4CAF50',
         glowRadius: 4
      }
   },
   palm: {
      shapes: { cornerRadius: 8 },
      animation: {
         duration: 1200,
         delay: (_, i) => i * 120,
         type: 'wave'
      },
      interactivity: {
         hoverDuration: 400,
         hoverEffect: 'sway',
         activeScale: 1.0
      }
   },
   bamboo: {
      shapes: { cornerRadius: 0 },
      animation: {
         duration: 1500,
         delay: (_, i) => i * 150,
         type: 'segments'
      },
      interactivity: {
         hoverDuration: 300,
         hoverEffect: 'bounce',
         activeScale: 1.15
      }
   },
   willow: {
      shapes: { cornerRadius: 12 },
      animation: {
         duration: 2000,
         delay: (_, i) => i * 200,
         type: 'cascade'
      },
      interactivity: {
         hoverDuration: 600,
         hoverEffect: 'pulse',
         activeScale: 1.05
      }
   },
   succulent: {
      shapes: { cornerRadius: 20 },
      animation: {
         duration: 1800,
         delay: (_, i) => i * 180,
         type: 'spiral'
      },
      interactivity: {
         hoverDuration: 500,
         hoverEffect: 'twist',
         activeScale: 1.08
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

      const margin = { top: 20, right: 20, bottom: 40, left: 60 };  
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
         .domain([0, d3.max(data, d => d.value)! * 1.1])
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

      // Add axes first (before bars) to ensure proper layering
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      g.append('g')
         .attr('class', 'x-axis')
         .attr('transform', `translate(0,${innerHeight})`)
         .call(xAxis);

      g.append('g')
         .attr('class', 'y-axis')
         .call(yAxis);

      // Function to calculate bar height correctly
      const calculateBarHeight = (d: DataPoint) => {
         const y = yScale(d.value);
         return y != null ? innerHeight - y : 0;
      };

      // Function to calculate bar y position correctly
      const calculateBarY = (d: DataPoint) => {
         const y = yScale(d.value);
         return y ?? innerHeight;
      };

      // Add bars with style-specific animations
      const bars = g.selectAll('rect')
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
            bars.attr('y', innerHeight)
               .attr('height', 0)
               .transition()
               .duration(style.animation.duration)
               .delay(style.animation.delay)
               .ease(d3.easeExpOut)
               .attr('y', calculateBarY)
               .attr('height', calculateBarHeight);
            break;

         case 'wave':
            // Palm: Flowing wave motion
            bars.attr('y', innerHeight)
               .attr('height', 0)
               .attr('transform', 'skewX(45)')
               .transition()
               .duration(style.animation.duration)
               .delay(style.animation.delay)
               .ease(d3.easeBounceOut)
               .attr('y', calculateBarY)
               .attr('height', calculateBarHeight)
               .attr('transform', 'skewX(0)');
            break;

         case 'segments':
            // Bamboo: Segment by segment growth
            const segmentCount = 5;
            const segmentDuration = style.animation.duration / segmentCount;
            let selection = bars
               .attr('y', innerHeight)
               .attr('height', 0)
               .style('opacity', 0.3) as d3.Selection<SVGRectElement, DataPoint, SVGSVGElement, unknown>;
            
            for (let i = 0; i < segmentCount; i++) {
               const progress = (i + 1) / segmentCount;
               selection = selection
                  .transition()
                  .duration(segmentDuration)
                  .delay((_, index) => style.animation.delay(_, index) + (i * 50)) as unknown as d3.Selection<SVGRectElement, DataPoint, SVGSVGElement, unknown>;
               selection
                  .style('opacity', 0.3 + (0.7 * progress))
                  .attr('y', (d: DataPoint) => {
                     const targetY = calculateBarY(d);
                     const currentHeight = calculateBarHeight(d);
                     return innerHeight - (currentHeight * progress);
                  })
                  .attr('height', (d: DataPoint) => {
                     return calculateBarHeight(d) * progress;
                  });
            }
            break;

         case 'cascade':
            // Willow: Gentle cascade with swaying
            bars.attr('y', calculateBarY)
               .attr('height', calculateBarHeight)
               .attr('transform', (_, i) => `scale(0.5, 0) translate(0, ${innerHeight/2}) rotate(10)`)
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
            bars.attr('y', calculateBarY)
               .attr('height', calculateBarHeight)
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
      const labels = g.selectAll('.value-label')
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
            labels.attr('y', innerHeight)
               .transition()
               .duration(style.animation.duration / 2)
               .delay((_, i) => style.animation.delay(_, i) + style.animation.duration)
               .attr('y', d => (calculateBarY(d)) - 5)
               .style('opacity', 1);
            break;
         case 'segments':
            labels.attr('y', d => (calculateBarY(d)) - 5)
               .transition()
               .duration(style.animation.duration)
               .delay((_, i) => style.animation.delay(_, i) + (style.animation.duration / 2))
               .style('opacity', 1);
            break;
         case 'cascade':
            labels.attr('y', d => (calculateBarY(d)) - 5)
               .attr('transform', 'translate(0, 20) scale(0.8)')
               .transition()
               .duration(style.animation.duration / 2)
               .delay((_, i) => style.animation.delay(_, i) + style.animation.duration)
               .attr('transform', 'translate(0, 0) scale(1)')
               .style('opacity', 1);
            break;
         case 'spiral':
            labels.attr('y', d => (calculateBarY(d)) - 5)
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
         const bar = d3.select(this);
         
         // Remove any existing filters
         bar.attr('filter', null);
         
         switch (config.interactivity.hoverEffect) {
            case 'scale':
               bar.transition()
                  .duration(config.interactivity.hoverDuration)
                  .attr('transform', `scale(1, ${config.interactivity.activeScale})`);
               break;
            
            case 'glow':
               // Create a glow filter if it doesn't exist
               const filterId = 'glow-filter';
               if (!svg.select(`#${filterId}`).size()) {
                  const filter = svg.append('defs')
                     .append('filter')
                     .attr('id', filterId)
                     .attr('x', '-50%')
                     .attr('y', '-50%')
                     .attr('width', '200%')
                     .attr('height', '200%');
                  
                  filter.append('feGaussianBlur')
                     .attr('stdDeviation', config.interactivity.glowRadius || 4)
                     .attr('result', 'coloredBlur');
                  
                  const feMerge = filter.append('feMerge');
                  feMerge.append('feMergeNode')
                     .attr('in', 'coloredBlur');
                  feMerge.append('feMergeNode')
                     .attr('in', 'SourceGraphic');
               }
               
               bar.transition()
                  .duration(config.interactivity.hoverDuration)
                  .attr('filter', `url(#${filterId})`);
               break;
            
            case 'bounce':
               bar.transition()
                  .duration(config.interactivity.hoverDuration / 2)
                  .attr('transform', `translate(0, -10)`)
                  .transition()
                  .duration(config.interactivity.hoverDuration / 2)
                  .attr('transform', `translate(0, 0)`);
               break;
            
            case 'sway':
               bar.transition()
                  .duration(config.interactivity.hoverDuration)
                  .attr('transform', 'rotate(5)')
                  .transition()
                  .duration(config.interactivity.hoverDuration)
                  .attr('transform', 'rotate(-5)')
                  .transition()
                  .duration(config.interactivity.hoverDuration)
                  .attr('transform', 'rotate(0)');
               break;
            
            case 'pulse':
               bar.transition()
                  .duration(config.interactivity.hoverDuration / 2)
                  .attr('opacity', 0.7)
                  .transition()
                  .duration(config.interactivity.hoverDuration / 2)
                  .attr('opacity', 1);
               break;
            
            case 'twist':
               bar.transition()
                  .duration(config.interactivity.hoverDuration)
                  .attr('transform', 'rotate(180)')
                  .transition()
                  .duration(config.interactivity.hoverDuration)
                  .attr('transform', 'rotate(0)');
               break;
         }
         
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
         const bar = d3.select(this);
         
         // Reset all transformations and effects
         bar.transition()
            .duration(config.interactivity.hoverDuration)
            .attr('transform', 'translate(0, 0) rotate(0) scale(1, 1)')
            .attr('opacity', 1)
            .attr('filter', null);
         
         tooltip.current && d3.select(tooltip.current)
            .style('visibility', 'hidden');
      });

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
