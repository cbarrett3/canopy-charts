"use client"

import { useState } from "react"
import { Globe, TreesIcon as Tree, Wand2, PlugIcon as Plugin, Wrench, Triangle } from "lucide-react"
import Link from "next/link"
import { ThemeSelector } from "./components/theme-selector"
import { VibeSelector } from "./components/vibe-selector"
import TreeMap from "./d3-tree-map"
import BarChart from "./d3-bar-chart"
import LineChart from "./d3-line-chart"
import StreamChart from "./d3-stream-chart"
import StackedBarChart from "./d3-stacked-bar-chart"
import DonutChart from "./d3-donut-chart"
import { AiChartSuggest } from "./components/ai-chart-suggest"
import { ChartControls } from "./components/chart-controls"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Command } from 'lucide-react'
import * as d3 from 'd3'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

type Feature = {
   title: string;
   description: string;
   link: string;
   href: string;
} & (
   | { component: React.FC<any>; icon?: never }
   | { component?: never; icon: React.FC<any> }
)

function CustomColorPicker({ currentColor, onChange }: { currentColor: string, onChange: (color: string) => void }) {
   const hsl = d3.hsl(currentColor)
   const [hue, setHue] = useState(hsl.h)
   const [saturation, setSaturation] = useState(hsl.s * 100)
   const [lightness, setLightness] = useState(hsl.l * 100)
   const [hexValue, setHexValue] = useState(currentColor)
   const [rgbValue, setRgbValue] = useState(() => {
      const rgb = d3.rgb(currentColor)
      return `${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}`
   })

   const updateColor = (color: string) => {
      try {
         const validColor = d3.color(color)
         if (validColor) {
            const hsl = d3.hsl(validColor)
            setHue(hsl.h)
            setSaturation(hsl.s * 100)
            setLightness(hsl.l * 100)
            setHexValue(validColor.formatHex())
            const rgb = d3.rgb(validColor)
            setRgbValue(`${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}`)
            onChange(validColor.formatHex())
         }
      } catch (e) {
         // Invalid color format, ignore
      }
   }

   const updateFromHSL = (h: number, s: number, l: number) => {
      const newColor = d3.hsl(h, s / 100, l / 100).formatHex()
      setHexValue(newColor)
      const rgb = d3.rgb(newColor)
      setRgbValue(`${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}`)
      onChange(newColor)
   }

   const handleHexChange = (value: string) => {
      setHexValue(value)
      if (value.match(/^#[0-9A-Fa-f]{6}$/)) {
         updateColor(value)
      }
   }

   const handleRgbChange = (value: string) => {
      setRgbValue(value)
      const rgbMatch = value.match(/^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/)
      if (rgbMatch) {
         const [_, r, g, b] = rgbMatch
         if (Number(r) <= 255 && Number(g) <= 255 && Number(b) <= 255) {
            updateColor(`rgb(${r}, ${g}, ${b})`)
         }
      }
   }

   return (
      <div className="space-y-6 p-4 w-[300px]">
         <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
               <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400">HEX</label>
                  <Input
                     value={hexValue}
                     onChange={(e) => handleHexChange(e.target.value)}
                     className="h-8 bg-[#2A2A2A] border-[#3A3A3A] text-sm font-mono"
                     placeholder="#000000"
                  />
               </div>
               <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400">RGB</label>
                  <Input
                     value={rgbValue}
                     onChange={(e) => handleRgbChange(e.target.value)}
                     className="h-8 bg-[#2A2A2A] border-[#3A3A3A] text-sm font-mono"
                     placeholder="0, 0, 0"
                  />
               </div>
            </div>
         </div>
         <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Hue</label>
            <div className="relative h-12 w-full">
               <div
                  className="absolute inset-0 rounded-md"
                  style={{
                     background: `linear-gradient(to right, ${d3.range(0, 360, 1).map(h => d3.hsl(h, 0.8, 0.5).formatHex()).join(',')})`
                  }}
               />
               <Slider
                  value={[hue]}
                  min={0}
                  max={359}
                  step={1}
                  onValueChange={([h]) => {
                     setHue(h)
                     updateFromHSL(h, saturation, lightness)
                  }}
                  className="absolute inset-0"
               />
            </div>
         </div>
         <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Saturation</label>
            <Slider
               value={[saturation]}
               min={0}
               max={100}
               step={1}
               onValueChange={([s]) => {
                  setSaturation(s)
                  updateFromHSL(hue, s, lightness)
               }}
               className="py-2"
            />
         </div>
         <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Lightness</label>
            <Slider
               value={[lightness]}
               min={0}
               max={100}
               step={1}
               onValueChange={([l]) => {
                  setLightness(l)
                  updateFromHSL(hue, saturation, l)
               }}
               className="py-2"
            />
         </div>
      </div>
   )
}

function ChartOptions({ className }: { className?: string }) {
   const [options, setOptions] = useState({
      legends: true,
      tooltips: true,
      gridlines: true,
      annotations: false,
      titles: true,
      subtitles: true,
   });

   return (
      <div className="bg-[#1F1F1F]/50 backdrop-blur-sm border border-[#2A2A2A] rounded-lg p-4 h-full">
         <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
               <div className="h-3 w-3 rounded-sm bg-gray-400" />
               <h3 className="text-sm font-medium text-gray-200">Chart Elements</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
               {Object.entries(options).map(([key, value]) => (
                  <div
                     key={key}
                     className={`flex items-center justify-between p-2 rounded-md transition-all duration-200
                ${value ? 'bg-[#2A2A2A]/50' : 'bg-transparent hover:bg-[#2A2A2A]/30'}`}
                  >
                     <Label
                        htmlFor={key}
                        className="text-xs font-medium capitalize text-gray-400"
                     >
                        {key}
                     </Label>
                     <Switch
                        id={key}
                        checked={value}
                        onCheckedChange={(checked) =>
                           setOptions((prev) => ({ ...prev, [key]: checked }))
                        }
                        className="data-[state=checked]:bg-gray-400"
                     />
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

const features: Feature[] = [
   {
      component: TreeMap,
      title: "TreeMap",
      description:
         "Hierarchical data visualization that uses nested rectangles to represent data structure and values.",
      link: "View TreeMap docs",
      href: "#",
   },
   {
      component: BarChart,
      title: "Bar Chart",
      description:
         "Versatile bar charts with customizable animations, colors, and layouts. Perfect for comparing values across categories.",
      link: "View Bar Chart docs",
      href: "#",
   },
   {
      component: LineChart,
      title: "Line Chart",
      description:
         "Smooth, interactive line charts with customizable curves, points, and animations. Ideal for time series data.",
      link: "View Line Chart docs",
      href: "#",
   },
   {
      component: DonutChart,
      title: "Donut Chart",
      description:
         "Beautiful donut charts with interactive segments, customizable colors, and smooth transitions.",
      link: "View Donut Chart docs",
      href: "#",
   },
   {
      component: StreamChart,
      title: "Stream Chart",
      description:
         "Elegant streamgraph visualization for displaying temporal data with smooth flowing curves and transitions. Perfect for showing evolving trends.",
      link: "View Stream Chart docs",
      href: "#",
   },
   {
      component: StackedBarChart,
      title: "Stacked Bar Chart",
      description:
         "Horizontal stacked bar charts with smooth animations and customizable colors. Ideal for comparing parts of a whole across categories.",
      link: "View Stacked Bar Chart docs",
      href: "#",
   },
   // {
   //   icon: Wrench,
   //   title: "Handles your special needs",
   //   description:
   //     "Rollup is not opinionated. Many configuration options and a rich plugin interface make it the ideal bundler for special build flows and higher level tooling.",
   //   link: "See all options",
   //   href: "#",
   // },
   // {
   //   icon: Triangle,
   //   title: "The bundler behind Vite",
   //   description:
   //     "Developing for the web? Vite pre-configures Rollup for you with sensible defaults and powerful plugins while giving you an insanely fast development server.",
   //   link: "Check out Vite",
   //   href: "#",
   // },
]

export function Features() {
   const [currentTheme, setCurrentTheme] = useState('#22C55E') // Default forest green theme
   const [currentVibe, setCurrentVibe] = useState('modern') // Default modern vibe

   return (
      <section className="w-full py-8 sm:py-16">
         <div className="px-4 mb-16">
            <ChartControls
               currentTheme={currentTheme}
               currentVibe={currentVibe}
               onThemeChange={setCurrentTheme}
               onVibeChange={setCurrentVibe}
            />
         </div>
         <div className="grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
               <div key={feature.title} className="rounded-lg bg-[#1F1F1F] p-6 hover:bg-[#252525]">
                  {feature.component ? (
                     <div className="relative mb-4 h-[200px] w-full overflow-hidden">
                        <feature.component themeColor={currentTheme} vibe={currentVibe} />
                     </div>
                  ) : feature.icon ? (
                     <feature.icon className="mb-4 h-8 w-8 text-gray-400" />
                  ) : null}
                  <h3 className="mb-2 text-xl font-semibold text-gray-200">{feature.title}</h3>
                  <p className="mb-4 text-gray-400">{feature.description}</p>
                  <Link href={feature.href} className="text-[#4169E1] hover:text-[#3154b3]">
                     {feature.link} →
                  </Link>
               </div>
            ))}
         </div>
      </section>
   )
}
