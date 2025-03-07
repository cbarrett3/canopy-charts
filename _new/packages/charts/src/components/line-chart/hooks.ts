import { useCallback, useState } from 'react';
import * as d3 from 'd3';
import { DataPoint, TooltipState } from './types';

// hook for managing tooltip state
export const useTooltip = () => {
	const [tooltip, setTooltip] = useState<TooltipState>({
		x: 0,
		y: 0,
		visible: false,
		title: '',
		items: [],
	});

	const showTooltip = useCallback(
		(event: MouseEvent, d: DataPoint, series: string) => {
			setTooltip({
				x: event.pageX,
				y: event.pageY - 10,
				visible: true,
				title: d.name,
				items: [
					{
						label: series,
						value: d[series],
						color: event.target?.getAttribute('fill') || undefined,
					},
				],
			});
		},
		[]
	);

	const hideTooltip = useCallback(() => {
		setTooltip((prev) => ({ ...prev, visible: false }));
	}, []);

	return { tooltip, showTooltip, hideTooltip };
};

// hook for managing zoom and pan
export const useZoomPan = (
	width: number,
	height: number,
	onZoom?: (transform: d3.ZoomTransform) => void
) => {
	const zoom = d3
		.zoom<SVGSVGElement, unknown>()
		.scaleExtent([1, 4])
		.extent([
			[0, 0],
			[width, height],
		])
		.on('zoom', (event) => {
			onZoom?.(event.transform);
		});

	return { zoom };
};

// hook for managing line interpolation
export const useLineInterpolation = (
	curve: 'linear' | 'cardinal' | 'monotone' = 'cardinal'
) => {
	return useCallback(() => {
		switch (curve) {
			case 'linear':
				return d3.curveLinear;
			case 'monotone':
				return d3.curveMonotoneX;
			case 'cardinal':
			default:
				return d3.curveCardinal.tension(0.4);
		}
	}, [curve]);
};

// hook for managing scales
export const useScales = (
	data: DataPoint[],
	datasets: string[],
	width: number,
	height: number
) => {
	const xScale = d3
		.scaleBand()
		.domain(data.map((d) => d.name))
		.range([0, width])
		.padding(0.3);

	const yScale = d3
		.scaleLinear()
		.domain([
			0,
			d3.max(data, (d) =>
				Math.max(...datasets.map((key) => Number(d[key])))
			) || 0,
		])
		.range([height, 0])
		.nice();

	return { xScale, yScale };
};
