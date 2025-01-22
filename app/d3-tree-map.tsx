"use client"

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface DataPoint {
   name: string;
   value?: number;
   children?: DataPoint[];
}

interface D3TreeMapProps {
   width?: number;
   height?: number;
   data?: DataPoint;
   title?: string;
   themeColor?: string;
   tooltipBackgroundColor?: string;
   tooltipTextColor?: string;
}

// Extend the HierarchyRectangularNode interface to include the layout properties
interface ExtendedHierarchyRectangularNode
   extends d3.HierarchyRectangularNode<DataPoint> {
   x0: number;
   x1: number;
   y0: number;
   y1: number;
}

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

const D3TreeMap: React.FC<D3TreeMapProps> = ({
   width = 500,
   height = 275,
   data = {
      name: 'root',
      children: [
         {
            name: 'Category 1',
            value: 100,
         },
         {
            name: 'Category 2',
            value: 200,
         },
         {
            name: 'Category 3',
            value: 300,
         },
      ],
   },
   title,
   themeColor = '#22C55E', // Default green color
   tooltipBackgroundColor = '#1B1B1B',
   tooltipTextColor = '#ffffff',
}) => {
   const svgRef = useRef<SVGSVGElement | null>(null);
   const containerRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      if (svgRef.current) {
         const svg = d3.select(svgRef.current);
         svg.selectAll('*').remove(); // Clear any previous content

         const root = d3
            .hierarchy(data)
            .sum((d) => d.value ?? 0)
            .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

         const treemapLayout = d3
            .treemap<DataPoint>()
            .size([width, height])
            .padding(1);

         treemapLayout(root);

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
            .style('transition', 'opacity 0.3s');

         // Create cells
         const cell = svg
            .selectAll('g')
            .data(root.leaves())
            .join('g')
            .attr('transform', (d: any) => `translate(${d.x0},${d.y0})`);

         // Add rectangles to cells
         cell.append('rect')
            .attr('width', (d: any) => d.x1 - d.x0)
            .attr('height', (d: any) => d.y1 - d.y0)
            .attr('fill', (d: any) => color(d.data.name))
            .attr('opacity', 0.85)
            .attr('rx', 4) // Rounded corners
            .on('mouseover', function (event: MouseEvent, d: any) {
               d3.select(this)
                  .transition()
                  .duration(200)
                  .attr('opacity', 1);

               tooltip
                  .style('opacity', 1)
                  .html(
                     `${d.data.name}<br/>${d.value}`,
                  )
                  .style('left', event.pageX + 'px')
                  .style('top', event.pageY - 28 + 'px');
            })
            .on('mouseout', function () {
               d3.select(this)
                  .transition()
                  .duration(200)
                  .attr('opacity', 0.85);

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
      }

      return () => {
         // Cleanup tooltip
         d3.select('body').selectAll('div.tooltip').remove();
      };
   }, [data, width, height, title, themeColor, tooltipBackgroundColor, tooltipTextColor]);

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
