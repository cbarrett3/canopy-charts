"use client"

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { useChartDimensions } from '@/app/_components/charts/hooks/use-chart-dimensions';
import { ChartStyle } from './types';
import { withLoading } from './with-loading';

interface DataPoint {
   name: string;
   value: number;
   children?: DataPoint[];
}

export type VibeType = 'rainforest' | 'savanna' | 'tundra' | 'coral' | 'volcanic' | 'dunes' | 'evergreen';

interface D3TreeMapProps {
   width?: number;
   height?: number;
   data: DataPoint;
   padding?: number;
   themeColor?: string;
   tooltipBackgroundColor?: string;
   tooltipTextColor?: string;
   vibe?: VibeType;
   showLegend?: boolean;
   showAxes?: boolean;
   showGrid?: boolean;
   showLabels?: boolean;
   labelSize?: number;
   showTitle?: boolean;
   showTooltips?: boolean;
   className?: string;
}

// Define the type for the treemap node
type TreemapNode = d3.HierarchyRectangularNode<DataPoint>;

const vibeConfigs: Record<VibeType, {
   animation: {
      duration: number;
      ease: any;
      delay: (d: any, i: number) => number;
   };
   style: {
      cornerRadius: number;
      opacity: number;
      hoverOpacity: number;
      padding: number;
      hoverScale: number;
      glowColor?: string;
      glowRadius?: number;
   };
}> = {
   rainforest: {
      animation: {
         duration: 800,
         ease: d3.easeCubicInOut,
         delay: (_, i) => i * 100,
      },
      style: {
         cornerRadius: 4,
         opacity: 0.9,
         hoverOpacity: 1,
         padding: 1,
         hoverScale: 1.02,
         glowColor: 'rgba(255,255,255,0.2)',
      }
   },
   savanna: {
      animation: {
         duration: 1200,
         ease: d3.easeElasticOut.amplitude(1),
         delay: (_, i) => i * 50,
      },
      style: {
         cornerRadius: 8,
         opacity: 0.85,
         hoverOpacity: 0.95,
         padding: 2,
         hoverScale: 1.01,
         glowColor: 'rgba(255,255,255,0.1)',
         glowRadius: 4
      }
   },
   tundra: {
      animation: {
         duration: 600,
         ease: d3.easeCubicInOut,
         delay: (_, i) => i * 30,
      },
      style: {
         cornerRadius: 0,
         opacity: 0.95,
         hoverOpacity: 1,
         padding: 1,
         hoverScale: 1.03,
      }
   },
   coral: {
      animation: {
         duration: 1500,
         ease: d3.easeQuadInOut,
         delay: (_, i) => i * 80,
      },
      style: {
         cornerRadius: 16,
         opacity: 0.8,
         hoverOpacity: 0.9,
         padding: 2,
         hoverScale: 1.04,
         glowColor: 'rgba(255,255,255,0.15)',
         glowRadius: 8
      }
   },
   volcanic: {
      animation: {
         duration: 800,
         ease: d3.easeCircleInOut,
         delay: (_, i) => i * 40,
      },
      style: {
         cornerRadius: 2,
         opacity: 0.95,
         hoverOpacity: 1,
         padding: 1,
         hoverScale: 1.05,
         glowColor: 'rgba(255,0,0,0.1)',
         glowRadius: 6
      }
   },
   dunes: {
      animation: {
         duration: 1000,
         ease: d3.easeSinInOut,
         delay: (_, i) => i * 60,
      },
      style: {
         cornerRadius: 12,
         opacity: 0.85,
         hoverOpacity: 0.95,
         padding: 2,
         hoverScale: 1.02,
         glowColor: 'rgba(255,255,255,0.1)',
         glowRadius: 4
      }
   },
   evergreen: {
      animation: {
         duration: 1000,
         ease: d3.easeCubicInOut,
         delay: (_, i) => i * 50,
      },
      style: {
         cornerRadius: 4,
         opacity: 0.9,
         hoverOpacity: 1,
         padding: 1,
         hoverScale: 1.02,
         glowColor: 'rgba(255,255,255,0.2)',
      }
   }
};

const getVibeStyles = (vibe: string) => {
   switch (vibe) {
      case 'rainforest':
         return {
            rect: {
               rx: 4,
               ry: 4,
               transition: 300,
               hover: {
                  transform: 'translate(-2px, -2px) scale(1.02)',
                  filter: 'brightness(1.1) saturate(1.2)',
               }
            },
            text: {
               transition: 200,
               hover: {
                  transform: 'translate(0, -1px) scale(1.05)',
                  filter: 'brightness(1.2)'
               }
            }
         }
      case 'savanna':
         return {
            rect: {
               rx: 8,
               ry: 8,
               transition: 400,
               hover: {
                  transform: 'translate(0, -1px) scale(1.01)',
                  filter: 'brightness(1.05)'
               }
            },
            text: {
               transition: 300,
               hover: {
                  transform: 'translate(0, -1px) scale(1.02)',
                  filter: 'brightness(1.1)'
               }
            }
         }
      case 'tundra':
         return {
            rect: {
               rx: 0,
               ry: 0,
               transition: 200,
               hover: {
                  transform: 'translate(0, -2px) scale(1.03)',
                  filter: 'brightness(1.15) contrast(1.1)'
               }
            },
            text: {
               transition: 150,
               hover: {
                  transform: 'translate(0, -1px) scale(1.04)',
                  filter: 'brightness(1.2)'
               }
            }
         }
      case 'coral':
         return {
            rect: {
               rx: 16,
               ry: 16,
               transition: 500,
               hover: {
                  transform: 'translate(-2px, -2px) scale(1.04)',
                  filter: 'brightness(1.1) saturate(1.1)'
               }
            },
            text: {
               transition: 400,
               hover: {
                  transform: 'translate(0, -2px) scale(1.06)',
                  filter: 'brightness(1.15)'
               }
            }
         }
      case 'volcanic':
         return {
            rect: {
               rx: 2,
               ry: 2,
               transition: 300,
               hover: {
                  transform: 'translate(-3px, -3px) scale(1.05)',
                  filter: 'brightness(1.2) contrast(1.15)'
               }
            },
            text: {
               transition: 250,
               hover: {
                  transform: 'translate(0, -2px) scale(1.08)',
                  filter: 'brightness(1.3)'
               }
            }
         }
      case 'dunes':
         return {
            rect: {
               rx: 12,
               ry: 12,
               transition: 700,
               hover: {
                  transform: 'translate(0, -1px) scale(1.02)',
                  filter: 'brightness(1.05) saturate(1.05)'
               }
            },
            text: {
               transition: 500,
               hover: {
                  transform: 'translate(0, -1px) scale(1.03)',
                  filter: 'brightness(1.1)'
               }
            }
         }
      case 'evergreen':
         return {
            rect: {
               rx: 4,
               ry: 4,
               transition: 300,
               hover: {
                  transform: 'translate(-2px, -2px) scale(1.02)',
                  filter: 'brightness(1.1) saturate(1.2)',
               }
            },
            text: {
               transition: 200,
               hover: {
                  transform: 'translate(0, -1px) scale(1.05)',
                  filter: 'brightness(1.2)'
               }
            }
         }
      default:
         return {
            rect: {
               rx: 4,
               ry: 4,
               transition: 400,
               hover: {
                  transform: 'translate(0, -1px) scale(1.02)',
                  filter: 'brightness(1.1)'
               }
            },
            text: {
               transition: 300,
               hover: {
                  transform: 'translate(0, -1px) scale(1.05)',
                  filter: 'brightness(1.15)'
               }
            }
         }
   }
}

const D3TreeMap: React.FC<D3TreeMapProps> = ({
   width = 500,
   height = 250,
   data = {
      name: 'root',
      value: 0,
      children: [
         { name: 'Sample 1', value: 100 },
         { name: 'Sample 2', value: 200 },
         { name: 'Sample 3', value: 300 },
      ]
   },
   padding = 2,
   themeColor = '#22C55E',
   tooltipBackgroundColor = '#1B1B1B',
   tooltipTextColor = '#ffffff',
   vibe = 'evergreen',
   showLegend = true,
   showAxes = false,
   showGrid = false,
   showLabels = true,
   labelSize = 12,
   showTitle = false,
   showTooltips = true,
   className = ''
}) => {
   const svgRef = useRef<SVGSVGElement>(null);
   const tooltipRef = useRef<HTMLDivElement>(null);
   const containerRef = useRef<HTMLDivElement>(null);
   const [legendVisible, setLegendVisible] = useState(showLegend);

   useEffect(() => {
      if (!svgRef.current || !data) return;

      // Clear previous SVG content
      d3.select(svgRef.current).selectAll('*').remove();

      // Set margins based on whether title and legend are shown
      const margin = {
         top: padding,
         right: padding,
         bottom: padding,
         left: padding
      };

      // Calculate available space for the chart
      const availableHeight = height - margin.top - margin.bottom;
      const titleHeight = showTitle ? 40 : 0;
      const legendHeight = showLegend ? Math.min(30, availableHeight * 0.1) : 0;
      const legendMargin = showLegend ? 12 : 0;

      // Recalculate margins to account for title and legend
      margin.top += titleHeight;
      margin.bottom += legendHeight + legendMargin;

      // Calculate inner dimensions
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      // Create SVG
      const svg = d3.select(svgRef.current)
         .attr('width', width)
         .attr('height', height)
         .style('overflow', 'visible'); // Allow overflow for tooltips

      // Add title if enabled
      if (showTitle) {
         // Create gradient for title
         const titleGradient = svg.append("defs")
            .append("linearGradient")
            .attr("id", "titleGradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");

         const color = d3.color(themeColor);
         const brighterColor = color?.brighter(0.5)?.toString() || themeColor;

         titleGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", themeColor);

         titleGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", brighterColor);

         svg.append('text')
            .attr('class', 'chart-title')
            .attr('x', width / 2)
            .attr('y', titleHeight / 2)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .style('font-size', `${Math.min(16, innerWidth * 0.03)}px`)
            .style('font-weight', '600')
            .style('fill', 'url(#titleGradient)')
            .style('opacity', 0)
            .text(data.name || 'Tree Map')
            .transition()
            .duration(600)
            .style('opacity', 1);
      }

      // Create container group with margins
      const container = svg.append('g')
         .attr('transform', `translate(${margin.left},${margin.top})`);

      // Add axes if enabled
      if (showAxes) {
         // Create scales for axes
         const xScale = d3.scaleLinear()
            .domain([0, innerWidth])
            .range([0, innerWidth]);

         const yScale = d3.scaleLinear()
            .domain([0, innerHeight])
            .range([innerHeight, 0]);

         // Create and add x-axis
         const xAxis = d3.axisBottom(xScale)
            .ticks(5)
            .tickSize(6)
            .tickFormat(d => `${d}px`);

         container.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(xAxis)
            .style('color', 'currentColor')
            .style('opacity', 0.5)
            .style('font-size', '10px');

         // Create and add y-axis
         const yAxis = d3.axisLeft(yScale)
            .ticks(5)
            .tickSize(6)
            .tickFormat(d => `${d}px`);

         container.append('g')
            .attr('class', 'y-axis')
            .call(yAxis)
            .style('color', 'currentColor')
            .style('opacity', 0.5)
            .style('font-size', '10px');

         // Add axis labels
         container.append('text')
            .attr('class', 'x-axis-label')
            .attr('x', innerWidth / 2)
            .attr('y', innerHeight + margin.bottom - 2)
            .attr('text-anchor', 'middle')
            .style('font-size', '10px')
            .style('fill', 'currentColor')
            .style('opacity', 0.7)
            .text('Width');

         container.append('text')
            .attr('class', 'y-axis-label')
            .attr('transform', 'rotate(-90)')
            .attr('x', -innerHeight / 2)
            .attr('y', -margin.left + 12)
            .attr('text-anchor', 'middle')
            .style('font-size', '10px')
            .style('fill', 'currentColor')
            .style('opacity', 0.7)
            .text('Height');
      }

      // Create treemap layout with adjusted dimensions
      const treemap = d3.treemap<DataPoint>()
         .size([innerWidth, innerHeight])
         .paddingOuter(8)
         .paddingInner(6)
         .paddingTop(4)
         .round(true);

      // Create root hierarchy
      const root = d3.hierarchy(data)
         .sum(d => d.value)
         .sort((a, b) => (b.value || 0) - (a.value || 0));

      // Generate treemap layout
      treemap(root);

      const cells = container.selectAll<SVGGElement, TreemapNode>('g')
         .data(root.leaves() as TreemapNode[])
         .enter()
         .append('g')
         .attr('transform', d => `translate(${d.x0},${d.y0})`);

      // Add rectangles with gradient background
      const rects = cells.append('rect')
         .attr('width', d => Math.max(0, d.x1 - d.x0))
         .attr('height', d => Math.max(0, d.y1 - d.y0))
         .attr('rx', vibeConfigs[vibe].style.cornerRadius)
         .attr('ry', vibeConfigs[vibe].style.cornerRadius)
         .style('fill', themeColor)
         .style('opacity', 0) // Start with opacity 0 for animation
         .style('filter', vibeConfigs[vibe].style.glowColor ? 
            `drop-shadow(0px 2px ${vibeConfigs[vibe].style.glowRadius || 4}px ${vibeConfigs[vibe].style.glowColor})` : 
            'none')
         .style('cursor', 'pointer')
         .style('transition', `all ${vibeConfigs[vibe].animation.duration}ms ${vibeConfigs[vibe].animation.ease}`);

      // Add hover events
      rects.on('mouseover', function(event, d) {
         d3.select(this)
            .transition()
            .duration(200)
            .style('opacity', vibeConfigs[vibe].style.hoverOpacity)
            .style('transform', `scale(${vibeConfigs[vibe].style.hoverScale})`);

         if (showTooltips) {
            const tooltip = d3.select(tooltipRef.current);
            tooltip
               .style('opacity', 1)
               .style('left', `${event.pageX + 10}px`)
               .style('top', `${event.pageY - 10}px`);

            tooltip.select('.tooltip-title').text(d.data.name);
            tooltip.select('.tooltip-value').text(d.data.value.toString());
         }
      })
      .on('mouseout', function() {
         d3.select(this)
            .transition()
            .duration(300)
            .style('opacity', vibeConfigs[vibe].style.opacity)
            .style('transform', 'scale(1)');

         if (showTooltips) {
            const tooltip = d3.select(tooltipRef.current)
               .style('opacity', 0);
         }
      });

      // Animate in the rectangles
      rects.transition()
         .duration(vibeConfigs[vibe].animation.duration)
         .delay((_, i) => vibeConfigs[vibe].animation.delay(_, i))
         .ease(vibeConfigs[vibe].animation.ease)
         .style('opacity', vibeConfigs[vibe].style.opacity);

      // Add text labels
      cells.append('text')
         .attr('x', 8)
         .attr('y', 16)
         .attr('font-size', `${labelSize}px`)
         .attr('fill', 'white')
         .attr('font-weight', '500')
         .style('text-shadow', '0px 1px 2px rgba(0,0,0,0.2)')
         .style('pointer-events', 'none')
         .text(d => d.data.name)
         .each(function(d) {
            const textWidth = (this as SVGTextElement).getComputedTextLength();
            const boxWidth = d.x1 - d.x0;
            if (textWidth > (boxWidth - 16)) {
               d3.select(this).remove();
            }
         });

      // Add value labels
      cells.append('text')
         .attr('x', 8)
         .attr('y', 32)
         .attr('font-size', `${labelSize - 2}px`)
         .attr('fill', 'rgba(255,255,255,0.8)')
         .style('text-shadow', '0px 1px 2px rgba(0,0,0,0.1)')
         .style('pointer-events', 'none')
         .text((d: TreemapNode) => d.value?.toString() || '')
         .each(function(this: SVGTextElement, d: TreemapNode) {
            const textWidth = this.getComputedTextLength();
            const boxWidth = d.x1 - d.x0;
            if (textWidth > (boxWidth - 16) || (d.y1 - d.y0) < 50) {
               d3.select(this).remove();
            }
            return null;
         });

      // Add legend if enabled
      if (showLegend) {
         const values = root.leaves().map(d => d.value || 0);
         const minValue = d3.min(values) || 0;
         const maxValue = d3.max(values) || 0;
         
         // Compact legend width
         const legendWidth = Math.min(innerWidth * 0.4, 140);
         
         // Create size scale for legend
         const minSize = 4;
         const maxSize = 12;
         const sizeScale = d3.scaleLinear()
            .domain([minValue, maxValue])
            .range([minSize, maxSize]);

         const legendGroup = svg.append('g')
            .attr('class', 'legend')
            .attr('transform', `translate(${margin.left + (innerWidth - legendWidth) / 2},${height - legendHeight + 8})`);

         // Create gradient for legend
         const legendGradient = svg.append("defs")
            .append("linearGradient")
            .attr("id", "legendGradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");

         const color = d3.color(themeColor);
         const darkerColor = color?.darker(0.5)?.toString() || themeColor;

         legendGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", darkerColor);

         legendGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", themeColor);

         // Create a horizontal line to connect squares
         legendGroup.append('line')
            .attr('x1', 0)
            .attr('x2', legendWidth)
            .attr('y1', 0)
            .attr('y2', 0)
            .style('stroke', themeColor)
            .style('stroke-width', 0.5)
            .style('stroke-opacity', 0.2);

         // Add legend squares in a more compact layout
         const legendRects = legendGroup.selectAll('rect')
            .data([minValue, (maxValue - minValue) / 2 + minValue, maxValue])
            .enter()
            .append('rect')
            .attr('x', (d, i) => (i * legendWidth) / 2 - sizeScale(d) / 2)
            .attr('y', d => -sizeScale(d) / 2)
            .attr('width', d => sizeScale(d))
            .attr('height', d => sizeScale(d))
            .attr('rx', 1)
            .attr('ry', 1)
            .style('fill', themeColor)
            .style('opacity', 0.2);

         // Add minimal value labels
         legendGroup.selectAll('text.value')
            .data([minValue, (maxValue - minValue) / 2 + minValue, maxValue])
            .enter()
            .append('text')
            .attr('class', 'value')
            .attr('x', (d, i) => (i * legendWidth) / 2)
            .attr('y', 14)
            .attr('text-anchor', 'middle')
            .style('font-size', '8px')
            .style('font-weight', '400')
            .style('fill', 'currentColor')
            .style('opacity', 0.4)
            .text(d => d3.format(',')(Math.round(d)));
      }
   }, [width, height, data, padding, themeColor, vibe, showTooltips, labelSize]);

   return (
      <div className={`relative ${className}`}>
         <div className="w-full h-full" ref={containerRef}>
            <svg
               ref={svgRef}
               className="w-full h-full"
               viewBox={`0 0 ${width} ${height}`}
               preserveAspectRatio="xMidYMid meet"
               style={{ overflow: 'visible' }}
            />
            <div
               ref={tooltipRef}
               className="absolute pointer-events-none opacity-0 bg-background/90 backdrop-blur-sm text-foreground px-3 py-2 rounded-lg text-sm shadow-lg transition-opacity duration-200"
               style={{
                  left: 0,
                  top: 0,
                  zIndex: 100
               }}
            />
         </div>
      </div>
   );
};

export default withLoading(D3TreeMap);
