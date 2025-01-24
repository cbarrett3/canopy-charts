"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-400 transition-all duration-300 [filter:drop-shadow(0_0_8px_rgba(250,204,21,0.5))] hover:[filter:drop-shadow(0_0_12px_rgba(250,204,21,0.7))]" />
      ) : (
        <Moon className="h-5 w-5 text-blue-400 transition-all duration-300 [filter:drop-shadow(0_0_8px_rgba(96,165,250,0.5))] hover:[filter:drop-shadow(0_0_12px_rgba(96,165,250,0.7))]" />
      )}
    </button>
  )
}
