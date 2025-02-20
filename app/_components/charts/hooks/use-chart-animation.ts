import { useEffect } from 'react';
import * as d3 from 'd3';
import { ChartStyle } from '../types';

interface AnimationConfig {
  duration: number;
  easing: (t: number) => number;
}

export const useChartAnimation = (
  svgRef: React.RefObject<SVGSVGElement>,
  datasets: string[],
  style: ChartStyle = 'evergreen'
) => {
  useEffect(() => {
    if (!svgRef.current) return;

    const getAnimationConfig = (style: ChartStyle): AnimationConfig => {
      const configs: Record<ChartStyle, AnimationConfig> = {
        evergreen: { duration: 2000, easing: d3.easeLinear },
        rainforest: { duration: 1000, easing: d3.easeElastic },
        ocean: { duration: 3000, easing: d3.easeCubicInOut },
        sunset: { duration: 1500, easing: d3.easeQuadOut },
        midnight: { duration: 2500, easing: d3.easeBounceOut }
      };
      return configs[style];
    };

    const config = getAnimationConfig(style);

    datasets.forEach(dataset => {
      const path = d3.select(svgRef.current)
        .selectAll(`.line-${dataset}`)
        .attr('stroke-dasharray', function() {
          return (this as SVGPathElement).getTotalLength();
        })
        .attr('stroke-dashoffset', function() {
          return (this as SVGPathElement).getTotalLength();
        });

      path.transition()
        .duration(config.duration)
        .ease(config.easing)
        .attr('stroke-dashoffset', 0);
    });
  }, [datasets, style, svgRef]);
};
