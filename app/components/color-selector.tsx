'use client'

import { useState, useEffect } from 'react'
import { clsx } from 'clsx'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import * as d3 from 'd3'
import { useThemeColor } from './theme-context'

const themes = [
  { name: 'Ocean', color: '#0EA5E9', gradient: ['#0EA5E9', '#0284C7', '#0369A1'], description: 'Deep and calming blue' },
  { name: 'Forest', color: '#22C55E', gradient: ['#22C55E', '#16A34A', '#15803D'], description: 'Fresh and natural green' },
  { name: 'Sunset', color: '#F97316', gradient: ['#F97316', '#EA580C', '#C2410C'], description: 'Warm and energetic orange' },
  { name: 'Berry', color: '#EC4899', gradient: ['#EC4899', '#DB2777', '#BE185D'], description: 'Vibrant and playful pink' },
  { name: 'Lavender', color: '#A855F7', gradient: ['#A855F7', '#9333EA', '#7E22CE'], description: 'Elegant and soothing purple' },
  { name: 'Ruby', color: '#EF4444', gradient: ['#EF4444', '#DC2626', '#B91C1C'], description: 'Bold and passionate red' },
  { name: 'Gold', color: '#EAB308', gradient: ['#EAB308', '#CA8A04', '#A16207'], description: 'Rich and luxurious yellow' },
  { name: 'Slate', color: '#64748B', gradient: ['#64748B', '#475569', '#334155'], description: 'Professional and neutral gray' }
]

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

function ColorSpectrum({ value, onChange }: { value: number, onChange: (value: number) => void }) {
  const colors = d3.range(0, 360, 1).map(h => d3.hsl(h, 0.8, 0.5).formatHex())
  
  return (
    <div className="relative h-12 w-full">
      <div 
        className="absolute inset-0 rounded-md"
        style={{
          background: `linear-gradient(to right, ${colors.join(',')})`
        }}
      />
      <Slider
        value={[value]}
        min={0}
        max={359}
        step={1}
        onValueChange={([v]) => onChange(v)}
        className="absolute inset-0 [&>[role=slider]]:h-full [&>[role=slider]]:w-2 [&>[role=slider]]:rounded-sm [&>[role=slider]]:border-2 [&>[role=slider]]:border-white/50 [&>[role=slider]]:bg-transparent [&>[role=slider]]:hover:border-white"
      />
    </div>
  )
}

function CustomColorPicker({ currentColor, onChange }: { currentColor: string, onChange: (color: string) => void }) {
  const hsl = d3.hsl(currentColor)
  const [hue, setHue] = useState(hsl.h)
  const [saturation, setSaturation] = useState(hsl.s * 100)
  const [lightness, setLightness] = useState(hsl.l * 100)
  const [hexValue, setHexValue] = useState(currentColor)
  const [rgbValue, setRgbValue] = useState(() => {
    const rgb = d3.rgb(currentColor)
    return `${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}`
  })

  const updateColor = (color: string) => {
    try {
      const validColor = d3.color(color)
      if (validColor) {
        const hsl = d3.hsl(validColor)
        setHue(hsl.h)
        setSaturation(hsl.s * 100)
        setLightness(hsl.l * 100)
        setHexValue(validColor.formatHex())
        const rgb = d3.rgb(validColor)
        setRgbValue(`${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}`)
        onChange(validColor.formatHex())
      }
    } catch (e) {
      // Invalid color format, ignore
    }
  }

  const updateFromHSL = (h: number, s: number, l: number) => {
    const newColor = d3.hsl(h, s / 100, l / 100).formatHex()
    setHexValue(newColor)
    const rgb = d3.rgb(newColor)
    setRgbValue(`${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}`)
    onChange(newColor)
  }

  const handleHexChange = (value: string) => {
    setHexValue(value)
    if (value.match(/^#[0-9A-Fa-f]{6}$/)) {
      updateColor(value)
    }
  }

  const handleRgbChange = (value: string) => {
    setRgbValue(value)
    const rgbMatch = value.match(/^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/)
    if (rgbMatch) {
      const [_, r, g, b] = rgbMatch
      if (Number(r) <= 255 && Number(g) <= 255 && Number(b) <= 255) {
        updateColor(`rgb(${r}, ${g}, ${b})`)
      }
    }
  }

  return (
    <div className="space-y-4 p-4 w-[260px]">
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">HEX</label>
            <Input
              value={hexValue}
              onChange={(e) => handleHexChange(e.target.value)}
              className="h-7 bg-background/40 dark:bg-[#1B1B1B]/40 border-border/40 text-sm font-mono"
              placeholder="#000000"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">RGB</label>
            <Input
              value={rgbValue}
              onChange={(e) => handleRgbChange(e.target.value)}
              className="h-7 bg-background/40 dark:bg-[#1B1B1B]/40 border-border/40 text-sm font-mono"
              placeholder="0, 0, 0"
            />
          </div>
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-foreground">Hue</label>
        <ColorSpectrum 
          value={hue} 
          onChange={(h) => {
            setHue(h)
            updateFromHSL(h, saturation, lightness)
          }} 
        />
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-foreground">Saturation</label>
          <span className="text-xs text-muted-foreground font-mono">{Math.round(saturation)}%</span>
        </div>
        <Slider
          value={[saturation]}
          min={0}
          max={100}
          step={1}
          onValueChange={([s]) => {
            setSaturation(s)
            updateFromHSL(hue, s, lightness)
          }}
          className="py-1.5"
        />
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-foreground">Lightness</label>
          <span className="text-xs text-muted-foreground font-mono">{Math.round(lightness)}%</span>
        </div>
        <Slider
          value={[lightness]}
          min={0}
          max={100}
          step={1}
          onValueChange={([l]) => {
            setLightness(l)
            updateFromHSL(hue, saturation, l)
          }}
          className="py-1.5"
        />
      </div>
      <div 
        className="h-8 rounded-md transition-all duration-300"
        style={{ 
          background: `linear-gradient(to right, ${d3.hsl(hue, saturation/100, 0.2).formatHex()}, ${d3.hsl(hue, saturation/100, 0.5).formatHex()}, ${d3.hsl(hue, saturation/100, 0.8).formatHex()})`
        }}
      />
    </div>
  )
}

interface ColorSelectorProps {
  currentTheme?: string;
  onThemeChange: (color: string) => void;
}

export function ColorSelector({ currentTheme = '#0EA5E9', onThemeChange }: ColorSelectorProps) {
  const { setThemeColor } = useThemeColor()
  
  // Set default color and propagate to theme context
  useEffect(() => {
    const defaultColor = '#0EA5E9'  // Ocean theme
    if (!currentTheme || currentTheme === '') {
      onThemeChange(defaultColor)
    }
    setThemeColor(currentTheme || defaultColor)
  }, [])

  // Keep theme context in sync
  useEffect(() => {
    if (currentTheme) {
      setThemeColor(currentTheme)
    }
  }, [currentTheme, setThemeColor])

  return (
    <div className="bg-background/40 dark:bg-[#1B1B1B]/30 backdrop-blur-[12px] backdrop-saturate-[180%] border border-border/40 
      shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.1)] 
      rounded-lg p-4 h-full">
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: currentTheme }} />
        <h3 className="text-sm font-medium text-foreground">Color Selector</h3>
      </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-4 gap-2">
          <TooltipProvider>
            {themes.map((theme) => {
              const isSelected = currentTheme === theme.color;
              return (
                <Tooltip key={theme.name} delayDuration={200}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => onThemeChange(theme.color)}
                      className={clsx(
                        "group relative aspect-square rounded-md transition-all duration-300",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                        "hover:scale-105 active:scale-95",
                        isSelected && "scale-105"
                      )}
                      aria-label={`Select ${theme.name} theme`}
                      aria-current={isSelected}
                    >
                      <div 
                        className={clsx(
                          "absolute inset-0 rounded-md transition-all duration-300",
                          "opacity-20 group-hover:opacity-30 group-active:opacity-40"
                        )}
                        style={{ 
                          background: `linear-gradient(135deg, ${theme.gradient[0]}40, ${theme.gradient[2]}80)`
                        }}
                      />
                      <div
                        className={clsx(
                          "absolute inset-[2px] rounded-[4px] transition-all duration-300",
                          "group-hover:inset-[1px] group-hover:rounded-md",
                          "group-active:inset-[3px]",
                          isSelected && "animate-pulse-subtle"
                        )}
                        style={{ 
                          background: `linear-gradient(135deg, ${theme.gradient[0]}, ${theme.gradient[1]}, ${theme.gradient[2]})`
                        }}
                      />
                      {isSelected && (
                        <>
                          <div 
                            className={clsx(
                              "absolute inset-[-2px] rounded-lg transition-all duration-300",
                              "opacity-20 blur-sm animate-pulse-slow"
                            )}
                            style={{ 
                              background: `linear-gradient(135deg, ${theme.gradient[0]}, ${theme.gradient[2]}cc)`
                            }}
                          />
                          <div className="absolute inset-0 rounded-md ring-2 ring-white/20 transition-all duration-300" />
                          <svg 
                            className={clsx(
                              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4",
                              "text-white/90 drop-shadow-md transition-all duration-300",
                              "animate-in zoom-in-50 duration-300"
                            )} 
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="right" 
                    align="center"
                    className="bg-background/95 dark:bg-[#1B1B1B]/95 backdrop-blur-[12px] backdrop-saturate-[180%] 
                      border border-border/40 shadow-lg rounded-lg z-50
                      after:absolute after:inset-0 after:rounded-lg after:ring-1 after:ring-inset after:ring-white/10 after:pointer-events-none after:-z-10"
                  >
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-sm text-foreground">{theme.name}</p>
                      <p className="text-xs text-muted-foreground">{theme.description}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-background/40 dark:bg-[#1B1B1B]/30"
            >
              <div className="w-4 h-4 rounded-full mr-2" style={{ background: currentTheme }} />
              Custom Color
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-[280px] p-4 relative bg-background/95 dark:bg-[#1B1B1B]/95 backdrop-blur-[12px] backdrop-saturate-[180%] 
              border border-border/40 shadow-lg rounded-lg z-50
              after:absolute after:inset-0 after:rounded-lg after:ring-1 after:ring-inset after:ring-white/10 after:pointer-events-none after:-z-10"
            side="right"
            align="center"
            sideOffset={5}
          >
            <div className="relative z-50">
              <CustomColorPicker currentColor={currentTheme} onChange={onThemeChange} />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
