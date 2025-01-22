'use client'

import { useState } from 'react'
import { Command } from 'lucide-react'
import { Input } from "@/components/ui/input"

export function AiChartSuggest() {
  const [query, setQuery] = useState('')

  return (
    <div className="bg-[#1F1F1F]/50 backdrop-blur-sm border border-[#2A2A2A] rounded-lg p-3 h-full">
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <Command className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
          <h3 className="text-sm font-medium text-gray-200 truncate">AI Chart Suggestions</h3>
        </div>
        <div className="relative">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-7 bg-[#2A2A2A] border-[#3A3A3A] text-sm text-gray-200 placeholder:text-gray-500"
            placeholder="Describe your data or visualization needs..."
          />
        </div>
      </div>
    </div>
  )
}
