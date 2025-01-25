'use client'

import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { ColorSelector } from "./color-selector"
import { VibeSelector } from "./vibe-selector"
import { ChartElements } from "./chart-elements"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import clsx from "clsx"

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
  labelSize: number
  onLabelSizeChange: (value: number) => void
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
  labelSize,
  onLabelSizeChange,
}: ChartControlsProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="w-full">
      <div className="relative">
        <div
          className={clsx(
            "grid transition-[grid-template-rows] duration-300",
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
                  <ColorSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />
                </div>
                <div className="h-full group/item transition-all duration-300 hover:translate-y-[-1px] hover:scale-[1.01]">
                  <VibeSelector currentVibe={currentVibe} onVibeChange={onVibeChange} />
                </div>
                <div className="h-full group/item transition-all duration-300 hover:translate-y-[-1px] hover:scale-[1.01]">
                  <ChartElements
                    showAxes={showAxes}
                    onAxesChange={onAxesChange}
                    showGrid={showGrid}
                    onGridChange={onGridChange}
                    showLabels={showLabels}
                    onLabelsChange={onLabelsChange}
                    labelSize={labelSize}
                    onLabelSizeChange={onLabelSizeChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="lg"
          onClick={() => setIsExpanded(!isExpanded)}
          className={clsx(
            "absolute left-1/2 -translate-x-1/2 z-10 text-foreground",
            "bg-background/60 dark:bg-[#1B1B1B]/50 backdrop-blur-[12px] backdrop-saturate-[180%]",
            "border border-border/40",
            isExpanded ? "-bottom-12" : "-bottom-12",
            "rounded-b-lg border-t-0",
            "shadow-[0_4px_12px_-4px_rgba(0,0,0,0.2),inset_0_-1px_1px_rgba(255,255,255,0.1)]",
            "hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3),inset_0_-2px_2px_rgba(255,255,255,0.15)]",
            "dark:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.4),inset_0_-1px_1px_rgba(255,255,255,0.05)]",
            "dark:hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6),inset_0_-2px_2px_rgba(255,255,255,0.07)]",
            "px-8 py-3 font-medium",
            "transition-all duration-300",
            isExpanded ? "hover:bg-muted/20" : "hover:bg-background/20 dark:hover:bg-[#1B1B1B]/20"
          )}
        >
          <div className="flex items-center gap-2">
            <span className="text-base font-medium">Customize Charts</span>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </div>
        </Button>
      </div>
    </div>
  )
}
