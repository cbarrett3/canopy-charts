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
        "fixed top-0 z-40 flex h-screen flex-col border-r border-border/40 bg-sidebar transition-all duration-300",
        isOpen ? "w-72" : "w-16"
      )}>
        <div className="flex flex-col h-full">
          <div className={cn(
            "sticky top-4 z-50 flex items-center gap-2 px-4 bg-[#1B1B1B]",
            "rounded-none border-b border-border/40",
            "h-[52px] pt-1"  // matches navbar height (py-2.5 * 2 + content height)
          )}>
            <div className={cn(
              "relative flex-1",
              !isOpen && "hidden" // Hide search when collapsed
            )}>
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={t('search')}
                className={cn(
                  "w-full pl-9 h-10 bg-[#2A2A2A]",
                  "border-border/40",
                  "focus-visible:ring-1 focus-visible:ring-green-500/20",
                  "placeholder:text-muted-foreground/50"
                )}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-10 w-10 relative group hover:bg-transparent",
                "after:absolute after:inset-0 after:rounded-full after:bg-green-500/0 hover:after:bg-green-500/20 after:transition-all after:duration-300 after:blur-lg",
                !isOpen && "mx-auto" // Center the button when collapsed
              )}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <PanelLeftClose className="relative z-10 text-foreground group-hover:text-green-500 transition-colors duration-300" />
              ) : (
                <PanelLeft className="relative z-10 text-foreground group-hover:text-green-500 transition-colors duration-300" />
              )}
            </Button>
          </div>
          <div className="overflow-y-auto flex-1 pt-6">
            {sections.map((section, i) => (
              <div key={i} className="py-4">
                <h2 className={cn(
                  "px-4 text-sm font-semibold text-foreground/70",
                  !isOpen && "hidden" // Hide section title when collapsed
                )}>
                  {section.title}
                </h2>
                <div className="mt-2">
                  {section.items.map((item, j) => (
                    <Link
                      key={j}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 px-4 py-1.5 text-sm text-muted-foreground hover:text-green-500 transition-colors",
                        !isOpen && "justify-center" // Center items when collapsed
                      )}
                    >
                      <ChevronRight className={cn(
                        "h-3 w-3",
                        !isOpen && "hidden" // Hide chevron when collapsed
                      )} />
                      <span className={cn(
                        !isOpen && "hidden" // Hide text when collapsed
                      )}>
                        {item.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 min-h-screen pt-24",
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
