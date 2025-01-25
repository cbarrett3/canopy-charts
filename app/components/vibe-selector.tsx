'use client'

import { useEffect } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"
import clsx from "clsx"
import { useThemeColor } from './theme-context'

const vibes = [
  {
    id: 'evergreen',
    name: 'Evergreen',
    description: 'Sharp, structured charts with clear hierarchy - like the strong vertical lines of a pine tree',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path 
          d="M12 3L20 15H4L12 3Z" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        <motion.path 
          d="M12 8L18 17H6L12 8Z" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
        />
        <motion.path 
          d="M11 21H13V17H11V21Z" 
          stroke="currentColor" 
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4, ease: "easeInOut" }}
        />
      </svg>
    )
  },
  {
    id: 'palm',
    name: 'Palm Tree',
    description: 'Flowing and dynamic with graceful curves - inspired by swaying palm fronds in the breeze',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path 
          d="M12 3C8 3 4 8 8 12C4 12 3 16 6 18" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        <motion.path 
          d="M12 3C16 3 20 8 16 12C20 12 21 16 18 18" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
        />
        <motion.path 
          d="M12 3V21" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4, ease: "easeInOut" }}
        />
      </svg>
    )
  },
  {
    id: 'bamboo',
    name: 'Bamboo',
    description: 'Clean and minimal with balanced spacing - reflecting the elegant segments of bamboo stalks',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path 
          d="M12 3V21" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        <motion.path 
          d="M8 6H16M8 10H16M8 14H16M8 18H16" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
        />
      </svg>
    )
  },
  {
    id: 'willow',
    name: 'Willow',
    description: 'Gentle and organic with soft transitions - like willow branches cascading downward',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path 
          d="M12 3V8" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        <motion.path 
          d="M12 8C16 8 20 12 16 16M12 8C8 8 4 12 8 16" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
        />
        <motion.path 
          d="M12 21V16" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4, ease: "easeInOut" }}
        />
      </svg>
    )
  },
  {
    id: 'succulent',
    name: 'Succulent',
    description: 'Compact and modern with circular patterns - inspired by the geometric forms of succulents',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path 
          d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z" 
          stroke="currentColor" 
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        <motion.path 
          d="M12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7Z" 
          stroke="currentColor" 
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
        />
      </svg>
    )
  },
  {
    id: 'vine',
    name: 'Vine',
    description: 'Interconnected and flowing with organic connections - like climbing vines linking elements together',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path 
          d="M3 17C8 17 8 7 12 7C16 7 16 17 21 17" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.path 
          d="M3 12C8 12 16 12 21 12" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
        />
      </svg>
    )
  }
]

interface VibeSelectorProps {
  currentVibe: string;
  onVibeChange: (vibe: string) => void;
}

export function VibeSelector({ currentVibe = 'palm', onVibeChange }: VibeSelectorProps) {
  const { themeColor } = useThemeColor()
  
  // Set default vibe on mount if none selected
  useEffect(() => {
    if (!currentVibe) {
      onVibeChange('palm')
    }
  }, [])

  return (
    <div className="bg-background/40 dark:bg-[#1B1B1B]/30 backdrop-blur-[12px] backdrop-saturate-[180%] border border-border/40 
      shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.1)] 
      hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.2),inset_0_2px_2px_rgba(255,255,255,0.15)] 
      dark:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)] 
      dark:hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.07)]
      rounded-lg p-3 h-full transition-all duration-300
      after:absolute after:inset-0 after:rounded-lg after:ring-1 after:ring-inset after:ring-white/10 
      after:transition-opacity after:duration-300 hover:after:opacity-50 after:opacity-0 after:-z-10
      before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b 
      before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 
      before:transition-opacity before:duration-300 before:-z-10
      relative group">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: themeColor }} />
        <h3 className="text-sm font-medium text-foreground">Chart Style</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-1.5">
        <TooltipProvider>
          {vibes.map((vibe) => (
            <Tooltip key={vibe.id} delayDuration={200}>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95, y: 2 }}
                  onClick={() => onVibeChange(vibe.id)}
                  className={clsx(
                    "relative flex flex-col items-center justify-center gap-1.5 w-full p-2 rounded-md",
                    "text-muted-foreground hover:text-foreground transition-colors duration-200",
                    "group/vibe overflow-hidden shadow-sm hover:shadow-md",
                    "bg-background/40 dark:bg-[#1B1B1B]/30 backdrop-blur-[12px] backdrop-saturate-[180%]",
                    "border border-border/40",
                    currentVibe === vibe.id && [
                      "text-primary",
                      "shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.1)]",
                      "dark:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.05)]",
                      "before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent",
                    ]
                  )}
                  style={currentVibe === vibe.id ? {
                    color: themeColor,
                    '--theme-color': themeColor,
                  } as any : undefined}
                >
                  <motion.div 
                    className="relative"
                    whileHover={{ 
                      rotate: vibe.id === 'palm' ? [0, -5, 5, -5, 5, 0] : 0,
                      scale: vibe.id === 'succulent' ? [1, 1.1, 1] : 1,
                      y: vibe.id === 'willow' ? [0, -2, 2, -2, 0] : 0
                    }}
                    transition={{ 
                      duration: 1.5, 
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    {vibe.icon}
                  </motion.div>
                  <span className="text-xs font-medium">{vibe.name}</span>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                align="center"
                sideOffset={5}
                className="w-[180px] bg-background/95 dark:bg-[#1B1B1B]/95 backdrop-blur-[12px] backdrop-saturate-[180%] 
                  border border-border/40 shadow-lg rounded-lg
                  after:absolute after:inset-0 after:rounded-lg after:ring-1 after:ring-inset after:ring-white/10"
              >
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm text-foreground">{vibe.name}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{vibe.description}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  )
}
