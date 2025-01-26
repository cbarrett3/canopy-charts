'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import D3StackedBarChart from '@/app/_components/charts/d3-stacked-bar-chart';
import { ChartControls } from "@/app/_components/charts-ui/chart-controls";
import { useThemeColor } from "@/app/_components/providers/theme-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function StackedBarChartPage() {
  const t = useTranslations('Docs.visualizations.stackedBarChart');
  const { themeColor, setThemeColor } = useThemeColor();
  const [currentVibe, setCurrentVibe] = useState('rainforest');
  const [showAxes, setShowAxes] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [labelSize, setLabelSize] = useState(12);
  const [showTitle, setShowTitle] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [showTooltips, setShowTooltips] = useState(true);

  const sampleData = [
    { category: "Q1", Revenue: 30000, Expenses: 25000, Profit: 5000 },
    { category: "Q2", Revenue: 35000, Expenses: 28000, Profit: 7000 },
    { category: "Q3", Revenue: 40000, Expenses: 30000, Profit: 10000 },
    { category: "Q4", Revenue: 45000, Expenses: 35000, Profit: 10000 },
  ];

  return (
    <div className="relative w-full py-8 space-y-8">
      {/* Header Section with Gradient Background */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-16 overflow-hidden bg-background dark:bg-[#1B1B1B]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-transparent dark:from-[#1B1B1B] dark:via-[#1B1B1B] dark:to-[#1A1A1A] opacity-90" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-primary mb-4 sm:text-5xl md:text-6xl">
                {t('title')}
              </h1>
              <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                {t('description')}
              </p>
              <div className="mt-6 flex gap-4 sm:justify-center lg:justify-start">
                <Badge variant="outline" className="text-sm">
                  Composition
                </Badge>
                <Badge variant="outline" className="text-sm">
                  Comparison
                </Badge>
                <Badge variant="outline" className="text-sm">
                  Distribution
                </Badge>
              </div>
            </div>
            <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
              <Card className="bg-background/40 dark:bg-[#181818]/30 backdrop-blur-[12px] backdrop-saturate-[180%] border-border/40 shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.4)]">
                <div className="relative w-full h-[400px] p-6">
                  <D3StackedBarChart
                    width={600}
                    height={400}
                    data={sampleData}
                    themeColor={themeColor}
                    vibe={currentVibe}
                    showAxes={showAxes}
                    showGrid={showGrid}
                    showLabels={showLabels}
                    labelSize={labelSize}
                    showTitle={showTitle}
                    showLegend={showLegend}
                    showTooltips={showTooltips}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Controls Section */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Customize Chart</h2>
          <ChartControls
            currentTheme={themeColor}
            currentVibe={currentVibe}
            onThemeChange={setThemeColor}
            onVibeChange={setCurrentVibe}
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
        </Card>
      </div>

      {/* Documentation Tabs */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Tabs defaultValue="usage" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="props">Props</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>
          <TabsContent value="usage" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Basic Usage</h3>
              <p className="text-muted-foreground mb-4">
                Import and use the StackedBarChart component in your React application:
              </p>
              <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
                <code>{`import { StackedBarChart } from 'canopy-charts';

const data = [
  { category: "Q1", Revenue: 30000, Expenses: 25000, Profit: 5000 },
  { category: "Q2", Revenue: 35000, Expenses: 28000, Profit: 7000 },
  { category: "Q3", Revenue: 40000, Expenses: 30000, Profit: 10000 },
];

export default function MyStackedBarChart() {
  return (
    <StackedBarChart
      data={data}
      width={600}
      height={400}
      themeColor="#22C55E"
      vibe="rainforest"
    />
  );
}`}</code>
              </pre>
            </Card>
          </TabsContent>
          <TabsContent value="props" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Props</h3>
              <div className="grid gap-4">
                <div>
                  <h4 className="font-medium">Required Props</h4>
                  <ul className="list-disc list-inside mt-2 text-muted-foreground">
                    <li><code>data</code>: Array of objects with category and stack values</li>
                    <li><code>width</code>: Width of the chart in pixels</li>
                    <li><code>height</code>: Height of the chart in pixels</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Optional Props</h4>
                  <ul className="list-disc list-inside mt-2 text-muted-foreground">
                    <li><code>themeColor</code>: Primary color for the chart (default: "#22C55E")</li>
                    <li><code>vibe</code>: Visual style preset (default: "rainforest")</li>
                    <li><code>showAxes</code>: Show or hide axes (default: true)</li>
                    <li><code>showGrid</code>: Show or hide grid lines (default: true)</li>
                    <li><code>showLabels</code>: Show or hide data labels (default: true)</li>
                    <li><code>labelSize</code>: Font size for labels in pixels (default: 12)</li>
                    <li><code>showTitle</code>: Show or hide chart title (default: true)</li>
                    <li><code>showLegend</code>: Show or hide legend (default: true)</li>
                    <li><code>showTooltips</code>: Show or hide tooltips (default: true)</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="examples" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Examples</h3>
              <div className="grid gap-8">
                <div>
                  <h4 className="font-medium mb-4">Basic Stacked Bar Chart</h4>
                  <div className="bg-secondary/50 rounded-lg p-6">
                    <D3StackedBarChart
                      width={600}
                      height={300}
                      data={sampleData.slice(0, 2)}
                      themeColor={themeColor}
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Styled Stacked Bar Chart</h4>
                  <div className="bg-secondary/50 rounded-lg p-6">
                    <D3StackedBarChart
                      width={600}
                      height={300}
                      data={sampleData}
                      themeColor={themeColor}
                      vibe="coral"
                      showGrid={false}
                      labelSize={14}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
