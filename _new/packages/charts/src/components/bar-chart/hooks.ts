/* ----------------------------------------
 * Custom React hooks for chart interactivity. Encapsulates tooltip
 * logic and other interactive state management.
 * ---------------------------------------- */

import { useCallback, useState } from 'react';
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
		(event: MouseEvent, d: DataPoint) => {
			setTooltip({
				x: event.pageX,
				y: event.pageY,
				visible: true,
				title: d.label,
				items: [
					{
						label: 'Value',
						value: d.value,
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
