"use client"

import { Globe, TreesIcon as Tree, Wand2, PlugIcon as Plugin, Wrench, Triangle } from "lucide-react"
import Link from "next/link"
import TreeMap  from "./d3-tree-map"
import BarChart  from "./d3-bar-chart"
import LineChart from "./d3-line-chart"
import DonutChart from "./d3-donut-chart"
import StreamChart from "./d3-stream-chart"
import StackedBarChart from "./d3-stacked-bar-chart"

const features = [
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
  {
    icon: Wrench,
    title: "Handles your special needs",
    description:
      "Rollup is not opinionated. Many configuration options and a rich plugin interface make it the ideal bundler for special build flows and higher level tooling.",
    link: "See all options",
    href: "#",
  },
  {
    icon: Triangle,
    title: "The bundler behind Vite",
    description:
      "Developing for the web? Vite pre-configures Rollup for you with sensible defaults and powerful plugins while giving you an insanely fast development server.",
    link: "Check out Vite",
    href: "#",
  },
]

export function Features() {
  return (
    <div className="grid grid-cols-1 gap-6 px-4 py-16 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <div key={feature.title} className="rounded-lg bg-[#1F1F1F] p-6 hover:bg-[#252525]">
          {feature.component ? (
            <div className="mb-4 h-[200px] w-full">
              <feature.component />
            </div>
          ) : (
            <feature.icon className="mb-4 h-8 w-8 text-gray-400" />
          )}
          <h3 className="mb-2 text-xl font-semibold text-gray-200">{feature.title}</h3>
          <p className="mb-4 text-gray-400">{feature.description}</p>
          <Link href={feature.href} className="text-[#4169E1] hover:text-[#3154b3]">
            {feature.link} →
          </Link>
        </div>
      ))}
    </div>
  )
}
