import React, { useRef, useEffect } from 'react';
import { ChartContainer, XAxis, YAxis, Tooltip, Legend } from '@canopy/charts';
import * as d3 from 'd3';

/**
 * Custom Bubble Chart Example
 * 
 * This example demonstrates how to create a completely custom chart type
 * by using the primitive components from Canopy Charts and adding custom
 * D3 rendering logic.
 * 
 * The bubble chart shows data points with three dimensions:
 * - x-axis position
 * - y-axis position
 * - bubble size (radius)
 */
export default function CustomBubbleChart() {
   // Reference to the SVG element
   const svgRef = useRef(null);

   // Sample data for the bubble chart
   const data = [
      { id: 1, x: 10, y: 40, size: 20, category: 'A', label: 'Product A' },
      { id: 2, x: 25, y: 10, size: 15, category: 'A', label: 'Product B' },
      { id: 3, x: 40, y: 30, size: 25, category: 'B', label: 'Product C' },
      { id: 4, x: 20, y: 20, size: 10, category: 'B', label: 'Product D' },
      { id: 5, x: 30, y: 50, size: 30, category: 'C', label: 'Product E' },
      { id: 6, x: 50, y: 15, size: 20, category: 'C', label: 'Product F' },
   ];

   // Color scale for categories
   const colorScale = d3.scaleOrdinal()
      .domain(['A', 'B', 'C'])
      .range(['#4ade80', '#60a5fa', '#f472b6']);

   // Custom rendering logic using D3
   useEffect(() => {
      if (!svgRef.current) return;

      // Get the SVG element and its dimensions
      const svg = d3.select(svgRef.current);
      const width = svgRef.current.width.baseVal.value;
      const height = svgRef.current.height.baseVal.value;

      // Define margins
      const margin = { top: 20, right: 30, bottom: 40, left: 50 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      // Create scales
      const xScale = d3.scaleLinear()
         .domain([0, d3.max(data, d => d.x) * 1.1])
         .range([0, innerWidth]);

      const yScale = d3.scaleLinear()
         .domain([0, d3.max(data, d => d.y) * 1.1])
         .range([innerHeight, 0]);

      const sizeScale = d3.scaleSqrt()
         .domain([0, d3.max(data, d => d.size)])
         .range([5, 30]);

      // Create the chart group with margin
      const chartGroup = svg.select('.chart-area')
         .attr('transform', `translate(${margin.left}, ${margin.top})`);

      // Clear previous elements
      chartGroup.selectAll('.bubble').remove();

      // Add bubbles
      chartGroup.selectAll('.bubble')
         .data(data)
         .enter()
         .append('circle')
         .attr('class', 'bubble')
         .attr('cx', d => xScale(d.x))
         .attr('cy', d => yScale(d.y))
         .attr('r', d => sizeScale(d.size))
         .attr('fill', d => colorScale(d.category))
         .attr('fill-opacity', 0.7)
         .attr('stroke', d => d3.color(colorScale(d.category)).darker(0.5))
         .attr('stroke-width', 1.5)
         .on('mouseover', function (event, d) {
            d3.select(this)
               .attr('fill-opacity', 1)
               .attr('stroke-width', 2);

            // Show tooltip
            const tooltip = svg.select('.tooltip-area');
            tooltip.select('.tooltip-content')
               .html(`
            <div class="tooltip-title">${d.label}</div>
            <div>Category: ${d.category}</div>
            <div>X: ${d.x}</div>
            <div>Y: ${d.y}</div>
            <div>Size: ${d.size}</div>
          `);

            const tooltipWidth = tooltip.node().getBoundingClientRect().width;
            const tooltipHeight = tooltip.node().getBoundingClientRect().height;

            const tooltipX = xScale(d.x) + margin.left - tooltipWidth / 2;
            const tooltipY = yScale(d.y) + margin.top - tooltipHeight - sizeScale(d.size) - 10;

            tooltip
               .attr('transform', `translate(${tooltipX}, ${tooltipY})`)
               .style('opacity', 1);
         })
         .on('mouseout', function () {
            d3.select(this)
               .attr('fill-opacity', 0.7)
               .attr('stroke-width', 1.5);

            // Hide tooltip
            svg.select('.tooltip-area')
               .style('opacity', 0);
         });

      // Add labels
      chartGroup.selectAll('.bubble-label')
         .data(data)
         .enter()
         .append('text')
         .attr('class', 'bubble-label')
         .attr('x', d => xScale(d.x))
         .attr('y', d => yScale(d.y) - sizeScale(d.size) - 5)
         .attr('text-anchor', 'middle')
         .attr('font-size', '12px')
         .attr('fill', '#64748b')
         .text(d => d.label);

   }, [data, colorScale]);

   return (
      <div className="chart-container">
         <h2>Custom Bubble Chart</h2>
         <p>Product Performance by Category</p>

         {/* 
        Using Canopy Charts primitive components to create the chart structure,
        then adding custom rendering logic with D3
      */}
         <ChartContainer
            width={800}
            height={500}
            margin={{ top: 20, right: 30, bottom: 40, left: 50 }}
         >
            {/* Provide the SVG reference for custom D3 rendering */}
            <svg ref={svgRef} width="100%" height="100%">
               {/* Chart area for bubbles */}
               <g className="chart-area"></g>

               {/* Tooltip area */}
               <g className="tooltip-area" style={{ opacity: 0 }}>
                  <rect
                     className="tooltip-bg"
                     rx="4"
                     ry="4"
                     width="150"
                     height="100"
                     fill="white"
                     stroke="#e2e8f0"
                     strokeWidth="1"
                  />
                  <foreignObject width="150" height="100">
                     <div
                        className="tooltip-content"
                        style={{
                           padding: '8px',
                           fontSize: '12px',
                           color: '#334155',
                        }}
                     ></div>
                  </foreignObject>
               </g>
            </svg>

            {/* Use Canopy Charts components for axes */}
            <XAxis
               label="Performance Score"
               tickCount={5}
            />
            <YAxis
               label="Customer Satisfaction"
               tickCount={5}
            />

            {/* Custom legend */}
            <div className="custom-legend" style={{ marginTop: '20px' }}>
               {['A', 'B', 'C'].map(category => (
                  <div key={category} style={{ display: 'inline-flex', alignItems: 'center', marginRight: '20px' }}>
                     <div
                        style={{
                           width: '12px',
                           height: '12px',
                           borderRadius: '50%',
                           backgroundColor: colorScale(category),
                           marginRight: '6px'
                        }}
                     />
                     <span>Category {category}</span>
                  </div>
               ))}
            </div>
         </ChartContainer>

         <div className="chart-description" style={{ marginTop: '20px' }}>
            <h3>How This Chart Works</h3>
            <p>
               This custom bubble chart is built by combining Canopy Charts primitive components
               with custom D3 rendering logic. It demonstrates how to:
            </p>
            <ul>
               <li>Create a custom chart type not provided by the library</li>
               <li>Use D3 directly for complete control over rendering</li>
               <li>Implement custom interactions and tooltips</li>
               <li>Leverage Canopy Charts components for common elements like axes</li>
            </ul>
         </div>
      </div>
   );
} 