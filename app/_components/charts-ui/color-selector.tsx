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
import { useThemeColor } from '@/app/_components/providers/theme-context'
import { useTranslations } from 'next-intl'

const themes = [
  { name: 'forest', color: '#22C55E', gradient: ['#22C55E', '#16A34A', '#15803D'], description: 'Fresh and natural green' },
  { name: 'ocean', color: '#0EA5E9', gradient: ['#0EA5E9', '#0284C7', '#0369A1'], description: 'Deep and calming blue' },
  { name: 'sunset', color: '#F97316', gradient: ['#F97316', '#EA580C', '#C2410C'], description: 'Warm and energetic orange' },
  { name: 'berry', color: '#EC4899', gradient: ['#EC4899', '#DB2777', '#BE185D'], description: 'Vibrant and playful pink' },
  { name: 'lavender', color: '#A855F7', gradient: ['#A855F7', '#9333EA', '#7E22CE'], description: 'Elegant and soothing purple' },
  { name: 'ruby', color: '#EF4444', gradient: ['#EF4444', '#DC2626', '#B91C1C'], description: 'Bold and passionate red' },
  { name: 'gold', color: '#EAB308', gradient: ['#EAB308', '#CA8A04', '#A16207'], description: 'Rich and luxurious yellow' },
  { name: 'slate', color: '#64748B', gradient: ['#64748B', '#475569', '#334155'], description: 'Professional and neutral gray' }
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
  const t = useTranslations('chart.colorSelector.custom')
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
            <label className="text-xs font-medium text-muted-foreground">{t('hex')}</label>
            <Input
              value={hexValue}
              onChange={(e) => handleHexChange(e.target.value)}
              className="h-7 bg-background/40 dark:bg-[#1B1B1B]/40 border-border/40 text-sm font-mono"
              placeholder="#000000"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">{t('rgb')}</label>
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
        <label className="text-xs font-medium text-foreground">{t('hue')}</label>
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
          <label className="text-xs font-medium text-foreground">{t('saturation')}</label>
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
          <label className="text-xs font-medium text-foreground">{t('lightness')}</label>
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

export function ColorSelector({ currentTheme = '#22C55E', onThemeChange }: ColorSelectorProps) {
  const t = useTranslations('ChartControls.colors')
  const [showCustomPicker, setShowCustomPicker] = useState(false)
  const { setThemeColor } = useThemeColor()
  
  // Set default color and propagate to theme context
  useEffect(() => {
    const defaultColor = '#22C55E'  // Forest theme
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
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-3">{t('title')}</h3>
      <div className="grid grid-cols-4 gap-2">
        {themes.map((theme) => (
          <TooltipProvider key={theme.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className={clsx(
                    'w-full h-10 p-0 border-2',
                    currentTheme === theme.color && 'border-primary/50'
                  )}
                  style={{
                    background: `linear-gradient(to right, ${theme.gradient.join(',')})`
                  }}
                  onClick={() => {
                    onThemeChange(theme.color)
                    setThemeColor(theme.color)
                  }}
                >
                  <span className="sr-only">{t(`themes.${theme.name}.name`)}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="font-medium">{t(`themes.${theme.name}.name`)}</p>
                <p className="text-xs text-muted-foreground">{t(`themes.${theme.name}.description`)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      <Popover open={showCustomPicker} onOpenChange={setShowCustomPicker}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full mt-2">
            {t('custom.title')}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <CustomColorPicker
            currentColor={currentTheme}
            onChange={(color) => {
              onThemeChange(color)
              setThemeColor(color)
              setShowCustomPicker(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </Card>
  )
}
