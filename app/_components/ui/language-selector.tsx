"use client"

import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { GlobeIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const localeNames = {
  en: 'English',
  es: 'Español'
}

export default function LanguageSelector() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) return;
    
    // More robust locale path handling
    const segments = pathname.split('/')
    // Find the locale segment index (should be 1)
    const localeIndex = segments.findIndex(segment => segment === locale)
    
    if (localeIndex !== -1) {
      // Replace the locale segment
      segments[localeIndex] = newLocale
      const newPathname = segments.join('/')
      router.push(newPathname)
    } else {
      // If no locale found in path, construct it
      const newPathname = `/${newLocale}${pathname === '/' ? '' : pathname}`
      router.push(newPathname)
    }
  }

  return (
    <div className="relative group">
      <Button
        variant="ghost"
        className="relative hover:bg-transparent group"
      >
        <div className="absolute inset-0 rounded-full bg-green-500/0 group-hover:bg-green-500/20 transition-all duration-300 blur-lg" />
        <GlobeIcon className="h-5 w-5 text-foreground group-hover:text-green-500 transition-colors duration-300" />
      </Button>
      
      <div className="absolute right-1/2 translate-x-1/2 mt-2 w-32 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="bg-background/60 dark:bg-[#1B1B1B]/60 backdrop-blur-[8px] backdrop-saturate-[140%] rounded-2xl border border-border/30 overflow-hidden">
          <div className="py-2">
            {Object.entries(localeNames).map(([code, name]) => (
              <button
                key={code}
                onClick={() => handleLocaleChange(code)}
                className={cn(
                  "w-full px-4 py-2 text-sm",
                  "relative transition-all duration-300",
                  code === locale ? "text-green-500" : "text-foreground"
                )}
              >
                <div className="relative flex items-center justify-center">
                  <span className={cn(
                    "transition-all duration-300",
                    "relative after:absolute after:inset-0 after:bg-green-500/0 hover:after:bg-green-500/20 after:blur-lg after:transition-all after:duration-300",
                    code === locale ? "text-green-500" : "hover:text-green-500"
                  )}>
                    {name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
