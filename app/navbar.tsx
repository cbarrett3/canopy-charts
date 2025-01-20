"use client"

import Link from "next/link"
import { Search, Github, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-[#1B1B1B]">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZOiunXX9U1mkWVXJC7CUlue9ZXbXcc.png"
            alt="Rollup Logo"
            className="h-8 w-8"
          />
        </Link>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="search"
            placeholder="Search"
            className="h-8 w-48 rounded-md bg-[#2A2A2A] pl-8 pr-4 text-sm text-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
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
        <Button variant="ghost" className="text-gray-300">
          <Github className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  )
}

