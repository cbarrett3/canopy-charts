import React, { memo } from 'react';
import { ChartTheme } from '../../types';

export interface BaseChartProps {
  width?: number;
  height?: number;
  theme?: ChartTheme;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

export const BaseChart = memo(({
  width = '100%',
  height = 400,
  theme,
  className,
  style,
  ariaLabel,
  children
}: BaseChartProps & { children: React.ReactNode }) => {
  return (
    <div
      className={`canopy-chart ${className || ''}`}
      style={{
        width,
        height,
        position: 'relative',
        ...style
      }}
      role="figure"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
});

BaseChart.displayName = 'BaseChart';
