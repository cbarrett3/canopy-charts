'use client';

/* ----------------------------------------
 * Line chart component implementation. Handles the React component layer
 * and delegates D3 rendering to the renderer.
 * ---------------------------------------- */

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { LineChartProps, defaultLineChartConfig, DataPoint } from './types';
import { useChartDimensions } from '../../hooks/use-chart-dimensions';
import { render } from './renderer';
import { defaultThemeColor } from '../../utils/colors';
import { LineTooltip } from './tooltip';
import { Legend } from '../shared/legend';
import { ChartStyle } from '../../types';

export const LineChart: React.FC<LineChartProps> = ({
   data = [
      { name: 'Jan', value: 30 },
      { name: 'Feb', value: 45 },
      { name: 'Mar', value: 25 },
      { name: 'Apr', value: 60 },
      { name: 'May', value: 35 },
      { name: 'Jun', value: 50 }
   ],
   datasets = ['value'],
   themeColor = defaultThemeColor,
   vibe = 'evergreen' as ChartStyle, // Type assertion to fix type issue
   config = { ...defaultLineChartConfig, enableZoom: true },
   className = '',
}) => {
   // refs
   const svgRef = useRef<SVGSVGElement>(null);
   const chartRef = useRef<SVGGElement | null>(null);

   // state
   const [tooltipData, setTooltipData] = useState<{
      data: DataPoint;
      series: string;
      position: { x: number; y: number };
      visible: boolean;
   }>({
      data: data[0],
      series: datasets[0],
      position: { x: 0, y: 0 },
      visible: false
   });

   // hooks
   const { dimensions, containerRef } = useChartDimensions({
      marginTop: config.marginTop || 20,
      marginRight: config.marginRight || (config.showLegend && config.legendPosition === 'right' ? 120 : 20),
      marginBottom: config.marginBottom || 40,
      marginLeft: config.marginLeft || (config.showLegend && config.legendPosition === 'left' ? 120 : 40)
   });

   // handle zoom and wheel events
   useEffect(() => {
      const svg = svgRef.current;
      if (!svg) return;

      // Handle pinch zoom on touch devices
      const handleTouchStart = (e: TouchEvent) => {
         if (e.touches.length === 2) {
            e.preventDefault();
         }
      };

      // Handle wheel zoom
      const handleWheel = (e: WheelEvent) => {
         if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
         }
      };

      svg.addEventListener('touchstart', handleTouchStart, { passive: false });
      svg.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
         svg.removeEventListener('touchstart', handleTouchStart);
         svg.removeEventListener('wheel', handleWheel);
      };
   }, []);

   // render chart
   useEffect(() => {
      if (!svgRef.current || !dimensions.width || !dimensions.height) return;

      const svg = d3.select(svgRef.current);

      // setup svg
      svg.attr('width', dimensions.width)
         .attr('height', dimensions.height);

      // create or select main group
      let g = svg.select<SVGGElement>('g.chart-content');
      if (g.empty()) {
         g = svg.append<SVGGElement>('g')
            .attr('class', 'chart-content')
            .attr('transform', `translate(${dimensions.margin.left},${dimensions.margin.top})`);
      }

      // store ref to g element
      chartRef.current = g.node();

      // render chart
      render({
         g,
         data,
         datasets,
         xScale: d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([0, dimensions.boundedWidth])
            .padding(0.3),
         yScale: d3.scaleLinear()
            .domain([0, d3.max(data, d => Math.max(...datasets.map(key => Number(d[key])))) || 0])
            .range([dimensions.boundedHeight, 0])
            .nice(),
         width: dimensions.boundedWidth,
         height: dimensions.boundedHeight,
         color: themeColor,
         vibe,
         config: {
            ...config,
            enableZoom: true // Always enable zoom
         },
         onMouseEnter: (event: MouseEvent, d: DataPoint, series: string) => {
            setTooltipData({
               data: d,
               series,
               position: {
                  x: event.clientX,
                  y: event.clientY
               },
               visible: true
            });
         },
         onMouseLeave: () => {
            setTooltipData(prev => ({ ...prev, visible: false }));
         },
      });
   }, [dimensions, data, themeColor, vibe, config, datasets]);

   return (
      <div
         ref={containerRef}
         className={`relative w-full h-full ${className}`}
         role="figure"
         aria-label="Line chart visualization"
         style={{ minHeight: '300px' }}
      >
         <div className="flex items-start w-full h-full">
            {config.showLegend && config.legendPosition === 'left' && (
               <Legend
                  items={datasets.map((dataset, index) => ({
                     label: dataset,
                     color: index === 0 ? themeColor : `${themeColor}${Math.round(80 - index * 20).toString(16)}`
                  }))}
                  position="left"
               />
            )}
            <div className="flex-1">
               <svg
                  ref={svgRef}
                  className="w-full h-full overflow-visible touch-none"
                  style={{ touchAction: 'none' }}
               />
            </div>
            {config.showLegend && config.legendPosition === 'right' && (
               <Legend
                  items={datasets.map((dataset, index) => ({
                     label: dataset,
                     color: index === 0 ? themeColor : `${themeColor}${Math.round(80 - index * 20).toString(16)}`
                  }))}
                  position="right"
               />
            )}
         </div>
         <LineTooltip
            data={tooltipData.data}
            series={tooltipData.series}
            position={tooltipData.position}
            visible={tooltipData.visible}
            color={themeColor}
         />
      </div>
   );
};

export default LineChart; 