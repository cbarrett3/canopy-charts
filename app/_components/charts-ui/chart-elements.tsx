'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { useThemeColor } from '@/app/_components/providers/theme-context'
import { useTranslations } from 'next-intl'
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
  const t = useTranslations('ChartControls.elements')

  const getRgbValues = (color: string) => {
    return color?.replace('#', '').match(/.{2}/g)?.map(x => parseInt(x, 16)).join(',') || '34,197,94'
  }

  return (
    <div 
      className="relative bg-background/40 dark:bg-[#1B1B1B]/30 backdrop-blur-[12px] backdrop-saturate-[180%] 
        rounded-lg p-4 h-full space-y-4 transition-all duration-300"
      style={{ 
        boxShadow: `inset 0 0 0 1px ${themeColor}33`
      }}
    >
      <div className="flex items-center gap-2">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ 
            backgroundColor: themeColor,
            boxShadow: `0 0 0 1px ${themeColor}33`
          }}
        />
        <h3 className="text-sm font-medium text-foreground">{t('title')}</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm text-muted-foreground font-normal">{t('axes')}</Label>
              <Switch
                checked={showAxes}
                onCheckedChange={onAxesChange}
                className="data-[state=checked]:bg-[var(--theme-color)]"
                style={{ '--theme-color': themeColor } as React.CSSProperties}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm text-muted-foreground font-normal">{t('grid')}</Label>
              <Switch
                checked={showGrid}
                onCheckedChange={onGridChange}
                className="data-[state=checked]:bg-[var(--theme-color)]"
                style={{ '--theme-color': themeColor } as React.CSSProperties}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm text-muted-foreground font-normal">{t('labels')}</Label>
              <Switch
                checked={showLabels}
                onCheckedChange={onLabelsChange}
                className="data-[state=checked]:bg-[var(--theme-color)]"
                style={{ '--theme-color': themeColor } as React.CSSProperties}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm text-muted-foreground font-normal">{t('title_element')}</Label>
              <Switch
                checked={showTitle}
                onCheckedChange={onTitleChange}
                className="data-[state=checked]:bg-[var(--theme-color)]"
                style={{ '--theme-color': themeColor } as React.CSSProperties}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm text-muted-foreground font-normal">{t('legend')}</Label>
              <Switch
                checked={showLegend}
                onCheckedChange={onLegendChange}
                className="data-[state=checked]:bg-[var(--theme-color)]"
                style={{ '--theme-color': themeColor } as React.CSSProperties}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm text-muted-foreground font-normal">{t('tooltips')}</Label>
              <Switch
                checked={showTooltips}
                onCheckedChange={onTooltipsChange}
                className="data-[state=checked]:bg-[var(--theme-color)]"
                style={{ '--theme-color': themeColor } as React.CSSProperties}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-muted-foreground font-normal">{t('label_size')}</Label>
            <span className="text-xs text-muted-foreground font-mono select-none">{labelSize}px</span>
          </div>
          <Slider
            value={[labelSize]}
            min={8}
            max={16}
            step={1}
            onValueChange={([value]) => onLabelSizeChange(value)}
            className={clsx(
              "relative flex items-center select-none touch-none w-full transition-colors",
              "[&_[role=slider]]:h-4 [&_[role=slider]]:w-1 [&_[role=slider]]:rounded-sm",
              "[&_[role=slider]]:border-0 [&_[role=slider]]:bg-[var(--slider-color)]",
              "[&_[role=slider]]:transition-colors [&_[role=slider]]:focus-visible:outline-none",
              "[&_[role=track]]:relative [&_[role=track]]:w-full [&_[role=track]]:grow",
              "[&_[role=track]]:h-1 [&_[role=track]]:bg-secondary/20",
              "[&_[role=range]]:absolute [&_[role=range]]:h-1 [&_[role=range]]:bg-[var(--slider-color)]"
            )}
            style={{
              '--slider-color': themeColor
            } as React.CSSProperties}
          />
        </div>
      </div>
    </div>
  )
}
