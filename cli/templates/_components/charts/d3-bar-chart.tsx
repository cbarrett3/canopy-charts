'use client'

import React, { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import { defaultThemeColor } from '@/app/_components/charts/utils/colors';
import { debounce } from 'lodash';

// Types
interface DataPoint {
   label: string;
   value: number;
}

type ChartStyle = 'evergreen' | 'palm' | 'bamboo' | 'willow' | 'succulent' | 'modern' | 'savanna' | 'rainforest';

interface ChartDimensions {
   margin: { top: number; right: number; bottom: number; left: number };
   innerWidth: number;
   innerHeight: number;
}

interface ChartConfig {
   shapes: {
      cornerRadius: number;
      barWidth: number;
   };
   animation: {
      duration: number;
      delay: (d: any, i: number) => number;
      easing: d3.EaseFunction;
      initialScale: number;
      finalScale: number;
   };
   interactivity: {
      hoverDuration: number;
      hoverEffect: 'sway' | 'bounce' | 'grow';
      activeScale: number;
      glowColor: string;
      glowRadius: number;
      swayAmplitude: number;
      swayFrequency: number;
   };
}

interface D3BarChartProps {
   width?: number;
   height?: number;
   data?: DataPoint[];
   title?: string;
   themeColor?: string;
   vibe?: ChartStyle;
}

interface ChartState {
   svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>;
   g: d3.Selection<SVGGElement, unknown, null, undefined>;
   xScale: d3.ScaleBand<string>;
   yScale: d3.ScaleLinear<number, number>;
}

// Constants
const ANIMATION_DURATION = 1500;
const DEBOUNCE_DELAY = 150;

// Chart Styles Configuration
const chartStyles: Record<ChartStyle, ChartConfig> = {
   evergreen: {
      shapes: {
         cornerRadius: 6,
         barWidth: 0.8,
      },
      animation: {
         duration: ANIMATION_DURATION,
         delay: (_, i) => i * 120,
         easing: d3.easeBounceOut,
         initialScale: 0.4,
         finalScale: 1,
      },
      interactivity: {
         hoverDuration: 800,
         hoverEffect: 'sway',
         activeScale: 1.02,
         glowColor: '#22C55E',
         glowRadius: 15,
         swayAmplitude: 3,
         swayFrequency: 2,
      }
   },
   savanna: {
      shapes: {
         cornerRadius: 4,
         barWidth: 0.85,
      },
      animation: {
         duration: ANIMATION_DURATION,
         delay: (_, i) => i * 150 + Math.random() * 100,
         easing: d3.easeElasticOut.amplitude(1.2).period(0.5),
         initialScale: 0.2,
         finalScale: 1,
      },
      interactivity: {
         hoverDuration: 600,
         hoverEffect: 'bounce',
         activeScale: 1.15,
         glowColor: '#F59E0B',
         glowRadius: 12,
         swayAmplitude: 8,
         swayFrequency: 3,
      }
   },
   rainforest: {
      shapes: {
         cornerRadius: 8,
         barWidth: 0.75,
      },
      animation: {
         duration: ANIMATION_DURATION,
         delay: (_, i) => i * 100,
         easing: d3.easeElasticOut.amplitude(1.1).period(0.4),
         initialScale: 0.1,
         finalScale: 1,
      },
      interactivity: {
         hoverDuration: 700,
         hoverEffect: 'grow',
         activeScale: 1.1,
         glowColor: '#059669',
         glowRadius: 10,
         swayAmplitude: 5,
         swayFrequency: 2.5,
      }
   },
   palm: {
      shapes: {
         cornerRadius: 5,
         barWidth: 0.82,
      },
      animation: {
         duration: ANIMATION_DURATION,
         delay: (_, i) => i * 130,
         easing: d3.easeBackOut,
         initialScale: 0.35,
         finalScale: 1,
      },
      interactivity: {
         hoverDuration: 650,
         hoverEffect: 'sway',
         activeScale: 1.08,
         glowColor: '#0EA5E9',
         glowRadius: 8,
         swayAmplitude: 4,
         swayFrequency: 2.2,
      }
   },
   bamboo: {
      shapes: {
         cornerRadius: 3,
         barWidth: 0.9,
      },
      animation: {
         duration: ANIMATION_DURATION,
         delay: (_, i) => i * 140,
         easing: d3.easeElasticOut,
         initialScale: 0.25,
         finalScale: 1,
      },
      interactivity: {
         hoverDuration: 550,
         hoverEffect: 'bounce',
         activeScale: 1.12,
         glowColor: '#65A30D',
         glowRadius: 10,
         swayAmplitude: 6,
         swayFrequency: 2.8,
      }
   },
   willow: {
      shapes: {
         cornerRadius: 7,
         barWidth: 0.78,
      },
      animation: {
         duration: ANIMATION_DURATION,
         delay: (_, i) => i * 110,
         easing: d3.easeQuadOut,
         initialScale: 0.45,
         finalScale: 1,
      },
      interactivity: {
         hoverDuration: 750,
         hoverEffect: 'sway',
         activeScale: 1.05,
         glowColor: '#14B8A6',
         glowRadius: 12,
         swayAmplitude: 4,
         swayFrequency: 2,
      }
   },
   succulent: {
      shapes: {
         cornerRadius: 10,
         barWidth: 0.72,
      },
      animation: {
         duration: ANIMATION_DURATION,
         delay: (_, i) => i * 160,
         easing: d3.easeCircleOut,
         initialScale: 0.3,
         finalScale: 1,
      },
      interactivity: {
         hoverDuration: 900,
         hoverEffect: 'bounce',
         activeScale: 1.1,
         glowColor: '#10B981',
         glowRadius: 15,
         swayAmplitude: 5,
         swayFrequency: 2.5,
      }
   },
   modern: {
      shapes: {
         cornerRadius: 2,
         barWidth: 0.95,
      },
      animation: {
         duration: ANIMATION_DURATION,
         delay: (_, i) => i * 90,
         easing: d3.easeCubicOut,
         initialScale: 0.5,
         finalScale: 1,
      },
      interactivity: {
         hoverDuration: 500,
         hoverEffect: 'bounce',
         activeScale: 1.05,
         glowColor: '#6366F1',
         glowRadius: 8,
         swayAmplitude: 3,
         swayFrequency: 2,
      }
   }
};

const D3BarChart: React.FC<D3BarChartProps> = ({
   width = 500,
   height = 300,
   data = [],
   title,
   themeColor = defaultThemeColor,
   vibe = 'evergreen'
}) => {
   const svgRef = useRef<SVGSVGElement>(null);
   const chartRef = useRef<ChartState | null>(null);

   // Utility functions
   const getChartDimensions = useCallback((): ChartDimensions => ({
      margin: { top: 20, right: 20, bottom: 40, left: 60 },
      innerWidth: width - 80,
      innerHeight: height - 60
   }), [width, height]);

   const initializeChart = useCallback(() => {
      if (!svgRef.current) return null;

      const dimensions = getChartDimensions();
      const svg = d3.select(svgRef.current)
         .attr('width', width)
         .attr('height', height);
      
      svg.selectAll('*').remove();

      const g = svg
         .append('g')
         .attr('transform', `translate(${dimensions.margin.left},${dimensions.margin.top})`);

      return { svg, g };
   }, [getChartDimensions, width, height]);

   const createScales = useCallback((chartDimensions: ChartDimensions, chartData: DataPoint[]) => {
      const xScale = d3.scaleBand()
         .domain(chartData.map(d => d.label))
         .range([0, chartDimensions.innerWidth])
         .padding(0.3);

      const yScale = d3.scaleLinear()
         .domain([0, d3.max(chartData, d => d.value) ?? 0])
         .range([chartDimensions.innerHeight, 0]);

      return { xScale, yScale };
   }, []);

   const drawAxes = useCallback((
      g: d3.Selection<SVGGElement, unknown, null, undefined>,
      xScale: d3.ScaleBand<string>,
      yScale: d3.ScaleLinear<number, number>,
      chartDimensions: ChartDimensions
   ) => {
      // Remove existing axes
      g.selectAll('.axis').remove();

      // Add X axis
      g.append('g')
         .attr('class', 'axis x-axis')
         .attr('transform', `translate(0,${chartDimensions.innerHeight})`)
         .call(d3.axisBottom(xScale));

      // Add Y axis
      g.append('g')
         .attr('class', 'axis y-axis')
         .call(d3.axisLeft(yScale));
   }, []);

   const createGradient = useCallback((
      svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
      chartDimensions: ChartDimensions
   ) => {
      const gradientId = `bar-gradient-${Math.random().toString(36).substr(2, 9)}`;
      
      // Remove any existing gradients
      svg.selectAll('defs').remove();
      
      const gradient = svg.append('defs')
         .append('linearGradient')
         .attr('id', gradientId)
         .attr('gradientUnits', 'userSpaceOnUse')
         .attr('x1', '0')
         .attr('y1', chartDimensions.innerHeight)
         .attr('x2', '0')
         .attr('y2', '0');

      const color = d3.color(themeColor)!;
      gradient.append('stop')
         .attr('offset', '0%')
         .attr('stop-color', color.copy({ opacity: 0.3 }).toString());

      gradient.append('stop')
         .attr('offset', '100%')
         .attr('stop-color', color.copy({ opacity: 0.8 }).toString());

      return gradientId;
   }, [themeColor]);

   const handleHover = useCallback((
      bar: d3.Selection<SVGRectElement, DataPoint, SVGGElement, unknown>,
      style: ChartConfig,
      dimensions: ChartDimensions,
      isEnter: boolean
   ) => {
      const duration = style.interactivity.hoverDuration;
      const parent = d3.select(bar.node()?.parentNode);

      if (isEnter) {
         switch(vibe) {
            case 'rainforest':
               // Organic growth with leaves
               bar.transition()
                  .duration(duration)
                  .ease(d3.easeElasticOut.amplitude(1.2))
                  .style('transform', `scale(${style.interactivity.activeScale}) translateY(-8px)`)
                  .style('filter', 'brightness(1.1)');

               // Add floating leaves
               const addLeaf = () => {
                  const x = parseFloat(bar.attr('x')) + Math.random() * parseFloat(bar.attr('width'));
                  const startY = parseFloat(bar.attr('y'));
                  
                  parent.append('path')
                     .attr('class', 'leaf-effect')
                     .attr('d', 'M0,0 C5,-5 10,-5 15,0 C10,5 5,5 0,0')
                     .attr('fill', style.interactivity.glowColor)
                     .attr('transform', `translate(${x},${startY}) scale(0.5)`)
                     .style('opacity', 0)
                     .transition()
                     .duration(1000)
                     .style('opacity', 0.6)
                     .transition()
                     .duration(1500)
                     .ease(d3.easeQuadInOut)
                     .style('transform', `translate(${x + (Math.random() * 40 - 20)}px,${startY - 50}px) rotate(${Math.random() * 360}deg) scale(0)`)
                     .style('opacity', 0)
                     .remove();
               };

               // Add multiple leaves with intervals
               const leafInterval = setInterval(addLeaf, 300);
               bar.property('leafInterval', leafInterval);
               break;

            case 'savanna':
               // Create a dynamic, shimmering heat effect
               const barWidth = parseFloat(bar.attr('width'));
               const barHeight = parseFloat(bar.attr('height'));
               const barX = parseFloat(bar.attr('x'));
               const barY = parseFloat(bar.attr('y'));

               // Add shimmering heat waves
               for (let i = 0; i < 3; i++) {
                  parent.append('path')
                     .attr('class', 'heat-wave')
                     .attr('d', `M${barX},${barY + barHeight} 
                        C${barX + barWidth * 0.2},${barY + barHeight - 5} 
                        ${barX + barWidth * 0.8},${barY + barHeight + 5} 
                        ${barX + barWidth},${barY + barHeight}`)
                     .attr('stroke', style.interactivity.glowColor)
                     .attr('stroke-width', 2)
                     .attr('fill', 'none')
                     .style('opacity', 0)
                     .attr('transform', `translate(0, ${i * 8})`)
                     .transition()
                     .delay(i * 100)
                     .duration(600)
                     .style('opacity', 0.3)
                     .transition()
                     .duration(600)
                     .attr('transform', `translate(0, ${i * 8 - 15})`)
                     .style('opacity', 0)
                     .remove();
               }

               // Warm glow and rise effect
               bar.transition()
                  .duration(duration)
                  .ease(d3.easeBackOut.overshoot(1.2))
                  .style('transform', `scale(${style.interactivity.activeScale}) translateY(-5px)`)
                  .style('fill', d3.color(bar.attr('fill'))!.brighter(0.3).toString());
               break;

            case 'evergreen':
               // Pine needle scatter effect
               bar.transition()
                  .duration(duration)
                  .ease(d3.easeElasticOut.amplitude(1))
                  .style('transform', `scale(${style.interactivity.activeScale})`);

               const addNeedle = () => {
                  const x = parseFloat(bar.attr('x'));
                  const y = parseFloat(bar.attr('y'));
                  const width = parseFloat(bar.attr('width'));
                  
                  parent.append('line')
                     .attr('class', 'needle-effect')
                     .attr('x1', x + Math.random() * width)
                     .attr('y1', y)
                     .attr('x2', x + Math.random() * width)
                     .attr('y2', y - 10)
                     .attr('stroke', style.interactivity.glowColor)
                     .attr('stroke-width', 1)
                     .style('opacity', 0)
                     .transition()
                     .duration(600)
                     .style('opacity', 0.8)
                     .transition()
                     .duration(400)
                     .style('opacity', 0)
                     .remove();
               };

               const needleInterval = setInterval(addNeedle, 100);
               bar.property('needleInterval', needleInterval);
               break;

            case 'bamboo':
               // Segmented growth effect
               const segments = 5;
               const segmentHeight = parseFloat(bar.attr('height')) / segments;
               const baseX = parseFloat(bar.attr('x'));
               const baseWidth = parseFloat(bar.attr('width'));

               for (let i = 0; i < segments; i++) {
                  parent.append('rect')
                     .attr('class', 'segment-effect')
                     .attr('x', baseX)
                     .attr('y', parseFloat(bar.attr('y')) + i * segmentHeight)
                     .attr('width', baseWidth)
                     .attr('height', segmentHeight * 0.9)
                     .attr('fill', style.interactivity.glowColor)
                     .style('opacity', 0)
                     .transition()
                     .delay(i * 100)
                     .duration(300)
                     .style('opacity', 0.2)
                     .transition()
                     .duration(200)
                     .style('opacity', 0);
               }

               bar.transition()
                  .duration(duration)
                  .ease(d3.easeElasticOut)
                  .style('transform', `scale(${style.interactivity.activeScale}) translateX(${Math.sin(Date.now() / 1000) * 5}px)`);
               break;

            case 'palm':
               // Swaying palm effect with shadow
               const shadowId = `palm-shadow-${Math.random().toString(36).substr(2, 9)}`;
               parent.append('defs')
                  .append('filter')
                  .attr('id', shadowId)
                  .append('feDropShadow')
                  .attr('dx', '0')
                  .attr('dy', '10')
                  .attr('stdDeviation', '5')
                  .attr('flood-color', style.interactivity.glowColor)
                  .attr('flood-opacity', '0.3');

               bar.style('filter', `url(#${shadowId})`)
                  .transition()
                  .duration(duration)
                  .ease(d3.easeElasticOut.amplitude(1.5))
                  .style('transform', `scale(${style.interactivity.activeScale}) rotate(${Math.sin(Date.now() / 1000) * 5}deg)`);
               break;

            case 'willow': // Coral Reef
               // Underwater wave effect
               const waveFilter = parent.append('defs')
                  .append('filter')
                  .attr('id', 'wave-distort')
                  .attr('height', '200%')
                  .attr('width', '200%')
                  .attr('x', '-50%')
                  .attr('y', '-50%');
               
               // Add subtle wave distortion
               waveFilter.append('feGaussianBlur')
                  .attr('in', 'SourceGraphic')
                  .attr('stdDeviation', '1')
                  .attr('result', 'blur');
               
               waveFilter.append('feDisplacementMap')
                  .attr('in2', 'blur')
                  .attr('in', 'SourceGraphic')
                  .attr('scale', '5')
                  .attr('xChannelSelector', 'R')
                  .attr('yChannelSelector', 'G');

               // Bubble effect
               const addBubble = () => {
                  const x = parseFloat(bar.attr('x')) + Math.random() * parseFloat(bar.attr('width'));
                  const startY = parseFloat(bar.attr('y')) + parseFloat(bar.attr('height'));
                  
                  parent.append('circle')
                     .attr('class', 'bubble-effect')
                     .attr('cx', x)
                     .attr('cy', startY)
                     .attr('r', Math.random() * 3 + 2)
                     .attr('fill', style.interactivity.glowColor)
                     .style('opacity', 0)
                     .transition()
                     .duration(1000)
                     .style('opacity', 0.4)
                     .attr('cy', startY - 30)
                     .style('transform', `translateX(${Math.sin(Date.now() / 1000) * 5}px)`)
                     .transition()
                     .duration(500)
                     .style('opacity', 0)
                     .remove();
               };

               // Start bubble animation
               const bubbleInterval = setInterval(addBubble, 200);
               bar.property('bubbleInterval', bubbleInterval);

               // Animate bar
               bar.style('filter', 'url(#wave-distort)')
                  .transition()
                  .duration(duration)
                  .ease(d3.easeElasticOut.amplitude(0.5))
                  .style('transform', `scale(${style.interactivity.activeScale}) translateY(-2px)`);
               break;

            case 'succulent': // Tundra
               const tundraBar = bar.node();
               if (!tundraBar) break;

               const tundraRect = tundraBar.getBoundingClientRect();
               const centerX = parseFloat(bar.attr('x')) + parseFloat(bar.attr('width')) / 2;
               const startY = parseFloat(bar.attr('y'));

               // Frost sparkle effect
               const sparkleCount = 6;
               for (let i = 0; i < sparkleCount; i++) {
                  const angle = (i / sparkleCount) * Math.PI * 2;
                  const sparkleX = centerX + Math.cos(angle) * 10;
                  const sparkleY = startY + Math.sin(angle) * 10;

                  parent.append('circle')
                     .attr('class', 'frost-sparkle')
                     .attr('cx', sparkleX)
                     .attr('cy', sparkleY)
                     .attr('r', 2)
                     .attr('fill', style.interactivity.glowColor)
                     .style('opacity', 0)
                     .transition()
                     .duration(300)
                     .style('opacity', 0.8)
                     .transition()
                     .duration(300)
                     .attr('r', 0)
                     .style('opacity', 0)
                     .remove();
               }

               // Frost outline effect
               parent.append('rect')
                  .attr('class', 'frost-outline')
                  .attr('x', bar.attr('x'))
                  .attr('y', bar.attr('y'))
                  .attr('width', bar.attr('width'))
                  .attr('height', bar.attr('height'))
                  .attr('rx', style.shapes.cornerRadius)
                  .attr('fill', 'none')
                  .attr('stroke', style.interactivity.glowColor)
                  .attr('stroke-width', 2)
                  .style('opacity', 0)
                  .transition()
                  .duration(300)
                  .style('opacity', 0.5)
                  .transition()
                  .duration(300)
                  .style('opacity', 0);

               // Cool shimmer effect
               bar.transition()
                  .duration(duration)
                  .ease(d3.easeElasticOut.amplitude(0.8))
                  .style('transform', `scale(${style.interactivity.activeScale})`)
                  .style('filter', 'brightness(1.1) saturate(1.2)');
               break;

            case 'modern':
               // Sleek, modern effect with clean lines
               bar.transition()
                  .duration(duration)
                  .ease(d3.easeCubicInOut)
                  .style('transform', `scale(${style.interactivity.activeScale})`)
                  .style('filter', 'brightness(1.2)');

               const addLine = () => {
                  const x = parseFloat(bar.attr('x'));
                  const y = parseFloat(bar.attr('y'));
                  const width = parseFloat(bar.attr('width'));
                  const height = parseFloat(bar.attr('height'));

                  parent.append('line')
                     .attr('class', 'modern-effect')
                     .attr('x1', x)
                     .attr('y1', y + height)
                     .attr('x2', x + width)
                     .attr('y2', y + height)
                     .attr('stroke', style.interactivity.glowColor)
                     .attr('stroke-width', 2)
                     .style('opacity', 0)
                     .transition()
                     .duration(400)
                     .style('opacity', 0.5)
                     .attr('y1', y)
                     .attr('y2', y)
                     .transition()
                     .duration(200)
                     .style('opacity', 0)
                     .remove();
               };

               addLine();
               break;
         }
      } else {
         // Cleanup and reset
         clearInterval(bar.property('leafInterval'));
         clearInterval(bar.property('needleInterval'));
         clearInterval(bar.property('droopInterval'));
         clearInterval(bar.property('bubbleInterval'));
         
         parent.selectAll('.leaf-effect, .needle-effect, .segment-effect, .droop-effect, .bloom-effect, .modern-effect, .frost-effect, .bubble-effect').remove();
         parent.selectAll('defs').remove();

         bar.transition()
            .duration(duration)
            .ease(d3.easeCubicOut)
            .style('transform', `scale(${style.animation.finalScale})`)
            .style('filter', null);
      }
   }, [vibe]);

   const animateBar = useCallback((
      bar: d3.Selection<SVGRectElement, DataPoint, SVGGElement, unknown>,
      style: ChartConfig,
      dimensions: ChartDimensions,
      yScale: d3.ScaleLinear<number, number>
   ) => {
      const initialY = dimensions.innerHeight;
      const finalY = (d: DataPoint) => yScale(d.value);
      const finalHeight = (d: DataPoint) => dimensions.innerHeight - yScale(d.value);

      if (vibe === 'rainforest') {
         // Rainforest-specific growing animation
         bar
            .attr('y', initialY)
            .attr('height', 0)
            .style('transform', `scale(${style.animation.initialScale}) translateY(5px)`)
            .style('opacity', 0.4)
            .transition()
            .duration(style.animation.duration)
            .delay(style.animation.delay)
            .ease(style.animation.easing)
            .attr('y', finalY)
            .attr('height', finalHeight)
            .style('transform', `scale(${style.animation.finalScale}) translateY(0)`)
            .style('opacity', 1);

         // Add growing leaves effect
         const parent = d3.select(bar.node()?.parentNode);
         const leaf = parent
            .append('path')
            .attr('class', 'leaf-effect')
            .attr('d', 'M0,0 C5,-5 10,-5 15,0 C10,5 5,5 0,0')
            .attr('fill', style.interactivity.glowColor)
            .attr('transform', `translate(${bar.attr('x')},${finalY(bar.datum())})`)
            .style('opacity', 0);

         leaf.transition()
            .duration(style.animation.duration * 0.5)
            .delay(style.animation.duration * 0.5)
            .style('opacity', 0.6)
            .transition()
            .duration(style.animation.duration * 0.3)
            .style('opacity', 0)
            .remove();
      } else {
         // Standard animation for other vibes
         bar
            .attr('y', initialY)
            .attr('height', 0)
            .style('transform', `scale(${style.animation.initialScale})`)
            .transition()
            .duration(style.animation.duration)
            .delay(style.animation.delay)
            .ease(style.animation.easing)
            .attr('y', finalY)
            .attr('height', finalHeight)
            .style('transform', `scale(${style.animation.finalScale})`);
      }

      // Add hover handlers
      bar
         .on('mouseenter', function() {
            handleHover(d3.select(this), style, dimensions, true);
         })
         .on('mouseleave', function() {
            handleHover(d3.select(this), style, dimensions, false);
         });
   }, [vibe, handleHover]);

   const updateChart = useCallback(() => {
      if (!svgRef.current || !data.length) return;

      const dimensions = getChartDimensions();
      const currentStyle = chartStyles[vibe];
      
      if (!currentStyle) {
         console.error(`Style not found for vibe: ${vibe}`);
         return;
      }

      // Initialize or reinitialize the chart
      const { svg, g } = initializeChart() ?? {};
      if (!svg || !g) return;

      // Create scales with current data
      const { xScale, yScale } = createScales(dimensions, data);
      chartRef.current = { svg, g, xScale, yScale };

      // Create gradient
      const gradientId = createGradient(svg, dimensions);

      // Draw axes
      drawAxes(g, xScale, yScale, dimensions);

      // Remove existing bars
      g.selectAll('.bar').remove();

      // Draw new bars
      const bars = g
         .selectAll<SVGRectElement, DataPoint>('.bar')
         .data(data)
         .enter()
         .append('rect')
         .attr('class', 'bar')
         .attr('x', d => xScale(d.label) ?? 0)
         .attr('width', xScale.bandwidth() * currentStyle.shapes.barWidth)
         .attr('rx', currentStyle.shapes.cornerRadius)
         .attr('fill', `url(#${gradientId})`)
         .style('transform-origin', d => 
            `${(xScale(d.label) ?? 0) + xScale.bandwidth() / 2}px ${dimensions.innerHeight}px`
         );

      // Animate bars
      bars.each(function(d) {
         const bar = d3.select(this);
         animateBar(bar, currentStyle, dimensions, yScale);
      });

   }, [data, vibe, getChartDimensions, initializeChart, createScales, 
       drawAxes, createGradient, animateBar]);

   // Effect for chart initialization and updates
   useEffect(() => {
      const debouncedUpdate = debounce(() => {
         if (data.length > 0) {
            updateChart();
         }
      }, DEBOUNCE_DELAY);

      debouncedUpdate();

      return () => {
         debouncedUpdate.cancel();
         if (chartRef.current) {
            chartRef.current.svg.selectAll('*').remove();
         }
      };
   }, [data, updateChart]);

   return (
      <div className="relative w-full h-full">
         <svg
            ref={svgRef}
            className="w-full h-full"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
         />
      </div>
   );
};

export default D3BarChart;
