import { ChartStyle } from '../../types';
import { BaseChartConfig } from '../../types/chart-config';

// basic data structure for a single point
export interface DataPoint {
	name: string;
	[key: string]: string | number; // allows for multiple series
}

// configuration specific to line charts
export interface LineChartConfig extends BaseChartConfig {
	// line specific
	lineWidth?: number;
	lineCurve?: 'linear' | 'cardinal' | 'monotone';
	lineOpacity?: number;

	// point specific
	showPoints?: boolean;
	pointSize?: number;
	pointOpacity?: number;
}

// visual style config for lines and points
export interface VibeStyle {
	lineOpacity: number;
	lineHoverOpacity: number;
	pointOpacity: number;
	pointHoverOpacity: number;
	transition: string;
	animationDuration: number;
	transformOrigin: string;
	hoverTransform: string;
}

// d3 rendering config
export interface RenderConfig {
	g: d3.Selection<SVGGElement, unknown, null, undefined>;
	data: DataPoint[];
	datasets: string[];
	xScale: d3.ScaleBand<string>;
	yScale: d3.ScaleLinear<number, number>;
	height: number;
	width: number;
	color: string;
	vibe: ChartStyle;
	config: LineChartConfig;
	tooltip?: HTMLDivElement;
	onMouseEnter: (
		event: MouseEvent,
		d: DataPoint,
		series: string
	) => void;
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
export interface LineChartProps {
	data?: DataPoint[];
	datasets?: string[];
	themeColor?: string;
	vibe?: ChartStyle;
	config?: LineChartConfig;
	className?: string;
}

// default config
export const defaultLineChartConfig: LineChartConfig = {
	showXAxis: true,
	showYAxis: true,
	showXGrid: true,
	showYGrid: true,
	showAxisLabels: true,
	showTooltip: true,
	showLegend: true,
	legendPosition: 'right',
	labelSize: 12,
	gridStyle: 'dashed',
	gridOpacity: 0.08,
	axisOpacity: 0.5,

	// margins
	marginTop: 20,
	marginRight: 20,
	marginBottom: 40,
	marginLeft: 40,

	// line specific
	lineWidth: 2,
	lineCurve: 'cardinal',
	lineOpacity: 0.8,

	// point specific
	showPoints: true,
	pointSize: 4,
	pointOpacity: 0.8,

	// interaction
	enableZoom: false,
	enablePan: false,

	// animation
	animationDuration: 750,
	animateOnDataUpdate: true,
};
