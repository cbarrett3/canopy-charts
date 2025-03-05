/* ----------------------------------------
 * Core D3 implementation for bar rendering and animations. Handles all
 * direct SVG manipulations separate from React concerns.
 * ---------------------------------------- */

import * as d3 from 'd3';
import { RenderConfig, DataPoint } from './types';
import { vibeStyles } from './vibes';

type EasingFn = (normalizedTime: number) => number;

// map vibe to d3 easing function
const getEasing = (vibe: string) => {
	const easings: Record<string, EasingFn> = {
		rainforest: d3.easeElasticOut.amplitude(1.2).period(0.5),
		savanna: d3.easeBackOut.overshoot(2.5),
		tundra: d3.easeBounceOut,
		coral: d3.easeSinInOut,
		volcanic: d3.easeExpInOut,
		dunes: d3.easeCubicInOut,
	};
	return easings[vibe] || d3.easeCubicOut;
};

// get delay based on vibe and index
const getDelay = (vibe: string, index: number, total: number) => {
	const baseDelay = 50;
	const delays: Record<string, number> = {
		rainforest: index * baseDelay * 0.8,
		savanna: index * baseDelay * 0.3 + Math.random() * 100,
		tundra: (total - index - 1) * baseDelay * 0.5,
		coral: index * baseDelay,
		volcanic: index * baseDelay * 0.2,
		dunes: index * baseDelay * 0.6,
	};
	return delays[vibe] || index * baseDelay;
};

// debounce function to prevent excessive tooltip updates
const debounce = <T extends (...args: any[]) => void>(
	fn: T,
	ms = 50
) => {
	let timeoutId: ReturnType<typeof setTimeout>;
	return function (this: any, ...args: Parameters<T>) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn.apply(this, args), ms);
	};
};

// handle tooltip update with debouncing
const updateTooltip = debounce(
	(tooltip: HTMLDivElement, event: MouseEvent, content: string) => {
		if (tooltip instanceof HTMLDivElement) {
			const tooltipContent = tooltip.querySelector(
				'.tooltip-content'
			) as HTMLDivElement;
			if (tooltipContent) {
				tooltipContent.textContent = content;
			}
			tooltip.style.visibility = 'visible';
			tooltip.style.transform = 'translate(-50%, 0)';
			tooltip.style.left = `${event.pageX}px`;
			tooltip.style.top = `${event.pageY - 5}px`;
		}
	},
	16
); // Debounce at 60fps

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
	const style = vibeStyles[vibe];
	const barSelection = g
		.selectAll<SVGRectElement, DataPoint>('.bar')
		.data<DataPoint>(data, (d: DataPoint) => d.label); // Key function for stable updates

	// Remove old bars with animation
	barSelection
		.exit()
		.transition()
		.duration(200)
		.style('opacity', 0)
		.remove();

	// Update existing bars and add new ones
	const bars = barSelection
		.enter()
		.append('rect')
		.attr('class', 'bar')
		.merge(barSelection)
		.attr('x', (d: DataPoint) => xScale(d.label) || 0)
		.attr('y', height)
		.attr('width', xScale.bandwidth())
		.attr('height', 0)
		.attr('fill', color)
		.attr('rx', style.cornerRadius)
		.attr('ry', style.cornerRadius)
		.style('opacity', 0)
		.style('cursor', 'pointer');

	// Animate bars
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
		bars
			.on('mouseenter', (event: MouseEvent, d: DataPoint) => {
				const bar = d3.select<SVGRectElement, DataPoint>(
					event.target as SVGRectElement
				);

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

				updateTooltip(tooltip, event, `${d.label}: ${d.value}`);
			})
			.on('mousemove', (event: MouseEvent, d: DataPoint) => {
				updateTooltip(tooltip, event, `${d.label}: ${d.value}`);
			})
			.on('mouseleave', (event: MouseEvent) => {
				const bar = d3.select<SVGRectElement, DataPoint>(
					event.target as SVGRectElement
				);

				bar
					.transition()
					.duration(150)
					.ease(d3.easeCubicOut)
					.style('opacity', style.barOpacity)
					.attr('y', (d: DataPoint) => yScale(d.value))
					.attr('height', (d: DataPoint) => height - yScale(d.value));

				if (tooltip instanceof HTMLDivElement) {
					tooltip.style.visibility = 'hidden';
				}
			});
	}

	return bars;
};
