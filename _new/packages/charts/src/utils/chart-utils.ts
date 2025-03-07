/* ----------------------------------------
 * Shared utilities for chart components
 * Provides common functionality used across different chart types
 * ---------------------------------------- */

import * as d3 from 'd3';
import { ChartStyle } from '../types';

/**
 * Animation utilities for consistent transitions across chart types
 */
export const transitions = {
	easings: {
		rainforest: d3.easeElasticOut.amplitude(1.2).period(0.5),
		savanna: d3.easeBackOut.overshoot(2.5),
		tundra: d3.easeBounceOut,
		coral: d3.easeSinInOut,
		volcanic: d3.easeExpInOut,
		dunes: d3.easeCubicInOut,
		default: d3.easeCubicOut,
	} as Record<string, (t: number) => number>,

	/**
	 * Get easing function based on chart vibe
	 */
	getEasing: (vibe: ChartStyle | string) =>
		transitions.easings[vibe] || transitions.easings.default,

	/**
	 * Get delay for staggered animations based on vibe
	 */
	getDelay: (
		vibe: ChartStyle | string,
		index: number,
		total: number
	) => {
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

/**
 * Theme utilities for consistent styling across chart types
 */
export const theme = {
	/**
	 * Get color from CSS variable with fallback
	 */
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

	/**
	 * Standard colors used across chart components
	 */
	colors: {
		grid: 'rgb(71, 85, 105)', // slate-600 for better visibility
		axis: 'rgb(71, 85, 105)', // slate-600
		text: 'rgb(51, 65, 85)', // slate-700
		background: 'rgb(255, 255, 255)',
		backgroundDark: 'rgb(15, 23, 42)',
	},
};

/**
 * Setup zoom behavior for chart
 */
export const setupZoom = <T extends SVGElement>(
	g: d3.Selection<T, unknown, null, undefined>,
	width: number,
	height: number,
	enableZoom: boolean = false
) => {
	if (!enableZoom) return;

	const zoom = d3
		.zoom<T, unknown>()
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

/**
 * Debounce function to prevent excessive updates
 */
export const debounce = <T extends (...args: any[]) => void>(
	fn: T,
	ms = 50
) => {
	let timeoutId: ReturnType<typeof setTimeout>;
	return function (this: any, ...args: Parameters<T>) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn.apply(this, args), ms);
	};
};

/**
 * Format number for display
 */
export const formatNumber = (value: number): string => {
	if (value >= 1000000) {
		return `${(value / 1000000).toFixed(1)}M`;
	} else if (value >= 1000) {
		return `${(value / 1000).toFixed(1)}K`;
	}
	return value.toString();
};
