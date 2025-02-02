"use client"

import Link from "next/link"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/app/_components/ui/logo"
import { ThemeToggle } from "@/app/_components/ui/theme-toggle"
import LanguageSelector from "@/app/_components/ui/language-selector"
import { useTranslations } from 'next-intl'
import { cn } from "@/lib/utils"
import { useSidebar } from "../layout/sidebar-context"
import { usePathname } from 'next/navigation'
import { Sun, Moon } from 'lucide-react'

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  const pathname = usePathname()
  const isActive = pathname.includes(href)
  
  return (
    <Link 
      href={href} 
      className={cn(
        "relative text-sm font-medium transition-colors group",
        isActive 
          ? "text-green-500" 
          : "text-muted-foreground hover:text-green-500"
      )}
    >
      <div className={cn(
        "absolute inset-0 rounded-md -z-10 transition-all duration-300 blur-sm",
        isActive 
          ? "bg-green-500/10" 
          : "bg-green-500/0 group-hover:bg-green-500/10"
      )} />
      {children}
    </Link>
  )
}

export function Navbar() {
  const t = useTranslations('Navbar')
  const pathname = usePathname()
  const { isExpanded } = useSidebar()
  // Update docs page detection to work with any locale
  const isDocsPage = pathname.includes('/docs')
  
  return (
    <div className={cn(
      "fixed top-4 z-40",
      "transition-all duration-300",
      isDocsPage && "md:block hidden",
      isDocsPage 
        ? isExpanded 
          ? "left-[calc(18rem+1rem)] right-4 w-[calc(100%-19rem-1rem)]" 
          : "left-[calc(4rem+1rem)] right-4 w-[calc(100%-5rem-1rem)]"
        : "left-4 right-4"
    )}>
      <div className={cn(
        !isDocsPage && "max-w-7xl mx-auto"
      )}>
        <nav className={cn(
          "relative flex items-center justify-between",
          "px-5 py-2.5",
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
          <div className="relative flex items-center gap-4 font-sans">
            <Link href="/" className="flex items-center gap-3 mr-8 group relative">
              <div className="absolute inset-[-4px] rounded-xl bg-green-500/0 group-hover:bg-green-500/20 transition-all duration-300 blur-lg" />
              <div className="relative h-10 w-10 flex-shrink-0 overflow-visible transition-transform duration-300 group-hover:scale-[1.02]">
                <Logo className="w-full h-full" />
              </div>
              <span className="hidden md:inline text-xl font-semibold tracking-tight text-foreground font-sans transition-all duration-300 group-hover:text-green-500">Canopy Charts</span>
            </Link>

            <div className="hidden md:flex items-center gap-8 font-sans">
              <NavLink href="/docs">{t('docs')}</NavLink>
              <NavLink href="/examples">{t('examples')}</NavLink>
              <NavLink href="/blog">{t('blog')}</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-4 font-sans">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative hover:bg-transparent group"
              >
                <Link href="https://github.com/cbarrett3/canopy-charts">
                  <div className="absolute inset-0 rounded-full bg-green-500/0 group-hover:bg-green-500/20 transition-all duration-300 blur-lg" />
                  <Github className="relative h-5 w-5 text-foreground group-hover:text-green-500 transition-colors duration-300" />
                </Link>
              </Button>
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
