'use client'

import { useState } from 'react'
import { Command } from 'lucide-react'
import { Input } from "@/components/ui/input"

export function AiChartSuggest() {
  const [query, setQuery] = useState('')

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-3 h-full">
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <Command className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          <h3 className="text-sm font-medium text-foreground truncate">AI Chart Suggestions</h3>
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
    </div>
  )
}
