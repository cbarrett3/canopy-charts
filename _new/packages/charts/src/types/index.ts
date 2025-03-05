/**
 * Available visual styles for charts
 */
export type ChartStyle =
	| 'rainforest' // organic, lush feel with gentle swaying
	| 'savanna' // warm, expansive with radiant movements
	| 'tundra' // crisp, cool with crystalline transitions
	| 'coral' // fluid, flowing with wave-like motions
	| 'volcanic' // intense, dynamic with rising effects
	| 'dunes'; // smooth, windswept with drifting animations

/**
 * Common chart dimensions configuration
 */
export interface ChartDimensions {
	width: number;
	height: number;
	margin: {
		top: number;
		right: number;
		bottom: number;
		left: number;
	};
	boundedWidth: number;
	boundedHeight: number;
}

/**
 * Common chart axis configuration
 */
export interface AxisConfig {
	showLabels?: boolean;
	labelSize?: number;
	className?: {
		text: string;
		line: string;
	};
}

export interface ChartTheme {
	primary: string;
	secondary: string;
	accent: string;
	background: string;
	text: string;
}

export interface DataPoint {
	name: string;
	[key: string]: string | number;
}

export interface ChartOptions {
	showAxes?: boolean;
	showGrid?: boolean;
	showLabels?: boolean;
	labelSize?: number;
	showTitle?: boolean;
	showLegend?: boolean;
	showTooltips?: boolean;
	title?: string;
}

export interface WithThemeColor {
	themeColor?: string;
}

export interface BarChartDataPoint {
	label: string;
	value: number;
}

export interface BarChartProps extends ChartOptions {
	width?: number;
	height?: number;
	data?: BarChartDataPoint[];
	themeColor?: string;
	vibe?: ChartStyle;
}
