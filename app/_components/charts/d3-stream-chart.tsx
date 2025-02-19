"use client"

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { defaultThemeColor, generateColorVariations } from '@/app/_components/charts/utils/colors';
import { useChartDimensions } from '@/app/_components/charts/hooks/use-chart-dimensions';
import { ChartStyle } from './types';
import { withLoading } from './with-loading';

interface DataPoint {
    date: Date;
    [key: string]: Date | number;
}

interface D3StreamChartProps {
    width?: number;
    height?: number;
    data?: DataPoint[];
    title?: string;
    themeColor?: string;
}

const D3StreamChart = ({
    width = 500,
    height = 200,
    data = Array.from({ length: 20 }, (_, i) => ({
        date: new Date(2024, 0, i + 1),
        A: Math.random() * 50,
        B: Math.random() * 40,
        C: Math.random() * 30,
        D: Math.random() * 20,
    })),
    title,
    themeColor = defaultThemeColor
}: D3StreamChartProps) => {
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

            const margin = { top: 20, right: 20, bottom: 30, left: 40 };
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

            // Get the keys (excluding 'date')
            const keys = Object.keys(data[0]).filter(key => key !== 'date');

            // Create color scale
            const colors = generateColorVariations(themeColor, keys.length);
            const colorScale = d3.scaleOrdinal(colors);

            // Create scales
            const xScale = d3.scaleTime()
                .domain(d3.extent(data, d => d.date) as [Date, Date])
                .range([0, innerWidth]);

            const yScale = d3.scaleLinear()
                .domain([
                    d3.min(data, d => d3.min(keys, key => d[key] as number)) || 0,
                    d3.max(data, d => d3.max(keys, key => d[key] as number)) || 0
                ])
                .range([innerHeight, 0]);

            // Create the stack
            const stack = d3.stack<any>()
                .keys(keys)
                .offset(d3.stackOffsetWiggle)
                .order(d3.stackOrderNone);

            const series = stack(data);

            // Create the area generator
            const area = d3.area<any>()
                .x(d => xScale(d.data.date))
                .y0(d => yScale(d[0]))
                .y1(d => yScale(d[1]))
                .curve(d3.curveBasis);

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

            // Add the streams with transition and interactivity
            g.selectAll("path")
                .data(series)
                .join("path")
                .attr("fill", (d, i) => colorScale(i.toString()))
                .attr("opacity", 0.8)
                .attr("d", area)
                .attr("cursor", "pointer")
                .on("mouseover", function(event, d) {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("opacity", 1)
                        .attr("transform", "scale(1.02)");
                })
                .on("mousemove", function(event, d) {
                    const [mouseX, mouseY] = d3.pointer(event);
                    const date = xScale.invert(mouseX);
                    const bisect = d3.bisector((d: any) => d.date).left;
                    const index = bisect(data, date);
                    const dataPoint = data[index];
                    
                    if (dataPoint) {
                        const key = d.key;
                        const value = dataPoint[key];
                        tooltip
                            .style("visibility", "visible")
                            .style("left", `${event.pageX + 10}px`)
                            .style("top", `${event.pageY - 10}px`)
                            .html(`
                                <div>
                                    <strong>${key}</strong><br/>
                                    Date: ${dataPoint.date.toLocaleDateString()}<br/>
                                    Value: ${Math.round(value as number)}
                                </div>
                            `);
                    }
                })
                .on("mouseout", function() {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("opacity", 0.8)
                        .attr("transform", "scale(1)");
                    tooltip.style("visibility", "hidden");
                })
                .transition()
                .duration(1000)
                .attr("opacity", 0.8);

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

            // Add vertical hover line
            const verticalLine = g.append("line")
                .attr("stroke", "#666")
                .attr("stroke-width", 1)
                .attr("stroke-dasharray", "5,5")
                .style("opacity", 0);

            svg.on("mousemove", function(event) {
                const [mouseX] = d3.pointer(event);
                verticalLine
                    .attr("x1", mouseX)
                    .attr("x2", mouseX)
                    .attr("y1", 0)
                    .attr("y2", innerHeight)
                    .style("opacity", 1);
            })
            .on("mouseout", function() {
                verticalLine.style("opacity", 0);
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
        <div ref={containerRef} className="relative w-full h-full overflow-hidden">
            <svg ref={svgRef} className="absolute inset-0" />
            <div ref={tooltipRef} />
        </div>
    );
};

export default withLoading(D3StreamChart);
