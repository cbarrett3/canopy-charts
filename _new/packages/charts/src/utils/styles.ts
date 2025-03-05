import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const chartClasses = {
	// Layout classes - using standard Tailwind
	container: 'relative w-full h-full',
	svg: 'overflow-visible w-full h-full',

	// Interactive elements
	bar: 'transition-all duration-300 ease-in-out hover:opacity-80',
	tooltip:
		'absolute z-10 px-3 py-2 text-sm bg-black/90 text-white rounded shadow-lg',

	// Axis styling
	axis: {
		text: 'text-gray-600 dark:text-gray-300 text-sm',
		line: 'stroke-gray-300 dark:stroke-gray-600',
		grid: 'stroke-gray-200 dark:stroke-gray-700 stroke-dasharray-2',
	},
};

// Default colors with Tailwind fallbacks
export const chartColors = {
	1: 'var(--chart-1, #3b82f6)', // blue-500
	2: 'var(--chart-2, #10b981)', // emerald-500
	3: 'var(--chart-3, #f59e0b)', // amber-500
	4: 'var(--chart-4, #ef4444)', // red-500
	5: 'var(--chart-5, #8b5cf6)', // violet-500
};
