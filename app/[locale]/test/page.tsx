'use client'

import { BarChart } from '@/_new/packages/charts/src/components/bar-chart'
import { BarChartElements } from '@/app/_components/charts-ui/bar-chart-elements'
import { useState } from 'react'
import { BarChartConfig } from '@/_new/packages/charts/src/types/chart-config'
import { ChartStyle } from '@/_new/packages/charts/src/types'

export default function TestPage() {
   const [config, setConfig] = useState<Partial<BarChartConfig>>({
      showXAxis: true,
      showYAxis: true,
      showXGrid: true,
      showYGrid: true,
      showAxisLabels: true,
      labelSize: 12,
      showTooltip: true,
      showLegend: true,
      legendPosition: 'right',
      gridStyle: 'dashed',
      gridOpacity: 0.08,
      barPadding: 0.2,
      axisOpacity: 0.5,
      // Initialize with default labels
      chartTitle: 'Sample Categories Distribution',
      xAxisLabel: 'Categories',
      yAxisLabel: 'Values'
   })

   const [themeColor, setThemeColor] = useState('#22C55E')
   const [vibe, setVibe] = useState<ChartStyle>('rainforest')

   const data = [
      { label: 'Category A', value: 30 },
      { label: 'Category B', value: 45 },
      { label: 'Category C', value: 25 },
      { label: 'Category D', value: 60 },
      { label: 'Category E', value: 35 }
   ]

   return (
      <main className="relative min-h-[calc(100vh-4rem)] w-full bg-white dark:bg-[#1B1B1B] pt-16">
         {/* Grid Background with Gradient Overlay */}
         <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-white dark:from-[#1B1B1B] dark:via-[#1B1B1B] dark:to-[#1A1A1A] opacity-90" />
         </div>

         {/* Content */}
         <div className="relative h-full px-8">
            <h1 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Chart Test</h1>

            <div className="grid grid-cols-[1fr,300px] gap-8">
               {/* Chart */}
               <div className="relative w-full h-[600px] rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                  <BarChart
                     data={data}
                     themeColor={themeColor}
                     vibe={vibe}
                     config={config}
                     className="w-full h-full p-4"
                  />
               </div>

               {/* Controls */}
               <BarChartElements
                  showXAxis={config.showXAxis}
                  onXAxisChange={(value) => setConfig(prev => ({
                     ...prev,
                     showXAxis: value
                  }))}
                  showYAxis={config.showYAxis}
                  onYAxisChange={(value) => setConfig(prev => ({
                     ...prev,
                     showYAxis: value
                  }))}
                  showGrid={config.showXGrid && config.showYGrid}
                  onGridChange={(value) => setConfig(prev => ({
                     ...prev,
                     showXGrid: value,
                     showYGrid: value
                  }))}
                  showTitle={true}
                  onTitleChange={(value) => setConfig(prev => ({
                     ...prev,
                     chartTitle: value ? prev.chartTitle || 'Sample Categories Distribution' : ''
                  }))}
                  chartTitle={config.chartTitle || 'Sample Categories Distribution'}
                  onChartTitleChange={(value) => setConfig(prev => ({
                     ...prev,
                     chartTitle: value
                  }))}
                  xAxisLabel={config.xAxisLabel || 'Categories'}
                  onXAxisLabelChange={(value) => setConfig(prev => ({
                     ...prev,
                     xAxisLabel: value
                  }))}
                  yAxisLabel={config.yAxisLabel || 'Values'}
                  onYAxisLabelChange={(value) => setConfig(prev => ({
                     ...prev,
                     yAxisLabel: value
                  }))}
                  labelSize={config.labelSize || 12}
                  onLabelSizeChange={(value) => setConfig(prev => ({
                     ...prev,
                     labelSize: value
                  }))}
                  showTooltips={config.showTooltip}
                  onTooltipsChange={(value) => setConfig(prev => ({
                     ...prev,
                     showTooltip: value
                  }))}
                  showLegend={config.showLegend}
                  onLegendChange={(value) => setConfig(prev => ({
                     ...prev,
                     showLegend: value
                  }))}
                  barPadding={config.barPadding || 0.2}
                  onBarPaddingChange={(value) => setConfig(prev => ({
                     ...prev,
                     barPadding: value
                  }))}
               />
            </div>
         </div>
      </main>
   )
} 