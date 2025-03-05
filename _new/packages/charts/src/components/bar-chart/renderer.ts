/* ----------------------------------------
 * Core D3 implementation for bar rendering and animations. Handles all
 * direct SVG manipulations separate from React concerns.
 * ---------------------------------------- */

import * as d3 from 'd3';
import { RenderConfig, DataPoint } from './types';
import { vibeStyles } from './vibes';
import { ValueFn } from 'd3';

// map vibe to d3 easing function
const getEasing = (vibe: string) => {
	switch (vibe) {
		case 'rainforest':
			return d3.easeElasticOut.amplitude(1.2).period(0.5); // bouncy tree growth
		case 'savanna':
			return d3.easeBackOut.overshoot(2.5); // radiant burst
		case 'tundra':
			return d3.easeBounceOut; // crystalline bounce
		case 'coral':
			return d3.easeSinInOut; // smooth wave
		case 'volcanic':
			return d3.easeExpInOut; // explosive force
		case 'dunes':
			return d3.easeCubicInOut; // smooth sand drift
		default:
			return d3.easeCubicOut;
	}
};

// get delay based on vibe and index
const getDelay = (vibe: string, index: number, total: number) => {
	const baseDelay = 50; // reduced from 100 to 50ms
	switch (vibe) {
		case 'rainforest':
			return index * baseDelay * 0.8; // sequential growth
		case 'savanna':
			return index * baseDelay * 0.3 + Math.random() * 100; // radial with randomness
		case 'tundra':
			return (total - index - 1) * baseDelay * 0.5; // reverse for snowfall
		case 'coral':
			return index * baseDelay; // wave sequence
		case 'volcanic':
			return index * baseDelay * 0.2; // rapid sequence
		case 'dunes':
			return index * baseDelay * 0.6; // wind-blown sequence
		default:
			return index * baseDelay;
	}
};

// debounce function to prevent excessive tooltip updates
const debounce = (fn: Function, ms = 50) => {
	let timeoutId: ReturnType<typeof setTimeout>;
	return function (this: any, ...args: any[]) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn.apply(this, args), ms);
	};
};

// render and animate bars
export const renderBars = ({
	g,
	data,
	xScale,
	yScale,
	height,
	color,
	vibe,
	config,
	tooltip,
}: RenderConfig) => {
	// get vibe styles
	const style = vibeStyles[vibe];

	// Create bars with hover effects
	const bars = g
		.selectAll<SVGRectElement, DataPoint>('.bar')
		.data<DataPoint>(data)
		.join('rect')
		.attr('class', 'bar')
		.attr('x', (d: DataPoint) => xScale(d.label) || 0)
		.attr('y', height) // Start from bottom
		.attr('width', xScale.bandwidth())
		.attr('height', 0) // Start with 0 height
		.attr('fill', color)
		.attr('rx', style.cornerRadius)
		.attr('ry', style.cornerRadius)
		.style('opacity', 0)
		.style('cursor', 'pointer');

	// Single unified animation for each bar
	bars.each((d: DataPoint, i, nodes) => {
		const delay = getDelay(vibe, i, data.length);
		const node = d3.select<SVGRectElement, DataPoint>(nodes[i]);

		node
			.transition()
			.delay(delay)
			.duration(style.animationDuration)
			.ease(getEasing(vibe))
			.attr('y', (d: DataPoint) => yScale(d.value))
			.attr('height', (d: DataPoint) => height - yScale(d.value))
			.style('opacity', style.barOpacity);
	});

	// Handle hover effects and tooltip
	if (config.showTooltip && tooltip) {
		const tooltipDiv = d3.select(tooltip);

		bars
			.on('mouseenter', (event: MouseEvent, d: DataPoint) => {
				const bar = d3.select<SVGRectElement, DataPoint>(
					event.target as SVGRectElement
				);

				// Smooth hover animation
				bar
					.transition()
					.duration(150)
					.ease(d3.easeCubicOut)
					.style('opacity', style.barHoverOpacity)
					.attr('y', (d: DataPoint) => yScale(d.value) - 2)
					.attr(
						'height',
						(d: DataPoint) => height - yScale(d.value) + 2
					);

				// Show tooltip with enhanced styling
				if (tooltip instanceof HTMLDivElement) {
					const content = tooltip.querySelector(
						'.tooltip-content'
					) as HTMLDivElement;
					if (content) {
						content.textContent = `${d.label}: ${d.value}`;
					}
					tooltip.style.visibility = 'visible';
					tooltip.style.transform = 'translate(-50%, 0)';
					tooltip.style.left = `${event.pageX}px`;
					tooltip.style.top = `${event.pageY - 45}px`; // Reduced offset
				}
			})
			.on('mousemove', (event: MouseEvent) => {
				if (tooltip instanceof HTMLDivElement) {
					tooltip.style.transform = 'translate(-50%, 0)';
					tooltip.style.left = `${event.pageX}px`;
					tooltip.style.top = `${event.pageY - 45}px`; // Reduced offset
				}
			})
			.on('mouseleave', (event: MouseEvent, d: DataPoint) => {
				const bar = d3.select<SVGRectElement, DataPoint>(
					event.target as SVGRectElement
				);

				// Smooth exit animation
				bar
					.transition()
					.duration(150)
					.ease(d3.easeCubicOut)
					.style('opacity', style.barOpacity)
					.attr('y', (d: DataPoint) => yScale(d.value))
					.attr('height', (d: DataPoint) => height - yScale(d.value));

				// Hide tooltip
				if (tooltip instanceof HTMLDivElement) {
					tooltip.style.visibility = 'hidden';
				}
			});
	}

	return bars;
};
