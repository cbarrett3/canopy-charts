"use client"

import Link from "next/link"
import { Search, Github, MessageSquare, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/app/logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import clsx from "clsx"

export function Navbar() {
  return (
    <div className="sticky top-4 z-50 mx-4 sm:mx-6 lg:mx-8">
      <nav className={clsx(
        "relative flex items-center justify-between",
        "px-5 py-4",
        "bg-background/60 dark:bg-[#1B1B1B]/60",
        "backdrop-blur-[8px] backdrop-saturate-[140%]",
        "border border-border/40 dark:border-border/30",
        "rounded-xl",
        "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12),0_4px_8px_-4px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.2)]",
        "dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3),0_4px_8px_-4px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.05)]",
        "transition-all duration-300",
        "hover:shadow-[0_12px_36px_-8px_rgba(0,0,0,0.15),0_6px_12px_-4px_rgba(0,0,0,0.12),inset_0_1px_3px_rgba(255,255,255,0.25)]",
        "dark:hover:shadow-[0_12px_36px_-8px_rgba(0,0,0,0.4),0_6px_12px_-4px_rgba(0,0,0,0.3),inset_0_1px_3px_rgba(255,255,255,0.07)]",
      )}>
        <div className="relative flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 mr-8 group">
            <div className="relative h-12 w-12 flex-shrink-0 overflow-visible transition-transform duration-300 group-hover:scale-[1.02]">
              <Logo className="w-full h-full" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-foreground/90">Canopy</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Documentation
            </Link>
            <Link href="/examples" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Examples
            </Link>
            <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
          </div>
        </div>

        <div className="relative flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hover:bg-background/80 dark:hover:bg-[#1B1B1B]/80" asChild>
            <Link href="https://github.com/cbarrett3/canopy-charts" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <ThemeToggle />
          <Button variant="default" className="hidden sm:flex px-6 shadow-md hover:shadow-lg transition-shadow">
            Get Started
          </Button>
        </div>
      </nav>
    </div>
  )
}
