import * as d3 from 'd3';
import { Selection } from 'd3';

export interface AxesConfig {
	g: Selection<SVGGElement, unknown, null, undefined>;
	xScale: d3.ScaleBand<string>;
	yScale: d3.ScaleLinear<number, number>;
	height: number;
	showLabels?: boolean;
	labelSize?: number;
	className?: {
		text: string;
		line: string;
	};
}

export const renderAxes = ({
	g,
	xScale,
	yScale,
	height,
	showLabels = true,
	labelSize = 12,
	className = {
		text: '',
		line: '',
	},
}: AxesConfig) => {
	// X Axis
	const xAxis = g
		.append('g')
		.attr('class', 'x-axis')
		.attr('transform', `translate(0,${height})`)
		.call(d3.axisBottom(xScale));

	if (showLabels) {
		xAxis
			.selectAll('text')
			.style('font-size', `${labelSize}px`)
			.attr('class', className.text);
	}

	// Y Axis
	const yAxis = g
		.append('g')
		.attr('class', 'y-axis')
		.call(d3.axisLeft(yScale));

	if (showLabels) {
		yAxis
			.selectAll('text')
			.style('font-size', `${labelSize}px`)
			.attr('class', className.text);
	}

	// Style axis lines
	g.selectAll('.domain, .tick line').attr('class', className.line);

	return { xAxis, yAxis };
};

export interface GridConfig {
	g: Selection<SVGGElement, unknown, null, undefined>;
	yScale: d3.ScaleLinear<number, number>;
	width: number;
	className?: string;
}

export const renderGrid = ({
	g,
	yScale,
	width,
	className = '',
}: GridConfig) => {
	return g
		.append('g')
		.attr('class', `grid ${className}`.trim())
		.call(d3.axisLeft(yScale).tickSize(-width).tickFormat(null))
		.style('stroke-dasharray', '2,2');
};
