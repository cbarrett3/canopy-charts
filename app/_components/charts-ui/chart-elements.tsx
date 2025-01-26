'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { useThemeColor } from '@/app/_components/providers/theme-context'
import clsx from 'clsx';

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
  showAxes = true,
  onAxesChange,
  showGrid = true,
  onGridChange,
  showLabels = true,
  onLabelsChange,
  showTitle = true,
  onTitleChange,
  showLegend = true,
  onLegendChange,
  showTooltips = true,
  onTooltipsChange,
  labelSize = 12,
  onLabelSizeChange,
}: ChartElementsProps) {
  const { themeColor = '#22C55E' } = useThemeColor()

  const getRgbValues = (color: string) => {
    return color?.replace('#', '').match(/.{2}/g)?.map(x => parseInt(x, 16)).join(',') || '34,197,94'
  }

  return (
    <div className="bg-background/40 dark:bg-[#1B1B1B]/30 backdrop-blur-[12px] backdrop-saturate-[180%] border border-border/40 
      shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.1)] 
      rounded-lg p-4 h-full">
      <div className="space-y-4">
        {/* <Label className="text-sm font-medium text-foreground/90">Chart Elements</Label> */}
        <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: themeColor }} />
        <h3 className="text-sm font-medium text-foreground">Element Selector</h3>
      </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="show-axes" className="text-sm">Axes</Label>
            <Switch
              id="show-axes"
              checked={showAxes}
              onCheckedChange={onAxesChange}
              className={clsx(
                "data-[state=checked]:bg-current data-[state=checked]:opacity-90",
                "data-[state=checked]:shadow-[0_0_8px_rgba(var(--theme-rgb),0.4)]",
                "transition-all duration-300"
              )}
              style={{
                '--theme-rgb': showAxes ? getRgbValues(themeColor) : undefined,
                color: showAxes ? themeColor : undefined
              } as any}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="show-grid" className="text-sm">Grid</Label>
            <Switch
              id="show-grid"
              checked={showGrid}
              onCheckedChange={onGridChange}
              className={clsx(
                "data-[state=checked]:bg-current data-[state=checked]:opacity-90",
                "data-[state=checked]:shadow-[0_0_8px_rgba(var(--theme-rgb),0.4)]",
                "transition-all duration-300"
              )}
              style={{
                '--theme-rgb': showGrid ? getRgbValues(themeColor) : undefined,
                color: showGrid ? themeColor : undefined
              } as any}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="show-labels" className="text-sm">Labels</Label>
            <Switch
              id="show-labels"
              checked={showLabels}
              onCheckedChange={onLabelsChange}
              className={clsx(
                "data-[state=checked]:bg-current data-[state=checked]:opacity-90",
                "data-[state=checked]:shadow-[0_0_8px_rgba(var(--theme-rgb),0.4)]",
                "transition-all duration-300"
              )}
              style={{
                '--theme-rgb': showLabels ? getRgbValues(themeColor) : undefined,
                color: showLabels ? themeColor : undefined
              } as any}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="show-title" className="text-sm">Title</Label>
            <Switch
              id="show-title"
              checked={showTitle}
              onCheckedChange={onTitleChange}
              className={clsx(
                "data-[state=checked]:bg-current data-[state=checked]:opacity-90",
                "data-[state=checked]:shadow-[0_0_8px_rgba(var(--theme-rgb),0.4)]",
                "transition-all duration-300"
              )}
              style={{
                '--theme-rgb': showTitle ? getRgbValues(themeColor) : undefined,
                color: showTitle ? themeColor : undefined
              } as any}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="show-legend" className="text-sm">Legend</Label>
            <Switch
              id="show-legend"
              checked={showLegend}
              onCheckedChange={onLegendChange}
              className={clsx(
                "data-[state=checked]:bg-current data-[state=checked]:opacity-90",
                "data-[state=checked]:shadow-[0_0_8px_rgba(var(--theme-rgb),0.4)]",
                "transition-all duration-300"
              )}
              style={{
                '--theme-rgb': showLegend ? getRgbValues(themeColor) : undefined,
                color: showLegend ? themeColor : undefined
              } as any}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="show-tooltips" className="text-sm">Tooltips</Label>
            <Switch
              id="show-tooltips"
              checked={showTooltips}
              onCheckedChange={onTooltipsChange}
              className={clsx(
                "data-[state=checked]:bg-current data-[state=checked]:opacity-90",
                "data-[state=checked]:shadow-[0_0_8px_rgba(var(--theme-rgb),0.4)]",
                "transition-all duration-300"
              )}
              style={{
                '--theme-rgb': showTooltips ? getRgbValues(themeColor) : undefined,
                color: showTooltips ? themeColor : undefined
              } as any}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="label-size" className="text-sm" style={{ color: showLabels ? themeColor : undefined }}>Label Size</Label>
            <span className="text-sm text-muted-foreground" style={{ color: showLabels ? themeColor : undefined }}>{labelSize}px</span>
          </div>
          <Slider
            id="label-size"
            min={8}
            max={24}
            step={1}
            value={[labelSize]}
            onValueChange={([value]) => onLabelSizeChange(value)}
            className="w-full"
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
