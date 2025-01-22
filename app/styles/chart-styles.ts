import { select } from 'd3-selection'
import { easeCubicInOut, easeElastic, easeBounce, easeCircleIn, easeCircleOut } from 'd3-ease'

export interface ChartStyleConfig {
  curves: {
    type: string
    tension?: number
  }
  transitions: {
    duration: number
    ease: (normalizedTime: number) => number
  }
  shapes: {
    cornerRadius: number
    strokeWidth: number
  }
  interactivity: {
    hoverEffect: string
    hoverDuration: number
    activeScale: number
  }
}

const baseTransitionDuration = 750

export const chartStyles: Record<string, ChartStyleConfig> = {
  evergreen: {
    curves: {
      type: 'linear', // Sharp, straight lines
      tension: 0
    },
    transitions: {
      duration: baseTransitionDuration * 0.8, // Quicker, more precise
      ease: easeCubicInOut
    },
    shapes: {
      cornerRadius: 0, // Sharp corners
      strokeWidth: 2
    },
    interactivity: {
      hoverEffect: 'sharp',
      hoverDuration: 150,
      activeScale: 1.05
    }
  },
  palm: {
    curves: {
      type: 'basis', // Smooth, flowing curves
      tension: 0.4
    },
    transitions: {
      duration: baseTransitionDuration * 1.2,
      ease: easeElastic // Bouncy, swaying effect
    },
    shapes: {
      cornerRadius: 12,
      strokeWidth: 1.5
    },
    interactivity: {
      hoverEffect: 'sway',
      hoverDuration: 400,
      activeScale: 1.1
    }
  },
  bamboo: {
    curves: {
      type: 'stepAfter', // Structured steps
      tension: 0
    },
    transitions: {
      duration: baseTransitionDuration,
      ease: easeBounce
    },
    shapes: {
      cornerRadius: 4,
      strokeWidth: 1
    },
    interactivity: {
      hoverEffect: 'segment',
      hoverDuration: 200,
      activeScale: 1.02
    }
  },
  willow: {
    curves: {
      type: 'natural', // Gentle, natural curves
      tension: 0.3
    },
    transitions: {
      duration: baseTransitionDuration * 1.5,
      ease: easeCircleOut // Soft, gradual
    },
    shapes: {
      cornerRadius: 16,
      strokeWidth: 1.5
    },
    interactivity: {
      hoverEffect: 'gentle',
      hoverDuration: 300,
      activeScale: 1.08
    }
  },
  succulent: {
    curves: {
      type: 'cardinal', // Rounded, geometric
      tension: 0.2
    },
    transitions: {
      duration: baseTransitionDuration,
      ease: easeCircleIn
    },
    shapes: {
      cornerRadius: 8,
      strokeWidth: 2
    },
    interactivity: {
      hoverEffect: 'grow',
      hoverDuration: 250,
      activeScale: 1.15
    }
  },
  vine: {
    curves: {
      type: 'monotone', // Interconnected, flowing
      tension: 0.4
    },
    transitions: {
      duration: baseTransitionDuration * 1.3,
      ease: easeCubicInOut
    },
    shapes: {
      cornerRadius: 6,
      strokeWidth: 1.5
    },
    interactivity: {
      hoverEffect: 'flow',
      hoverDuration: 350,
      activeScale: 1.06
    }
  }
}

export function applyChartStyle(
  selection: any, 
  style: string, 
  options: {
    isHovered?: boolean
    isActive?: boolean
    animate?: boolean
  } = {}
) {
  const config = chartStyles[style] || chartStyles.evergreen
  const { isHovered, isActive, animate = true } = options

  let transition = selection
  if (animate) {
    transition = selection.transition()
      .duration(isHovered ? config.interactivity.hoverDuration : config.transitions.duration)
      .ease(config.transitions.ease)
  }

  // Apply base styles
  transition
    .style('stroke-width', config.shapes.strokeWidth)
    .style('rx', config.shapes.cornerRadius)
    .style('ry', config.shapes.cornerRadius)

  // Apply interactive states
  if (isHovered || isActive) {
    const scale = isActive ? config.interactivity.activeScale : 1.05
    
    switch (config.interactivity.hoverEffect) {
      case 'sharp':
        transition.style('stroke-width', config.shapes.strokeWidth * 2)
        break
      case 'sway':
        // Add gentle rotation for palm-like movement
        transition.attr('transform', `rotate(${isHovered ? 2 : 0})`)
        break
      case 'segment':
        // Emphasize segments for bamboo-like effect
        transition.style('stroke-dasharray', '4,2')
        break
      case 'gentle':
        // Soft opacity change for willow-like effect
        transition.style('opacity', 0.8)
        break
      case 'grow':
        // Circular expansion for succulent-like effect
        transition.attr('transform', `scale(${scale})`)
        break
      case 'flow':
        // Smooth color transition for vine-like effect
        transition.style('filter', 'brightness(1.2)')
        break
    }
  } else {
    // Reset interactive states
    transition
      .style('stroke-dasharray', null)
      .style('opacity', 1)
      .style('filter', null)
      .attr('transform', null)
  }

  return transition
}

// Helper to get curve type for line/area charts
export function getCurveType(style: string): string {
  return chartStyles[style]?.curves.type || 'linear'
}

// Helper to get transition config
export function getTransitionConfig(style: string) {
  const config = chartStyles[style] || chartStyles.evergreen
  return {
    duration: config.transitions.duration,
    ease: config.transitions.ease
  }
}

// Helper to get shape config
export function getShapeConfig(style: string) {
  const config = chartStyles[style] || chartStyles.evergreen
  return config.shapes
}
