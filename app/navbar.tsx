"use client"

import Link from "next/link"
import { Search, Github, MessageSquare, ChevronDown, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/app/logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"

export function Navbar() {
  const { setTheme, theme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-[#1B1B1B]/80 backdrop-blur-md backdrop-saturate-150 border-b border-gray-800/50">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 mr-8">
          <div className="relative h-12 w-12 flex-shrink-0 overflow-visible">
            <Logo className="w-full h-full" />
          </div>
          <span className="text-xl font-semibold text-gray-200">Canopy</span>
        </Link>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="search"
            placeholder="Search"
            className="h-8 w-48 rounded-md bg-[#2A2A2A] pl-8 pr-4 text-sm text-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <Button variant="ghost" className="text-gray-300 text-sm">
          Ctrl K
        </Button>
      </div>
      <div className="flex items-center gap-4">
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

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-300"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        <Button variant="ghost" className="text-gray-300">
          <Github className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  )
}
