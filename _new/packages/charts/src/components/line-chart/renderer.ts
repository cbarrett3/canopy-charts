/* ----------------------------------------
 * Core D3 implementation for line chart rendering and animations. Handles all
 * direct SVG manipulations separate from React concerns.
 * ---------------------------------------- */

import * as d3 from 'd3';
import { RenderConfig, DataPoint } from './types';
import { getVibeStyle } from './vibes';

// base configuration with defaults that can be extended
const defaultConfig = {
	margin: { top: 20, right: 20, bottom: 30, left: 40 },
	animationDuration: 750,
	gridOpacity: 0.25,
	axisOpacity: 0.5,
	tickSize: 6,
	fontSize: 12,
	lineWidth: 2,
	pointSize: 4,
	pointOpacity: 0.8,
	lineOpacity: 0.8,
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
		grid: 'rgb(71, 85, 105)', // slate-600 for better visibility
		axis: 'rgb(71, 85, 105)', // slate-600
		text: 'rgb(51, 65, 85)', // slate-700
	},
};

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
			.style('opacity', defaultConfig.gridOpacity)
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
					.style('opacity', defaultConfig.axisOpacity);
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
					.style('opacity', defaultConfig.axisOpacity);
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

	lines: (config: RenderConfig) => {
		const { g, datasets } = config;

		// Render each dataset as a separate line
		datasets.forEach((seriesKey, index) => {
			components.singleLine(config, seriesKey, index);
		});
	},

	singleLine: (
		config: RenderConfig,
		seriesKey: string,
		index: number
	) => {
		const {
			g,
			data,
			xScale,
			yScale,
			color,
			vibe,
			config: chartConfig,
			onMouseEnter,
			onMouseLeave,
		} = config;

		const vibeStyle = getVibeStyle(vibe);
		const seriesColor =
			index === 0
				? color
				: `${color}${Math.round(80 - index * 20).toString(16)}`;
		const lineWidth =
			chartConfig.lineWidth || defaultConfig.lineWidth;
		const lineOpacity =
			chartConfig.lineOpacity || defaultConfig.lineOpacity;
		const pointSize =
			chartConfig.pointSize || defaultConfig.pointSize;
		const pointOpacity =
			chartConfig.pointOpacity || defaultConfig.pointOpacity;

		// create line generator
		const line = d3
			.line<DataPoint>()
			.x((d) => (xScale(d.name) || 0) + xScale.bandwidth() / 2)
			.y((d) => yScale(Number(d[seriesKey])))
			.curve(
				chartConfig.lineCurve === 'linear'
					? d3.curveLinear
					: chartConfig.lineCurve === 'monotone'
					? d3.curveMonotoneX
					: d3.curveCardinal.tension(0.4)
			);

		// add the line path
		const path = g
			.append('path')
			.datum(data)
			.attr('class', `line-${seriesKey}`)
			.attr('fill', 'none')
			.attr('stroke', seriesColor)
			.attr('stroke-width', lineWidth)
			.attr('opacity', lineOpacity)
			.attr('d', line);

		// animate the line
		const pathLength = path.node()?.getTotalLength() || 0;
		path
			.attr('stroke-dasharray', `${pathLength} ${pathLength}`)
			.attr('stroke-dashoffset', pathLength)
			.transition()
			.duration(
				chartConfig.animationDuration ||
					defaultConfig.animationDuration
			)
			.ease(d3.easeQuadOut)
			.attr('stroke-dashoffset', 0);

		// add points if enabled
		if (chartConfig.showPoints) {
			g.selectAll(`.point-${seriesKey}`)
				.data(data)
				.join('circle')
				.attr('class', `point-${seriesKey}`)
				.attr(
					'cx',
					(d) => (xScale(d.name) || 0) + xScale.bandwidth() / 2
				)
				.attr('cy', (d) => yScale(Number(d[seriesKey])))
				.attr('r', 0)
				.attr('fill', seriesColor)
				.attr('opacity', pointOpacity)
				.on('mouseenter', (event, d) => {
					d3.select(event.target)
						.transition()
						.duration(200)
						.attr('r', pointSize * 1.5)
						.attr('opacity', vibeStyle.pointHoverOpacity);
					onMouseEnter(event, d, seriesKey);
				})
				.on('mouseleave', (event) => {
					d3.select(event.target)
						.transition()
						.duration(200)
						.attr('r', pointSize)
						.attr('opacity', pointOpacity);
					onMouseLeave();
				})
				.transition()
				.delay((_, i) => i * 50)
				.duration(
					chartConfig.animationDuration ||
						defaultConfig.animationDuration
				)
				.attr('r', pointSize);
		}
	},

	title: (config: RenderConfig) => {
		const { g, config: chartConfig } = config;

		if (!chartConfig.chartTitle) return;

		const svgWidth =
			g.node()?.ownerSVGElement?.getBoundingClientRect().width || 0;
		const centerX = svgWidth / 2 + 20;

		g.append('text')
			.attr('class', 'chart-title')
			.attr('x', centerX)
			.attr('y', -32)
			.attr('text-anchor', 'middle')
			.style('font-size', '14px')
			.style('font-weight', '500')
			.style('font-family', 'system-ui, -apple-system, sans-serif')
			.style('letter-spacing', '0.05em')
			.style('fill', theme.colors.grid)
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
		lines: components.lines,
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
