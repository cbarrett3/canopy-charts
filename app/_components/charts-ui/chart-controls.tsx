'use client'

import { useState, useEffect } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { ColorSelector } from "@/app/_components/charts-ui/color-selector"
import { VibeSelector } from "@/app/_components/charts-ui/vibe-selector"
import { ChartElements } from "@/app/_components/charts-ui/chart-elements"
import { Button } from "@/components/ui/button"
import clsx from "clsx"
import { useThemeColor } from '@/app/_components/providers/theme-context'
import { useTranslations } from 'next-intl'
import { VibeType } from '../charts/d3-tree-map'

interface ChartControlsProps {
  currentTheme: string
  onThemeChange: (color: string) => void
  currentVibe: VibeType
  onVibeChange: (vibe: VibeType) => void
  showAxes: boolean
  onAxesChange: (show: boolean) => void
  showGrid: boolean
  onGridChange: (show: boolean) => void
  showLabels: boolean
  onLabelsChange: (show: boolean) => void
  showTitle: boolean
  onTitleChange: (show: boolean) => void
  showLegend: boolean
  onLegendChange: (show: boolean) => void
  showTooltips: boolean
  onTooltipsChange: (show: boolean) => void
  labelSize: number
  onLabelSizeChange: (size: number) => void
}

export function ChartControls({
  currentTheme,
  onThemeChange,
  currentVibe,
  onVibeChange,
  showAxes,
  onAxesChange,
  showGrid,
  onGridChange,
  showLabels,
  onLabelsChange,
  showTitle,
  onTitleChange,
  showLegend,
  onLegendChange,
  showTooltips,
  onTooltipsChange,
  labelSize,
  onLabelSizeChange
}: ChartControlsProps) {
  const t = useTranslations('chart')
  const [isExpanded, setIsExpanded] = useState(true)

  const { setThemeColor } = useThemeColor()

  // Initialize defaults on mount
  useEffect(() => {
    setThemeColor(currentTheme)  
  }, [currentTheme, setThemeColor])

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
            "relative w-full sm:min-w-[250px] sm:max-w-[350px] text-foreground",
            "bg-background/40 dark:bg-background/20 backdrop-blur-[12px] backdrop-saturate-[180%]",
            "border border-[var(--theme-color)] dark:border-[var(--theme-color)]/80",
            "rounded-xl",
            "shadow-[0_8px_24px_-6px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.25)]",
            "hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.15),inset_0_2px_3px_rgba(255,255,255,0.3)]",
            "dark:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.08)]",
            "dark:hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5),inset_0_2px_3px_rgba(255,255,255,0.12)]",
            "px-4 sm:px-8 py-4 font-semibold text-lg",
            "transition-all duration-300 ease-out",
            "hover:scale-[1.01] hover:-translate-y-[1px] active:scale-[0.99] active:translate-y-[0.5px]",
            "hover:bg-background/50 dark:hover:bg-background/25",
            "flex items-center justify-center text-center gap-2",
            "after:absolute after:inset-0 after:rounded-xl after:border after:border-white/10",
            "after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300"
          )}
        >
          <div className="flex items-center gap-4">
            <span className="flex-1 text-center">{t('customize')}</span>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="h-full group/item transition-all duration-300 hover:translate-y-[-1px] hover:scale-[1.01]">
                <ColorSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />
              </div>
              <div className="h-full group/item transition-all duration-300 hover:translate-y-[-1px] hover:scale-[1.01]">
                <VibeSelector selectedVibe={currentVibe} onVibeChange={onVibeChange} />
              </div>
              <div className="h-full sm:col-span-2 lg:col-span-1 group/item transition-all duration-300 hover:translate-y-[-1px] hover:scale-[1.01]">
                <ChartElements
                  showAxes={showAxes}
                  onAxesChange={onAxesChange}
                  showGrid={showGrid}
                  onGridChange={onGridChange}
                  showLabels={showLabels}
                  onLabelsChange={onLabelsChange}
                  showTitle={showTitle}
                  onTitleChange={onTitleChange}
                  showLegend={showLegend}
                  onLegendChange={onLegendChange}
                  showTooltips={showTooltips}
                  onTooltipsChange={onTooltipsChange}
                  labelSize={labelSize}
                  onLabelSizeChange={onLabelSizeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
