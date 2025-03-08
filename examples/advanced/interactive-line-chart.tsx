import React, { useState } from 'react';
import { LineChart } from '@canopy/charts';
import { format } from 'date-fns';

/**
 * Advanced Interactive Line Chart Example
 * 
 * This example demonstrates a more complex implementation with:
 * - Multiple data series
 * - Custom tooltips
 * - Interactive elements
 * - Axis configuration
 * - Custom styling
 */
export default function InteractiveLineChart() {
   // State for tracking the selected data point
   const [selectedPoint, setSelectedPoint] = useState(null);

   // Sample time series data with two datasets
   const data = {
      dates: [
         new Date('2023-01-01'),
         new Date('2023-02-01'),
         new Date('2023-03-01'),
         new Date('2023-04-01'),
         new Date('2023-05-01'),
         new Date('2023-06-01'),
      ],
      series: [
         {
            name: 'Revenue',
            values: [12000, 15000, 13000, 17000, 19000, 18000],
            color: '#4ade80', // Custom color for this series
         },
         {
            name: 'Expenses',
            values: [10000, 11000, 10500, 12000, 14000, 13500],
            color: '#f87171', // Custom color for this series
         },
      ],
   };

   // Custom tooltip component
   const CustomTooltip = ({ point }) => (
      <div className="custom-tooltip">
         <div className="tooltip-date">{format(point.date, 'MMM yyyy')}</div>
         <div className="tooltip-value" style={{ color: point.series.color }}>
            {point.series.name}: ${point.value.toLocaleString()}
         </div>
         <div className="tooltip-delta">
            {point.value > (point.prevValue || 0)
               ? `↑ $${(point.value - (point.prevValue || 0)).toLocaleString()}`
               : `↓ $${((point.prevValue || 0) - point.value).toLocaleString()}`
            }
         </div>
      </div>
   );

   return (
      <div className="chart-container">
         <h2>Revenue vs. Expenses (2023)</h2>

         {/* Display details of selected point if any */}
         {selectedPoint && (
            <div className="selected-point-details">
               <h3>Selected: {format(selectedPoint.date, 'MMMM yyyy')}</h3>
               <p>
                  {selectedPoint.series.name}: ${selectedPoint.value.toLocaleString()}
               </p>
            </div>
         )}

         {/* 
        Advanced LineChart implementation with:
        - Multiple data series
        - Custom axis configuration
        - Style overrides
        - Interactive callbacks
        - Custom tooltip rendering
      */}
         <LineChart
            data={data}
            vibe="modern"
            height={400}

            // Axis configuration
            axisConfig={{
               x: {
                  tickFormat: (d) => format(d, 'MMM'),
                  gridLines: true,
                  label: 'Month (2023)'
               },
               y: {
                  domain: [0, 'auto'],
                  tickCount: 5,
                  tickFormat: (d) => `$${d / 1000}k`,
                  label: 'Amount (USD)'
               },
            }}

            // Style overrides
            styleOverrides={{
               line: {
                  strokeWidth: 3,
                  strokeLinecap: 'round'
               },
               point: {
                  radius: 5,
                  fillOpacity: 0.8,
                  hoverRadius: 8
               },
               grid: {
                  stroke: '#e2e8f0',
                  strokeDasharray: '2,2'
               }
            }}

            // Interaction handlers
            onPointClick={(point) => {
               setSelectedPoint(point);
               console.log('Point clicked:', point);
            }}

            // Custom tooltip rendering
            renderTooltip={(point) => <CustomTooltip point={point} />}

            // Direct D3 access for unlimited customization
            onD3Instance={(d3, svg, data) => {
               // Add custom annotations or elements
               const annotations = d3.select(svg).append('g')
                  .attr('class', 'annotations');

               // Example: Add a highlight for the highest value point
               const highestPoint = data.series[0].values.reduce(
                  (max, value, i) => value > max.value ? { value, index: i } : max,
                  { value: -Infinity, index: -1 }
               );

               if (highestPoint.index !== -1) {
                  const x = d3.scaleTime()
                     .domain([data.dates[0], data.dates[data.dates.length - 1]])
                     .range([0, svg.width - svg.margin.left - svg.margin.right]);

                  const y = d3.scaleLinear()
                     .domain([0, Math.max(...data.series[0].values) * 1.1])
                     .range([svg.height - svg.margin.top - svg.margin.bottom, 0]);

                  annotations.append('circle')
                     .attr('cx', x(data.dates[highestPoint.index]) + svg.margin.left)
                     .attr('cy', y(highestPoint.value) + svg.margin.top)
                     .attr('r', 10)
                     .attr('fill', 'none')
                     .attr('stroke', '#4ade80')
                     .attr('stroke-width', 2)
                     .attr('stroke-dasharray', '3,3')
                     .attr('class', 'highlight-circle');
               }
            }}
         />
      </div>
   );
} 