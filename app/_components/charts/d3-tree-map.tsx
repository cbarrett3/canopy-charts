"use client"

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

interface DataPoint {
   name: string;
   value: number;
   children?: DataPoint[];
}

type VibeType = 'rainforest' | 'savanna' | 'tundra' | 'coral' | 'volcanic' | 'dunes';

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
   height = 275,
   data = {
      name: 'root',
      value: 0,
      children: [
         { name: 'Sample 1', value: 100 },
         { name: 'Sample 2', value: 200 },
         { name: 'Sample 3', value: 300 },
      ]
   },
   padding = 1,
   themeColor = '#22C55E',
   tooltipBackgroundColor = '#1B1B1B',
   tooltipTextColor = '#ffffff',
   vibe = 'rainforest',
   showLegend = true,
}) => {
   const svgRef = useRef<SVGSVGElement | null>(null);
   const tooltipRef = useRef<HTMLDivElement | null>(null);
   const [legendVisible, setLegendVisible] = useState(showLegend);
   
   // Ensure vibe is a valid value
   const currentVibe = (vibeConfigs[vibe as VibeType] ? vibe : 'rainforest') as VibeType;
   
   useEffect(() => {
      if (!svgRef.current || !data) return;

      try {
         const svg = d3.select(svgRef.current);
         svg.selectAll('*').remove();

         const tooltip = d3.select(tooltipRef.current)
            .style('position', 'absolute')
            .style('visibility', 'hidden')
            .style('background-color', tooltipBackgroundColor)
            .style('color', tooltipTextColor)
            .style('padding', '8px')
            .style('border-radius', '4px')
            .style('font-size', '12px')
            .style('pointer-events', 'none')
            .style('z-index', '100')
            .style('box-shadow', '0 2px 4px rgba(0,0,0,0.1)')
            .style('opacity', 0)
            .style('transition', 'opacity 0.2s ease-in-out');

         const mainGroup = svg.append('g');

         // Validate data structure
         if (!data.name || !Array.isArray(data.children)) {
            console.error('Invalid data structure for treemap');
            return;
         }

         const treemap = d3.treemap<DataPoint>()
            .size([width, height])
            .padding(padding);

         const root = d3.hierarchy(data)
            .sum(d => d.value);

         treemap(root);

         const vibeStyle = getVibeStyles(currentVibe);
         const config = vibeConfigs[currentVibe];

         // Create cells
         const cells = mainGroup.selectAll<SVGGElement, TreemapNode>('g')
            .data(root.leaves() as TreemapNode[])
            .enter()
            .append('g')
            .attr('transform', d => `translate(${d.x0},${d.y0})`);

         // Add rectangles
         const rects = cells.append('rect')
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .attr('rx', vibeStyle.rect.rx)
            .attr('ry', vibeStyle.rect.ry)
            .style('fill', themeColor)
            .style('opacity', config.style.opacity)
            .style('cursor', 'pointer')
            .style('transition', `all ${vibeStyle.rect.transition}ms ease-in-out`);

         // Add hover effects
         rects
            .on('mouseover', function(event, d) {
               const rect = d3.select(this);
               rect.transition()
                  .duration(vibeStyle.rect.transition)
                  .style('transform', vibeStyle.rect.hover.transform)
                  .style('filter', vibeStyle.rect.hover.filter);

               const text = d3.select(this.parentNode as Element).select('text');
               text.transition()
                  .duration(vibeStyle.text.transition)
                  .style('transform', vibeStyle.text.hover.transform)
                  .style('filter', vibeStyle.text.hover.filter);

               tooltip
                  .html(`${d.data.name}<br/>${d.value}`)
                  .style('visibility', 'visible')
                  .style('opacity', 1)
                  .style('left', `${event.pageX + 10}px`)
                  .style('top', `${event.pageY - 10}px`);
            })
            .on('mousemove', function(event) {
               tooltip
                  .style('left', `${event.pageX + 10}px`)
                  .style('top', `${event.pageY - 10}px`);
            })
            .on('mouseout', function() {
               const rect = d3.select(this);
               rect.transition()
                  .duration(vibeStyle.rect.transition)
                  .style('transform', 'translate(0, 0) scale(1)')
                  .style('filter', 'none');

               const text = d3.select(this.parentNode as Element).select('text');
               text.transition()
                  .duration(vibeStyle.text.transition)
                  .style('transform', 'translate(0, 0) scale(1)')
                  .style('filter', 'none');

               tooltip
                  .style('visibility', 'hidden')
                  .style('opacity', 0);
            });

         // Add text labels
         cells.append('text')
            .attr('x', 4)
            .attr('y', 14)
            .attr('fill', 'white')
            .attr('font-size', '12px')
            .style('pointer-events', 'none')
            .style('transition', `all ${vibeStyle.text.transition}ms ease-in-out`)
            .text(d => d.data.name)
            .each(function(this: SVGTextElement) {
               const textWidth = (this as SVGTextElement).getComputedTextLength();
               const rectWidth = parseFloat(d3.select(this.parentNode as any).select('rect').attr('width'));
               if (textWidth > rectWidth - 8) {
                  d3.select(this).remove();
               }
            });

         // Add legend if visible
         if (legendVisible && showLegend) {
            const legendData = root.leaves().map(d => ({
               name: d.data.name,
               value: d.value
            }));

            const legendGroup = svg.append('g')
               .attr('transform', `translate(${width + 20}, 10)`);

            const legendItems = legendGroup.selectAll('g')
               .data(legendData)
               .enter()
               .append('g')
               .attr('transform', (_, i) => `translate(0, ${i * 25})`);

            const legendRects = legendItems.append('rect')
               .attr('width', 15)
               .attr('height', 15)
               .attr('rx', vibeStyle.rect.rx)
               .attr('ry', vibeStyle.rect.ry)
               .style('fill', themeColor)
               .style('opacity', config.style.opacity)
               .style('cursor', 'pointer')
               .style('transition', `all ${vibeStyle.rect.transition}ms ease-in-out`);

            legendRects
               .on('mouseover', function(event, d) {
                  const rect = d3.select(this);
                  const vibeStyles = getVibeStyles(currentVibe);
                  rect.transition()
                     .duration(vibeStyles.rect.transition)
                     .style('transform', vibeStyles.rect.hover.transform)
                     .style('filter', vibeStyles.rect.hover.filter);

                  // Highlight corresponding treemap cell
                  const cell = mainGroup.selectAll('rect')
                     .filter((cellData: any) => cellData.data.name === d.name);
                  cell.transition()
                     .duration(vibeStyles.rect.transition)
                     .style('transform', vibeStyles.rect.hover.transform)
                     .style('filter', vibeStyles.rect.hover.filter);
               })
               .on('mouseout', function(event, d) {
                  const rect = d3.select(this);
                  const vibeStyles = getVibeStyles(currentVibe);
                  rect.transition()
                     .duration(vibeStyles.rect.transition)
                     .style('transform', 'translate(0, 0) scale(1)')
                     .style('filter', 'none');

                  // Reset corresponding treemap cell
                  const cell = mainGroup.selectAll('rect')
                     .filter((cellData: any) => cellData.data.name === d.name);
                  cell.transition()
                     .duration(vibeStyles.rect.transition)
                     .style('transform', 'translate(0, 0) scale(1)')
                     .style('filter', 'none');
               });

            legendItems.append('text')
               .attr('x', 25)
               .attr('y', 12)
               .style('font-size', '12px')
               .style('fill', 'currentColor')
               .text(d => `${d.name} (${d.value})`);
         }
      } catch (error) {
         console.error('Error rendering treemap:', error);
      }
   }, [width, height, data, padding, themeColor, currentVibe, legendVisible, showLegend]);

   return (
      <div className="relative">
         <svg
            ref={svgRef}
            width={width + (showLegend ? 200 : 0)}
            height={height}
            className="overflow-visible"
         />
         <div ref={tooltipRef} />
      </div>
   );
};

export default D3TreeMap;
