'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

interface ChartElementsProps {
  showAxes: boolean
  onAxesChange: (value: boolean) => void
  showGrid: boolean
  onGridChange: (value: boolean) => void
  showLabels: boolean
  onLabelsChange: (value: boolean) => void
  labelSize: number
  onLabelSizeChange: (value: number) => void
}

export function ChartElements({
  showAxes,
  onAxesChange,
  showGrid,
  onGridChange,
  showLabels,
  onLabelsChange,
  labelSize,
  onLabelSizeChange,
}: ChartElementsProps) {
  return (
    <div className="bg-background/40 dark:bg-[#1B1B1B]/30 backdrop-blur-[12px] backdrop-saturate-[180%] border border-border/40 
      shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.1)] 
      hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.2),inset_0_2px_2px_rgba(255,255,255,0.15)] 
      dark:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)] 
      dark:hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.07)]
      rounded-lg p-4 h-full transition-all duration-300
      after:absolute after:inset-0 after:rounded-lg after:ring-1 after:ring-inset after:ring-white/10 
      after:transition-opacity after:duration-300 hover:after:opacity-50 after:opacity-0 after:-z-10
      before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b 
      before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 
      before:transition-opacity before:duration-300 before:-z-10
      relative group">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-3 w-3 rounded-sm bg-primary/80" />
        <h3 className="text-sm font-medium text-foreground">Chart Elements</h3>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="show-axes" className="text-sm">Show Axes</Label>
          <Switch
            id="show-axes"
            checked={showAxes}
            onCheckedChange={onAxesChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="show-grid" className="text-sm">Show Grid</Label>
          <Switch
            id="show-grid"
            checked={showGrid}
            onCheckedChange={onGridChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="show-labels" className="text-sm">Show Labels</Label>
          <Switch
            id="show-labels"
            checked={showLabels}
            onCheckedChange={onLabelsChange}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="label-size" className="text-sm">Label Size</Label>
            <span className="text-sm text-muted-foreground">{labelSize}px</span>
          </div>
          <Slider
            id="label-size"
            min={8}
            max={24}
            step={1}
            value={[labelSize]}
            onValueChange={([value]) => onLabelSizeChange(value)}
          />
        </div>
      </div>
    </div>
  )
}
