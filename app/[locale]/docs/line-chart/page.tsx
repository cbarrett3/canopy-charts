'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Copy, Check, ChevronRight } from "lucide-react";
import D3LineChart from '@/app/_components/charts/d3-line-chart';
import { ChartControls } from "@/app/_components/charts-ui/chart-controls";
import { useThemeColor } from "@/app/_components/providers/theme-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export default function LineChartPage() {
  const t = useTranslations('Docs.visualizations.lineChart');
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
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const sampleData = [
    { name: 'Jan', A: 30, B: 40, C: 20 },
    { name: 'Feb', A: 40, B: 30, C: 25 },
    { name: 'Mar', A: 35, B: 45, C: 30 },
    { name: 'Apr', A: 50, B: 35, C: 35 },
    { name: 'May', A: 45, B: 50, C: 40 },
    { name: 'Jun', A: 60, B: 40, C: 45 },
  ];

  const tags = [t('tags.timeSeries'), t('tags.trends'), t('tags.continuousData')];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (copiedCommand) {
      const timer = setTimeout(() => {
        setCopiedCommand(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedCommand]);

  useEffect(() => {
    if (copiedCode) {
      const timer = setTimeout(() => {
        setCopiedCode(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedCode]);

  const copyToClipboard = async (text: string, command?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (command) {
        setCopiedCommand(command);
      } else {
        setCopiedCode(true);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const implementationCode = `// components/charts/LineChart.tsx
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface LineChartProps {
  data: Array<{ name: string; [key: string]: number }>;
  width?: number;
  height?: number;
}

export default function LineChart({ data, width = 600, height = 400 }) {
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
    <div className="relative max-w-4xl mx-auto py-12 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-slate-900/[0.08] dark:bg-grid-slate-100/[0.03] bg-[bottom_1px_center]" />
      </div>

      <div className={cn(
        "relative z-10",
        mounted ? "animate-in fade-in-50 duration-1000" : "opacity-0"
      )}>
        {/* Title Section */}
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

        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <div
              key={tag}
              className="px-4 py-1.5 text-xs font-medium rounded-full text-green-500 bg-green-500/5 border border-green-500/10 shadow-[0_0_12px_-3px_rgba(34,197,94,0.2)] hover:shadow-[0_0_12px_-2px_rgba(34,197,94,0.3)] transition-shadow"
            >
              {tag}
            </div>
          ))}
        </div>

        <p className="text-sm text-slate-800 dark:text-slate-200 mb-6">
          {t('description')}
        </p>

        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">{t('title')}</h1>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-1.5 text-xs font-medium rounded-full text-green-500 bg-green-500/5 border border-green-500/10 shadow-[0_0_12px_-3px_rgba(34,197,94,0.2)] hover:shadow-[0_0_12px_-2px_rgba(34,197,94,0.3)] transition-shadow"
          >
            {showPreview ? t('hideChart') : t('showChart')}
          </button>
        </div>

        {/* Interactive Preview Section */}
        <Card className="relative mb-8 border border-green-500/20 hover:border-green-500/40 transition-colors bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm">
          <div className="flex items-center justify-between p-6 border-b border-green-500/20">
            <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">{t('preview.title')}</h2>
          </div>
          <div className="p-6">
            {showPreview ? (
              <div className="w-full h-[400px]">
                <D3LineChart
                  width={600}
                  height={400}
                  data={sampleData}
                  datasets={['A', 'B', 'C']}
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
            ) : (
              <pre className="rounded-md bg-zinc-100/50 dark:bg-zinc-800/30 p-4">
                <code className="text-sm">
                  {`<D3LineChart
  width={600}
  height={400}
  data={sampleData}
  datasets={['A', 'B', 'C']}
  themeColor="${themeColor}"
  vibe="${currentVibe}"
  showAxes={${showAxes}}
  showGrid={${showGrid}}
  showLabels={${showLabels}}
  labelSize={${labelSize}}
  showTitle={${showTitle}}
  showLegend={${showLegend}}
  showTooltips={${showTooltips}}
/>`}
                </code>
              </pre>
            )}
          </div>
          <div className="border-t border-green-500/20 p-6">
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
        </Card>

        {/* Quick Start Section */}
        <Card className="relative mb-8 border border-green-500/20 hover:border-green-500/40 transition-colors bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm">
          <div className="flex items-center justify-between p-6 border-b border-green-500/20">
            <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">{t('quickStart.title')}</h2>
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
                    <p className="text-sm text-slate-800 dark:text-slate-200 mb-4">
                      {t('quickStart.step1.title')}
                    </p>
                    <Tabs defaultValue="npm" className="w-full">
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
                        <pre className="p-4 rounded-md bg-[#181818] text-slate-50 text-sm overflow-x-auto">npm install d3 @types/d3</pre>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard('npm install d3 @types/d3', 'npm install d3 @types/d3')}
                          className="absolute right-4 top-4 h-6 w-6 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                        >
                          {copiedCommand === 'npm install d3 @types/d3' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </Button>
                      </TabsContent>
                      <TabsContent value="pnpm" className="relative">
                        <pre className="p-4 rounded-md bg-[#181818] text-slate-50 text-sm overflow-x-auto">pnpm add d3 @types/d3</pre>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard('pnpm add d3 @types/d3', 'pnpm add d3 @types/d3')}
                          className="absolute right-4 top-4 h-6 w-6 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                        >
                          {copiedCommand === 'pnpm add d3 @types/d3' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </Button>
                      </TabsContent>
                      <TabsContent value="yarn" className="relative">
                        <pre className="p-4 rounded-md bg-[#181818] text-slate-50 text-sm overflow-x-auto">yarn add d3 @types/d3</pre>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard('yarn add d3 @types/d3', 'yarn add d3 @types/d3')}
                          className="absolute right-4 top-4 h-6 w-6 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                        >
                          {copiedCommand === 'yarn add d3 @types/d3' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </Button>
                      </TabsContent>
                      <TabsContent value="bun" className="relative">
                        <pre className="p-4 rounded-md bg-[#181818] text-slate-50 text-sm overflow-x-auto">bun add d3 @types/d3</pre>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard('bun add d3 @types/d3', 'bun add d3 @types/d3')}
                          className="absolute right-4 top-4 h-6 w-6 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                        >
                          {copiedCommand === 'bun add d3 @types/d3' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </Button>
                      </TabsContent>
                    </Tabs>
                  </div>
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
                    <p className="text-sm text-slate-800 dark:text-slate-200 mb-4">
                      {t('quickStart.step2.title')}
                    </p>
                    <div className="relative">
                      <pre className="p-4 rounded-md bg-[#181818] text-slate-50 text-sm overflow-x-auto">
                        <code>{implementationCode}</code>
                      </pre>
                      <button
                        className="absolute top-3 right-3 p-2 rounded-md hover:bg-[#222] transition-colors"
                        onClick={() => copyToClipboard(implementationCode)}
                      >
                        {copiedCode ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-slate-400" />
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
                      <p className="text-sm text-slate-800 dark:text-slate-200 mb-4">
                        {t('quickStart.step3.title')}
                      </p>
                      <div className="space-y-4">
                        <div className="relative">
                          <pre className="p-4 rounded-md bg-[#181818] text-slate-50 text-sm overflow-x-auto">
                            <code>{`import LineChart from '@/components/charts/LineChart';

// Your component
export default function YourComponent() {
  const data = [
    { name: 'Q1', value: 30 },
    { name: 'Q2', value: 45 },
    { name: 'Q3', value: 60 },
    { name: 'Q4', value: 80 }
  ];

  return <LineChart data={data} />;
}`}</code>
                          </pre>
                        </div>
                        <div className="mt-6 rounded-lg bg-background/40 dark:bg-[#181818]/30 p-4 border border-border/40">
                          <D3LineChart data={[
                            { name: 'Q1', value: 30 },
                            { name: 'Q2', value: 45 },
                            { name: 'Q3', value: 60 },
                            { name: 'Q4', value: 80 }
                          ]} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
