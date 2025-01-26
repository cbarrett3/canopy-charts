import * as d3 from 'd3';

export const generateColorVariations = (baseColor: string, count: number): string[] => {
   const hsl = d3.hsl(baseColor);
   const colors: string[] = [];

   // Generate variations by adjusting lightness and saturation
   for (let i = 0; i < count; i++) {
      const saturation = Math.min(1, hsl.s + (i * 0.1));
      const lightness = Math.max(0.2, Math.min(0.8, hsl.l + (i * 0.1 - 0.3)));
      colors.push(d3.hsl(hsl.h, saturation, lightness).toString());
   }

   return colors;
};

// For line and bar charts where we need a single color with opacity variations
export const generateOpacityVariations = (baseColor: string, count: number): string[] => {
   const color = d3.color(baseColor)!;
   const colors: string[] = [];

   for (let i = 0; i < count; i++) {
      const opacity = 0.3 + (i * 0.7 / count); // Range from 0.3 to 1.0
      colors.push(color.copy({ opacity }).toString());
   }

   return colors;
};

// Default theme color
export const defaultThemeColor = '#22C55E';
