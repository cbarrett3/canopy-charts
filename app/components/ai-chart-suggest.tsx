'use client'

import { useState } from 'react'
import { Command } from 'lucide-react'
import { Input } from "@/components/ui/input"

export function AiChartSuggest() {
  const [query, setQuery] = useState('')

  return (
    <div className="bg-background/80 dark:bg-[#1B1B1B]/80 backdrop-blur-md backdrop-saturate-150 border border-border/50 shadow-[0_2px_10px] shadow-black/5 rounded-lg p-4 h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-3 w-3 rounded-sm bg-primary/80" />
        <h3 className="text-sm font-medium text-foreground">AI Suggestions</h3>
      </div>
      <div className="relative">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-7 bg-muted border-input text-sm text-foreground placeholder:text-muted-foreground"
          placeholder="Describe your data or visualization needs..."
        />
      </div>
    </div>
  )
}
