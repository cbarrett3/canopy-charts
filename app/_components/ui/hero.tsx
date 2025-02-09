"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { motion } from "framer-motion"
import { Logo } from "@/app/_components/ui/logo"

export function Hero() {
   const [mounted, setMounted] = useState(false)
   const t = useTranslations('hero')

   useEffect(() => {
      setMounted(true)
   }, [])

   return (
      <div className="relative min-h-screen w-full overflow-hidden bg-background dark:bg-[#1B1B1B]">
         <style jsx>{`
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
            #064e3b,
            #059669,
            #10b981,
            #34d399,
            #6ee7b7,
            #34d399,
            #10b981,
            #059669,
            #064e3b
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          background-size: 200% auto;
          animation: shine 8s linear infinite;
          text-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
        }
      `}</style>

         {/* Grid Background */}
         <div className="absolute inset-0 mt-20">
            <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.03] bg-[bottom_1px_center] dark:[mask-image:linear-gradient(transparent,black)]" />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-background via-transparent to-transparent dark:from-[#1B1B1B]" />
         </div>

         {/* Main Container */}
         <div className="relative mx-auto flex min-h-screen w-full flex-col overflow-hidden px-2 py-4 sm:px-4 sm:py-6 lg:max-w-none lg:flex-row lg:items-stretch mt-20">
            {/* Logo Container - Moved above text for mobile */}
            <div className={cn(
               "relative mb-0 flex w-full items-end justify-center overflow-visible px-4 lg:mb-0 lg:w-1/2 lg:items-center",
               mounted ? "animate-in fade-in-50 duration-1000 lg:slide-in-from-right-20" : "opacity-0"
            )}>
               <div className="relative aspect-square w-[200px] sm:w-[250px] md:w-[300px] lg:w-[95%] lg:max-w-[600px]">
                  {/* Glow effect */}
                  <div className="absolute inset-[-10%] md:inset-[10%] animate-pulse rounded-full bg-green-500/20 blur-3xl" />
                  {/* Logo Component */}
                  <Logo className="h-full w-full" />
               </div>
            </div>

            {/* Text Content */}
            <div className={cn(
               "relative z-10 flex flex-col justify-start px-2 text-center sm:px-6 lg:w-1/2 lg:justify-center lg:px-8 lg:text-left xl:px-12",
               mounted ? "animate-in fade-in-50 duration-1000" : "opacity-0"
            )}>
               <h1 className="mb-2 relative">
                  <motion.span
                    className={cn(
                      "block text-4xl font-extrabold tracking-tight leading-relaxed pb-4 sm:text-5xl md:text-6xl lg:text-7xl",
                      "bg-clip-text text-transparent relative z-10"
                    )}
                    style={{
                      WebkitBackgroundClip: "text",
                      backgroundImage: "linear-gradient(to right, #22c55e, #4ade80, #86efac, #4ade80, #22c55e)",
                      backgroundSize: "200% auto"
                    }}
                    animate={{
                      backgroundPosition: ["0% center", "200% center"]
                    }}
                    transition={{
                      duration: 8,
                      ease: "linear",
                      repeat: Infinity
                    }}
                  >
                    {t('title')}
                  </motion.span>
                  <motion.span 
                    className={cn(
                      "mt-6 block text-2xl font-bold sm:text-3xl md:text-4xl lg:mt-8 lg:text-5xl",
                      "bg-clip-text text-transparent relative z-10"
                    )}
                    style={{
                      WebkitBackgroundClip: "text",
                      backgroundImage: "linear-gradient(to right, hsl(var(--foreground)), hsl(var(--muted-foreground)), hsl(var(--foreground)))",
                      backgroundSize: "200% auto",
                      filter: "drop-shadow(0 0 2px rgba(255,255,255,0.1))"
                    }}
                    animate={{
                      backgroundPosition: ["0% center", "200% center"]
                    }}
                    transition={{
                      duration: 12,
                      ease: "linear",
                      repeat: Infinity
                    }}
                  >
                    {t('subtitle.line1')}
                    <br />
                    {t('subtitle.line2')}
                  </motion.span>
                </h1>
               <motion.p 
                  className="mb-4 mt-4 text-base text-gray-400 sm:text-lg md:text-xl lg:text-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
               >
                  {t('description')}
               </motion.p>
               <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start mb-8">
                  <Button
                     size="lg"
                     asChild
                     className={cn(
                       "relative group px-8",
                       "bg-green-600 dark:bg-green-500",
                       "text-base sm:text-lg font-semibold text-green-50/90 dark:text-green-50/85",
                       "border border-green-500/30 dark:border-green-400/30",
                       "shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_2px_rgba(255,255,255,0.1)]",
                       "dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.15)]",
                       "hover:scale-[1.02] hover:shadow-[0_8px_24px_-4px_rgba(22,163,74,0.2),0_4px_12px_-2px_rgba(22,163,74,0.15),inset_0_1px_2px_rgba(255,255,255,0.1)]",
                       "dark:hover:shadow-[0_8px_24px_-4px_rgba(22,163,74,0.4),0_4px_12px_-2px_rgba(22,163,74,0.3),inset_0_1px_2px_rgba(255,255,255,0.15)]",
                       "transition-all duration-300 ease-out"
                     )}
                  >
                    <Link href="/docs">
                      <div className="absolute inset-0 rounded-lg bg-green-500/0 group-hover:bg-green-500/20 transition-all duration-300 blur-lg" />
                      <motion.span 
                        className="relative"
                        whileHover={{ 
                          scale: 1.05,
                          textShadow: "0 0 8px rgba(255,255,255,0.3)"
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {t('buttons.getStarted')}
                      </motion.span>
                    </Link>
                  </Button>
                  <Button
                     size="lg"
                     variant="secondary"
                     asChild
                     className={cn(
                       "relative group px-8",
                       "bg-[#2A2A2A] dark:bg-[#1B1B1B]",
                       "text-base sm:text-lg font-semibold text-gray-300",
                       "border border-white/5 dark:border-white/10",
                       "shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_2px_rgba(255,255,255,0.075)]",
                       "dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.05)]",
                       "hover:scale-[1.02] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12),0_4px_12px_-2px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.075)]",
                       "dark:hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.3),0_4px_12px_-2px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.05)]",
                       "hover:bg-[#353535] dark:hover:bg-[#252525]",
                       "transition-all duration-300 ease-out"
                     )}
                  >
                    <Link href="https://github.com/cbarrett3/canopy-charts">
                      <div className="absolute inset-0 rounded-lg bg-green-500/0 group-hover:bg-green-500/10 transition-all duration-300 blur-lg" />
                      <motion.span 
                        className="relative"
                        whileHover={{ 
                          scale: 1.05,
                          textShadow: "0 0 8px rgba(255,255,255,0.2)"
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {t('buttons.github')}
                      </motion.span>
                    </Link>
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}