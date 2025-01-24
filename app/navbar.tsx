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
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-[#1B1B1B]/80 backdrop-blur-md backdrop-saturate-150 border-b border-gray-800/50">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 mr-8">
          <div className="relative h-12 w-12 flex-shrink-0 overflow-visible">
            <Logo className="w-full h-full" />
          </div>
          <span className="text-xl font-semibold tracking-tight">Canopy</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/docs" className="text-sm text-gray-400 hover:text-white transition-colors">
            Documentation
          </Link>
          <Link href="/examples" className="text-sm text-gray-400 hover:text-white transition-colors">
            Examples
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Link href="/guide" className="text-gray-300 text-sm hover:text-white">
          guide
        </Link>
        <Link href="/repl" className="text-gray-300 text-sm hover:text-white">
          repl
        </Link>
        <div className="flex items-center gap-1">
          <Link href="/chat" className="text-gray-300 text-sm hover:text-white">
            chat
          </Link>
          <MessageSquare className="h-4 w-4 text-gray-500" />
        </div>
        <Link href="/opencollective" className="text-gray-300 text-sm hover:text-white">
          opencollective
        </Link>

        {/* Language Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-gray-300">
              EN <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {}}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>
              Español
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>
              中文
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href="https://github.com/cbarrett3/canopy-charts" target="_blank">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Github className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </nav>
  )
}
