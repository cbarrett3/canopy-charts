'use client'

import { useEffect, useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
import clsx from "clsx"
import { useThemeColor } from './theme-context'
import { useTranslations } from 'next-intl'
import { 
  TreePine, 
  SunMedium, 
  Snowflake, 
  Waves, 
  Flame, 
  Wind 
} from 'lucide-react'

const vibes = [
  {
    id: 'rainforest',
    Icon: TreePine,
    baseColor: '#94A3B8',
    hoverAnimation: {
      rotate: [-5, 5, -5],
      scale: [1, 1.1, 1],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    loadAnimation: {
      rotate: [-10, 0],
      scale: [0.5, 1],
    }
  },
  {
    id: 'savanna',
    Icon: SunMedium,
    baseColor: '#94A3B8',
    hoverAnimation: {
      scale: [1, 1.2, 1],
      rotate: [0, 180],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    },
    loadAnimation: {
      scale: [1.5, 1],
      rotate: [45, 0],
    }
  },
  {
    id: 'tundra',
    Icon: Snowflake,
    baseColor: '#94A3B8',
    hoverAnimation: {
      rotate: [0, 180],
      scale: [1, 1.1, 0.9, 1],
      transition: { duration: 2, repeat: Infinity, ease: "linear" }
    },
    loadAnimation: {
      rotate: [-90, 0],
      scale: [0.5, 1],
    }
  },
  {
    id: 'coral',
    Icon: Waves,
    baseColor: '#94A3B8',
    hoverAnimation: {
      x: [-3, 3, -3],
      y: [-2, 2, -2],
      rotate: [-5, 5, -5],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    loadAnimation: {
      y: [20, 0],
      rotate: [15, 0],
    }
  },
  {
    id: 'volcanic',
    Icon: Flame,
    baseColor: '#94A3B8',
    hoverAnimation: {
      y: [-4, 0, -4],
      scale: [1, 1.2, 1],
      rotate: [-5, 5, -5],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    },
    loadAnimation: {
      y: [10, 0],
      scale: [0.8, 1],
    }
  },
  {
    id: 'dunes',
    Icon: Wind,
    baseColor: '#94A3B8',
    hoverAnimation: {
      x: [-4, 4, -4],
      scale: [0.95, 1.05, 0.95],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    loadAnimation: {
      x: [-20, 0],
      rotate: [-10, 0],
    }
  }
]

interface VibeSelectorProps {
  selectedVibe?: string;
  onVibeChange: (vibe: string) => void;
}

export const VibeSelector = ({ selectedVibe, onVibeChange }: VibeSelectorProps) => {
  const { themeColor } = useThemeColor()
  const t = useTranslations('VibeSelector');
  const [currentVibe, setCurrentVibe] = useState<string>(selectedVibe || 'rainforest');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!selectedVibe) {
      onVibeChange('rainforest');
    }
    setMounted(true);
  }, [selectedVibe, onVibeChange]);

  const handleVibeChange = (vibe: string) => {
    setCurrentVibe(vibe);
    onVibeChange(vibe);
  };

  return (
    <div className="bg-background/40 dark:bg-[#1B1B1B]/30 backdrop-blur-[12px] backdrop-saturate-[180%] border border-border/40 
      shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.1)] 
      hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.2),inset_0_2px_2px_rgba(255,255,255,0.15)] 
      dark:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)] 
      dark:hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.07)]
      rounded-lg p-3 h-full transition-all duration-300
      relative group">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: themeColor }} />
        <h3 className="text-sm font-medium text-foreground">{t('title')}</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-1.5">
        <TooltipProvider>
          <AnimatePresence>
            {mounted && vibes.map((vibe, index) => {
              const Icon = vibe.Icon;
              const isSelected = currentVibe === vibe.id;
              return (
                <Tooltip key={vibe.id} delayDuration={200}>
                  <TooltipTrigger asChild>
                    <motion.button
                      initial={{ opacity: 0, ...vibe.loadAnimation }}
                      animate={{ opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }}
                      transition={{ 
                        delay: index * 0.1, 
                        duration: 0.4, 
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95, y: 2 }}
                      onClick={() => handleVibeChange(vibe.id)}
                      className={clsx(
                        "relative flex flex-col items-center justify-center gap-1.5 w-full p-2 rounded-md",
                        "text-muted-foreground hover:text-foreground transition-colors duration-200",
                        "group/vibe overflow-hidden shadow-sm hover:shadow-md",
                        "bg-background/40 dark:bg-[#1B1B1B]/30 backdrop-blur-[12px] backdrop-saturate-[180%]",
                        "border border-transparent hover:border-border/40",
                        isSelected && [
                          "border-border/40",
                          "bg-accent/50 dark:bg-accent/20",
                          "text-foreground"
                        ]
                      )}
                    >
                      <motion.div 
                        className="relative"
                        style={{ 
                          color: isSelected ? themeColor : vibe.baseColor,
                        }}
                        whileHover={vibe.hoverAnimation}
                        animate={isSelected ? vibe.hoverAnimation : undefined}
                      >
                        {isSelected && (
                          <>
                            <motion.div
                              className="absolute inset-[-16px] rounded-full opacity-20"
                              style={{ 
                                background: `radial-gradient(circle, ${themeColor}40 0%, transparent 70%)`,
                                filter: 'blur(8px)'
                              }}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ 
                                scale: [0.8, 1.1, 0.9, 1],
                                opacity: [0, 0.3, 0.2, 0.25],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                              }}
                            />
                            <motion.div
                              className="absolute inset-[-12px] rounded-full opacity-20"
                              style={{ 
                                background: `radial-gradient(circle, ${themeColor}60 0%, transparent 60%)`,
                                filter: 'blur(4px)'
                              }}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ 
                                scale: [1, 0.9, 1.1, 1],
                                opacity: [0.2, 0.3, 0.2, 0.25],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                                delay: 0.5
                              }}
                            />
                          </>
                        )}
                        <Icon size={24} strokeWidth={2} />
                      </motion.div>
                      <motion.span 
                        className="text-xs capitalize"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        {t(`vibes.${vibe.id}`)}
                      </motion.span>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="right" 
                    align="center"
                    sideOffset={5}
                    className="bg-background/95 dark:bg-[#1B1B1B]/95 backdrop-blur-[12px] backdrop-saturate-[180%] 
                      border border-border/40 shadow-lg rounded-lg px-3 py-2"
                  >
                    <p className="text-sm text-muted-foreground">{t(`descriptions.${vibe.id}`)}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </AnimatePresence>
        </TooltipProvider>
      </div>
    </div>
  )
}
