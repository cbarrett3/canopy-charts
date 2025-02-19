"use client"

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { defaultThemeColor, generateColorVariations } from '@/app/_components/charts/utils/colors';
import { useChartDimensions } from '@/app/_components/charts/hooks/use-chart-dimensions';
import { ChartStyle } from './types';
import { withLoading } from './with-loading';

interface DataPoint {
    category: string;
    [key: string]: string | number;
}

interface D3StackedBarChartProps {
    width?: number;
    height?: number;
    data?: DataPoint[];
    title?: string;
    themeColor?: string;
}

const D3StackedBarChart = ({
    width = 500,
    height = 200,
    data = [
        { category: 'A', value1: 30, value2: 20, value3: 10 },
        { category: 'B', value1: 40, value2: 15, value3: 25 },
        { category: 'C', value1: 20, value2: 30, value3: 15 },
        { category: 'D', value1: 35, value2: 25, value3: 20 },
    ],
    title,
    themeColor = defaultThemeColor
}: D3StackedBarChartProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateChart = () => {
            // Get container dimensions
            const containerRect = container.getBoundingClientRect();
            const width = containerRect.width;
            const height = containerRect.height;

            // Clear any existing SVG content
            d3.select(svgRef.current).selectAll("*").remove();

            // Calculate responsive margins based on container size
            const margin = {
                top: Math.max(20, height * 0.05),
                right: Math.max(20, width * 0.05),
                bottom: Math.max(30, height * 0.1),
                left: Math.max(60, width * 0.1)
            };
            const innerWidth = width - margin.left - margin.right;
            const innerHeight = height - margin.top - margin.bottom;

            const svg = d3.select(svgRef.current)
                .attr("width", width)
                .attr("height", height)
                .style("overflow", "hidden")
                .style("display", "block");

            const g = svg.append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            // Get the keys (excluding 'category')
            const keys = Object.keys(data[0]).filter(key => key !== 'category');

            // Create color scale
            const colors = generateColorVariations(themeColor, keys.length);
            const colorScale = d3.scaleOrdinal(colors);

            // Create the stack
            const stack = d3.stack<any>()
                .keys(keys);

            const series = stack(data);

            // Create scales with padding
            const yScale = d3.scaleBand()
                .domain(data.map(d => d.category))
                .range([0, innerHeight])
                .padding(0.2);

            const xScale = d3.scaleLinear()
                .domain([0, d3.max(series, d => d3.max(d, d => d[1])) || 0])
                .range([0, innerWidth])
                .nice();

            // Add X axis with responsive font size
            g.append("g")
                .attr("transform", `translate(0,${innerHeight})`)
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .style("font-size", `${Math.max(10, Math.min(12, width * 0.02))}px`);

            // Add Y axis with responsive font size
            g.append("g")
                .call(d3.axisLeft(yScale))
                .selectAll("text")
                .style("font-size", `${Math.max(10, Math.min(12, width * 0.02))}px`);

            // Create tooltip with responsive positioning
            const tooltip = d3.select(tooltipRef.current)
                .style("position", "absolute")
                .style("visibility", "hidden")
                .style("background-color", "rgba(0, 0, 0, 0.8)")
                .style("color", "white")
                .style("padding", "8px")
                .style("border-radius", "4px")
                .style("font-size", `${Math.max(10, Math.min(12, width * 0.02))}px`)
                .style("pointer-events", "none")
                .style("z-index", "100");

            // Add the stacked bars with transition and interactivity
            const layers = g.selectAll("g.layer")
                .data(series)
                .join("g")
                .attr("class", "layer")
                .attr("fill", (d, i) => colorScale(i.toString()));

            layers.selectAll("rect")
                .data(d => d)
                .join("rect")
                .attr("y", d => yScale(d.data.category) || 0)
                .attr("height", yScale.bandwidth())
                .attr("x", d => xScale(d[0]))
                .attr("width", d => xScale(d[1]) - xScale(d[0]))
                .on("mouseover", function (event, d) {
                    const key = d3.select(this.parentNode).datum().key;
                    const value = d[1] - d[0];
                    
                    tooltip
                        .style("visibility", "visible")
                        .html(`${key}: ${value}`);
                        
                    // Position tooltip responsively
                    const [x, y] = d3.pointer(event, container);
                    const tooltipWidth = (tooltip.node() as HTMLElement).offsetWidth;
                    const tooltipHeight = (tooltip.node() as HTMLElement).offsetHeight;
                    
                    tooltip
                        .style("left", `${Math.min(x, width - tooltipWidth)}px`)
                        .style("top", `${Math.max(0, y - tooltipHeight)}px`);
                })
                .on("mousemove", function (event) {
                    const [x, y] = d3.pointer(event, container);
                    const tooltipWidth = (tooltip.node() as HTMLElement).offsetWidth;
                    const tooltipHeight = (tooltip.node() as HTMLElement).offsetHeight;
                    
                    tooltip
                        .style("left", `${Math.min(x, width - tooltipWidth)}px`)
                        .style("top", `${Math.max(0, y - tooltipHeight)}px`);
                })
                .on("mouseout", function () {
                    tooltip.style("visibility", "hidden");
                });
        };

        // Initial render
        updateChart();

        return () => {
            if (container) {
                d3.select(container).selectAll('*').remove();
            }
        };
    }, [data, themeColor]);

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
            <svg 
                ref={svgRef} 
                style={{ width: '100%', height: '100%', overflow: 'visible', display: 'block' }}
                viewBox="0 0 500 200"
            />
            <div ref={tooltipRef} />
        </div>
    );
};

export default withLoading(D3StackedBarChart);
