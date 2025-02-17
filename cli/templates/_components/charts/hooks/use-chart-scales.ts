import { useMemo } from 'react';
import * as d3 from 'd3';
import { ChartDimensions, DataPoint } from '../types';

interface UseChartScalesProps {
  data: DataPoint[];
  dimensions: ChartDimensions;
  datasets: string[];
}

export const useChartScales = ({ data, dimensions, datasets }: UseChartScalesProps) => {
  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, dimensions.boundedWidth])
      .padding(0.1);
  }, [data, dimensions.boundedWidth]);

  const yScale = useMemo(() => {
    // Get all values from all datasets
    const allValues = data.flatMap((d) => 
      datasets.map((dataset) => Number(d[dataset]) || 0)
    );
    
    // Find the min and max values
    const minValue = Math.min(0, d3.min(allValues) || 0);
    const maxValue = d3.max(allValues) || 0;
    
    return d3
      .scaleLinear()
      .domain([minValue, maxValue * 1.1]) // Add 10% padding at the top
      .range([dimensions.boundedHeight, 0])
      .nice(); // Rounds the scale domain to nice round values
  }, [data, datasets, dimensions.boundedHeight]);

  return { xScale, yScale };
};
