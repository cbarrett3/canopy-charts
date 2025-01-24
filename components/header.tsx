"use client"

import { ThemeToggle } from "./theme-toggle"

export function Header() {
  return (
    <header className="fixed top-4 right-4 z-50">
      <ThemeToggle />
    </header>
  )
}
