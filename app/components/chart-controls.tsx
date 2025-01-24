'use client'

import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { ThemeSelector } from "./theme-selector"
import { VibeSelector } from "./vibe-selector"
import { AiChartSuggest } from "./ai-chart-suggest"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface ChartControlsProps {
  currentTheme: string
  currentVibe: string
  onThemeChange: (color: string) => void
  onVibeChange: (vibe: string) => void
}

function ChartOptions({ className }: { className?: string }) {
  const [options, setOptions] = useState({
    legends: true,
    tooltips: true,
    gridlines: true,
    annotations: false,
    titles: true,
    subtitles: true,
  });

  return (
    <div className="bg-background/80 dark:bg-[#1B1B1B]/80 backdrop-blur-md backdrop-saturate-150 border border-border/50 shadow-[0_2px_10px] shadow-black/5 rounded-lg p-2 sm:p-3 md:p-4 h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-2 sm:mb-3 md:mb-4">
          <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 rounded-sm bg-primary/80" />
          <h3 className="text-[0.65rem] sm:text-xs md:text-sm font-medium text-foreground">Chart Elements</h3>
        </div>
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3 flex-1">
          {Object.entries(options).map(([key, value]) => (
            <div
              key={key}
              className="group flex items-center gap-1.5 sm:gap-2 md:gap-2.5 p-1 sm:p-1.5 md:p-2 rounded-md hover:bg-foreground/[0.03] transition-colors"
            >
              <Checkbox
                id={key}
                checked={value}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({ ...prev, [key]: checked === true }))
                }
                className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 rounded-[4px] border border-border/50 bg-background/50 
                  data-[state=checked]:border-[#22c55e]/40 data-[state=checked]:bg-[#22c55e]/10
                  data-[state=checked]:text-[#22c55e] group-hover:border-[#22c55e]/30 transition-colors flex-shrink-0"
              />
              <Label
                htmlFor={key}
                className="text-[0.65rem] sm:text-[0.7rem] md:text-sm font-medium capitalize text-muted-foreground group-hover:text-foreground transition-colors cursor-pointer select-none truncate"
              >
                {key}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ChartControls({ currentTheme, currentVibe, onThemeChange, onVibeChange }: ChartControlsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="lg"
        onClick={() => setIsExpanded(!isExpanded)}
        className={`absolute -top-12 left-1/2 -translate-x-1/2 text-foreground
          bg-background/80 dark:bg-[#1B1B1B]/80 backdrop-blur-md backdrop-saturate-150 
          border-2 border-border/50 shadow-[0_2px_10px] shadow-black/5
          rounded-t-lg px-8 py-3 font-medium
          transition-all duration-700 ease-out
          hover:shadow-[0_2px_15px] hover:shadow-black/10
          ${isExpanded ? 'hover:bg-muted/30' : 'hover:bg-background dark:hover:bg-[#1B1B1B]'}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-base font-medium">Customize Charts</span>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 transition-transform duration-700 ease-out" />
          ) : (
            <ChevronDown className="h-5 w-5 transition-transform duration-700 ease-out" />
          )}
        </div>
      </Button>
      
      <div 
        className={`grid transition-all duration-700 ease-out
          ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className={`bg-white/40 dark:bg-background/40 backdrop-blur-md border border-border/40 shadow-sm rounded-lg p-6
            transition-all duration-700 ease-out
            ${isExpanded ? 'translate-y-0' : 'translate-y-8'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="h-full">
                <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />
              </div>
              <div className="h-full">
                <VibeSelector currentVibe={currentVibe} onVibeChange={onVibeChange} />
              </div>
              <div className="h-full">
                <ChartOptions />
              </div>
              <div className="h-full">
                <AiChartSuggest />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
