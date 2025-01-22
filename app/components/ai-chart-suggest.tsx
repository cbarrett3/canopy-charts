'use client'

import { useState } from 'react'
import { Command } from 'lucide-react'
import { Input } from "@/components/ui/input"

export function AiChartSuggest() {
  const [query, setQuery] = useState('')

  return (
    <div className="bg-[#1F1F1F]/50 backdrop-blur-sm border border-[#2A2A2A] rounded-lg p-4 flex-1">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Command className="h-4 w-4 text-gray-400" />
          <h3 className="text-sm font-medium text-gray-200">AI Chart Suggestions</h3>
        </div>
        <div className="relative">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#2A2A2A] border-[#3A3A3A] text-sm text-gray-200 placeholder:text-gray-500"
            placeholder="Describe your data or visualization needs..."
          />
        </div>
      </div>
    </div>
  )
}
