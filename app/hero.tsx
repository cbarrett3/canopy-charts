"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Logo } from "@/app/logo"

export function Hero() {
   const [mounted, setMounted] = useState(false)

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

         {/* Main Container */}
         <div className="relative mx-auto flex min-h-screen w-full flex-col overflow-hidden px-2 py-4 sm:px-4 sm:py-6 lg:max-w-none lg:flex-row lg:items-stretch">
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
                  <span className="chrome-gradient block text-4xl font-extrabold tracking-tight leading-relaxed pb-4 sm:text-5xl md:text-6xl lg:text-7xl">
                     Canopy Charts
                  </span>
                  <span className="mt-6 block text-2xl font-bold text-foreground dark:text-gray-200 sm:text-3xl md:text-4xl lg:mt-8 lg:text-5xl">
                     Data Visualization
                     <br />
                     Reimagined
                     <br />
                  </span>
               </h1>
               <p className="mb-8 mt-6 text-base text-gray-400 sm:text-lg md:text-xl lg:text-2xl">
                  Beautiful and customizable D3.js visuals for React. Accessible. Lightweight. Copy, paste, customize.
               </p>
               <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                  <Button
                     size="lg"
                     className="bg-green-600 text-base sm:text-lg hover:bg-green-700"
                  >
                     Get Started
                  </Button>
                  <Button
                     size="lg"
                     variant="secondary"
                     className="bg-[#2A2A2A] text-base sm:text-lg text-gray-300 hover:bg-[#353535]"
                  >
                     View on GitHub
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}