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
   legend: {
      shape: 'rect' | 'roundedRect' | 'pill' | 'leaf' | 'diamond' | 'hexagon';
      fontSize: number;
      padding: number;
      itemSpacing: number;
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
      },
      legend: {
         shape: 'rect',
         fontSize: 12,
         padding: 4,
         itemSpacing: 12
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
      },
      legend: {
         shape: 'roundedRect',
         fontSize: 12,
         padding: 4,
         itemSpacing: 10
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
      },
      legend: {
         shape: 'pill',
         fontSize: 13,
         padding: 5,
         itemSpacing: 14
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
      },
      legend: {
         shape: 'rect',
         fontSize: 11,
         padding: 3,
         itemSpacing: 8
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
         hoverDuration: 1200,
         hoverEffect: 'pulse',
         activeScale: 1.05,
         glowRadius: 3
      },
      legend: {
         shape: 'leaf',
         fontSize: 13,
         padding: 6,
         itemSpacing: 16
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
         hoverDuration: 800,
         hoverEffect: 'twist',
         activeScale: 1.05,
         glowRadius: 2
      },
      legend: {
         shape: 'hexagon',
         fontSize: 12,
         padding: 5,
         itemSpacing: 14
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
         .range([0, innerWidth - 120]) // Reserve space for legend
         .padding(0.3);

      const yScale = d3
         .scaleLinear()
         .domain([0, d3.max(data, d => d.value)! * 1.1])
         .range([innerHeight, 0]);

      const g = svg
         .append('g')
         .attr('transform', `translate(${margin.left},${margin.top})`);

      // Create gradient
      const gradientId = `bar-gradient-${themeColor.replace('#', '')}`;
      const gradient = g
         .append('defs')
         .append('linearGradient')
         .attr('id', gradientId)
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
         .attr('fill', `url(#${gradientId})`)
         .attr('rx', chartStyles[vibe]?.shapes.cornerRadius || 0)
         .attr('y', calculateBarY)
         .attr('height', calculateBarHeight);

      // Add hover effects
      bars.on('mouseover', function(event, d) {
         d3.select(this)
            .transition()
            .duration(200)
            .attr('fill', color.copy({ opacity: 0.9 }).toString());
      })
      .on('mouseout', function(event, d) {
         d3.select(this)
            .transition()
            .duration(200)
            .attr('fill', `url(#${gradientId})`);
      });

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
      const style = chartStyles[vibe] || chartStyles.modern;
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

      // Add title if provided
      if (title) {
         svg.append('text')
            .attr('class', 'title')
            .attr('x', width / 2)
            .attr('y', margin.top / 2)
            .attr('text-anchor', 'middle')
            .attr('fill', '#666')
            .style('font-size', '16px')
            .text(title);
      }

      // Add legend with improved positioning
      const legendConfig = chartStyles[vibe]?.legend || chartStyles.modern.legend;
      const legendItemHeight = legendConfig.fontSize + legendConfig.itemSpacing;
      const legendTotalHeight = data.length * legendItemHeight;
      
      // Position legend on the right side of the chart
      const legendGroup = svg.append('g')
         .attr('class', 'legend')
         .attr('transform', `translate(${width - margin.right - 100}, ${margin.top + 5})`);

      const legendItems = legendGroup.selectAll('.legend-item')
         .data(data)
         .join('g')
         .attr('class', 'legend-item')
         .attr('transform', (_, i) => `translate(0, ${i * legendItemHeight})`);

      // Add legend shapes based on vibe with improved sizing
      legendItems.each(function(d, i) {
         const item = d3.select(this);
         const shapeSize = legendConfig.fontSize * 0.9;
         
         // Add subtle hover effect to legend items
         item.style('cursor', 'pointer')
            .on('mouseover', function() {
               d3.select(this).style('opacity', 0.7);
               // Highlight corresponding bar
               bars.filter(b => b.label === d.label)
                  .style('opacity', 0.7);
            })
            .on('mouseout', function() {
               d3.select(this).style('opacity', 1);
               // Reset bar opacity
               bars.filter(b => b.label === d.label)
                  .style('opacity', 1);
            });

         switch (legendConfig.shape) {
            case 'rect':
               item.append('rect')
                  .attr('width', shapeSize)
                  .attr('height', shapeSize)
                  .attr('fill', themeColor)
                  .attr('rx', chartStyles[vibe]?.shapes.cornerRadius || 0);
               break;
               
            case 'roundedRect':
               item.append('rect')
                  .attr('width', shapeSize)
                  .attr('height', shapeSize)
                  .attr('fill', themeColor)
                  .attr('rx', shapeSize / 4);
               break;
               
            case 'pill':
               item.append('rect')
                  .attr('width', shapeSize * 1.2) // Slightly wider for pill shape
                  .attr('height', shapeSize * 0.8) // Slightly shorter for pill shape
                  .attr('fill', themeColor)
                  .attr('rx', shapeSize / 2)
                  .attr('transform', `translate(0, ${shapeSize * 0.1})`); // Center vertically
               break;
               
            case 'leaf':
               const leafPath = `M${shapeSize/2},0 
                  C${shapeSize},0 ${shapeSize},${shapeSize} ${shapeSize/2},${shapeSize} 
                  C0,${shapeSize} 0,0 ${shapeSize/2},0`;
               item.append('path')
                  .attr('d', leafPath)
                  .attr('fill', themeColor)
                  .attr('transform', `scale(0.9)`); // Slightly smaller leaf
               break;
               
            case 'diamond':
               const diamondSize = shapeSize * 0.9;
               item.append('path')
                  .attr('d', `M${diamondSize/2},0 L${diamondSize},${diamondSize/2} L${diamondSize/2},${diamondSize} L0,${diamondSize/2} Z`)
                  .attr('fill', themeColor)
                  .attr('transform', `translate(${shapeSize * 0.05}, 0)`); // Slight horizontal adjustment
               break;
               
            case 'hexagon':
               const hexSize = shapeSize * 0.9;
               const hexPoints = [
                  [hexSize/2, 0],
                  [hexSize, hexSize/4],
                  [hexSize, hexSize*3/4],
                  [hexSize/2, hexSize],
                  [0, hexSize*3/4],
                  [0, hexSize/4]
               ];
               item.append('polygon')
                  .attr('points', hexPoints.map(p => p.join(',')).join(' '))
                  .attr('fill', themeColor)
                  .attr('transform', `translate(${shapeSize * 0.05}, 0)`); // Slight horizontal adjustment
               break;
         }

         // Add text label with improved positioning
         item.append('text')
            .attr('x', shapeSize * 1.4 + legendConfig.padding)
            .attr('y', legendConfig.fontSize * 0.75)
            .attr('fill', '#666')
            .style('font-size', `${legendConfig.fontSize}px`)
            .style('font-weight', '500')
            .text(d.label);
      });

      // Calculate and add background with improved styling
      const legendBBox = legendGroup.node()?.getBBox();
      if (legendBBox) {
         // Add refined background with gradient
         const gradientId = 'legend-gradient';
         const gradient = svg.append('defs')
            .append('linearGradient')
            .attr('id', gradientId)
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '100%');

         const baseColor = d3.color(themeColor)!;
         gradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', baseColor.copy({opacity: 0.05}).toString());
         gradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', baseColor.copy({opacity: 0.1}).toString());

         legendGroup.insert('rect', ':first-child')
            .attr('class', 'legend-bg')
            .attr('x', -legendConfig.padding)
            .attr('y', -legendConfig.padding)
            .attr('width', legendBBox.width + legendConfig.padding * 2)
            .attr('height', legendBBox.height + legendConfig.padding * 2)
            .attr('fill', `url(#${gradientId})`)
            .attr('rx', legendConfig.padding * 1.5)
            .attr('stroke', d3.color(themeColor)?.darker(0.2)?.toString() || themeColor)
            .attr('stroke-opacity', 0.2)
            .attr('stroke-width', 1);
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
