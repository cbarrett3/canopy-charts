import * as d3 from 'd3';
import { useMemo } from 'react';
import { BarChartDataPoint } from '../types';

export interface ScaleConfig {
	width: number;
	height: number;
	padding?: number;
}

export const useBarScales = (
	data: BarChartDataPoint[],
	{ width, height, padding = 0.3 }: ScaleConfig
) => {
	return useMemo(() => {
		const xScale = d3
			.scaleBand()
			.domain(data.map((d) => d.label))
			.range([0, width])
			.padding(padding);

		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.value) || 0])
			.range([height, 0])
			.nice();

		return { xScale, yScale };
	}, [data, width, height, padding]);
};
