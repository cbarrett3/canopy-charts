/* ----------------------------------------
 * Visual personality definitions for chart animations. Each vibe draws
 * inspiration from natural phenomena for its motion and interactions.
 * ---------------------------------------- */

import { ChartStyle } from '../../types';
import { VibeStyle } from './types';

// bar chart visual styles
export const vibeStyles: Record<ChartStyle, VibeStyle> = {
	// organic growth like a tropical tree reaching for sunlight
	rainforest: {
		barOpacity: 0.85,
		barHoverOpacity: 1,
		transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
		cornerRadius: 8,
		animationDuration: 800,
		transformOrigin: 'bottom',
		hoverTransform: 'scale(1.02)',
		initialTransform: 'scaleY(0)',
		finalTransform: 'scaleY(1)',
		easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // organic spring
	},
	// radiant burst like a savanna sunrise
	savanna: {
		barOpacity: 0.9,
		barHoverOpacity: 1,
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
		cornerRadius: 4,
		animationDuration: 600,
		transformOrigin: 'center',
		hoverTransform: 'scale(1.1)',
		initialTransform: 'scale(0)',
		finalTransform: 'scale(1)',
		easing: 'cubic-bezier(0.33, 1, 0.68, 1)', // radiant burst
	},
	// crystalline formation descending like snowfall
	tundra: {
		barOpacity: 0.75,
		barHoverOpacity: 0.95,
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
		cornerRadius: 0,
		animationDuration: 700,
		transformOrigin: 'top',
		hoverTransform: 'scaleY(0.98)',
		initialTransform: 'scaleY(0)',
		finalTransform: 'scaleY(1)',
		easing: 'cubic-bezier(0.23, 1, 0.32, 1)', // icy descent
	},
	// fluid wave-like motion from the ocean depths
	coral: {
		barOpacity: 0.9,
		barHoverOpacity: 1,
		transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
		cornerRadius: 12,
		animationDuration: 1000,
		transformOrigin: 'bottom',
		hoverTransform: 'scaleY(1.03)',
		initialTransform: 'scaleY(0)',
		finalTransform: 'scaleY(1)',
		easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // fluid wave
	},
	// explosive eruption from below
	volcanic: {
		barOpacity: 0.95,
		barHoverOpacity: 1,
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
		cornerRadius: 0,
		animationDuration: 500,
		transformOrigin: 'bottom',
		hoverTransform: 'scale(1.15)',
		initialTransform: 'scaleY(0)',
		finalTransform: 'scaleY(1)',
		easing: 'cubic-bezier(0.22, 1, 0.36, 1)', // explosive
	},
	// windswept motion like desert sands
	dunes: {
		barOpacity: 0.8,
		barHoverOpacity: 0.9,
		transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
		cornerRadius: 16,
		animationDuration: 800,
		transformOrigin: 'left',
		hoverTransform: 'scaleX(1.02)',
		initialTransform: 'scaleX(0)',
		finalTransform: 'scaleX(1)',
		easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)', // windswept
	},
};
