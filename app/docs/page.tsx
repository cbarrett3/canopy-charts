"use client"

import { useThemeColor } from "@/app/_components/providers/theme-context"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChartBarIcon, Book, Code, Settings, Wand2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sections = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs",
        icon: Book,
        content: (
          <>
            <h1 className="text-3xl font-bold tracking-tight mb-8">Introduction</h1>
            <p className="leading-7 text-muted-foreground mb-4">
              Welcome to Canopy Charts documentation. This guide will help you get started with our powerful charting library
              that combines the flexibility of D3.js with the modern features of React.
            </p>
            <div className="my-6 space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Key Features</h2>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Interactive D3.js visualizations with React components</li>
                <li>Beautiful, customizable themes and vibes</li>
                <li>Responsive and accessible design</li>
                <li>Smooth animations and transitions</li>
                <li>TypeScript support</li>
              </ul>
            </div>
          </>
        )
      },
      {
        title: "Installation",
        href: "/docs/installation",
        icon: Code
      },
      {
        title: "Customization",
        href: "/docs/customization",
        icon: Settings
      }
    ]
  },
  {
    title: "Charts",
    items: [
      {
        title: "TreeMap",
        href: "/docs/charts/treemap",
        icon: ChartBarIcon
      },
      {
        title: "Bar Chart",
        href: "/docs/charts/bar",
        icon: ChartBarIcon
      },
      {
        title: "Line Chart",
        href: "/docs/charts/line",
        icon: ChartBarIcon
      },
      {
        title: "Donut Chart",
        href: "/docs/charts/donut",
        icon: ChartBarIcon
      },
      {
        title: "Stream Chart",
        href: "/docs/charts/stream",
        icon: ChartBarIcon
      },
      {
        title: "Stacked Bar Chart",
        href: "/docs/charts/stacked-bar",
        icon: ChartBarIcon
      }
    ]
  },
  {
    title: "Features",
    items: [
      {
        title: "AI Chart Suggestions",
        href: "/docs/ai-features",
        icon: Wand2
      }
    ]
  }
]

export default function DocsPage() {
  const pathname = usePathname()
  const { themeColor } = useThemeColor()
  const [currentSection, setCurrentSection] = useState(() => {
    const section = sections.flatMap(s => s.items).find(item => item.href === pathname)
    return section || sections[0].items[0]
  })
  
  return (
    <div className="flex h-[calc(100vh-5rem)]">
      {/* Sidebar */}
      <div className="hidden lg:block w-72 bg-background/40 dark:bg-[#1B1B1B]/30 backdrop-blur-[12px] backdrop-saturate-[180%] border-r border-border/40">
        <div className="h-full py-6">
          <div className="px-4 py-2">
            <h2 className="text-lg font-semibold tracking-tight">Documentation</h2>
          </div>
          <ScrollArea className="h-[calc(100vh-10rem)] px-2">
            <div className="space-y-6 p-2">
              {sections.map((section) => (
                <div key={section.title} className="space-y-2">
                  <h3 className="px-4 text-sm font-medium text-muted-foreground tracking-tight">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <Button
                        key={item.href}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start gap-2 font-normal",
                          pathname === item.href && [
                            "bg-accent/50 dark:bg-accent/20",
                            "text-foreground",
                            "hover:bg-accent/60 dark:hover:bg-accent/30"
                          ]
                        )}
                        onClick={() => setCurrentSection(item)}
                      >
                        <item.icon
                          size={18}
                          className={cn(
                            "text-muted-foreground transition-colors",
                            pathname === item.href && {
                              color: themeColor
                            }
                          )}
                        />
                        <span>{item.title}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl space-y-8 px-4 py-6">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: themeColor }} />
            <h1 className="text-2xl font-semibold tracking-tight">Documentation</h1>
          </div>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {currentSection.content || (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold">Documentation Coming Soon</h2>
                <p className="text-muted-foreground mt-2">
                  We&apos;re working on this section. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
