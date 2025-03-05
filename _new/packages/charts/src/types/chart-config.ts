import { ChartStyle } from '.';

export interface BarChartConfig {
	showXAxis?: boolean;
	showYAxis?: boolean;
	showXGrid?: boolean;
	showYGrid?: boolean;
	showAxisLabels?: boolean;
	showTooltip?: boolean;
	showLegend?: boolean;
	legendPosition?: 'left' | 'right';
	labelSize?: number;
	gridStyle?: 'solid' | 'dashed';
	gridOpacity?: number;
	barPadding?: number;
	axisOpacity?: number;
	chartTitle?: string;
	xAxisLabel?: string;
	yAxisLabel?: string;
}

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
};
