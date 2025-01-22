"use client"

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { defaultThemeColor, generateColorVariations } from './utils/colors';

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
        const updateChart = () => {
            if (!svgRef.current || !containerRef.current) return;

            // Get container dimensions
            const containerRect = containerRef.current.getBoundingClientRect();
            const width = containerRect.width;
            const height = containerRect.height;

            // Clear any existing SVG content
            d3.select(svgRef.current).selectAll("*").remove();

            const margin = { top: 20, right: 20, bottom: 30, left: 60 };
            const innerWidth = width - margin.left - margin.right;
            const innerHeight = height - margin.top - margin.bottom;

            const svg = d3.select(svgRef.current)
                .attr("width", width)
                .attr("height", height)
                .attr("viewBox", [0, 0, width, height])
                .style("overflow", "visible")
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

            // Create scales
            const yScale = d3.scaleBand()
                .domain(data.map(d => d.category))
                .range([0, innerHeight])
                .padding(0.1);

            const xScale = d3.scaleLinear()
                .domain([0, d3.max(series, d => d3.max(d, d => d[1])) || 0])
                .range([0, innerWidth]);

            // Create tooltip
            const tooltip = d3.select(tooltipRef.current)
                .style("position", "absolute")
                .style("visibility", "hidden")
                .style("background-color", "rgba(0, 0, 0, 0.8)")
                .style("color", "white")
                .style("padding", "8px")
                .style("border-radius", "4px")
                .style("font-size", "12px")
                .style("pointer-events", "none");

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
                .attr("width", 0)
                .attr("cursor", "pointer")
                .on("mouseover", function(event, d) {
                    const layer = d3.select(this.parentNode);
                    const key = layer.datum().key;
                    const value = d[1] - d[0];

                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("opacity", 1)
                        .attr("transform", `scale(1, 1.1)`);

                    tooltip
                        .style("visibility", "visible")
                        .html(`
                            <div>
                                <strong>${key}</strong><br/>
                                Category: ${d.data.category}<br/>
                                Value: ${Math.round(value)}
                            </div>
                        `);

                    // Highlight related segments
                    layers.selectAll("rect")
                        .filter((rect: any) => (rect as any).data.category === d.data.category)
                        .transition()
                        .duration(200)
                        .attr("opacity", 1)
                        .attr("transform", `scale(1, 1.1)`);
                })
                .on("mousemove", function(event) {
                    tooltip
                        .style("left", `${event.pageX + 10}px`)
                        .style("top", `${event.pageY - 10}px`);
                })
                .on("mouseout", function(event, d) {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("opacity", 0.8)
                        .attr("transform", "scale(1, 1)");

                    tooltip.style("visibility", "hidden");

                    // Reset all segments
                    layers.selectAll("rect")
                        .transition()
                        .duration(200)
                        .attr("opacity", 0.8)
                        .attr("transform", "scale(1, 1)");
                })
                .transition()
                .duration(1000)
                .attr("width", d => xScale(d[1]) - xScale(d[0]))
                .attr("opacity", 0.8);

            // Add y-axis with transition
            const yAxis = g.append("g")
                .call(d3.axisLeft(yScale))
                .attr("opacity", 0);

            yAxis.transition()
                .duration(1000)
                .attr("opacity", 1);

            // Add x-axis with transition
            const xAxis = g.append("g")
                .attr("transform", `translate(0,${innerHeight})`)
                .call(d3.axisBottom(xScale).ticks(5))
                .attr("opacity", 0);

            xAxis.transition()
                .duration(1000)
                .attr("opacity", 1);

            // Style the axes
            g.selectAll(".domain")
                .attr("stroke", "#666");
            g.selectAll(".tick line")
                .attr("stroke", "#666");
            g.selectAll(".tick text")
                .attr("fill", "#666");

            // Add legend
            const legend = svg.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .attr("text-anchor", "start")
                .selectAll("g")
                .data(keys)
                .join("g")
                .attr("transform", (d, i) => `translate(${margin.left},${i * 20 + 10})`);

            legend.append("rect")
                .attr("x", innerWidth + 10)
                .attr("width", 15)
                .attr("height", 15)
                .attr("fill", (d, i) => colorScale(i.toString()))
                .attr("opacity", 0.8);

            legend.append("text")
                .attr("x", innerWidth + 30)
                .attr("y", 9.5)
                .attr("dy", "0.32em")
                .text(d => d)
                .attr("fill", "#666");
        };

        // Initial render
        updateChart();

        // Add resize observer for responsive behavior
        const resizeObserver = new ResizeObserver(() => {
            updateChart();
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
        };
    }, [data, themeColor]);

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
            <svg ref={svgRef} style={{ width: '100%', height: '100%', viewBox: '0 0 500 200', overflow: 'visible', display: 'block' }} />
            <div ref={tooltipRef} />
        </div>
    );
};

export default D3StackedBarChart;
