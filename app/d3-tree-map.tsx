"use client"

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

interface DataPoint {
   name: string;
   value?: number;
   children?: DataPoint[];
}

type VibeType = 'evergreen' | 'palm' | 'bamboo' | 'willow' | 'succulent' | 'vine';

interface D3TreeMapProps {
   width?: number;
   height?: number;
   data?: DataPoint;
   title?: string;
   themeColor?: string;
   tooltipBackgroundColor?: string;
   tooltipTextColor?: string;
   vibe?: VibeType;
   showLegend?: boolean;
}

// Vibe-specific configurations
const vibeConfigs: Record<VibeType, {
   animation: {
      duration: number;
      ease: any;
      type: 'scale' | 'fade' | 'slide' | 'ripple' | 'unfold' | 'wave' | 'segments';
      delay: (d: any, i: number) => number;
   };
   style: {
      cornerRadius: number;
      opacity: number;
      hoverOpacity: number;
      padding: number;
      hoverEffect: 'scale' | 'glow' | 'bounce' | 'sway' | 'pulse' | 'wave';
      hoverDuration: number;
      hoverScale: number;
      glowColor?: string;
      glowRadius?: number;
   };
}> = {
   evergreen: {
      animation: {
         duration: 800,
         ease: d3.easeCubicInOut,
         type: 'segments',
         delay: (_, i) => i * 100,
      },
      style: {
         cornerRadius: 2,
         opacity: 0.9,
         hoverOpacity: 1,
         padding: 1,
         hoverEffect: 'scale',
         hoverDuration: 150,
         hoverScale: 1.02,
         glowColor: 'rgba(255,255,255,0.2)',
      }
   },
   palm: {
      animation: {
         duration: 1200,
         ease: d3.easeElasticOut.amplitude(1),
         type: 'wave',
         delay: (_, i) => i * 120,
      },
      style: {
         cornerRadius: 8,
         opacity: 0.85,
         hoverOpacity: 1,
         padding: 2,
         hoverEffect: 'wave',
         hoverDuration: 1200,
         hoverScale: 1.03,
      }
   },
   bamboo: {
      animation: {
         duration: 600,
         ease: d3.easeCubicInOut,
         type: 'slide',
         delay: (_, i) => i * 50,
      },
      style: {
         cornerRadius: 0,
         opacity: 0.8,
         hoverOpacity: 0.95,
         padding: 1,
         hoverEffect: 'scale',
         hoverDuration: 300,
         hoverScale: 1.01,
      }
   },
   willow: {
      animation: {
         duration: 1500,
         ease: d3.easeQuadInOut,
         type: 'ripple',
         delay: (_, i) => i * 150,
      },
      style: {
         cornerRadius: 6,
         opacity: 0.75,
         hoverOpacity: 0.9,
         padding: 1.5,
         hoverEffect: 'sway',
         hoverDuration: 1500,
         hoverScale: 1.02,
      }
   },
   succulent: {
      animation: {
         duration: 800,
         ease: d3.easeCircleInOut,
         type: 'unfold',
         delay: (_, i) => i * 80,
      },
      style: {
         cornerRadius: 12,
         opacity: 0.85,
         hoverOpacity: 1,
         padding: 2,
         hoverEffect: 'pulse',
         hoverDuration: 800,
         hoverScale: 1.03,
         glowColor: 'rgba(255,255,255,0.25)',
         glowRadius: 6
      }
   },
   vine: {
      animation: {
         duration: 1000,
         ease: d3.easeSinInOut,
         type: 'wave',
         delay: (_, i) => i * 100 + Math.random() * 200,
      },
      style: {
         cornerRadius: 4,
         opacity: 0.8,
         hoverOpacity: 0.95,
         padding: 1.5,
         hoverEffect: 'wave',
         hoverDuration: 1000,
         hoverScale: 1.02,
      }
   }
};

const generateColorScheme = (baseColor: string, count: number): string[] => {
   const hsl = d3.hsl(baseColor);
   const colors: string[] = [];

   // Generate variations by adjusting lightness and saturation
   for (let i = 0; i < count; i++) {
      const saturation = Math.min(1, hsl.s + (i * 0.1));
      const lightness = Math.max(0.2, Math.min(0.8, hsl.l + (i * 0.1 - 0.3)));
      colors.push(d3.hsl(hsl.h, saturation, lightness).toString());
   }

   return colors;
};

const applyVibeAnimation = (selection: any, vibe: VibeType, isEntering = true) => {
   const config = vibeConfigs[vibe];
   
   switch (config.animation.type) {
      case 'segments':
         selection
            .style('opacity', isEntering ? 0 : config.style.opacity)
            .style('transform', isEntering ? 'scaleY(0)' : 'scaleY(1)')
            .style('transform-origin', 'bottom')
            .transition()
            .duration(config.animation.duration)
            .delay(config.animation.delay)
            .ease(config.animation.ease)
            .style('opacity', isEntering ? config.style.opacity : 0)
            .style('transform', isEntering ? 'scaleY(1)' : 'scaleY(0)');
         break;
      case 'wave':
         selection
            .style('opacity', isEntering ? 0 : config.style.opacity)
            .style('transform', isEntering ? 'scale(0.8) translateY(10px)' : 'scale(1) translateY(0)')
            .transition()
            .duration(config.animation.duration)
            .delay(config.animation.delay)
            .ease(config.animation.ease)
            .style('opacity', isEntering ? config.style.opacity : 0)
            .style('transform', isEntering ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(10px)');
         break;
      case 'slide':
         selection
            .style('opacity', isEntering ? 0 : config.style.opacity)
            .style('transform', isEntering ? 'translateX(-20px)' : 'translateX(0)')
            .transition()
            .duration(config.animation.duration)
            .delay(config.animation.delay)
            .ease(config.animation.ease)
            .style('opacity', isEntering ? config.style.opacity : 0)
            .style('transform', isEntering ? 'translateX(0)' : 'translateX(-20px)');
         break;
      case 'ripple':
         selection
            .style('opacity', isEntering ? 0 : config.style.opacity)
            .style('transform', isEntering ? 'scale(1.1) rotate(2deg)' : 'scale(1) rotate(0)')
            .transition()
            .duration(config.animation.duration)
            .delay(config.animation.delay)
            .ease(config.animation.ease)
            .style('opacity', isEntering ? config.style.opacity : 0)
            .style('transform', isEntering ? 'scale(1) rotate(0)' : 'scale(1.1) rotate(2deg)');
         break;
      case 'unfold':
         selection
            .style('opacity', isEntering ? 0 : config.style.opacity)
            .style('transform', isEntering ? 'scale(0.9) rotate(-5deg)' : 'scale(1) rotate(0)')
            .transition()
            .duration(config.animation.duration)
            .delay(config.animation.delay)
            .ease(config.animation.ease)
            .style('opacity', isEntering ? config.style.opacity : 0)
            .style('transform', isEntering ? 'scale(1) rotate(0)' : 'scale(0.9) rotate(-5deg)');
         break;
   }
};

const applyVibeHoverEffect = (selection: any, vibe: VibeType, isHovering: boolean) => {
   const config = vibeConfigs[vibe];
   
   selection.transition()
      .duration(config.style.hoverDuration)
      .ease(config.animation.ease);

   switch (config.style.hoverEffect) {
      case 'scale':
         selection.style('transform', isHovering ? `scale(${config.style.hoverScale})` : 'scale(1)');
         break;
      case 'glow':
         if (isHovering) {
            selection
               .style('filter', `drop-shadow(0 0 ${config.style.glowRadius}px ${config.style.glowColor})`);
         } else {
            selection.style('filter', 'none');
         }
         break;
      case 'wave':
         if (isHovering) {
            selection
               .transition()
               .duration(config.style.hoverDuration / 3)
               .style('transform', 'translateY(-3px) scale(1.01)')
               .transition()
               .duration(config.style.hoverDuration / 3)
               .style('transform', 'translateY(2px) scale(1.01)')
               .transition()
               .duration(config.style.hoverDuration / 3)
               .style('transform', 'translateY(0) scale(1)');
         }
         break;
      case 'sway':
         if (isHovering) {
            selection
               .transition()
               .duration(config.style.hoverDuration / 3)
               .style('transform', 'rotate(2deg)')
               .transition()
               .duration(config.style.hoverDuration / 3)
               .style('transform', 'rotate(-2deg)')
               .transition()
               .duration(config.style.hoverDuration / 3)
               .style('transform', 'rotate(0)');
         }
         break;
      case 'pulse':
         if (isHovering) {
            selection
               .transition()
               .duration(config.style.hoverDuration / 2)
               .style('transform', `scale(${config.style.hoverScale})`)
               .style('opacity', config.style.hoverOpacity)
               .transition()
               .duration(config.style.hoverDuration / 2)
               .style('transform', 'scale(1)')
               .style('opacity', config.style.opacity);
         }
         break;
   }
};

const D3TreeMap: React.FC<D3TreeMapProps> = ({
   width = 500,
   height = 275,
   data = {
      name: 'root',
      children: [
         { name: 'Category 1', value: 100 },
         { name: 'Category 2', value: 200 },
         { name: 'Category 3', value: 300 },
      ],
   },
   title,
   themeColor = '#22C55E',
   tooltipBackgroundColor = '#1B1B1B',
   tooltipTextColor = '#ffffff',
   vibe = 'evergreen',
   showLegend = true,
}) => {
   const svgRef = useRef<SVGSVGElement | null>(null);
   const containerRef = useRef<HTMLDivElement | null>(null);
   const [legendVisible, setLegendVisible] = useState(showLegend);
   
   // Ensure vibe is a valid value
   const currentVibe = (vibeConfigs[vibe as VibeType] ? vibe : 'evergreen') as VibeType;
   
   useEffect(() => {
      if (svgRef.current) {
         const svg = d3.select(svgRef.current);
         svg.selectAll('*').remove();

         const margin = { top: 10, right: legendVisible ? 120 : 10, bottom: 10, left: 10 };
         const innerWidth = width - margin.left - margin.right;
         const innerHeight = height - margin.top - margin.bottom;

         const root = d3
            .hierarchy(data)
            .sum((d) => d.value ?? 0)
            .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

         const treemapLayout = d3
            .treemap<DataPoint>()
            .size([innerWidth, innerHeight])
            .padding(vibeConfigs[currentVibe].style.padding);

         treemapLayout(root);

         const mainGroup = svg
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

         // Generate theme-based color scheme
         const leafCount = root.leaves().length;
         const colorScheme = generateColorScheme(themeColor, leafCount);
         const color = d3.scaleOrdinal(colorScheme);

         const tooltip = d3
            .select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('text-align', 'center')
            .style('width', 'auto')
            .style('height', 'auto')
            .style('padding', '10px')
            .style('font', '14px sans-serif')
            .style('background', tooltipBackgroundColor)
            .style('color', tooltipTextColor)
            .style('border', '0px')
            .style('border-radius', '8px')
            .style('pointer-events', 'none')
            .style('opacity', 0)
            .style('transition', `opacity ${vibeConfigs[currentVibe].animation.duration}ms ${vibeConfigs[currentVibe].animation.ease}`);

         // Create cells
         const cell = mainGroup
            .selectAll('g')
            .data(root.leaves())
            .join('g')
            .attr('transform', (d: any) => `translate(${d.x0},${d.y0})`);

         // Add rectangles to cells with vibe-specific animations
         const rects = cell.append('rect')
            .attr('width', (d: any) => d.x1 - d.x0)
            .attr('height', (d: any) => d.y1 - d.y0)
            .attr('fill', (d: any) => color(d.data.name))
            .attr('rx', vibeConfigs[currentVibe].style.cornerRadius)
            .style('transform-origin', 'center');

         // Apply initial animations
         applyVibeAnimation(rects, currentVibe, true);

         // Add hover effects
         rects.on('mouseover', function (event: MouseEvent, d: any) {
            const rect = d3.select(this);
            applyVibeHoverEffect(rect, currentVibe, true);

            tooltip
               .style('opacity', 1)
               .html(`${d.data.name}<br/>${d.value}`)
               .style('left', event.pageX + 'px')
               .style('top', event.pageY - 28 + 'px');
         })
         .on('mouseout', function () {
            const rect = d3.select(this);
            applyVibeHoverEffect(rect, currentVibe, false);
            tooltip.style('opacity', 0);
         });

         // Add text labels
         cell.append('text')
            .attr('x', 4)
            .attr('y', 14)
            .attr('fill', 'white')
            .attr('font-size', '12px')
            .text((d: any) => d.data.name)
            .each(function(this: SVGTextElement, d: any) {
               const rectWidth = d.x1 - d.x0;
               const textWidth = (this as SVGTextElement).getComputedTextLength();
               if (textWidth > rectWidth - 8) {
                  d3.select(this).remove();
               }
            });

         // Add legend if visible
         if (legendVisible) {
            const legendGroup = svg
               .append('g')
               .attr('class', 'legend')
               .attr('transform', `translate(${width - margin.right + 20},${margin.top})`);

            const legendItems = legendGroup
               .selectAll('.legend-item')
               .data(root.leaves())
               .join('g')
               .attr('class', 'legend-item')
               .attr('transform', (_, i) => `translate(0,${i * 25})`);

            const legendRects = legendItems
               .append('rect')
               .attr('width', 15)
               .attr('height', 15)
               .attr('rx', vibeConfigs[currentVibe].style.cornerRadius)
               .attr('fill', d => color(d.data.name))
               .style('transform-origin', 'center');

            // Apply initial animations to legend
            applyVibeAnimation(legendRects, currentVibe, true);

            // Add hover effects to legend items
            legendRects
               .on('mouseover', function(event, d) {
                  const rect = d3.select(this);
                  applyVibeHoverEffect(rect, currentVibe, true);

                  // Highlight corresponding treemap cell
                  const cell = mainGroup.selectAll('rect')
                     .filter((dd: any) => dd.data.name === d.data.name);
                  applyVibeHoverEffect(cell, currentVibe, true);
               })
               .on('mouseout', function(event, d) {
                  const rect = d3.select(this);
                  applyVibeHoverEffect(rect, currentVibe, false);

                  // Reset corresponding treemap cell
                  const cell = mainGroup.selectAll('rect')
                     .filter((dd: any) => dd.data.name === d.data.name);
                  applyVibeHoverEffect(cell, currentVibe, false);
               });

            legendItems
               .append('text')
               .attr('x', 20)
               .attr('y', 12)
               .style('font-size', '12px')
               .style('fill', '#fff')
               .text(d => d.data.name);
         }
      }

      return () => {
         d3.select('body').selectAll('div.tooltip').remove();
      };
   }, [data, width, height, title, themeColor, tooltipBackgroundColor, tooltipTextColor, currentVibe, legendVisible]);

   return (
      <div
         ref={containerRef}
         style={{
            width: '100%',
            height: '100%',
            position: 'relative'
         }}
      >
         {title && (
            <h2
               style={{
                  textAlign: 'center',
                  margin: '10px 0',
                  color: 'white'
               }}
            >
               {title}
            </h2>
         )}
         <svg
            ref={svgRef}
            style={{
               width: '100%',
               height: title ? 'calc(100% - 40px)' : '100%'
            }}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
         />
      </div>
   );
};

export default D3TreeMap;
