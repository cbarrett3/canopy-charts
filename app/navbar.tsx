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


export function Navbar() {
  return (
    <div className="sticky top-2 z-50 mx-4 sm:mx-6 lg:mx-8">
      <nav className="flex items-center justify-between px-4 py-3 bg-background/80 dark:bg-[#1B1B1B]/80 backdrop-blur-md backdrop-saturate-150 border border-border/50 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 mr-8">
            <div className="relative h-12 w-12 flex-shrink-0 overflow-visible">
              <Logo className="w-full h-full" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">Canopy</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Documentation
            </Link>
            <Link href="/examples" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Examples
            </Link>
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com/cbarrett3/canopy-charts" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <ThemeToggle />
          <Button variant="default" className="hidden sm:flex">
            Get Started
          </Button>
        </div>
      </nav>
    </div>
  )
}
