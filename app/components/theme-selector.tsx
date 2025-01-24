'use client'

import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import * as d3 from 'd3'

const themes = [
  { name: 'Ocean', color: '#0EA5E9', description: 'Deep and calming blue' },
  { name: 'Forest', color: '#22C55E', description: 'Fresh and natural green' },
  { name: 'Sunset', color: '#F97316', description: 'Warm orange glow' },
  { name: 'Royal', color: '#8B5CF6', description: 'Rich purple' },
  { name: 'Ruby', color: '#EF4444', description: 'Bold red' },
  { name: 'Gold', color: '#F59E0B', description: 'Warm yellow' },
  { name: 'Rose', color: '#EC4899', description: 'Playful pink' },
  { name: 'Slate', color: '#64748B', description: 'Classic neutral' }
]

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (color: string) => void;
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
    <div className="space-y-6 p-4 w-[300px]">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400">HEX</label>
            <Input
              value={hexValue}
              onChange={(e) => handleHexChange(e.target.value)}
              className="h-8 bg-[#2A2A2A] border-[#3A3A3A] text-sm font-mono"
              placeholder="#000000"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400">RGB</label>
            <Input
              value={rgbValue}
              onChange={(e) => handleRgbChange(e.target.value)}
              className="h-8 bg-[#2A2A2A] border-[#3A3A3A] text-sm font-mono"
              placeholder="0, 0, 0"
            />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">Hue</label>
        <ColorSpectrum 
          value={hue} 
          onChange={(h) => {
            setHue(h)
            updateFromHSL(h, saturation, lightness)
          }} 
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">Saturation</label>
        <Slider
          value={[saturation]}
          min={0}
          max={100}
          step={1}
          onValueChange={([s]) => {
            setSaturation(s)
            updateFromHSL(hue, s, lightness)
          }}
          className="py-2"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">Lightness</label>
        <Slider
          value={[lightness]}
          min={0}
          max={100}
          step={1}
          onValueChange={([l]) => {
            setLightness(l)
            updateFromHSL(hue, saturation, l)
          }}
          className="py-2"
        />
      </div>
    </div>
  )
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="bg-background/80 dark:bg-[#1B1B1B]/80 backdrop-blur-md backdrop-saturate-150 border border-border/50 shadow-[0_2px_10px] shadow-black/5 rounded-lg p-4 h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-3 w-3 rounded-sm bg-primary/80" />
        <h3 className="text-sm font-medium text-foreground">Theme Color</h3>
      </div>
      <div className="grid grid-cols-4 gap-2 flex-1">
        <TooltipProvider>
          {themes.map((theme) => (
            <Tooltip key={theme.name} delayDuration={200}>
              <TooltipTrigger asChild>
                <button
                  className={`group relative h-12 w-full overflow-hidden rounded-md transition-all duration-200 
                    ${currentTheme === theme.color ? 'ring-1 ring-foreground/20' : 'hover:ring-1 hover:ring-foreground/10'}`}
                  onClick={() => onThemeChange(theme.color)}
                >
                  <div 
                    className="absolute inset-0 transition-transform duration-200"
                    style={{ 
                      background: `linear-gradient(45deg, ${theme.color}dd, ${theme.color})`
                    }}
                  />
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                    ${currentTheme === theme.color ? 'opacity-100' : ''}`}>
                    <div className="h-full w-full bg-gradient-to-br from-foreground/10 to-transparent" />
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                className="bg-card border-border"
              >
                <p className="font-medium text-foreground">{theme.name}</p>
                <p className="text-xs text-muted-foreground">{theme.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            Custom Color
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 bg-card border-border"
          align="end"
        >
          <CustomColorPicker currentColor={currentTheme} onChange={onThemeChange} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
