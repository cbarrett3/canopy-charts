import { useState, useEffect, useCallback, useRef } from 'react';
import { ChartDimensions } from '../types';

interface UseChartDimensionsProps {
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  minHeight?: number;
}

export const useChartDimensions = ({
  marginTop = 20,
  marginRight = 30,
  marginBottom = 50,
  marginLeft = 50,
  minHeight = 400,
}: UseChartDimensionsProps = {}) => {
  const [dimensions, setDimensions] = useState<ChartDimensions>({
    width: 0,
    height: 0,
    margin: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft },
    boundedWidth: 0,
    boundedHeight: 0,
  });

  const containerRef = useRef<HTMLDivElement | null>(null);

  const updateDimensions = useCallback(
    (width: number, height: number) => {
      // Ensure minimum height
      height = Math.max(height, minHeight);
      
      const boundedWidth = Math.max(width - marginLeft - marginRight, 0);
      const boundedHeight = Math.max(height - marginTop - marginBottom, 0);

      setDimensions({
        width,
        height,
        margin: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft },
        boundedWidth,
        boundedHeight,
      });
    },
    [marginTop, marginRight, marginBottom, marginLeft, minHeight]
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries.length) return;

      const { width, height } = entries[0].contentRect;
      updateDimensions(width, height);
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateDimensions]);

  return { dimensions, updateDimensions, containerRef };
};
