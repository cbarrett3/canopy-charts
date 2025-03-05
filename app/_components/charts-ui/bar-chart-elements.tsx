'use client'

import { ChartElements } from './chart-elements'
import { useTranslations } from 'next-intl'
import { useThemeColor } from '@/app/_components/providers/theme-context'
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { BoxSelect, Type, Axis3D, TextCursor } from 'lucide-react'

interface BarChartElementsProps {
   showAxes?: boolean;
   onAxesChange: (value: boolean) => void;
   showGrid?: boolean;
   onGridChange: (value: boolean) => void;
   showLabels?: boolean;
   onLabelsChange: (value: boolean) => void;
   showTitle?: boolean;
   onTitleChange: (value: boolean) => void;
   showLegend?: boolean;
   onLegendChange: (value: boolean) => void;
   showTooltips?: boolean;
   onTooltipsChange: (value: boolean) => void;
   labelSize?: number;
   onLabelSizeChange: (value: number) => void;
   // Bar specific props
   barPadding?: number;
   onBarPaddingChange: (value: number) => void;
   // Axis specific props
   xAxisLabel?: string;
   onXAxisLabelChange: (value: string) => void;
   yAxisLabel?: string;
   onYAxisLabelChange: (value: string) => void;
   chartTitle?: string;
   onChartTitleChange: (value: string) => void;
   showXAxis?: boolean;
   onXAxisChange: (value: boolean) => void;
   showYAxis?: boolean;
   onYAxisChange: (value: boolean) => void;
}

export function BarChartElements({
   // Base props with defaults all ON
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
   // Bar specific props
   barPadding = 0.2,
   onBarPaddingChange,
   // Axis specific props
   xAxisLabel = 'Categories',
   onXAxisLabelChange,
   yAxisLabel = 'Values',
   onYAxisLabelChange,
   chartTitle = 'Sample Categories Distribution',
   onChartTitleChange,
   showXAxis = true,
   onXAxisChange,
   showYAxis = true,
   onYAxisChange,
}: BarChartElementsProps) {
   const { themeColor } = useThemeColor()
   const t = useTranslations('ChartControls.elements')

   return (
      <div className="space-y-6">
         {/* Title Controls */}
         <div className="space-y-4">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center bg-background/60 dark:bg-background/5">
                     <Type className="w-4 h-4" />
                  </div>
                  <Label className="text-sm text-muted-foreground font-normal">Chart Title</Label>
               </div>
               <Switch
                  checked={showTitle}
                  onCheckedChange={onTitleChange}
                  className="data-[state=checked]:bg-[var(--theme-color)]"
                  style={{ '--theme-color': themeColor } as React.CSSProperties}
               />
            </div>
            <Input
               value={chartTitle}
               onChange={(e) => onChartTitleChange(e.target.value)}
               placeholder="Enter chart title"
               className="h-8 text-sm"
            />
         </div>

         <Separator />

         {/* Axis Controls */}
         <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">Axis Settings</h4>

            {/* X Axis */}
            <div className="space-y-3">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center bg-background/60 dark:bg-background/5">
                        <Axis3D className="w-4 h-4" />
                     </div>
                     <Label className="text-sm text-muted-foreground font-normal">X Axis</Label>
                  </div>
                  <Switch
                     checked={showXAxis}
                     onCheckedChange={onXAxisChange}
                     className="data-[state=checked]:bg-[var(--theme-color)]"
                     style={{ '--theme-color': themeColor } as React.CSSProperties}
                  />
               </div>
               {showXAxis && (
                  <div className="pl-9 space-y-3">
                     <div className="flex items-center justify-between gap-2">
                        <Label className="text-xs text-muted-foreground font-normal">Label</Label>
                        <Input
                           value={xAxisLabel}
                           onChange={(e) => onXAxisLabelChange(e.target.value)}
                           placeholder="X Axis Label"
                           className="h-7 text-sm max-w-[200px]"
                        />
                     </div>
                  </div>
               )}
            </div>

            {/* Y Axis */}
            <div className="space-y-3">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center bg-background/60 dark:bg-background/5">
                        <Axis3D className="w-4 h-4 rotate-90" />
                     </div>
                     <Label className="text-sm text-muted-foreground font-normal">Y Axis</Label>
                  </div>
                  <Switch
                     checked={showYAxis}
                     onCheckedChange={onYAxisChange}
                     className="data-[state=checked]:bg-[var(--theme-color)]"
                     style={{ '--theme-color': themeColor } as React.CSSProperties}
                  />
               </div>
               {showYAxis && (
                  <div className="pl-9 space-y-3">
                     <div className="flex items-center justify-between gap-2">
                        <Label className="text-xs text-muted-foreground font-normal">Label</Label>
                        <Input
                           value={yAxisLabel}
                           onChange={(e) => onYAxisLabelChange(e.target.value)}
                           placeholder="Y Axis Label"
                           className="h-7 text-sm max-w-[200px]"
                        />
                     </div>
                  </div>
               )}
            </div>

            {/* Label Size */}
            <div className="space-y-2.5">
               <div className="flex items-center justify-between min-w-0 gap-4">
                  <div className="flex items-center gap-2">
                     <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center bg-background/60 dark:bg-background/5">
                        <TextCursor className="w-4 h-4" />
                     </div>
                     <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Label Size
                     </Label>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono flex-shrink-0">
                     {labelSize}px
                  </span>
               </div>
               <Slider
                  value={[labelSize]}
                  onValueChange={([value]) => onLabelSizeChange(value)}
                  min={8}
                  max={24}
                  step={1}
                  className="[&>[role=slider]]:h-3.5 [&>[role=slider]]:w-3.5"
               />
            </div>
         </div>

         <Separator />

         {/* Grid and Legend Controls */}
         <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">Display Settings</h4>

            {/* Grid Toggle */}
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center bg-background/60 dark:bg-background/5">
                     <BoxSelect className="w-4 h-4" />
                  </div>
                  <Label className="text-sm text-muted-foreground font-normal">Show Grid</Label>
               </div>
               <Switch
                  checked={showGrid}
                  onCheckedChange={onGridChange}
                  className="data-[state=checked]:bg-[var(--theme-color)]"
                  style={{ '--theme-color': themeColor } as React.CSSProperties}
               />
            </div>

            {/* Legend Toggle */}
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center bg-background/60 dark:bg-background/5">
                     <Type className="w-4 h-4" />
                  </div>
                  <Label className="text-sm text-muted-foreground font-normal">Show Legend</Label>
               </div>
               <Switch
                  checked={showLegend}
                  onCheckedChange={onLegendChange}
                  className="data-[state=checked]:bg-[var(--theme-color)]"
                  style={{ '--theme-color': themeColor } as React.CSSProperties}
               />
            </div>
         </div>

         <Separator />

         {/* Bar Chart Specific Controls */}
         <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">Bar Settings</h4>

            {/* Bar Padding Control */}
            <div className="space-y-2.5">
               <div className="flex items-center justify-between min-w-0 gap-4">
                  <div className="flex items-center gap-2">
                     <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center bg-background/60 dark:bg-background/5">
                        <BoxSelect className="w-4 h-4" />
                     </div>
                     <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Bar Padding
                     </Label>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono flex-shrink-0">
                     {(barPadding * 100).toFixed(0)}%
                  </span>
               </div>
               <Slider
                  value={[barPadding * 100]}
                  onValueChange={([value]) => onBarPaddingChange(value / 100)}
                  min={0}
                  max={50}
                  step={1}
                  className="[&>[role=slider]]:h-3.5 [&>[role=slider]]:w-3.5"
               />
            </div>
         </div>
      </div>
   )
} 