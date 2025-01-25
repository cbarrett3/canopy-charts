'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { useThemeColor } from "./theme-context"

interface ChartElementsProps {
  showAxes: boolean;
  onAxesChange: (value: boolean) => void;
  showGrid: boolean;
  onGridChange: (value: boolean) => void;
  showLabels: boolean;
  onLabelsChange: (value: boolean) => void;
  showTitle: boolean;
  onTitleChange: (value: boolean) => void;
  showLegend: boolean;
  onLegendChange: (value: boolean) => void;
  showTooltips: boolean;
  onTooltipsChange: (value: boolean) => void;
  labelSize: number;
  onLabelSizeChange: (value: number) => void;
}

export function ChartElements({
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
  onLabelSizeChange,
}: ChartElementsProps) {
  const { themeColor } = useThemeColor()
  
  return (
    <div className="bg-background/40 dark:bg-[#1B1B1B]/30 backdrop-blur-[12px] backdrop-saturate-[180%] border border-border/40 
      shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.1)] 
      hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.2),inset_0_2px_2px_rgba(255,255,255,0.15)] 
      dark:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)] 
      dark:hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.07)]
      rounded-lg p-3 h-full transition-all duration-300
      after:absolute after:inset-0 after:rounded-lg after:ring-1 after:ring-inset after:ring-white/10 
      after:transition-opacity after:duration-300 hover:after:opacity-50 after:opacity-0 after:-z-10
      before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b 
      before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 
      before:transition-opacity before:duration-300 before:-z-10
      relative group">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: themeColor }} />
        <h3 className="text-sm font-medium text-foreground">Chart Elements</h3>
      </div>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-1.5">
          <div className="flex items-center gap-2 p-1.5 rounded-md hover:bg-foreground/[0.03] transition-colors">
            <Switch
              id="show-title"
              checked={showTitle}
              onCheckedChange={onTitleChange}
              style={{
                '--switch-bg': `${themeColor}20`,
                '--switch-border': `${themeColor}30`,
                '--switch-thumb-bg': showTitle ? themeColor : undefined
              } as any}
              className="data-[state=checked]:bg-[var(--switch-bg)] data-[state=checked]:border-[var(--switch-border)]"
            />
            <Label htmlFor="show-title" className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none">
              Show Title
            </Label>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded-md hover:bg-foreground/[0.03] transition-colors">
            <Switch
              id="show-legend"
              checked={showLegend}
              onCheckedChange={onLegendChange}
              style={{
                '--switch-bg': `${themeColor}20`,
                '--switch-border': `${themeColor}30`,
                '--switch-thumb-bg': showLegend ? themeColor : undefined
              } as any}
              className="data-[state=checked]:bg-[var(--switch-bg)] data-[state=checked]:border-[var(--switch-border)]"
            />
            <Label htmlFor="show-legend" className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none">
              Show Legend
            </Label>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded-md hover:bg-foreground/[0.03] transition-colors">
            <Switch
              id="show-tooltips"
              checked={showTooltips}
              onCheckedChange={onTooltipsChange}
              style={{
                '--switch-bg': `${themeColor}20`,
                '--switch-border': `${themeColor}30`,
                '--switch-thumb-bg': showTooltips ? themeColor : undefined
              } as any}
              className="data-[state=checked]:bg-[var(--switch-bg)] data-[state=checked]:border-[var(--switch-border)]"
            />
            <Label htmlFor="show-tooltips" className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none">
              Show Tooltips
            </Label>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded-md hover:bg-foreground/[0.03] transition-colors">
            <Switch
              id="show-axes"
              checked={showAxes}
              onCheckedChange={onAxesChange}
              style={{
                '--switch-bg': `${themeColor}20`,
                '--switch-border': `${themeColor}30`,
                '--switch-thumb-bg': showAxes ? themeColor : undefined
              } as any}
              className="data-[state=checked]:bg-[var(--switch-bg)] data-[state=checked]:border-[var(--switch-border)]"
            />
            <Label htmlFor="show-axes" className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none">
              Show Axes
            </Label>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded-md hover:bg-foreground/[0.03] transition-colors">
            <Switch
              id="show-grid"
              checked={showGrid}
              onCheckedChange={onGridChange}
              style={{
                '--switch-bg': `${themeColor}20`,
                '--switch-border': `${themeColor}30`,
                '--switch-thumb-bg': showGrid ? themeColor : undefined
              } as any}
              className="data-[state=checked]:bg-[var(--switch-bg)] data-[state=checked]:border-[var(--switch-border)]"
            />
            <Label htmlFor="show-grid" className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none">
              Show Grid
            </Label>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded-md hover:bg-foreground/[0.03] transition-colors">
            <Switch
              id="show-labels"
              checked={showLabels}
              onCheckedChange={onLabelsChange}
              style={{
                '--switch-bg': `${themeColor}20`,
                '--switch-border': `${themeColor}30`,
                '--switch-thumb-bg': showLabels ? themeColor : undefined
              } as any}
              className="data-[state=checked]:bg-[var(--switch-bg)] data-[state=checked]:border-[var(--switch-border)]"
            />
            <Label htmlFor="show-labels" className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none">
              Show Labels
            </Label>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1.5">
            <Label htmlFor="label-size" className="text-xs" style={{ color: showLabels ? themeColor : undefined }}>Label Size</Label>
            <span className="text-xs font-mono" style={{ color: showLabels ? themeColor : undefined }}>{labelSize}px</span>
          </div>
          <Slider
            id="label-size"
            min={8}
            max={24}
            step={1}
            value={[labelSize]}
            onValueChange={([value]) => onLabelSizeChange(value)}
            className="py-1.5"
            disabled={!showLabels}
            style={{
              '--slider-thumb': showLabels ? themeColor : undefined,
              '--slider-track': showLabels ? `${themeColor}20` : undefined,
              '--slider-track-focus': showLabels ? `${themeColor}40` : undefined
            } as any}
          />
        </div>
      </div>
    </div>
  )
}
