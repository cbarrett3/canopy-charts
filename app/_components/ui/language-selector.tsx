"use client"

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/navigation'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export default function LanguageSelector() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) return;
    
    try {
      router.replace(pathname, { locale: newLocale })
    } catch (error) {
      console.error('Error changing locale:', error)
    }
  }

  return (
    <div className="relative">
      <style jsx global>{`
        .eng-gradient {
          background: linear-gradient(to right, #0ea5e9, #22c55e);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .es-gradient {
          background: linear-gradient(to right, #eab308, #22c55e);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
      <div className={cn(
        "relative flex items-center gap-1 p-1",
        "rounded-full",
        "bg-background/60 dark:bg-[#1B1B1B]/60",
        "backdrop-blur-[8px] backdrop-saturate-[140%]",
        "border border-border/30",
        "shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]",
        "dark:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3)]"
      )}>
        <motion.div
          className="absolute h-[calc(100%-4px)] w-[calc(50%-2px)] rounded-full bg-white/10"
          animate={{
            x: locale === 'en' ? '2px' : 'calc(100% + 2px)',
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        />
        <button
          onClick={() => handleLocaleChange('en')}
          className={cn(
            "relative z-10 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200",
            locale === 'en' 
              ? "eng-gradient font-medium" 
              : "text-foreground/60 hover:text-foreground/80"
          )}
        >
          ENG
        </button>
        <button
          onClick={() => handleLocaleChange('es')}
          className={cn(
            "relative z-10 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200",
            locale === 'es' 
              ? "es-gradient font-medium" 
              : "text-foreground/60 hover:text-foreground/80"
          )}
        >
          ES
        </button>
      </div>
    </div>
  )
}
