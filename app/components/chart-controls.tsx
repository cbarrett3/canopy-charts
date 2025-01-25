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
    <div className="bg-background/40 dark:bg-[#1B1B1B]/30 backdrop-blur-[12px] backdrop-saturate-[180%] border border-border/40 
      shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.1)] 
      hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.2),inset_0_2px_2px_rgba(255,255,255,0.15)] 
      dark:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)] 
      dark:hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.07)]
      hover:translate-y-[-1px] hover:scale-[1.01]
      rounded-lg p-2 sm:p-3 md:p-4 h-full transition-all duration-300
      after:absolute after:inset-0 after:rounded-lg after:ring-1 after:ring-inset after:ring-white/10 
      after:transition-opacity after:duration-300 hover:after:opacity-50 after:opacity-0
      before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b 
      before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 
      before:transition-opacity before:duration-300
      relative group">
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
          bg-background/40 dark:bg-[#1B1B1B]/30 backdrop-blur-[12px] backdrop-saturate-[180%]
          border border-border/40 
          shadow-[0_4px_12px_-4px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)] 
          hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3),inset_0_2px_2px_rgba(255,255,255,0.15)]
          dark:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)] 
          dark:hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6),inset_0_2px_2px_rgba(255,255,255,0.07)]
          hover:translate-y-[-1px]
          rounded-t-lg px-8 py-3 font-medium
          transition-all duration-300
          before:absolute before:inset-0 before:rounded-t-lg before:bg-gradient-to-b 
          before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 
          before:transition-opacity before:duration-300
          relative
          ${isExpanded ? 'hover:bg-muted/20' : 'hover:bg-background/20 dark:hover:bg-[#1B1B1B]/20'}`}
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
        className={`grid transition-all duration-700 ease-out p-6
          ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className={`bg-background/40 dark:bg-[#1B1B1B]/30 backdrop-blur-[12px] backdrop-saturate-[180%] 
            border border-border/40 
            shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.1)] 
            dark:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)]
            hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.2),inset_0_2px_2px_rgba(255,255,255,0.15)]
            dark:hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.07)]
            rounded-lg p-6
            transition-all duration-700 ease-out
            before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b 
            before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 
            before:transition-opacity before:duration-300
            relative
            ${isExpanded ? 'translate-y-0' : 'translate-y-8'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="h-full group/item transition-all duration-300 
                hover:translate-y-[-1px] hover:scale-[1.01]">
                <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />
              </div>
              <div className="h-full group/item transition-all duration-300 
                hover:translate-y-[-1px] hover:scale-[1.01]">
                <VibeSelector currentVibe={currentVibe} onVibeChange={onVibeChange} />
              </div>
              <div className="h-full group/item transition-all duration-300 
                hover:translate-y-[-1px] hover:scale-[1.01]">
                <ChartOptions />
              </div>
              <div className="h-full group/item transition-all duration-300 
                hover:translate-y-[-1px] hover:scale-[1.01]">
                <AiChartSuggest />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
