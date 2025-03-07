'use client'

import { useState } from 'react'
import { BarChart } from '../../../_new/packages/charts/src/components/bar-chart'
import { LineChart } from '../../../_new/packages/charts/src/components/line-chart'
import { BarChartElements } from '@/app/_components/charts-ui/bar-chart-elements'
import type { ChartStyle } from '../../../_new/packages/charts/src/types'

// shared chart dimensions
const CHART_HEIGHT = 400;
const CHART_MARGIN = {
   top: 45,
   right: 20,
   bottom: 40,
   left: 40
};

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

   const barData = [
      { label: 'Jan', value: 30 },
      { label: 'Feb', value: 45 },
      { label: 'Mar', value: 25 },
      { label: 'Apr', value: 60 },
      { label: 'May', value: 35 }
   ];

   const lineData = [
      { name: 'Jan', sales: 30, revenue: 45, profit: 15 },
      { name: 'Feb', sales: 45, revenue: 60, profit: 25 },
      { name: 'Mar', sales: 25, revenue: 35, profit: 10 },
      { name: 'Apr', sales: 60, revenue: 80, profit: 30 },
      { name: 'May', sales: 35, revenue: 50, profit: 20 },
      { name: 'Jun', sales: 50, revenue: 70, profit: 35 }
   ];

   const sharedConfig = {
      showXAxis: showAxes,
      showYAxis: showAxes,
      showXGrid: showGrid,
      showYGrid: showGrid,
      showAxisLabels: showLabels,
      labelSize,
      showLegend,
      legendPosition: 'right' as const,
      showTooltip: showTooltips,
      gridStyle: 'dashed' as const,
      gridOpacity: 0.1,
      axisOpacity: 0.7,
      marginTop: CHART_MARGIN.top,
      marginRight: CHART_MARGIN.right + (showLegend ? 120 : 0),
      marginBottom: CHART_MARGIN.bottom,
      marginLeft: CHART_MARGIN.left,
   };

   return (
      <main className="min-h-screen p-8 text-white">
         <h1 className="text-2xl font-bold mb-6">Chart Tests</h1>

         {/* Charts Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Bar Chart */}
            <div>
               <div className="w-full" style={{ height: CHART_HEIGHT }}>
                  <BarChart
                     data={barData}
                     themeColor={themeColor}
                     vibe={currentVibe}
                     config={{
                        ...sharedConfig,
                        chartTitle: showTitle ? 'MONTHLY DISTRIBUTION' : undefined,
                     }}
                  />
               </div>
            </div>

            {/* Line Chart */}
            <div>
               <div className="w-full" style={{ height: CHART_HEIGHT }}>
                  <LineChart
                     data={lineData}
                     datasets={['sales', 'revenue', 'profit']}
                     themeColor={themeColor}
                     vibe={currentVibe}
                     config={{
                        ...sharedConfig,
                        chartTitle: showTitle ? 'PERFORMANCE METRICS' : undefined,
                        // line specific
                        lineWidth: 2,
                        lineCurve: 'cardinal',
                        showPoints: true,
                        pointSize: 4,
                        enableZoom: false,
                        enablePan: false
                     }}
                  />
               </div>
            </div>
         </div>

         {/* Controls Section */}
         <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Chart Controls</h2>
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
         </section>
      </main>
   );
} 