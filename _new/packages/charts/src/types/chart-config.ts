/* ----------------------------------------
 * Core configuration types for all chart variants. Provides a consistent
 * interface for configuring chart elements and behavior.
 * ---------------------------------------- */

// base configuration shared across all charts
export interface ChartConfig {
	// axes configuration
	showXAxis: boolean;
	showYAxis: boolean;
	axisColor?: string;
	axisOpacity: number;

	// grid configuration
	showXGrid: boolean;
	showYGrid: boolean;
	gridStyle: 'solid' | 'dashed';
	gridOpacity: number;

	// label configuration
	showAxisLabels: boolean;
	showDataLabels?: boolean;
	labelSize: number;
	labelColor?: string;
	labelFont?: string;

	// tooltip configuration
	showTooltip: boolean;
	tooltipTheme?: 'light' | 'dark' | 'system';
	tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
	customTooltip?: (data: unknown) => React.ReactNode;

	// legend configuration
	showLegend: boolean;
	legendPosition: 'top' | 'right' | 'bottom' | 'left';

	// title and labels
	chartTitle: string;
	xAxisLabel: string;
	yAxisLabel: string;
}

// bar chart specific configuration
export interface BarChartConfig extends ChartConfig {
	barPadding: number;
	isStacked?: boolean;
	isHorizontal?: boolean;
	showBarValues?: boolean;
	barValuePosition?: 'inside' | 'outside';
}

// default configuration values
export const defaultChartConfig: ChartConfig = {
	showXAxis: true,
	showYAxis: true,
	axisOpacity: 0.6,
	showXGrid: true,
	showYGrid: true,
	gridStyle: 'dashed',
	gridOpacity: 0.08,
	showAxisLabels: true,
	showDataLabels: false,
	labelSize: 12,
	showTooltip: true,
	tooltipTheme: 'system',
	tooltipPosition: 'top',
	showLegend: true,
	legendPosition: 'right',
	chartTitle: 'Sample Categories Distribution',
	xAxisLabel: 'Categories',
	yAxisLabel: 'Values',
};

// bar chart specific defaults
export const defaultBarChartConfig: BarChartConfig = {
	...defaultChartConfig,
	barPadding: 0.2,
	isStacked: false,
	isHorizontal: false,
	showBarValues: false,
	barValuePosition: 'outside',
};
