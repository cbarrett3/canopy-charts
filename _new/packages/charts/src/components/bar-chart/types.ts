/* ----------------------------------------
 * Type definitions for the bar chart ecosystem. Ensures type safety
 * across all chart-related components and utilities.
 * ---------------------------------------- */

import { ChartStyle } from '../../types';
import {
	BarChartConfig,
	defaultBarChartConfig as baseDefaultBarChartConfig,
} from '../../types/chart-config';
import * as d3 from 'd3';

// basic bar data structure
export interface DataPoint {
	label: string;
	value: number;
}

// visual style config for bars
export interface VibeStyle {
	barOpacity: number;
	barHoverOpacity: number;
	transition: string;
	cornerRadius: number;
	animationDuration: number;
	transformOrigin: string;
	hoverTransform: string;
}

// d3 rendering config
export interface RenderConfig {
	g: d3.Selection<SVGGElement, unknown, null, undefined>;
	data: DataPoint[];
	xScale: d3.ScaleBand<string>;
	yScale: d3.ScaleLinear<number, number>;
	width: number;
	height: number;
	color: string;
	vibe: ChartStyle;
	config: BarChartConfig;
	tooltip?: HTMLDivElement;
	onMouseEnter: (event: MouseEvent, d: DataPoint) => void;
	onMouseLeave: () => void;
}

// tooltip state
export interface TooltipState {
	x: number;
	y: number;
	visible: boolean;
	title: string;
	items: {
		label: string;
		value: string | number;
		color?: string;
	}[];
}

// main component props
export interface BarChartProps {
	data?: DataPoint[];
	themeColor?: string;
	vibe?: ChartStyle;
	config?: BarChartConfig;
	showAxes?: boolean;
	showGrid?: boolean;
	showLabels?: boolean;
	showTooltips?: boolean;
	labelSize?: number;
	className?: string;
}

// Export the default config
export const defaultBarChartConfig = baseDefaultBarChartConfig;
