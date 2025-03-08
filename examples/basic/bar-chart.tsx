import React from 'react';
import { BarChart } from '@canopy/charts';

/**
 * Basic Bar Chart Example
 * 
 * This example demonstrates the simplest implementation of a bar chart
 * using Canopy Charts. It shows quarterly revenue data with minimal configuration.
 */
export default function BasicBarChart() {
   // Sample data representing quarterly revenue
   const data = [
      { label: 'Q1', value: 12000 },
      { label: 'Q2', value: 8000 },
      { label: 'Q3', value: 15000 },
      { label: 'Q4', value: 9000 },
   ];

   return (
      <div className="chart-container">
         <h2>Quarterly Revenue</h2>

         {/* 
        The BarChart component with minimal configuration:
        - data: Array of objects with label and value properties
        - vibe: Predefined visual theme (options: modern, evergreen, bamboo, etc.)
      */}
         <BarChart
            data={data}
            vibe="evergreen"
         />
      </div>
   );
} 