'use client';

import { useTranslations } from 'next-intl';
import { useSidebar } from '@/app/_components/layout/sidebar-context';
import { Search, ChevronRight, PanelLeftClose, PanelLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { cn } from "@/lib/utils"
import { useParams } from 'next/navigation';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, setIsExpanded } = useSidebar();
  const { locale } = useParams();
  const isOpen = isExpanded;

  const gettingStartedT = useTranslations('Docs.getting-started');
  const visualizationsT = useTranslations('Docs.visualizations');
  const featuresT = useTranslations('Docs.features');
  const contributingT = useTranslations('Docs.contributing');
  const usageT = useTranslations('Docs.usage');
  const searchT = useTranslations('Docs');

  const sections = [
    {
      title: gettingStartedT('title'),
      items: [
        { title: gettingStartedT('introduction.title'), href: `/${locale}/docs` },
        { title: gettingStartedT('installation.title'), href: `/${locale}/docs/installation` },
        { title: usageT('title'), href: `/${locale}/docs/usage` },
      ]
    },
    {
      title: visualizationsT('title'),
      items: [
        { title: visualizationsT('line-chart'), href: `/${locale}/docs/line-chart` },
        { title: visualizationsT('bar-chart'), href: `/${locale}/docs/bar-chart` },
        { title: visualizationsT('donut-chart'), href: `/${locale}/docs/donut-chart` },
        { title: visualizationsT('stream-chart'), href: `/${locale}/docs/stream-chart` },
        { title: visualizationsT('tree-map'), href: `/${locale}/docs/treemap-chart` },
        { title: visualizationsT('stacked-bar-chart'), href: `/${locale}/docs/stacked-bar-chart` },
      ]
    },
    {
      title: featuresT('title'),
      items: [
        { title: featuresT('theming'), href: `/${locale}/docs/theming` },
        { title: featuresT('animations'), href: `/${locale}/docs/animations` },
        { title: featuresT('responsiveness'), href: `/${locale}/docs/responsiveness` },
        { title: featuresT('accessibility'), href: `/${locale}/docs/accessibility` },
      ]
    },
    {
      title: contributingT('title'),
      items: [
        { title: contributingT('how-to'), href: `/${locale}/docs/contributing` },
        { title: contributingT('dev-guide'), href: `/${locale}/docs/development` },
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
            "sticky top-4 z-50 flex items-center gap-2 px-4 bg-background dark:bg-[#1B1B1B]",
            "rounded-none border-b border-border/40",
            "h-[52px] pt-1"  // matches navbar height (py-2.5 * 2 + content height)
          )}>
            <div className={cn(
              "relative flex-1",
              !isOpen && "hidden" // Hide search when collapsed
            )}>
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={searchT('search')}
                className={cn(
                  "w-full pl-9 h-10 bg-background/40 dark:bg-[#2A2A2A]",
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
