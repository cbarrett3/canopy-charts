"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { motion } from "framer-motion"
import { Logo } from "@/app/_components/ui/logo"
import { useTheme } from "next-themes"
import { useThemeColor } from "@/app/_components/providers/theme-context"
import * as d3 from 'd3'

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('hero')
  const { theme } = useTheme()
  const locale = useLocale()
  const { themeColor } = useThemeColor()

  const getGlowOpacity = (darkOpacity: string, lightOpacity: string) => {
    if (!mounted) return darkOpacity
    return theme === 'dark' ? darkOpacity : lightOpacity
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-visible bg-zinc-950/[0.02] dark:bg-[#1B1B1B]">
      <style jsx global>{`
        .chrome-gradient {
          background: linear-gradient(
            to right,
            ${themeColor},
            ${themeColor}CC,
            ${themeColor}
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          background-size: 200% auto;
          animation: shine 8s linear infinite;
          text-shadow: none;
          padding-bottom: 0.1em;
        }
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
      `}</style>

      {/* Grid Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-t from-zinc-950/[0.02] via-zinc-950/[0.01] to-transparent dark:from-[#1B1B1B] dark:via-[#1B1B1B]/90 dark:to-transparent"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-zinc-950/[0.02] via-transparent to-transparent dark:from-[#1B1B1B] dark:via-transparent dark:to-transparent h-40"
        />
      </div>

      {/* Main Container */}
      <div className="relative mx-auto flex h-full w-full flex-col overflow-visible px-2 py-4 sm:px-4 sm:py-6 lg:max-w-none lg:flex-row lg:items-center pt-24 lg:pt-28">
        {/* Logo Container */}
        <div className={cn(
          "relative flex w-full items-center justify-center overflow-visible px-4 lg:mb-0 lg:w-1/2 lg:items-center",
          mounted ? "animate-in fade-in-50 duration-1000 lg:slide-in-from-right-20" : "opacity-0"
        )}>
          <div className="relative aspect-square w-[220px] sm:w-[280px] md:w-[320px] lg:w-[95%] lg:max-w-[600px] overflow-visible">
            {/* Glow effect */}
            <div 
              className="absolute inset-[-30%] md:inset-[-25%] animate-pulse rounded-full blur-[60px]" 
              style={{ 
                zIndex: 1, 
                transform: 'translate3d(0, 0, 0)',
                background: `${themeColor}${getGlowOpacity('33', '15')}`
              }} 
            />
            {/* Logo Component */}
            <Logo 
              className="h-full w-full relative" 
              style={{
                zIndex: 2,
                transform: 'translate3d(0, 0, 0)'
              }} 
            />
          </div>
        </div>

        {/* Text Content */}
        <div className={cn(
          "relative z-10 flex flex-col px-2 text-center sm:px-6 lg:w-1/2 lg:justify-center lg:px-8 lg:text-left xl:px-12",
          mounted ? "animate-in fade-in-50 duration-1000" : "opacity-0"
        )}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="block text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight chrome-gradient mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t('title')}
            </motion.h1>

            <motion.div
              className="block text-2xl sm:text-3xl lg:text-4xl leading-relaxed mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <span className="font-medium text-zinc-900 dark:text-slate-200">{t('tagline.part1')}</span>
              {" "}
              <span className="text-zinc-800 dark:text-slate-300">{t('tagline.part2')}</span>
              {" "}
              <span className="text-zinc-700 dark:text-slate-400">{t('tagline.part3')}</span>
            </motion.div>

            <motion.div
              className="text-xl sm:text-2xl text-zinc-800/90 dark:text-zinc-300/80 mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              {t('action')}
            </motion.div>

            <motion.div
              className="mt-8 lg:mt-10 flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-lg blur-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: themeColor,
                  }}
                />
                <Button
                  size="lg"
                  style={{
                    background: themeColor,
                  }}
                  className="relative text-base font-medium text-white shadow-sm hover:brightness-125 transition-all duration-200"
                >
                  <Link href={`/${locale}/docs/line-chart`} className="flex items-center gap-2">
                    {t('create')}
                  </Link>
                </Button>
              </div>

              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-lg blur-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  whileHover={{ opacity: 0.2 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: themeColor,
                  }}
                />
                <Button
                  variant="outline"
                  size="lg"
                  className="relative text-base font-medium border-2 shadow-sm bg-background hover:bg-background/80 transition-all duration-200"
                  style={{
                    borderColor: `${themeColor}66`,
                    color: themeColor
                  }}
                >
                  <Link href="/docs" className="flex items-center gap-2">
                    {t('learn')}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}