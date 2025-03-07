import { ChartStyle } from '../../types';
import { VibeStyle } from './types';

// define the base vibe style
const baseVibe: VibeStyle = {
	lineOpacity: 0.8,
	lineHoverOpacity: 1,
	pointOpacity: 0.8,
	pointHoverOpacity: 1,
	transition: 'all 0.3s ease',
	animationDuration: 750,
	transformOrigin: 'center',
	hoverTransform: 'scale(1.05)',
};

// evergreen - smooth and professional
export const evergreenVibe: VibeStyle = {
	...baseVibe,
	lineOpacity: 0.85,
	pointOpacity: 0.9,
	transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
	animationDuration: 1000,
};

// playful - bouncy and fun
export const playfulVibe: VibeStyle = {
	...baseVibe,
	lineOpacity: 1,
	pointOpacity: 1,
	transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
	animationDuration: 1200,
	hoverTransform: 'scale(1.1)',
};

// minimal - subtle and clean
export const minimalVibe: VibeStyle = {
	...baseVibe,
	lineOpacity: 0.7,
	lineHoverOpacity: 0.9,
	pointOpacity: 0.6,
	pointHoverOpacity: 0.8,
	transition: 'all 0.2s ease',
	animationDuration: 500,
	hoverTransform: 'scale(1.02)',
};

// bold - impactful and confident
export const boldVibe: VibeStyle = {
	...baseVibe,
	lineOpacity: 1,
	lineHoverOpacity: 1,
	pointOpacity: 1,
	pointHoverOpacity: 1,
	transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
	animationDuration: 800,
	hoverTransform: 'scale(1.08)',
};

// get vibe style based on chart style
export const getVibeStyle = (
	vibe: ChartStyle = 'evergreen'
): VibeStyle => {
	switch (vibe) {
		case 'playful':
			return playfulVibe;
		case 'minimal':
			return minimalVibe;
		case 'bold':
			return boldVibe;
		case 'evergreen':
		default:
			return evergreenVibe;
	}
};
