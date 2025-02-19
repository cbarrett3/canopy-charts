import { useMemo } from 'react';
import * as d3 from 'd3';

type ColorScheme = 'monochromatic' | 'complementary' | 'analogous' | 'sequential';

interface UseChartColorsProps {
  baseColor: string;
  count: number;
  scheme?: ColorScheme;
  opacity?: number;
}

export const useChartColors = ({
  baseColor,
  count,
  scheme = 'monochromatic',
  opacity = 1
}: UseChartColorsProps) => {
  return useMemo(() => {
    const base = d3.color(baseColor);
    if (!base) return Array(count).fill(baseColor);

    const hsl = d3.hsl(base);

    switch (scheme) {
      case 'monochromatic':
        return Array.from({ length: count }, (_, i) => {
          if (i === 0) return baseColor;
          return d3.hsl(
            hsl.h,
            Math.max(0.3, hsl.s - (i * 0.2)),
            Math.min(0.8, hsl.l + (i * 0.1))
          ).toString();
        });

      case 'complementary':
        return Array.from({ length: count }, (_, i) => {
          if (i === 0) return baseColor;
          const hueShift = (180 / count) * i;
          return d3.hsl(
            (hsl.h + hueShift) % 360,
            hsl.s,
            hsl.l
          ).toString();
        });

      case 'analogous':
        return Array.from({ length: count }, (_, i) => {
          if (i === 0) return baseColor;
          const hueShift = ((60 / (count - 1)) * i) - 30; // spread ±30 degrees
          return d3.hsl(
            (360 + hsl.h + hueShift) % 360,
            hsl.s,
            hsl.l
          ).toString();
        });

      case 'sequential':
        const colorScale = d3.scaleSequential()
          .domain([0, count - 1])
          .interpolator(d3.interpolateHsl(
            d3.hsl(hsl.h, hsl.s, hsl.l),
            d3.hsl(hsl.h, Math.max(0.2, hsl.s - 0.3), Math.min(0.9, hsl.l + 0.2))
          ));
        
        return Array.from({ length: count }, (_, i) => colorScale(i));

      default:
        return Array(count).fill(baseColor);
    }
  }, [baseColor, count, scheme]);
};

// Helper function to get the best color scheme for different chart types
export const getChartColorScheme = (chartType: string): ColorScheme => {
  switch (chartType.toLowerCase()) {
    case 'line':
    case 'area':
      return 'monochromatic';
    case 'pie':
    case 'donut':
      return 'analogous';
    case 'bar':
    case 'column':
      return 'sequential';
    case 'scatter':
      return 'complementary';
    default:
      return 'monochromatic';
  }
};
