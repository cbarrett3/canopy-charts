'use client'

import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { ThemeSelector } from "./theme-selector"
import { VibeSelector } from "./vibe-selector"
import { AiChartSuggest } from "./ai-chart-suggest"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

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
    <div className="bg-[#1F1F1F]/50 backdrop-blur-sm border border-[#2A2A2A] rounded-lg p-4 h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-3 w-3 rounded-sm bg-gray-400" />
          <h3 className="text-sm font-medium text-gray-200">Chart Elements</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(options).map(([key, value]) => (
            <div
              key={key}
              className={`flex items-center justify-between p-2 rounded-md transition-all duration-300 ease-out
                ${value ? 'bg-[#2A2A2A]/50' : 'bg-transparent hover:bg-[#2A2A2A]/30'}`}
            >
              <Label
                htmlFor={key}
                className="text-xs font-medium capitalize text-gray-400"
              >
                {key}
              </Label>
              <Switch
                id={key}
                checked={value}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({ ...prev, [key]: checked }))
                }
                className="group relative data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-gray-700/50 data-[state=checked]:to-gray-500/30
                  data-[state=unchecked]:bg-gray-800/50
                  [&_span]:data-[state=checked]:translate-x-5 
                  [&_span]:data-[state=unchecked]:translate-x-0
                  [&_span]:transition-all [&_span]:duration-[850ms] [&_span]:ease-[cubic-bezier(0.22,1,0.36,1)]
                  [&_span]:data-[state=checked]:bg-gradient-to-br [&_span]:data-[state=checked]:from-gray-100 [&_span]:data-[state=checked]:to-gray-300
                  [&_span]:data-[state=unchecked]:bg-gradient-to-br [&_span]:data-[state=unchecked]:from-gray-600 [&_span]:data-[state=unchecked]:to-gray-700
                  [&_span]:w-4 [&_span]:h-4 [&_span]:rounded-full [&_span]:shadow-sm
                  [&_span]:after:content-[''] [&_span]:after:absolute [&_span]:after:inset-0
                  [&_span]:after:rounded-full [&_span]:after:opacity-0
                  [&_span]:after:transition-all [&_span]:after:duration-500 [&_span]:after:ease-out
                  [&_span]:data-[state=checked]:after:bg-gradient-to-br [&_span]:data-[state=checked]:from-white/40 [&_span]:data-[state=checked]:to-transparent
                  [&_span]:data-[state=checked]:after:opacity-100
                  [&_span]:data-[state=checked]:rotate-180 [&_span]:data-[state=unchecked]:rotate-0
                  h-5 w-10 p-0.5 rounded-full overflow-hidden
                  before:content-[''] before:absolute before:inset-0 
                  before:rounded-full before:transition-all before:duration-[850ms] before:ease-[cubic-bezier(0.22,1,0.36,1)]
                  before:bg-gradient-to-r before:from-gray-400/0 before:via-gray-400/40 before:to-gray-400/0
                  before:data-[state=checked]:opacity-100 before:data-[state=unchecked]:opacity-0
                  before:data-[state=checked]:translate-x-0 before:data-[state=unchecked]:-translate-x-full
                  hover:[&_span]:scale-105 hover:[&_span]:shadow-md hover:before:opacity-80
                  [&_span]:origin-center
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400/50
                  transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              />
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
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className={`absolute -top-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-gray-200 
          bg-[#1F1F1F]/50 backdrop-blur-sm border border-[#2A2A2A] rounded-t-lg px-8
          transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]
          ${isExpanded ? 'hover:bg-[#2A2A2A]/50' : 'hover:bg-[#1F1F1F]/80'}`}
      >
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
        ) : (
          <ChevronDown className="h-4 w-4 transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
        )}
      </Button>
      
      <div 
        className={`grid transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]
          ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className={`transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]
            ${isExpanded ? 'translate-y-0' : 'translate-y-8'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
