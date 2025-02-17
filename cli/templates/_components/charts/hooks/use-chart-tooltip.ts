import { useState, useCallback } from 'react';
import * as d3 from 'd3';
import { DataPoint } from '../types';

interface TooltipState {
  data: DataPoint;
  position: { x: number; y: number };
}

export const useChartTooltip = (xScale: d3.ScaleBand<string>) => {
  const [tooltipData, setTooltipData] = useState<TooltipState | null>(null);

  const handleMouseMove = useCallback((
    event: React.MouseEvent<SVGElement>,
    dataset: string,
    data: DataPoint[]
  ) => {
    const [x] = d3.pointer(event);
    const xValue = xScale.domain()[Math.floor(x / xScale.step())];
    const dataPoint = data.find(d => d.name === xValue);

    if (dataPoint) {
      setTooltipData({
        data: dataPoint,
        position: { x: event.clientX, y: event.clientY }
      });
    }
  }, [xScale]);

  const handleMouseLeave = useCallback(() => {
    setTooltipData(null);
  }, []);

  return {
    tooltipData,
    handleMouseMove,
    handleMouseLeave
  };
};
