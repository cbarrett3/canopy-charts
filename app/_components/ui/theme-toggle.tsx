"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative hover:bg-transparent group"
    >
      <div className="absolute inset-0 rounded-full bg-green-500/0 group-hover:bg-green-500/20 transition-all duration-300 blur-lg" />
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-foreground group-hover:text-green-500 transition-colors duration-300" />
      ) : (
        <Moon className="h-5 w-5 text-foreground group-hover:text-green-500 transition-colors duration-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
