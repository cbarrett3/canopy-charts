import { useEffect } from 'react';
import * as d3 from 'd3';
import { VibeType } from '../types';

interface AnimationConfig {
  duration: number;
  easing: (t: number) => number;
}

export const useChartAnimation = (
  svgRef: React.RefObject<SVGSVGElement>,
  datasets: string[],
  vibe: VibeType = 'default'
) => {
  useEffect(() => {
    if (!svgRef.current) return;

    const getAnimationConfig = (vibe: VibeType): AnimationConfig => {
      const configs: Record<VibeType, AnimationConfig> = {
        default: { duration: 2000, easing: d3.easeLinear },
        energetic: { duration: 1000, easing: d3.easeElastic },
        calm: { duration: 3000, easing: d3.easeCubicInOut },
        professional: { duration: 1500, easing: d3.easeQuadOut }
      };
      return configs[vibe] || configs.default;
    };

    const config = getAnimationConfig(vibe);

    datasets.forEach(dataset => {
      const path = d3.select(svgRef.current)
        .select(`path.line-${dataset}`);

      const totalLength = path.node()?.getTotalLength() || 0;

      path
        .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(config.duration)
        .ease(config.easing)
        .attr('stroke-dashoffset', 0);
    });
  }, [datasets, vibe]);
};
