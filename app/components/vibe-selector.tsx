'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const vibes = [
  {
    id: 'evergreen',
    name: 'Evergreen',
    description: 'Sharp, structured charts with clear hierarchy - like the strong vertical lines of a pine tree',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L20 15H4L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8L18 17H6L12 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 21H13V17H11V21Z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    )
  },
  {
    id: 'palm',
    name: 'Palm Tree',
    description: 'Flowing and dynamic with graceful curves - inspired by swaying palm fronds in the breeze',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3C8 3 4 8 8 12C4 12 3 16 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 3C16 3 20 8 16 12C20 12 21 16 18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 3V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'bamboo',
    name: 'Bamboo',
    description: 'Clean and minimal with balanced spacing - reflecting the elegant segments of bamboo stalks',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 6H16M8 10H16M8 14H16M8 18H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'willow',
    name: 'Willow',
    description: 'Gentle and organic with soft transitions - like willow branches cascading downward',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 8C16 8 20 12 16 16M12 8C8 8 4 12 8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 21V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'succulent',
    name: 'Succulent',
    description: 'Compact and modern with circular patterns - inspired by the geometric forms of succulents',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7Z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    )
  },
  {
    id: 'vine',
    name: 'Vine',
    description: 'Interconnected and flowing with organic connections - like climbing vines linking elements together',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 17C8 17 8 7 12 7C16 7 16 17 21 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3 12C8 12 16 12 21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  }
]

interface VibeSelectorProps {
  currentVibe: string;
  onVibeChange: (vibe: string) => void;
}

export function VibeSelector({ currentVibe, onVibeChange }: VibeSelectorProps) {
  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-3 w-3">
            <svg viewBox="0 0 15 15" className="h-full w-full text-muted-foreground">
              <path d="M7.5 3C9.5 3 11 4 11 6C11 8 9.5 9 7.5 9C5.5 9 4 8 4 6C4 4 5.5 3 7.5 3ZM7.5 1C4.5 1 2 3 2 6C2 9 4.5 11 7.5 11C10.5 11 13 9 13 6C13 3 10.5 1 7.5 1Z" fill="currentColor"/>
            </svg>
          </div>
          <h3 className="text-sm font-medium text-foreground">Chart Style</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 flex-1">
          <TooltipProvider>
            {vibes.map((vibe) => (
              <Tooltip key={vibe.id} delayDuration={200}>
                <TooltipTrigger asChild>
                  <button
                    className={`group relative h-16 w-full overflow-hidden rounded-md bg-foreground/5 transition-all duration-200 
                      ${currentVibe === vibe.id ? 'ring-2 ring-foreground/20' : 'hover:ring-1 hover:ring-foreground/10'}`}
                    onClick={() => onVibeChange(vibe.id)}
                  >
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                      ${currentVibe === vibe.id ? 'opacity-100' : ''}`}>
                      <div className="h-full w-full bg-gradient-to-br from-foreground/10 to-transparent" />
                    </div>
                    <div className="relative flex flex-col items-center justify-center gap-1">
                      <span className="text-muted-foreground">{vibe.icon}</span>
                      <span className="text-xs font-medium text-foreground">{vibe.name}</span>
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent 
                  side="bottom" 
                  className="bg-card border-border"
                >
                  <p className="font-medium text-foreground">{vibe.name}</p>
                  <p className="text-xs text-muted-foreground">{vibe.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
