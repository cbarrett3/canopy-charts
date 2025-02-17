export interface DataPoint {
  name: string;
  [key: string]: number | string;
}

export interface ChartDimensions {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  boundedWidth: number;
  boundedHeight: number;
}

export interface ChartTheme {
  lineColors: string[];
  axisColor: string;
  tooltipBackgroundColor: string;
  tooltipTextColor: string;
  gridColor: string;
  labelColor: string;
  themeColor: string;
}

export type VibeType = 'default' | 'energetic' | 'calm' | 'professional';

export interface ChartAnimationConfig {
  duration: number;
  easing: (t: number) => number;
}
