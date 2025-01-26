"use client"

import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { GlobeIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const localeNames = {
  en: {
    name: 'English',
    flag: '🇺🇸'
  },
  es: {
    name: 'Español',
    flag: '🇪🇸'
  }
}

export default function LanguageSelector() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLocaleChange = (newLocale: string) => {
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '')
    const newPathname = `/${newLocale}${pathnameWithoutLocale || '/'}`
    router.replace(newPathname)
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
      
      <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-background/80 dark:bg-[#1B1B1B]/80 backdrop-blur-[8px] backdrop-saturate-[140%] rounded-xl border border-border/40 dark:border-border/30 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12),0_4px_8px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3),0_4px_8px_-4px_rgba(0,0,0,0.2)]">
        <div className="py-1">
          {Object.entries(localeNames).map(([code, { name, flag }]) => (
            <button
              key={code}
              onClick={() => handleLocaleChange(code)}
              className={cn(
                "w-full px-4 py-2 text-sm flex items-center gap-3",
                "hover:bg-green-500/10 dark:hover:bg-green-500/20",
                "transition-colors duration-200",
                code === locale ? "text-green-500" : "text-foreground"
              )}
            >
              <span className="text-base">{flag}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
