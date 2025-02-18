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
      <div className="relative min-h-screen w-full overflow-visible bg-background dark:bg-[#1B1B1B]">
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
          .glow-text {
            background: linear-gradient(
              to right,
              #22c55e,
              #4ade80,
              #86efac,
              #4ade80,
              #22c55e
            );
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            background-size: 200% auto;
            animation: shine 8s linear infinite;
            text-shadow: 
              0 0 20px rgba(34, 197, 94, 0.3),
              0 0 35px rgba(34, 197, 94, 0.2),
              0 0 50px rgba(34, 197, 94, 0.1);
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
         <div className="relative mx-auto flex min-h-screen w-full flex-col overflow-visible px-2 py-4 sm:px-4 sm:py-6 lg:max-w-none lg:flex-row lg:items-stretch mt-28">
            {/* Logo Container - Moved above text for mobile */}
            <div className={cn(
               "relative mb-0 flex w-full items-end justify-center overflow-visible px-4 lg:mb-0 lg:w-1/2 lg:items-center",
               mounted ? "animate-in fade-in-50 duration-1000 lg:slide-in-from-right-20" : "opacity-0"
            )}>
               <div className="relative aspect-square w-[200px] sm:w-[250px] md:w-[300px] lg:w-[95%] lg:max-w-[600px] overflow-visible">
                  {/* Glow effect */}
                  <div 
                    className="absolute inset-[-30%] md:inset-[-25%] animate-pulse rounded-full bg-green-500/10 blur-[60px]" 
                    style={{ zIndex: 1, transform: 'translate3d(0, 0, 0)' }} 
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
                        "relative z-10 glow-text"
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
                          background: "radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%)",
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
                        background: "radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%)",
                        filter: "blur(10px)"
                      }}
                    />
                 </motion.h1>

                 <div className="mt-6 max-w-lg mx-auto lg:mx-0 lg:max-w-2xl space-y-4">
                   <motion.div
                     className="block text-xl sm:text-2xl md:text-3xl text-zinc-800/90 dark:text-zinc-200/90 leading-relaxed"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: 0.6 }}
                   >
                     <span className="text-green-600 dark:text-green-400 font-medium">{t('tagline.part1')}</span>
                     {" "}
                     <span className="text-green-600/90 dark:text-green-400/90">{t('tagline.part2')}</span>
                     {" "}
                     <span className="text-green-600/80 dark:text-green-400/80">{t('tagline.part3')}</span>
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
                         className="inline-flex items-center bg-green-500/10 px-3 py-1 rounded-full text-green-700 dark:text-green-500 relative group/tag cursor-default"
                         initial={{ opacity: 0, scale: 0.9 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ 
                           duration: 0.3,
                           delay: 1 + (index * 0.1),
                           ease: "easeOut"
                         }}
                         whileHover={{ scale: 1.05 }}
                       >
                         <div className="absolute -inset-[1px] rounded-full border-[1px] border-green-500/0 transition-all duration-300 group-hover/tag:border-green-500/40" />
                         <div className="absolute inset-0 rounded-full bg-green-500/0 group-hover/tag:bg-green-500/5 transition-all duration-300" />
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
                   className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: 1.6 }}
                 >
                    <motion.div
                      className="relative group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="absolute -inset-[3px] rounded-lg bg-gradient-to-r from-green-400/40 to-green-500/40 opacity-0 group-hover:opacity-100 blur-md transition-all duration-300" />
                      <div className="absolute -inset-[2px] rounded-lg border-2 border-green-500/0 group-hover:border-green-500/50 transition-all duration-300" />
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500/0 to-green-400/0 group-hover:from-green-500/10 group-hover:to-green-400/10 transition-all duration-300" />
                      <Button
                        asChild
                        size="lg"
                        className="relative bg-gradient-to-r from-green-800 to-green-700 hover:from-green-700 hover:to-green-600 text-base font-semibold text-white shadow-sm"
                      >
                        <Link href="/editor" className="flex items-center gap-2">
                          {t('create')}
                        </Link>
                      </Button>
                    </motion.div>

                    <motion.div
                      className="relative group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="absolute -inset-[3px] rounded-lg bg-gradient-to-r from-green-400/30 to-green-500/30 opacity-0 group-hover:opacity-100 blur-md transition-all duration-300" />
                      <div className="absolute -inset-[2px] rounded-lg border-2 border-green-400/0 group-hover:border-green-400/40 transition-all duration-300" />
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-400/0 to-green-300/0 group-hover:from-green-400/10 group-hover:to-green-300/10 transition-all duration-300" />
                      <Button
                        asChild
                        size="lg"
                        className="relative bg-gradient-to-r from-[#064e3b] to-[#065f46] hover:from-[#065f46] hover:to-[#047857] text-base font-semibold text-white shadow-sm"
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