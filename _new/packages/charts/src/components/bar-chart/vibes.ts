/* ----------------------------------------
 * Visual personality definitions for chart animations. Each vibe draws
 * inspiration from natural phenomena for its motion and interactions.
 * ---------------------------------------- */

import { ChartStyle } from '../../types';
import { VibeStyle } from './types';

// bar chart visual styles
export const vibeStyles: Record<ChartStyle, VibeStyle> = {
	// gentle swaying motion
	rainforest: {
		barOpacity: 0.8,
		barHoverOpacity: 1,
		transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
		cornerRadius: 4,
		animationDuration: 800,
		transformOrigin: 'bottom',
		hoverTransform: 'scale(1.02)',
	},
	// radiant expanding
	savanna: {
		barOpacity: 0.85,
		barHoverOpacity: 1,
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
		cornerRadius: 2,
		animationDuration: 600,
		transformOrigin: 'bottom',
		hoverTransform: 'scale(1.03) translateY(-2px)',
	},
	// crystalline rotation
	tundra: {
		barOpacity: 0.75,
		barHoverOpacity: 0.95,
		transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
		cornerRadius: 1,
		animationDuration: 400,
		transformOrigin: 'bottom',
		hoverTransform: 'scale(1.01)',
	},
	// wave-like motion
	coral: {
		barOpacity: 0.9,
		barHoverOpacity: 1,
		transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
		cornerRadius: 6,
		animationDuration: 700,
		transformOrigin: 'bottom',
		hoverTransform: 'scale(1.04) translateY(-4px)',
	},
	// rising effect
	volcanic: {
		barOpacity: 0.95,
		barHoverOpacity: 1,
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
		cornerRadius: 0,
		animationDuration: 500,
		transformOrigin: 'bottom',
		hoverTransform: 'scale(1.05) translateY(-6px)',
	},
	// drifting motion
	dunes: {
		barOpacity: 0.7,
		barHoverOpacity: 0.9,
		transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
		cornerRadius: 8,
		animationDuration: 900,
		transformOrigin: 'bottom',
		hoverTransform: 'scale(1.02) translateY(-2px)',
	},
};
