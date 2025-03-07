import { ChartStyle } from '.';

// base configuration shared by all chart types
export interface BaseChartConfig {
	// axes and grid
	showXAxis?: boolean;
	showYAxis?: boolean;
	showXGrid?: boolean;
	showYGrid?: boolean;
	showAxisLabels?: boolean;
	labelSize?: number;
	gridStyle?: 'solid' | 'dashed';
	gridOpacity?: number;
	axisOpacity?: number;
	gridLines?: number;

	// ui elements
	showTooltip?: boolean;
	showLegend?: boolean;
	legendPosition?: 'left' | 'right';

	// titles and labels
	chartTitle?: string;
	xAxisLabel?: string;
	yAxisLabel?: string;

	// margins
	marginTop?: number;
	marginRight?: number;
	marginBottom?: number;
	marginLeft?: number;

	// interaction
	enableZoom?: boolean;
	enablePan?: boolean;

	// animation
	animationDuration?: number;
	animateOnDataUpdate?: boolean;
}

// bar chart specific configuration
export interface BarChartConfig extends BaseChartConfig {
	barPadding?: number;
	cornerRadius?: number;
}

// default bar chart configuration
export const defaultBarChartConfig: BarChartConfig = {
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
	barPadding: 0.2,
	axisOpacity: 0.5,
	cornerRadius: 4,
	enableZoom: false,
	animationDuration: 750,
	animateOnDataUpdate: true,
};
