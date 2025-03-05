'use client'

/* ----------------------------------------
 * Bar chart component implementation. Handles the React component layer
 * and delegates D3 rendering to the renderer.
 * ---------------------------------------- */

import React from 'react';
import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { BarChartProps, DataPoint } from './types';
import { renderBars } from './renderer';
import { defaultBarChartConfig } from '../../types/chart-config';
import { Tooltip } from '../shared/tooltip';
import { useChartDimensions } from '../../hooks/use-chart-dimensions';

// Default sample data for out-of-the-box experience
const defaultData: DataPoint[] = [
   { label: 'Category A', value: 30 },
   { label: 'Category B', value: 45 },
   { label: 'Category C', value: 25 },
   { label: 'Category D', value: 60 },
   { label: 'Category E', value: 35 }
];

export function BarChart({
   data = defaultData,
   themeColor = '#22c55e',
   vibe = 'rainforest',
   config: userConfig,
   className = '',
}: BarChartProps) {
   // merge default config with user config, ensuring all elements are ON by default
   const config = {
      ...defaultBarChartConfig,
      showXAxis: true,
      showYAxis: true,
      showXGrid: true,
      showYGrid: true,
      showAxisLabels: true,
      showTooltip: true,
      showLegend: true,
      legendPosition: 'right' as const,
      labelSize: 12,
      gridStyle: 'dashed' as const,
      gridOpacity: 0.08,
      barPadding: 0.2,
      axisOpacity: 0.5,
      // Default labels for sample data
      chartTitle: userConfig?.chartTitle || 'Sample Categories Distribution',
      xAxisLabel: userConfig?.xAxisLabel || 'Categories',
      yAxisLabel: userConfig?.yAxisLabel || 'Values',
      ...userConfig
   };

   // refs for d3
   const svgRef = useRef<SVGSVGElement>(null);
   const gRef = useRef<SVGGElement>(null);
   const containerRef = useRef<HTMLDivElement>(null);
   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
   const isDarkMode = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;

   // calculate legend dimensions
   const legendWidth = config.showLegend ? 120 : 0;
   const legendPadding = config.showLegend ? 20 : 0;

   // chart margins with more padding for labels
   const margin = {
      top: config.chartTitle ? 48 : 24, // More space for title
      right: config.legendPosition === 'right' ? legendWidth + 24 : 24,
      bottom: config.xAxisLabel ? 64 : 48, // More space for x-axis label
      left: config.legendPosition === 'left' ? legendWidth + 64 : 64 // More space for y-axis label
   };
   const innerWidth = Math.max(0, dimensions.width - margin.left - margin.right);
   const innerHeight = Math.max(0, dimensions.height - margin.top - margin.bottom);

   // handle resize
   useEffect(() => {
      if (!containerRef.current) return;

      const resizeObserver = new ResizeObserver(entries => {
         for (const entry of entries) {
            const { width, height } = entry.contentRect;
            setDimensions({
               width: Math.max(width, 300), // minimum width
               height: Math.max(height, 200) // minimum height
            });
         }
      });

      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
   }, []);

   // scales
   const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, innerWidth])
      .padding(config.barPadding || 0.2);

   const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .range([innerHeight, 0])
      .nice();

   // render chart
   useEffect(() => {
      if (!svgRef.current || !gRef.current || !data.length || !containerRef.current || !dimensions.width || !dimensions.height) return;

      // clear previous render
      d3.select(gRef.current).selectAll('*').remove();

      const g = d3.select(gRef.current);

      // render title if enabled
      if (config.chartTitle) {
         g.append('text')
            .attr('class', 'chart-title')
            .attr('x', innerWidth / 2)
            .attr('y', -margin.top / 2)
            .attr('text-anchor', 'middle')
            .style('font-size', `${config.labelSize + 4}px`)
            .style('font-weight', '500')
            .style('fill', 'currentColor')
            .style('opacity', '0.9')
            .text(config.chartTitle);
      }

      // render axes if enabled
      if (config.showXAxis || config.showYAxis) {
         if (config.showXAxis) {
            const xAxis = d3.axisBottom(xScale);
            const xAxisGroup = g.append('g')
               .attr('transform', `translate(0,${innerHeight})`)
               .style('color', 'currentColor')
               .style('opacity', String(config.axisOpacity))
               .call(xAxis);

            // Style the axis lines and ticks
            xAxisGroup.select('.domain')
               .style('stroke', 'currentColor')
               .style('opacity', '0.2');
            xAxisGroup.selectAll('.tick line')
               .style('stroke', 'currentColor')
               .style('opacity', '0.2');
            xAxisGroup.selectAll('.tick text')
               .style('fill', 'currentColor')
               .style('opacity', '0.7')
               .style('font-size', `${config.labelSize}px`);

            // Add X axis label if provided
            if (config.xAxisLabel) {
               g.append('text')
                  .attr('class', 'x-axis-label')
                  .attr('x', innerWidth / 2)
                  .attr('y', innerHeight + margin.bottom - 10)
                  .attr('text-anchor', 'middle')
                  .style('font-size', `${config.labelSize}px`)
                  .style('fill', 'currentColor')
                  .style('opacity', '0.7')
                  .text(config.xAxisLabel);
            }
         }

         if (config.showYAxis) {
            const yAxis = d3.axisLeft(yScale);
            const yAxisGroup = g.append('g')
               .style('color', 'currentColor')
               .style('opacity', String(config.axisOpacity))
               .call(yAxis);

            // Style the axis lines and ticks
            yAxisGroup.select('.domain')
               .style('stroke', 'currentColor')
               .style('opacity', '0.2');
            yAxisGroup.selectAll('.tick line')
               .style('stroke', 'currentColor')
               .style('opacity', '0.2');
            yAxisGroup.selectAll('.tick text')
               .style('fill', 'currentColor')
               .style('opacity', '0.7')
               .style('font-size', `${config.labelSize}px`);

            // Add Y axis label if provided
            if (config.yAxisLabel) {
               g.append('text')
                  .attr('class', 'y-axis-label')
                  .attr('transform', 'rotate(-90)')
                  .attr('x', -innerHeight / 2)
                  .attr('y', -margin.left + 20)
                  .attr('text-anchor', 'middle')
                  .style('font-size', `${config.labelSize}px`)
                  .style('fill', 'currentColor')
                  .style('opacity', '0.7')
                  .text(config.yAxisLabel);
            }
         }
      }

      // render grid if enabled
      if (config.showXGrid || config.showYGrid) {
         if (config.showYGrid) {
            const gridOpacity = String(config.gridOpacity ?? 0.08);
            const gridDash = config.gridStyle === 'dashed' ? '2,4' : '';

            g.append('g')
               .attr('class', 'grid')
               .style('color', 'currentColor')
               .style('opacity', gridOpacity)
               .style('stroke-dasharray', gridDash)
               .call(
                  d3.axisLeft(yScale)
                     .tickSize(-innerWidth)
                     .tickFormat(() => '')
               )
               .call(g => g.select('.domain').remove()) // Remove the outer axis line
               .call(g => g.selectAll('.tick line')
                  .style('stroke-width', '1px'));
         }

         if (config.showXGrid) {
            const gridOpacity = String(config.gridOpacity ?? 0.08);
            const gridDash = config.gridStyle === 'dashed' ? '2,4' : '';

            g.append('g')
               .attr('class', 'grid')
               .attr('transform', `translate(0,${innerHeight})`)
               .style('color', 'currentColor')
               .style('opacity', gridOpacity)
               .style('stroke-dasharray', gridDash)
               .call(
                  d3.axisBottom(xScale)
                     .tickSize(-innerHeight)
                     .tickFormat(() => '')
               )
               .call(g => g.select('.domain').remove()) // Remove the outer axis line
               .call(g => g.selectAll('.tick line')
                  .style('stroke-width', '1px'));
         }
      }

      // create tooltip div
      let tooltipDiv: HTMLDivElement | null = null;
      if (config.showTooltip) {
         tooltipDiv = document.createElement('div');
         tooltipDiv.className = 'chart-tooltip';
         tooltipDiv.style.position = 'fixed';
         tooltipDiv.style.visibility = 'hidden';
         tooltipDiv.style.pointerEvents = 'none';
         tooltipDiv.style.zIndex = '9999';

         // Create tooltip content container
         const content = document.createElement('div');
         content.className = 'tooltip-content';
         content.style.backgroundColor = isDarkMode ? 'rgb(23 23 23 / 0.98)' : 'rgb(255 255 255 / 0.98)';
         content.style.backdropFilter = 'blur(8px)';
         content.style.border = `1.5px solid ${themeColor}`;
         content.style.borderRadius = '6px';
         content.style.padding = '6px 10px';
         content.style.color = isDarkMode ? 'rgb(250 250 250)' : 'rgb(23 23 23)';
         content.style.fontSize = '13px';
         content.style.fontWeight = '500';
         content.style.boxShadow = isDarkMode ?
            '0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.2)' :
            '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';

         // Add arrow
         const arrow = document.createElement('div');
         arrow.className = 'tooltip-arrow';
         arrow.style.position = 'absolute';
         arrow.style.left = '50%';
         arrow.style.top = '100%';
         arrow.style.transform = 'translateX(-50%)';
         arrow.style.width = '0';
         arrow.style.height = '0';
         arrow.style.borderLeft = '5px solid transparent';
         arrow.style.borderRight = '5px solid transparent';
         arrow.style.borderTop = `5px solid ${themeColor}`;

         tooltipDiv.appendChild(content);
         tooltipDiv.appendChild(arrow);
         document.body.appendChild(tooltipDiv);
      }

      // render bars
      renderBars({
         g: d3.select(gRef.current),
         data,
         xScale,
         yScale,
         height: innerHeight,
         color: themeColor,
         vibe,
         config,
         tooltip: tooltipDiv,
      });

      // render legend if enabled
      if (config.showLegend) {
         const legendGroup = g.append('g')
            .attr('class', 'legend')
            .style('font-size', `${config.labelSize}px`)
            .style('fill', 'currentColor')
            .style('opacity', '0.8');

         // Position legend based on config
         const legendX = config.legendPosition === 'right' ? innerWidth + legendPadding : -legendWidth;
         const legendY = 0;

         // Create legend items
         const legendItems = legendGroup.selectAll('.legend-item')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'legend-item')
            .attr('transform', (d, i) => `translate(${legendX}, ${legendY + i * 25})`);

         // Add colored rectangles
         legendItems.append('rect')
            .attr('width', 16)
            .attr('height', 16)
            .attr('rx', 4)
            .attr('ry', 4)
            .attr('fill', themeColor)
            .style('opacity', 0.8);

         // Add text labels with improved styling
         legendItems.append('text')
            .attr('x', 24)
            .attr('y', 12)
            .text(d => d.label)
            .style('fill', 'currentColor')
            .style('opacity', '0.8')
            .style('font-size', `${config.labelSize}px`);
      }

      // cleanup
      return () => {
         if (tooltipDiv) {
            tooltipDiv.remove();
         }
      };
   }, [data, themeColor, vibe, config, dimensions]);

   return (
      <div ref={containerRef} className={`w-full h-full text-zinc-900 dark:text-white ${className}`}>
         {dimensions.width > 0 && dimensions.height > 0 && (
            <svg
               ref={svgRef}
               width={dimensions.width}
               height={dimensions.height}
               className="overflow-visible"
            >
               <g
                  ref={gRef}
                  transform={`translate(${margin.left},${margin.top})`}
               />
            </svg>
         )}
      </div>
   );
} 