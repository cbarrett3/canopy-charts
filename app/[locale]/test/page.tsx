'use client'

import { useState } from 'react'
import { BarChart } from '../../../_new/packages/charts/src/components/bar-chart/component'
import { BarChartElements } from '@/app/_components/charts-ui/bar-chart-elements'
import type { ChartStyle } from '../../../_new/packages/charts/src/types'

export default function TestPage() {
   const [themeColor, setThemeColor] = useState('#22C55E')
   const [currentVibe, setCurrentVibe] = useState<ChartStyle>('rainforest')
   const [showAxes, setShowAxes] = useState(true)
   const [showGrid, setShowGrid] = useState(true)
   const [showLabels, setShowLabels] = useState(true)
   const [labelSize, setLabelSize] = useState(14)
   const [showTitle, setShowTitle] = useState(true)
   const [showLegend, setShowLegend] = useState(true)
   const [showTooltips, setShowTooltips] = useState(true)

   const data = [
      { label: 'Jan', value: 30 },
      { label: 'Feb', value: 45 },
      { label: 'Mar', value: 25 },
      { label: 'Apr', value: 60 },
      { label: 'May', value: 35 }
   ];

   return (
      <main className="min-h-screen p-8 text-white">
         <h1 className="text-2xl font-bold mb-6">Bar Chart Test</h1>
         <div className="w-full h-[500px] rounded-lg p-4">
            <BarChart
               data={data}
               themeColor={themeColor}
               vibe={currentVibe}
               config={{
                  showXAxis: showAxes,
                  showYAxis: showAxes,
                  showXGrid: showGrid,
                  showYGrid: showGrid,
                  showAxisLabels: showLabels,
                  labelSize,
                  chartTitle: showTitle ? 'Sample Categories Distribution' : undefined,
                  showLegend,
                  showTooltip: showTooltips
               }}
            />
         </div>
         <div className="mt-8">
            <BarChartElements
               showAxes={showAxes}
               onAxesChange={setShowAxes}
               showGrid={showGrid}
               onGridChange={setShowGrid}
               showLabels={showLabels}
               onLabelsChange={setShowLabels}
               labelSize={labelSize}
               onLabelSizeChange={setLabelSize}
               showTitle={showTitle}
               onTitleChange={setShowTitle}
               showLegend={showLegend}
               onLegendChange={setShowLegend}
               showTooltips={showTooltips}
               onTooltipsChange={setShowTooltips}
            />
         </div>
      </main>
   );
} 