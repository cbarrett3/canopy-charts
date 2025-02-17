import React, { memo } from 'react';
import { DataPoint } from '../types';

interface ChartTooltipProps {
  data: DataPoint;
  datasets: string[];
  position: { x: number; y: number };
  visible: boolean;
  backgroundColor: string;
  textColor: string;
}

export const ChartTooltip = memo(({
  data,
  datasets,
  position,
  visible,
  backgroundColor,
  textColor,
}: ChartTooltipProps) => {
  if (!visible) return null;

  return (
    <div
      className="chart-tooltip"
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        backgroundColor,
        color: textColor,
        padding: '8px',
        borderRadius: '4px',
        fontSize: '12px',
        pointerEvents: 'none',
        transform: 'translate(-50%, -100%)',
        zIndex: 100,
      }}
      role="tooltip"
    >
      <div className="tooltip-title" style={{ fontWeight: 'bold', marginBottom: '4px' }}>
        {data.name}
      </div>
      {datasets.map((dataset) => (
        <div key={dataset} className="tooltip-value">
          {dataset}: {data[dataset]}
        </div>
      ))}
    </div>
  );
});

ChartTooltip.displayName = 'ChartTooltip';
