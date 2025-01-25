'use client'

import { useState, useEffect } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { ColorSelector } from "./color-selector"
import { VibeSelector } from "./vibe-selector"
import { ChartElements } from "./chart-elements"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import clsx from "clsx"
import { useThemeColor } from "./theme-context"
import { useTranslations } from 'next-intl'

interface ChartControlsProps {
  currentTheme: string
  onThemeChange: (color: string) => void
  currentVibe: string
  onVibeChange: (vibe: string) => void
  showAxes: boolean
  onAxesChange: (value: boolean) => void
  showGrid: boolean
  onGridChange: (value: boolean) => void
  showLabels: boolean
  onLabelsChange: (value: boolean) => void
  showTitle: boolean
  onTitleChange: (value: boolean) => void
  showLegend: boolean
  onLegendChange: (value: boolean) => void
  showTooltips: boolean
  onTooltipsChange: (value: boolean) => void
  labelSize: number
  onLabelSizeChange: (value: number) => void
}

export function ChartControls() {
  const t = useTranslations('chart')
  const [isExpanded, setIsExpanded] = useState(true)
  const [currentTheme, setCurrentTheme] = useState('#22C55E')  // Forest theme
  const [currentVibe, setCurrentVibe] = useState('palm')
  const [showAxes, setShowAxes] = useState(true)
  const [showGrid, setShowGrid] = useState(true)
  const [showLabels, setShowLabels] = useState(true)
  const [showTitle, setShowTitle] = useState(true)
  const [showLegend, setShowLegend] = useState(true)
  const [showTooltips, setShowTooltips] = useState(true)
  const [labelSize, setLabelSize] = useState(12)

  const { setThemeColor } = useThemeColor()

  // Initialize defaults on mount
  useEffect(() => {
    setThemeColor('#22C55E')  // Set Forest theme
    if (!currentVibe || currentVibe === '') {
      setCurrentVibe('palm')
    }
  }, [])

  // Keep theme context in sync
  useEffect(() => {
    if (currentTheme) {
      setThemeColor(currentTheme)
    }
  }, [currentTheme, setThemeColor])

  return (
    <div className="w-full space-y-3">
      <div className="relative flex items-center justify-center w-full gap-4 my-4">
        <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-foreground/30 to-transparent dark:via-foreground/40" />
        <Button
          size="lg"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            '--theme-color': currentTheme,
            borderColor: currentTheme
          } as React.CSSProperties}
          className={clsx(
            "relative min-w-[300px] max-w-[400px] text-foreground",
            "bg-background/40 dark:bg-background/20 backdrop-blur-[12px] backdrop-saturate-[180%]",
            "border border-[var(--theme-color)] dark:border-[var(--theme-color)]/80",
            "rounded-xl",
            "shadow-[0_8px_24px_-6px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.25)]",
            "hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.15),inset_0_2px_3px_rgba(255,255,255,0.3)]",
            "dark:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.08)]",
            "dark:hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5),inset_0_2px_3px_rgba(255,255,255,0.12)]",
            "px-8 py-4 font-semibold text-lg",
            "transition-all duration-300",
            "hover:scale-[1.02] active:scale-[0.98]",
            isExpanded 
              ? "hover:bg-background/60 dark:hover:bg-background/30" 
              : "hover:bg-background/60 dark:hover:bg-background/30",
          )}
        >
          <div className="flex items-center justify-between w-full gap-4">
            <span>{t('customize')}</span>
            <ChevronUp
              className={clsx(
                "h-5 w-5 transition-transform duration-200",
                isExpanded ? "rotate-0" : "rotate-180"
              )}
            />
          </div>
        </Button>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-foreground/30 to-transparent dark:via-foreground/40" />
      </div>

      <div
        className={clsx(
          "grid transition-[grid-template-rows,opacity] duration-300",
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className={clsx(
            "bg-background/60 dark:bg-[#1B1B1B]/50 backdrop-blur-[12px] backdrop-saturate-[180%]",
            "border border-border/40",
            "rounded-lg",
            "shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.1)]",
            "hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.2),inset_0_2px_2px_rgba(255,255,255,0.15)]",
            "dark:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)]",
            "dark:hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.07)]",
            "p-6",
            "transition-all duration-700 ease-out",
            isExpanded ? "translate-y-0" : "translate-y-8"
          )}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-full group/item transition-all duration-300 hover:translate-y-[-1px] hover:scale-[1.01]">
                <ColorSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
              </div>
              <div className="h-full group/item transition-all duration-300 hover:translate-y-[-1px] hover:scale-[1.01]">
                <VibeSelector currentVibe={currentVibe} onVibeChange={setCurrentVibe} />
              </div>
              <div className="h-full group/item transition-all duration-300 hover:translate-y-[-1px] hover:scale-[1.01]">
                <ChartElements
                  showAxes={showAxes}
                  onAxesChange={setShowAxes}
                  showGrid={showGrid}
                  onGridChange={setShowGrid}
                  showLabels={showLabels}
                  onLabelsChange={setShowLabels}
                  showTitle={showTitle}
                  onTitleChange={setShowTitle}
                  showLegend={showLegend}
                  onLegendChange={setShowLegend}
                  showTooltips={showTooltips}
                  onTooltipsChange={setShowTooltips}
                  labelSize={labelSize}
                  onLabelSizeChange={setLabelSize}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
