"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { motion } from "framer-motion"
import { Logo } from "@/app/_components/ui/logo"
import { useThemeColor } from "@/app/_components/providers/theme-context"
import * as d3 from 'd3'

export function Hero() {
   const [mounted, setMounted] = useState(false)
   const t = useTranslations('hero')
   const { themeColor } = useThemeColor()
   const locale = useLocale()
   const color = d3.color(themeColor)
   const lighterColor = d3.hsl(color).brighter(0.5).formatHex()
   const darkerColor = d3.hsl(color).darker(0.2).formatHex()

   useEffect(() => {
      setMounted(true)
   }, [])

   return (
      <div className="relative min-h-[calc(100vh-6rem)] lg:min-h-screen w-full overflow-visible bg-background dark:bg-[#1B1B1B]">
         <style jsx global>{`
          @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          .animate-floating {
            animation: floating 6s ease-in-out infinite;
          }
          @keyframes shine {
            to {
              background-position: 200% center;
            }
          }
          .chrome-gradient {
            background: linear-gradient(
              to right,
              ${themeColor},
              ${lighterColor},
              ${themeColor}
            );
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            background-size: 200% auto;
            animation: shine 8s linear infinite;
            text-shadow: 0 0 30px ${themeColor}4D;
          }
          .glow-text {
            background: linear-gradient(
              to right,
              #1E293B,
              #334155,
              #475569,
              #334155,
              #1E293B
            );
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            background-size: 200% auto;
            animation: shine 8s linear infinite;
            text-shadow: 
              0 0 20px rgba(71, 85, 105, 0.3),
              0 0 35px rgba(71, 85, 105, 0.2),
              0 0 50px rgba(71, 85, 105, 0.1);
          }
          .dark .glow-text {
            background: linear-gradient(
              to right,
              #94A3B8,
              #CBD5E1,
              #E2E8F0,
              #CBD5E1,
              #94A3B8
            );
            text-shadow: 
              0 0 20px rgba(203, 213, 225, 0.3),
              0 0 35px rgba(203, 213, 225, 0.2),
              0 0 50px rgba(203, 213, 225, 0.1);
          }
          .glow-pulse {
            animation: glow-pulse 2s ease-in-out infinite;
          }
          @keyframes glow-pulse {
            0%, 100% { filter: brightness(1) blur(10px); }
            50% { filter: brightness(1.2) blur(8px); }
          }
        `}</style>

         {/* Grid Background */}
         <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent dark:from-[#1B1B1B] dark:via-[#1B1B1B]/90 dark:to-transparent"
            />
            <div 
              className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent dark:from-[#1B1B1B] dark:via-transparent dark:to-transparent h-40"
            />
         </div>

         {/* Main Container */}
         <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] lg:min-h-screen w-full flex-col overflow-visible px-2 py-4 sm:px-4 sm:py-6 lg:max-w-none lg:flex-row lg:items-stretch mt-20 lg:mt-28">
            {/* Logo Container */}
            <div className={cn(
               "relative mb-0 flex w-full items-end justify-center overflow-visible px-4 lg:mb-0 lg:w-1/2 lg:items-center",
               mounted ? "animate-in fade-in-50 duration-1000 lg:slide-in-from-right-20" : "opacity-0"
            )}>
               <div className="relative aspect-square w-[180px] sm:w-[220px] md:w-[280px] lg:w-[95%] lg:max-w-[600px] overflow-visible">
                  {/* Glow effect */}
                  <div 
                    className="absolute inset-[-30%] md:inset-[-25%] animate-pulse rounded-full blur-[60px]" 
                    style={{ 
                      zIndex: 1, 
                      transform: 'translate3d(0, 0, 0)',
                      background: `${themeColor}33`
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
               "relative z-10 flex flex-col justify-start px-2 text-center sm:px-6 lg:w-1/2 lg:justify-center lg:px-8 lg:text-left xl:px-12",
               mounted ? "animate-in fade-in-50 duration-1000" : "opacity-0"
            )}>
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5 }}
               >
                 <motion.h1 
                   className="mb-2 relative"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: 0.2 }}
                 >
                    <motion.span
                      className={cn(
                        "block text-4xl font-bold tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-7xl",
                        "relative z-10 chrome-gradient"
                      )}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        opacity: { duration: 0.5 },
                        y: { duration: 0.5 },
                        scale: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      {t('title')}
                      <motion.div
                        className="absolute -inset-x-6 -inset-y-4 z-0 glow-pulse"
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{
                          background: `radial-gradient(circle, ${themeColor}33 0%, transparent 70%)`,
                        }}
                      />
                    </motion.span>
                    <motion.div
                      className="absolute -inset-x-4 -inset-y-2 z-0 hidden lg:block"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.1, 0.15, 0.1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        background: `radial-gradient(circle, ${themeColor}26 0%, transparent 70%)`,
                        filter: "blur(10px)"
                      }}
                    />
                 </motion.h1>

                 <div className="mt-4 lg:mt-6 max-w-lg mx-auto lg:mx-0 lg:max-w-2xl space-y-3 lg:space-y-4">
                   <motion.div
                     className="block text-xl sm:text-2xl md:text-3xl leading-relaxed"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: 0.6 }}
                   >
                     <span className="font-medium text-slate-800 dark:text-slate-200">{t('tagline.part1')}</span>
                     {" "}
                     <span className="text-slate-700 dark:text-slate-300">{t('tagline.part2')}</span>
                     {" "}
                     <span className="text-slate-600 dark:text-slate-400">{t('tagline.part3')}</span>
                   </motion.div>

                   <motion.div
                     className="flex flex-wrap gap-3 text-base sm:text-lg justify-center lg:justify-start"
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: 0.8 }}
                   >
                     {['beautiful', 'customizable', 'accessible', 'lightweight'].map((feature, index) => (
                       <motion.span
                         key={feature}
                         initial={{ opacity: 0, scale: 0.9 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ 
                           duration: 0.3,
                           delay: 1 + (index * 0.1),
                           ease: "easeOut"
                         }}
                         className={cn(
                           "inline-flex items-center px-3 py-1 rounded-full relative cursor-default",
                           "border-[2px] transform-gpu",
                           "transition-transform duration-200",
                           "dark:text-white"
                         )}
                         style={{
                           backgroundColor: `${themeColor}15`,
                           color: themeColor,
                           borderColor: `${themeColor}40`
                         }}
                         whileHover={{ 
                           scale: 1.05,
                           backgroundColor: `${themeColor}20`,
                           borderColor: themeColor,
                           transition: { 
                             duration: 0.1,
                             ease: "easeOut"
                           }
                         }}
                       >
                         <span className="relative z-10">{t(`features.${feature}`)}</span>
                       </motion.span>
                     ))}
                   </motion.div>

                   <motion.div
                     className="text-lg sm:text-xl text-zinc-700/90 dark:text-zinc-300/80 text-center lg:text-left"
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: 1.4 }}
                   >
                     {t('action')}
                   </motion.div>
                 </div>

                 <motion.div
                   className="mt-6 lg:mt-8 flex flex-wrap gap-3 justify-center lg:justify-start"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: 1.6 }}
                 >
                    <motion.div
                      className="relative group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <motion.div 
                        className="absolute -inset-[2px] rounded-lg blur-[3px]"
                        initial={{ opacity: 0.1 }}
                        whileHover={{ opacity: 0.3 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          background: themeColor,
                        }}
                      />
                      <Button
                        asChild
                        size="default"
                        style={{
                          background: themeColor,
                        }}
                        className="relative text-sm font-medium text-white shadow-sm hover:brightness-125 transition-all duration-200"
                      >
                        <Link href={`/${locale}/docs/line-chart`} className="flex items-center gap-2">
                          {t('create')}
                        </Link>
                      </Button>
                    </motion.div>

                    <motion.div
                      className="relative group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <motion.div 
                        className="absolute -inset-[2px] rounded-lg"
                        initial={{ opacity: 0.05 }}
                        whileHover={{ opacity: 0.2 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          background: themeColor,
                        }}
                      />
                      <Button
                        asChild
                        variant="outline"
                        size="default"
                        className="relative text-sm font-medium border-2 shadow-sm bg-background hover:bg-background/80 transition-all duration-200"
                        style={{
                          borderColor: `${themeColor}66`,
                          color: themeColor
                        }}
                      >
                        <Link href="/docs" className="flex items-center gap-2">
                          {t('learn')}
                        </Link>
                      </Button>
                    </motion.div>
                 </motion.div>
               </motion.div>
            </div>
         </div>
      </div>
   )
}