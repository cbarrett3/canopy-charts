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
import { ChartStyle } from '../charts/types'

interface ChartControlsProps {
  currentTheme: string
  onThemeChange: (color: string) => void
  currentVibe: ChartStyle
  onVibeChange: (vibe: ChartStyle) => void
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
        <div className="hidden sm:block h-[1px] flex-1 bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className={clsx(
            "relative overflow-hidden group/button",
            "w-full sm:w-[200px] md:w-[240px]",
            "bg-background/40 dark:bg-[#1B1B1B]/30 backdrop-blur-[12px] backdrop-saturate-[180%]",
            "border-0 transition-all duration-300",
            "hover:scale-[1.02] hover:-translate-y-[1px]"
          )}
          style={{
            boxShadow: `inset 0 0 0 1px ${currentTheme}33`
          }}
        >
          <div 
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/button:opacity-100"
            style={{
              backgroundColor: `${currentTheme}10`
            }}
          />
          <div className="relative flex items-center justify-between gap-2 py-2 px-3">
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{ 
                  backgroundColor: currentTheme,
                  boxShadow: `0 0 0 1px ${currentTheme}33`
                }}
              />
              <span className="text-sm text-foreground">
                {t('customize')}
              </span>
            </div>
            <ChevronUp 
              className={clsx(
                "w-4 h-4 text-muted-foreground transition-all duration-300",
                "group-hover/button:text-foreground",
                !isExpanded && "rotate-180"
              )}
            />
          </div>
        </Button>
        <div className="hidden sm:block h-[1px] flex-1 bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
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
