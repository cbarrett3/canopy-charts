'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const vibes = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, minimal, with subtle animations',
    properties: {
      padding: 20,
      borderRadius: 8,
      transitionDuration: 300,
      interactivityLevel: 'subtle'
    }
  },
  {
    id: 'crafty',
    name: 'Crafty',
    description: 'Organic, textured, handcrafted feel',
    properties: {
      padding: 24,
      borderRadius: 12,
      transitionDuration: 400,
      interactivityLevel: 'playful'
    }
  },
  {
    id: 'friendly',
    name: 'Friendly',
    description: 'Rounded corners, bouncy animations',
    properties: {
      padding: 16,
      borderRadius: 16,
      transitionDuration: 500,
      interactivityLevel: 'engaging'
    }
  },
  {
    id: 'sharp',
    name: 'Sharp',
    description: 'Bold angles, quick transitions',
    properties: {
      padding: 12,
      borderRadius: 4,
      transitionDuration: 200,
      interactivityLevel: 'precise'
    }
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Refined spacing, smooth transitions',
    properties: {
      padding: 28,
      borderRadius: 6,
      transitionDuration: 600,
      interactivityLevel: 'graceful'
    }
  }
]

interface VibeSelectorProps {
  currentVibe: string;
  onVibeChange: (vibe: string) => void;
}

export function VibeSelector({ currentVibe, onVibeChange }: VibeSelectorProps) {
  return (
    <div className="bg-[#1F1F1F]/50 backdrop-blur-sm border border-[#2A2A2A] rounded-lg p-4 h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-3 w-3">
            <svg viewBox="0 0 15 15" className="h-full w-full text-gray-400">
              <path
                d="M7.5 0.875C3.86 0.875 0.875 3.86 0.875 7.5C0.875 11.14 3.86 14.125 7.5 14.125C11.14 14.125 14.125 11.14 14.125 7.5C14.125 3.86 11.14 0.875 7.5 0.875ZM7.5 13.125C4.42 13.125 1.875 10.58 1.875 7.5C1.875 4.42 4.42 1.875 7.5 1.875C10.58 1.875 13.125 4.42 13.125 7.5C13.125 10.58 10.58 13.125 7.5 13.125Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-200">Chart Vibe</h3>
        </div>
        <div className="grid grid-cols-3 gap-2 flex-1">
          <TooltipProvider>
            {vibes.map((vibe) => (
              <Tooltip key={vibe.id} delayDuration={200}>
                <TooltipTrigger asChild>
                  <button
                    className={`group relative h-12 w-full overflow-hidden rounded-md bg-white/5 transition-all duration-200 
                      ${currentVibe === vibe.id ? 'ring-2 ring-white/20' : 'hover:ring-1 hover:ring-white/10'}`}
                    onClick={() => onVibeChange(vibe.id)}
                  >
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                      ${currentVibe === vibe.id ? 'opacity-100' : ''}`}>
                      <div className="h-full w-full bg-gradient-to-br from-white/10 to-transparent" />
                    </div>
                    <span className="relative text-xs font-medium text-gray-200">{vibe.name}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent 
                  side="bottom" 
                  className="bg-[#1F1F1F] border-[#2A2A2A]"
                >
                  <p className="font-medium text-gray-200">{vibe.name}</p>
                  <p className="text-xs text-gray-400">{vibe.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
