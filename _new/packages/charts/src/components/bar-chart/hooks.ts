/* ----------------------------------------
 * Custom React hooks for chart interactivity. Encapsulates tooltip
 * logic and other interactive state management.
 * ---------------------------------------- */

import { useState, useCallback, useEffect } from 'react';
import { DataPoint, TooltipState } from './types';

// tooltip management hook

// manage tooltip state and interactions
export const useTooltip = () => {
	const [tooltip, setTooltip] = useState<{
		show: boolean;
		x: number;
		y: number;
		content: string;
	}>({
		show: false,
		x: 0,
		y: 0,
		content: '',
	});

	// Debug effect to monitor tooltip state changes
	useEffect(() => {
		console.log('Tooltip state changed:', tooltip);
	}, [tooltip]);

	// show tooltip with data
	const handleMouseEnter = useCallback(
		(event: MouseEvent, data: DataPoint) => {
			const rect = (event.target as Element)
				?.closest('svg')
				?.getBoundingClientRect();
			if (!rect) return;

			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;

			setTooltip({
				show: true,
				x,
				y,
				content: `${data.label}: ${data.value}`,
			});
		},
		[]
	);

	// hide tooltip
	const handleMouseLeave = useCallback(() => {
		setTooltip((prev) => ({ ...prev, show: false }));
	}, []);

	return {
		tooltip,
		handleMouseEnter,
		handleMouseLeave,
	};
};
