export type ChartStyle = 'evergreen' | 'rainforest' | 'ocean' | 'sunset' | 'midnight';

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
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface DataPoint {
  name: string;
  [key: string]: string | number;
}

export interface ChartOptions {
  showAxes?: boolean;
  showGrid?: boolean;
  showLabels?: boolean;
  labelSize?: number;
  showTitle?: boolean;
  showLegend?: boolean;
  showTooltips?: boolean;
  title?: string;
}
