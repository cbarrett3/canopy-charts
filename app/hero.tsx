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
      <div className="relative min-h-screen w-full overflow-hidden bg-[#1B1B1B]">
         <style jsx>{`
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-floating {
          animation: floating 6s ease-in-out infinite;
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
               <h1 className="mb-2">
                  <span className="block text-3xl font-bold bg-[linear-gradient(90deg,#15803d,#22c55e,#4ade80,#22c55e,#15803d)] inline-block text-transparent bg-clip-text animate-shine sm:text-4xl md:text-5xl lg:text-6xl">
                     Canopy Charts
                  </span>
                  <span className="mt-2 block text-2xl font-bold text-gray-200 sm:text-3xl md:text-4xl lg:mt-4 lg:text-5xl">
                     Data Visualization
                     <br />
                     Made Simple
                  </span>
               </h1>
               <p className="mb-8 mt-6 text-base text-gray-400 sm:text-lg md:text-xl lg:text-2xl">
                  Beautiful and customizable D3.js components for React. Take creative control of your data.
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