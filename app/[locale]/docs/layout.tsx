'use client';

import { useTranslations } from 'next-intl';
import { useSidebar } from '@/app/_components/layout/sidebar-context';
import { Search, ChevronRight, PanelLeftClose, PanelLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { cn } from "@/lib/utils"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('Docs');
  const { isExpanded, setIsExpanded } = useSidebar();
  const isOpen = isExpanded;

  const sections = [
    {
      title: t('gettingStarted.title'),
      items: [
        { title: t('gettingStarted.title'), href: '/docs' },
        { title: t('installation.title'), href: '/docs/installation' },
        { title: t('usage.title'), href: '/docs/usage' },
      ]
    },
    {
      title: "Visualizations",
      items: [
        { title: "Line Chart", href: '/docs/line-chart' },
        { title: "Bar Chart", href: '/docs/bar-chart' },
        { title: "Scatter Plot", href: '/docs/scatter-plot' },
        { title: "Pie Chart", href: '/docs/pie-chart' },
      ]
    },
    {
      title: "Features",
      items: [
        { title: "Theming", href: '/docs/theming' },
        { title: "Animations", href: '/docs/animations' },
        { title: "Responsiveness", href: '/docs/responsiveness' },
        { title: "Accessibility", href: '/docs/accessibility' },
      ]
    },
    {
      title: "Contributing",
      items: [
        { title: "How to Contribute", href: '/docs/contributing' },
        { title: "Development Guide", href: '/docs/development' },
      ]
    }
  ];

  return (
    <div className="relative flex min-h-screen">
      {/* Fixed Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-30",
        "transition-all duration-300",
        "bg-background dark:bg-[#1B1B1B]",
        "border-r border-border/20",
        isOpen ? "w-72" : "w-16"
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border/10">
            {isOpen && (
              <div className="flex items-center gap-3 flex-1">
                <Search className="h-4 w-4 text-muted-foreground/70" />
                <Input
                  type="search"
                  placeholder="Search documentation..."
                  className={cn(
                    "h-8 bg-transparent w-full",
                    "placeholder:text-muted-foreground/50",
                    "focus-visible:ring-green-500/20",
                    "border-none text-sm"
                  )}
                />
              </div>
            )}
            <Button 
              variant="ghost" 
              size="icon"
              className={cn(
                "text-muted-foreground/70 hover:text-green-500",
                "hover:bg-green-500/10",
                !isOpen && "w-full mx-auto"
              )}
              onClick={() => setIsExpanded(!isOpen)}
            >
              {!isOpen ? (
                <PanelLeft className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className={cn(
            "flex-1 px-3 py-6",
            !isOpen && "px-2"
          )}>
            <nav>
              {isOpen && sections.map((section, i) => (
                <div key={section.title} className={cn(
                  "relative group transition-all duration-300",
                  i > 0 && "mt-8"
                )}>
                  <div className="px-3 mb-2 text-sm font-medium text-muted-foreground/70">
                    {section.title}
                  </div>
                  <div>
                    {section.items.map((item) => (
                      <div key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "group/item relative w-full px-3 py-2 text-[0.9rem] block",
                            "text-muted-foreground hover:text-green-500",
                            "transition-all duration-300 rounded-lg",
                            "hover:bg-green-500/5 dark:hover:bg-green-500/10",
                            "focus-visible:outline-none focus-visible:ring-2",
                            "focus-visible:ring-green-500/30"
                          )}
                        >
                          <span className="relative flex items-center gap-2">
                            <ChevronRight className="h-3 w-3 text-muted-foreground/40 group-hover/item:text-green-500 transition-colors duration-300" />
                            {item.title}
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {!isOpen && sections.map((section) => (
                <div key={section.title} className="mb-4">
                  {section.items.map((item) => (
                    <div key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex justify-center w-full p-2 text-[0.9rem] block",
                          "text-muted-foreground hover:text-green-500",
                          "transition-all duration-300 rounded-lg",
                          "hover:bg-green-500/5 dark:hover:bg-green-500/10",
                          "focus-visible:outline-none focus-visible:ring-2",
                          "focus-visible:ring-green-500/30"
                        )}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 min-h-screen",
        "transition-all duration-300",
        isOpen ? "pl-72" : "pl-16"
      )}>
        <div className="container relative mx-auto px-8">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
