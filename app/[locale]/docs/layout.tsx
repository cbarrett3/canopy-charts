'use client';

import { useTranslations } from 'next-intl';
import { useSidebar } from '@/app/_components/layout/sidebar-context';
import { Search, ChevronRight, PanelLeftClose, PanelLeft, ChevronUp, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { cn } from "@/lib/utils"
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Logo } from '@/app/_components/ui/logo';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded: isOpen, setIsExpanded } = useSidebar();
  const { locale } = useParams();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const gettingStartedT = useTranslations('Docs.getting-started');
  const visualizationsT = useTranslations('Docs.visualizations');
  const featuresT = useTranslations('Docs.features');
  const contributingT = useTranslations('Docs.contributing');
  const searchT = useTranslations('Docs');

  const sections = [
    {
      title: gettingStartedT('title'),
      items: [
        { title: gettingStartedT('introduction.title'), href: `/${locale}/docs` },
        { title: gettingStartedT('installation.title'), href: `/${locale}/docs/installation` },
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

  // Track sidebar height for mobile layout
  useEffect(() => {
    const updateSidebarHeight = () => {
      if (sidebarRef.current) {
        const height = sidebarRef.current.offsetHeight;
        document.documentElement.style.setProperty('--sidebar-height', `${height}px`);
      }
    };

    updateSidebarHeight();
    window.addEventListener('resize', updateSidebarHeight);
    return () => window.removeEventListener('resize', updateSidebarHeight);
  }, [isOpen]);

  return (
    <div className="relative min-h-screen">
      {/* Mobile Sidebar - Only visible on mobile, at the top */}
      <div className={cn(
        "fixed top-4 left-4 right-4 z-50 md:hidden",
        "bg-background/80 dark:bg-[#1B1B1B]/80",
        "backdrop-blur-[8px] backdrop-saturate-[140%]",
        "border border-border/40 dark:border-border/30",
        "rounded-xl",
        "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12),0_4px_8px_-4px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.2)]",
        "dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3),0_4px_8px_-4px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.05)]",
        "transition-all duration-300",
        "hover:shadow-[0_12px_36px_-8px_rgba(0,0,0,0.15),0_6px_12px_-4px_rgba(0,0,0,0.12),inset_0_1px_3px_rgba(255,255,255,0.25)]",
        "dark:hover:shadow-[0_12px_36px_-8px_rgba(0,0,0,0.4),0_6px_12px_-4px_rgba(0,0,0,0.3),inset_0_1px_3px_rgba(255,255,255,0.07)]",
      )}>
        <div className="flex items-center justify-between h-[52px] px-5 py-2.5">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-transparent group"
              onClick={() => setIsExpanded(!isOpen)}
            >
              <div className="absolute inset-0 rounded-full bg-green-500/0 group-hover:bg-green-500/20 transition-all duration-300 blur-lg" />
              {isOpen ? (
                <ChevronUp className="relative h-5 w-5 text-foreground group-hover:text-green-500 transition-colors duration-300" />
              ) : (
                <ChevronDown className="relative h-5 w-5 text-foreground group-hover:text-green-500 transition-colors duration-300" />
              )}
            </Button>
            <span className="text-lg font-semibold tracking-tight text-foreground font-sans transition-all duration-300">Documentation</span>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className={cn(
        "fixed z-40 hidden md:flex flex-col border-r border-border/40 bg-sidebar transition-all duration-300",
        "top-0 h-screen",
        isOpen ? "md:w-72" : "md:w-16"
      )}>
        <div className="flex flex-col h-full">
          <div className={cn(
            "sticky top-4 z-50 flex items-center gap-2 px-4 bg-background dark:bg-[#1B1B1B]",
            "rounded-none border-b border-border/40",
            "h-[52px] pt-1"
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
              onClick={() => setIsExpanded(!isOpen)}
            >
              {isOpen ? (
                <PanelLeftClose className="relative z-10 text-foreground group-hover:text-green-500 transition-colors duration-300" />
              ) : (
                <PanelLeft className="relative z-10 text-foreground group-hover:text-green-500 transition-colors duration-300" />
              )}
            </Button>
          </div>
          <SidebarContent isOpen={isOpen} sections={sections} />
        </div>
      </aside>

      {/* Mobile Menu Button and Dropdown */}
      <nav className={cn(
        "fixed top-4 left-4 right-4 z-50 md:hidden",
        "bg-background/80 dark:bg-[#1B1B1B]/80",
        "backdrop-blur-[8px] backdrop-saturate-[140%]",
        "border border-border/40 dark:border-border/30",
        "rounded-xl",
        "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12),0_4px_8px_-4px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.2)]",
        "dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3),0_4px_8px_-4px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.05)]",
        "transition-all duration-300",
        "hover:shadow-[0_12px_36px_-8px_rgba(0,0,0,0.15),0_6px_12px_-4px_rgba(0,0,0,0.12),inset_0_1px_3px_rgba(255,255,255,0.25)]",
        "dark:hover:shadow-[0_12px_36px_-8px_rgba(0,0,0,0.4),0_6px_12px_-4px_rgba(0,0,0,0.3),inset_0_1px_3px_rgba(255,255,255,0.07)]",
      )}>
        <div className="flex items-center justify-between h-[52px] px-5 py-2.5">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-transparent group"
              onClick={() => setIsExpanded(!isOpen)}
            >
              <div className="absolute inset-0 rounded-full bg-green-500/0 group-hover:bg-green-500/20 transition-all duration-300 blur-lg" />
              {isOpen ? (
                <ChevronUp className="relative h-5 w-5 text-foreground group-hover:text-green-500 transition-colors duration-300" />
              ) : (
                <ChevronDown className="relative h-5 w-5 text-foreground group-hover:text-green-500 transition-colors duration-300" />
              )}
            </Button>
            <span className="text-lg font-semibold tracking-tight text-foreground font-sans transition-all duration-300">Documentation</span>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div className={cn(
        "fixed md:hidden z-40 left-4 right-4 transition-all duration-300",
        "top-[calc(52px+2rem)]",
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none",
      )}>
        <div className={cn(
          "bg-background/80 dark:bg-[#1B1B1B]/80",
          "backdrop-blur-[8px] backdrop-saturate-[140%]",
          "border border-border/40 dark:border-border/30",
          "rounded-xl",
          "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12),0_4px_8px_-4px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.2)]",
          "dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3),0_4px_8px_-4px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.05)]",
          "max-h-[calc(100vh-10rem)] overflow-y-auto",
        )}>
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={searchT('search')}
                className={cn(
                  "w-full pl-10",
                  "bg-background/50 dark:bg-background/20",
                  "border-border/40 dark:border-border/30",
                  "focus:ring-green-500/20 focus:border-green-500/30",
                  "shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.2)]",
                  "dark:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.05)]",
                  "rounded-xl",
                  "transition-all duration-300",
                  "hover:shadow-[0_6px_16px_-6px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.25)]",
                  "dark:hover:shadow-[0_6px_16px_-6px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.07)]",
                )}
              />
            </div>
            <SidebarContent isOpen={true} sections={sections} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className={cn(
        "flex-1 min-h-screen transition-all duration-300",
        "pt-[52px] md:pt-24", // Mobile: account for top bar, Desktop: normal padding
        isOpen ? "md:pl-72" : "md:pl-16" // Desktop sidebar spacing
      )}>
        <div className="container relative mx-auto px-4 md:px-8">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

// Separate component for sidebar content to avoid duplication
function SidebarContent({ isOpen, sections }: { isOpen: boolean, sections: any[] }) {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    // Get the part after /docs/ from both paths
    const getDocsPath = (p: string) => {
      const match = p.match(/\/docs\/?(.*)$/);
      return match ? match[1] : '';
    };
    
    const currentPath = getDocsPath(pathname);
    const itemPath = getDocsPath(path);
    
    return currentPath === itemPath;
  };

  return (
    <div className="overflow-y-auto flex-1 pt-6">
      {sections.map((section, i) => (
        <div key={i} className="py-4">
          <h2 className={cn(
            "px-4 text-sm font-semibold text-foreground/70",
            !isOpen && "md:hidden"
          )}>
            {section.title}
          </h2>
          <div className="mt-2">
            {section.items.map((item: any, j: number) => {
              const active = isActive(item.href);
              return (
                <div key={j} className="relative isolate">
                  {active && (
                    <div className="absolute inset-0 -z-[1] mx-2">
                      <div className="absolute inset-0 rounded-lg bg-green-500/5 blur-[2px]" />
                      <div className="absolute -inset-1 rounded-lg bg-green-500/3 blur-sm" />
                    </div>
                  )}
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-1.5 text-sm transition-colors relative",
                      !isOpen && "md:justify-center",
                      active
                        ? "text-green-500/90"
                        : "text-muted-foreground hover:text-green-500"
                    )}
                  >
                    <ChevronRight className={cn(
                      "h-3 w-3",
                      !isOpen && "md:hidden"
                    )} />
                    <span className={cn(
                      !isOpen && "md:hidden"
                    )}>
                      {item.title}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
