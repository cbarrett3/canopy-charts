'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Copy, Check } from "lucide-react";
import D3BarChart from '@/app/_components/charts/d3-bar-chart';
import { ChartControls } from "@/app/_components/charts-ui/chart-controls";
import { useThemeColor } from "@/app/_components/providers/theme-context";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function BarChartPage() {
  const t = useTranslations('Docs.visualizations.barChart');
  const { themeColor, setThemeColor } = useThemeColor();
  const [currentVibe, setCurrentVibe] = useState('rainforest');
  const [showAxes, setShowAxes] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [labelSize, setLabelSize] = useState(12);
  const [showTitle, setShowTitle] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [showTooltips, setShowTooltips] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const sampleData = [
    { label: 'Jan', value: 30 },
    { label: 'Feb', value: 40 },
    { label: 'Mar', value: 45 },
    { label: 'Apr', value: 50 },
    { label: 'May', value: 55 },
    { label: 'Jun', value: 60 },
  ];

  const step3Data = [
    { label: '2024-01', value: 10 },
    { label: '2024-02', value: 45 },
    { label: '2024-03', value: 30 },
    { label: '2024-04', value: 65 },
    { label: '2024-05', value: 50 },
    { label: '2024-06', value: 85 }
  ];

  const step3Code = `// Create a simple bar chart
const data = [
  { label: '2024-01', value: 10 },
  { label: '2024-02', value: 45 },
  { label: '2024-03', value: 30 },
  { label: '2024-04', value: 65 },
  { label: '2024-05', value: 50 },
  { label: '2024-06', value: 85 }
];

<D3BarChart
  data={data}
  xKey="label"
  yKey="value"
  theme="green"
/>`;

  const tags = [t('tags.categorical'), t('tags.comparison'), t('tags.distribution')];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCommandCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const implementationCode = `// components/charts/BarChart.tsx
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface BarChartProps {
  data: Array<{ label: string; value: number }>;
  width?: number;
  height?: number;
}

export default function BarChart({ data, width = 600, height = 400 }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;
    // D3 implementation...
  }, [data, width, height]);

  return (
    <div className="w-full h-full">
      <svg ref={svgRef} viewBox={\`0 0 \${width} \${height}\`} />
    </div>
  );
}`;

  const usageCode = `// Interactive Bar Chart
<D3BarChart
  data={sampleData}
  themeColor="${themeColor}"
  vibe="${currentVibe}"
  showAxes={${showAxes}}
  showGrid={${showGrid}}
  showLabels={${showLabels}}
  labelSize={${labelSize}}
  showTitle={${showTitle}}
  showLegend={${showLegend}}
  showTooltips={${showTooltips}}
/>`;

  const pathVariants = {
    initial: {
      pathLength: 0,
      rotate: 0,
      opacity: 0,
    },
    animate: {
      pathLength: [0, 1, 1],
      rotate: [0, 0, -180],
      opacity: 1,
      transition: {
        pathLength: {
          duration: 1.5,
          ease: "easeInOut",
        },
        rotate: {
          duration: 1.5,
          ease: "easeInOut",
          delay: 0.5,
        },
        opacity: {
          duration: 0.01,
        },
      },
    },
  };

  const glowVariants = {
    initial: {
      opacity: 0,
      rotate: 0,
    },
    animate: {
      opacity: [0, 0.5, 0.5],
      rotate: [0, 0, -180],
      transition: {
        opacity: {
          duration: 1.5,
          ease: "easeInOut",
        },
        rotate: {
          duration: 1.5,
          ease: "easeInOut",
          delay: 0.5,
        },
      },
    },
  };

  const boxVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative max-w-4xl mx-auto py-6 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-slate-900/[0.08] dark:bg-grid-slate-100/[0.03] bg-[bottom_1px_center]" />
      </div>

      <div className={cn(
        "relative z-10",
        mounted ? "animate-in fade-in-50 duration-1000" : "opacity-0"
      )}>
        {/* Title with gradient animation */}
        <div className="relative inline-block mb-6">
          <motion.h1 
            className="relative text-2xl font-semibold tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(to right, #22c55e, #4ade80, #86efac, #4ade80, #22c55e)",
              backgroundSize: "200% auto",
            }}
            animate={{
              backgroundPosition: ["0% center", "200% center"]
            }}
            transition={{
              duration: 8,
              ease: "linear",
              repeat: Infinity
            }}
          >
            {t('title')}
          </motion.h1>
          <div className="absolute -inset-x-2 -inset-y-2 bg-gradient-to-r from-green-500/20 via-green-500/10 to-green-500/20 blur-lg opacity-40 -z-10" />
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          {t('description')}
        </p>

        <div className="flex flex-wrap gap-2 mb-12">
          {tags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.1 + index * 0.1,
                duration: 0.4,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
            >
              <div
                className="px-4 py-1.5 text-xs font-medium rounded-full text-green-500 bg-green-500/5 border border-green-500/10 shadow-[0_0_12px_-3px_rgba(34,197,94,0.2)] hover:shadow-[0_0_12px_-2px_rgba(34,197,94,0.3)] transition-shadow"
              >
                {tag}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Preview Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.3,
            duration: 0.5,
            ease: [0.21, 0.47, 0.32, 0.98]
          }}
          className="mb-12 rounded-lg border border-zinc-900/20 dark:border-green-500/20 overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-zinc-900/20 dark:border-green-500/20">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">{t('preview.title')}</h2>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="relative px-3 py-1.5 text-xs font-medium rounded-md text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200/50 dark:border-zinc-700/50 transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-600"
            >
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-zinc-500/0 via-zinc-500/5 to-zinc-500/0 opacity-0 hover:opacity-100 transition-opacity" />
              <span className="relative">
                {showPreview ? t('preview.showCode') : t('preview.showChart')}
              </span>
            </button>
          </div>
          <div className="p-6">
            {showPreview ? (
              <div className="relative aspect-[4/3] w-full">
                <D3BarChart
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
                  title={t('title')}
                />
              </div>
            ) : (
              <div className="relative">
                <pre className="p-4 rounded-md bg-zinc-100/70 dark:bg-zinc-900/70 text-zinc-800 dark:text-slate-50 text-sm overflow-x-auto border border-border/40">
                  <code className="language-tsx">{usageCode}</code>
                </pre>
                <button
                  className="absolute top-3 right-3 p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  onClick={() => handleCopy(usageCode)}
                >
                  {copiedCode ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-zinc-400" />
                  )}
                </button>
              </div>
            )}
          </div>
          <div className="border-t border-zinc-900/20 dark:border-green-500/20 p-6">
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
          </div>
        </motion.div>

        {/* Quick Start Section */}
        <Card className="relative mb-8 border border-zinc-900/20 dark:border-green-500/20 hover:border-zinc-900/40 dark:hover:border-green-500/40 transition-colors bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm">
          <div className="flex items-center justify-between p-6 border-b border-zinc-900/20 dark:border-green-500/20">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">{t('quickStart.title')}</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10">
                  <span className="text-sm font-medium text-green-600">1</span>
                </div>
                <p className="text-sm">{t('quickStart.step1.title')}</p>
              </div>
              <div className="pl-10">
                <div className="group rounded-lg bg-background/40 dark:bg-[#181818]/30 hover:bg-muted/20 dark:hover:bg-[#1A1A1A]/20 p-6 
                  backdrop-blur-[12px] backdrop-saturate-[180%] border border-border/40 transition-all duration-300
                  shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.1)] 
                  hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.2),inset_0_2px_2px_rgba(255,255,255,0.15)]">
                  <div className="relative">
                    <Tabs defaultValue="npm">
                      <TabsList className="inline-flex h-10 items-center justify-center rounded-lg bg-zinc-100/50 dark:bg-zinc-900/50 p-1 text-muted-foreground w-full sm:w-auto">
                        <TabsTrigger
                          value="npm"
                          className="relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-green-500/90"
                        >
                          <div className="absolute inset-0 rounded-md bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 data-[state=active]:opacity-100 transition-opacity duration-500" />
                          <div className="absolute -inset-px rounded-md bg-gradient-to-r from-green-500/10 via-green-500/5 to-green-500/10 opacity-0 data-[state=active]:opacity-100 blur-sm transition-all duration-500" />
                          <div className="absolute -inset-[2px] rounded-md bg-gradient-to-r from-green-500/5 via-green-500/2 to-green-500/5 opacity-0 data-[state=active]:opacity-100 blur-md transition-all duration-500" />
                          <span className="relative">npm</span>
                        </TabsTrigger>
                        <TabsTrigger
                          value="pnpm"
                          className="relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-green-500/90"
                        >
                          <div className="absolute inset-0 rounded-md bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 data-[state=active]:opacity-100 transition-opacity duration-500" />
                          <div className="absolute -inset-px rounded-md bg-gradient-to-r from-green-500/10 via-green-500/5 to-green-500/10 opacity-0 data-[state=active]:opacity-100 blur-sm transition-all duration-500" />
                          <div className="absolute -inset-[2px] rounded-md bg-gradient-to-r from-green-500/5 via-green-500/2 to-green-500/5 opacity-0 data-[state=active]:opacity-100 blur-md transition-all duration-500" />
                          <span className="relative">pnpm</span>
                        </TabsTrigger>
                        <TabsTrigger
                          value="yarn"
                          className="relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-green-500/90"
                        >
                          <div className="absolute inset-0 rounded-md bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 data-[state=active]:opacity-100 transition-opacity duration-500" />
                          <div className="absolute -inset-px rounded-md bg-gradient-to-r from-green-500/10 via-green-500/5 to-green-500/10 opacity-0 data-[state=active]:opacity-100 blur-sm transition-all duration-500" />
                          <div className="absolute -inset-[2px] rounded-md bg-gradient-to-r from-green-500/5 via-green-500/2 to-green-500/5 opacity-0 data-[state=active]:opacity-100 blur-md transition-all duration-500" />
                          <span className="relative">yarn</span>
                        </TabsTrigger>
                        <TabsTrigger
                          value="bun"
                          className="relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-green-500/90"
                        >
                          <div className="absolute inset-0 rounded-md bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 data-[state=active]:opacity-100 transition-opacity duration-500" />
                          <div className="absolute -inset-px rounded-md bg-gradient-to-r from-green-500/10 via-green-500/5 to-green-500/10 opacity-0 data-[state=active]:opacity-100 blur-sm transition-all duration-500" />
                          <div className="absolute -inset-[2px] rounded-md bg-gradient-to-r from-green-500/5 via-green-500/2 to-green-500/5 opacity-0 data-[state=active]:opacity-100 blur-md transition-all duration-500" />
                          <span className="relative">bun</span>
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="npm" className="relative">
                        <pre className="p-4 rounded-md bg-zinc-100/70 dark:bg-zinc-900/70 text-zinc-800 dark:text-slate-50 text-sm overflow-x-auto border border-border/40">npm install d3 @types/d3</pre>
                        <button
                          className="absolute top-3 right-3 p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                          onClick={() => handleCommandCopy('npm install d3 @types/d3')}
                        >
                          {copiedCommand === 'npm install d3 @types/d3' ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-zinc-400" />
                          )}
                        </button>
                      </TabsContent>
                      <TabsContent value="pnpm" className="relative">
                        <pre className="p-4 rounded-md bg-zinc-100/70 dark:bg-zinc-900/70 text-zinc-800 dark:text-slate-50 text-sm overflow-x-auto border border-border/40">pnpm add d3 @types/d3</pre>
                        <button
                          className="absolute top-3 right-3 p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                          onClick={() => handleCommandCopy('pnpm add d3 @types/d3')}
                        >
                          {copiedCommand === 'pnpm add d3 @types/d3' ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-zinc-400" />
                          )}
                        </button>
                      </TabsContent>
                      <TabsContent value="yarn" className="relative">
                        <pre className="p-4 rounded-md bg-zinc-100/70 dark:bg-zinc-900/70 text-zinc-800 dark:text-slate-50 text-sm overflow-x-auto border border-border/40">yarn add d3 @types/d3</pre>
                        <button
                          className="absolute top-3 right-3 p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                          onClick={() => handleCommandCopy('yarn add d3 @types/d3')}
                        >
                          {copiedCommand === 'yarn add d3 @types/d3' ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-zinc-400" />
                          )}
                        </button>
                      </TabsContent>
                      <TabsContent value="bun" className="relative">
                        <pre className="p-4 rounded-md bg-zinc-100/70 dark:bg-zinc-900/70 text-zinc-800 dark:text-slate-50 text-sm overflow-x-auto border border-border/40">bun add d3 @types/d3</pre>
                        <button
                          className="absolute top-3 right-3 p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                          onClick={() => handleCommandCopy('bun add d3 @types/d3')}
                        >
                          {copiedCommand === 'bun add d3 @types/d3' ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-zinc-400" />
                          )}
                        </button>
                      </TabsContent>
                    </Tabs>
                    <p className="text-sm text-muted-foreground mt-6">
                      Canopy Charts requires TypeScript 5.0+, React 18+, and Tailwind CSS 3.0+. Currently in beta, expect frequent updates and improvements.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10">
                    <span className="text-sm font-medium text-green-600">2</span>
                  </div>
                  <p className="text-sm">{t('quickStart.step2.title')}</p>
                </div>
                <div className="pl-10">
                  <div className="group rounded-lg bg-background/40 dark:bg-[#181818]/30 hover:bg-muted/20 dark:hover:bg-[#1A1A1A]/20 p-6 
                    backdrop-blur-[12px] backdrop-saturate-[180%] border border-border/40 transition-all duration-300
                    shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.1)] 
                    hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.2),inset_0_2px_2px_rgba(255,255,255,0.15)]">
                    <div className="relative">
                      <pre className="p-4 rounded-md bg-zinc-100/70 dark:bg-zinc-900/70 text-zinc-800 dark:text-slate-50 text-sm overflow-x-auto border border-border/40">
                        <code>{implementationCode}</code>
                      </pre>
                      <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none select-none">
                        {/* Main gradient fade */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/98 to-transparent dark:from-[#181818] dark:via-[#181818]/98" />
                        
                        {/* Layered blurs for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent dark:from-[#181818]/95 dark:via-[#181818]/60 blur-[2px]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent dark:from-[#181818]/90 dark:via-[#181818]/50 blur-md" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/40 to-transparent dark:from-[#181818]/85 dark:via-[#181818]/40 blur-lg" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent dark:from-[#181818]/80 dark:via-[#181818]/30 blur-xl" />
                        
                        {/* Subtle side gradients for depth */}
                        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background/20 to-transparent dark:from-[#181818]/20 blur-sm" />
                        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background/20 to-transparent dark:from-[#181818]/20 blur-sm" />
                      </div>
                      <button
                        className="absolute top-3 right-3 p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        onClick={() => handleCopy(implementationCode)}
                      >
                        {copiedCode ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-zinc-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10">
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">3</span>
                  </div>
                  <p className="text-sm text-slate-800 dark:text-slate-200">{t('quickStart.step3.title')}</p>
                </div>
                <div className="pl-10">
                  <div className="group rounded-lg bg-background/40 dark:bg-[#181818]/30 hover:bg-muted/20 dark:hover:bg-[#1A1A1A]/20 p-6 
                    backdrop-blur-[12px] backdrop-saturate-[180%] border border-border/40 transition-all duration-300
                    shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.1)] 
                    hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.2),inset_0_2px_2px_rgba(255,255,255,0.15)]">
                    <div className="relative">
                      <pre className="p-4 rounded-md bg-zinc-100/70 dark:bg-zinc-900/70 text-zinc-800 dark:text-slate-50 text-sm overflow-x-auto border border-border/40">
                        <code>{step3Code}</code>
                      </pre>
                      <button
                        className="absolute top-3 right-3 p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        onClick={() => handleCopy(step3Code)}
                      >
                        {copiedCode ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-zinc-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <p className="text-sm text-muted-foreground mt-6">
        </p>
      </div>
    </div>
  );
}
