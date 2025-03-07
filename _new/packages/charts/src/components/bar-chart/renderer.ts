/* ----------------------------------------
 * Core D3 implementation for bar rendering and animations. Handles all
 * direct SVG manipulations separate from React concerns.
 * ---------------------------------------- */

import * as d3 from 'd3';
import { RenderConfig, DataPoint } from './types';
import { getVibeStyle } from './vibes';

// base configuration with defaults that can be extended
const defaultConfig = {
	margin: { top: 20, right: 20, bottom: 30, left: 40 },
	animationDuration: 750,
	barPadding: 0.1,
	cornerRadius: 4,
	gridOpacity: 0.15,
	axisOpacity: 0.2,
	tickSize: 6,
	fontSize: 12,
};

// utility to merge configs with defaults
const mergeConfig = (config: Partial<typeof defaultConfig>) => ({
	...defaultConfig,
	...config,
});

// animation utilities
const transitions = {
	easings: {
		rainforest: d3.easeElasticOut.amplitude(1.2).period(0.5),
		savanna: d3.easeBackOut.overshoot(2.5),
		tundra: d3.easeBounceOut,
		coral: d3.easeSinInOut,
		volcanic: d3.easeExpInOut,
		dunes: d3.easeCubicInOut,
		default: d3.easeCubicOut,
	} as Record<string, (t: number) => number>,
	getEasing: (vibe: string) =>
		transitions.easings[vibe] || transitions.easings.default,
	getDelay: (vibe: string, index: number, total: number) => {
		const baseDelay = 50;
		const delays = {
			rainforest: index * baseDelay * 0.8,
			savanna: index * baseDelay * 0.3 + Math.random() * 100,
			tundra: (total - index - 1) * baseDelay * 0.5,
			coral: index * baseDelay,
			volcanic: index * baseDelay * 0.2,
			dunes: index * baseDelay * 0.6,
			default: index * baseDelay,
		} as Record<string, number>;
		return delays[vibe] || delays.default;
	},
};

// theme utilities
const theme = {
	getColor: (
		element: SVGElement | null,
		cssVar: string,
		fallback: string
	): string => {
		if (!element) return fallback;
		return (
			getComputedStyle(element).getPropertyValue(cssVar).trim() ||
			fallback
		);
	},
	colors: {
		grid: 'rgb(71, 85, 105)', // slate-600
		axis: 'rgb(71, 85, 105)', // slate-600
		text: 'rgb(51, 65, 85)', // slate-700
	},
};

// tooltip handling with debouncing
const tooltip = {
	debounce: <T extends (...args: any[]) => void>(fn: T, ms = 50) => {
		let timeoutId: ReturnType<typeof setTimeout>;
		return function (this: any, ...args: Parameters<T>) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => fn.apply(this, args), ms);
		};
	},
	update: (
		tooltip: HTMLDivElement,
		event: MouseEvent,
		content: string
	) => {
		if (!(tooltip instanceof HTMLDivElement)) return;

		const tooltipContent = tooltip.querySelector(
			'.tooltip-content'
		) as HTMLDivElement;
		if (!tooltipContent) return;

		tooltipContent.textContent = content;
		tooltip.style.visibility = 'visible';
		tooltip.style.transform = 'translate(-50%, 0)';
		tooltip.style.left = `${event.pageX}px`;
		tooltip.style.top = `${event.pageY - 5}px`;
	},
};

// debounced tooltip update
const updateTooltip = tooltip.debounce(tooltip.update, 16);

// component renderers
const components = {
	grid: (config: RenderConfig) => {
		const { g, yScale, width, config: chartConfig } = config;

		if (!chartConfig.showYGrid) return;

		const gridGroup = g
			.append('g')
			.attr('class', 'grid-lines')
			.style('pointer-events', 'none');

		const ticks = yScale.ticks(chartConfig.gridLines || 6);

		gridGroup
			.selectAll('line.grid-line')
			.data(ticks)
			.join('line')
			.attr('class', 'grid-line')
			.attr('x1', 0)
			.attr('x2', width)
			.attr('y1', (d) => yScale(d))
			.attr('y2', (d) => yScale(d))
			.style('stroke', theme.colors.grid)
			.style('stroke-width', 1)
			.style('opacity', 0.25)
			.style(
				'stroke-dasharray',
				chartConfig.gridStyle === 'dashed' ? '3,3' : 'none'
			);
	},

	axes: (config: RenderConfig) => {
		const { g, xScale, yScale, height, config: chartConfig } = config;

		// x-axis
		if (chartConfig.showXAxis) {
			const xAxis = g
				.append('g')
				.attr('class', 'x-axis')
				.attr('transform', `translate(0,${height})`)
				.call(
					d3
						.axisBottom(xScale)
						.tickSize(defaultConfig.tickSize)
						.tickPadding(8)
				);

			if (chartConfig.showAxisLabels) {
				xAxis
					.selectAll('text')
					.style(
						'font-size',
						`${chartConfig.labelSize || defaultConfig.fontSize}px`
					)
					.style('fill', theme.colors.text)
					.style('opacity', 1);
			}

			xAxis
				.select('.domain')
				.style('stroke', theme.colors.axis)
				.style('opacity', defaultConfig.axisOpacity);

			xAxis
				.selectAll('.tick line')
				.style('stroke', theme.colors.axis)
				.style('opacity', defaultConfig.axisOpacity);
		}

		// y-axis
		if (chartConfig.showYAxis) {
			const yAxis = g
				.append('g')
				.attr('class', 'y-axis')
				.call(
					d3
						.axisLeft(yScale)
						.tickSize(defaultConfig.tickSize)
						.tickPadding(8)
				);

			if (chartConfig.showAxisLabels) {
				yAxis
					.selectAll('text')
					.style(
						'font-size',
						`${chartConfig.labelSize || defaultConfig.fontSize}px`
					)
					.style('fill', theme.colors.text)
					.style('opacity', 1);
			}

			yAxis
				.select('.domain')
				.style('stroke', theme.colors.axis)
				.style('opacity', defaultConfig.axisOpacity);

			yAxis
				.selectAll('.tick line')
				.style('stroke', theme.colors.axis)
				.style('opacity', defaultConfig.axisOpacity);
		}
	},

	bars: (config: RenderConfig) => {
		const {
			g,
			data,
			xScale,
			yScale,
			height,
			color,
			vibe,
			onMouseEnter,
			onMouseLeave,
		} = config;

		const vibeStyle = getVibeStyle(vibe);
		const easing = transitions.getEasing(vibe);

		const bars = g
			.selectAll('rect.bar')
			.data(data)
			.join('rect')
			.attr('class', 'bar')
			.attr('x', (d) => xScale(d.label) || 0)
			.attr('width', xScale.bandwidth())
			.attr('fill', color)
			.attr('rx', defaultConfig.cornerRadius)
			.attr('ry', defaultConfig.cornerRadius)
			.attr('opacity', vibeStyle.barOpacity);

		// animate bars on initial render
		bars
			.attr('y', height)
			.attr('height', 0)
			.transition()
			.duration(defaultConfig.animationDuration)
			.delay((_, i) => transitions.getDelay(vibe, i, data.length))
			.ease(easing)
			.attr('y', (d) => yScale(d.value))
			.attr('height', (d) => height - yScale(d.value));

		// add interactivity
		bars
			.on('mouseenter', onMouseEnter)
			.on('mousemove', onMouseEnter)
			.on('mouseleave', onMouseLeave)
			.style('transition', vibeStyle.transition);
	},

	title: (config: RenderConfig) => {
		const { g, config: chartConfig } = config;

		if (!chartConfig.chartTitle) return;

		const svgWidth =
			g.node()?.ownerSVGElement?.getBoundingClientRect().width || 0;
		const centerX = svgWidth / 2 + 20;

		const textColor = theme.getColor(
			g.node()?.ownerSVGElement || null,
			'--foreground',
			'currentColor'
		);

		g.append('text')
			.attr('class', 'chart-title')
			.attr('x', centerX)
			.attr('y', -32)
			.attr('text-anchor', 'middle')
			.style('font-size', '14px')
			.style('font-weight', '500')
			.style('font-family', 'system-ui, -apple-system, sans-serif')
			.style('letter-spacing', '0.05em')
			.style('fill', textColor)
			.style('opacity', 0)
			.text(chartConfig.chartTitle.toUpperCase())
			.transition()
			.duration(500)
			.style('opacity', 0.7);
	},
};

// setup zoom behavior
const setupZoom = (config: RenderConfig) => {
	const { g, width, height, config: chartConfig } = config;

	if (!chartConfig.enableZoom) return;

	const zoom = d3
		.zoom<SVGGElement, unknown>()
		.scaleExtent([1, 4])
		.extent([
			[0, 0],
			[width, height],
		])
		.on('zoom', (event) => {
			g.attr('transform', event.transform);
		});

	g.call(zoom as any); // Type assertion to avoid TypeScript error
};

// main render function
export const render = (config: RenderConfig) => {
	const { g } = config;
	g.selectAll('*').remove();

	// render components in specific order for proper layering
	Object.entries({
		grid: components.grid,
		axes: components.axes,
		bars: components.bars,
		title: components.title,
	}).forEach(([name, renderer]) => {
		try {
			renderer(config);
		} catch (error) {
			console.error(`Error rendering ${name}:`, error);
		}
	});

	// setup zoom after rendering
	setupZoom(config);
};
