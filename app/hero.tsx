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
      <div className="relative min-h-[90vh] w-full overflow-hidden bg-[#1B1B1B]">
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

         {/* Content Container */}
         <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col-reverse items-center justify-center gap-8 px-4 py-16 lg:flex-row lg:justify-between lg:gap-0">
            {/* Text Content */}
            <div className={cn(
               "relative z-10 max-w-2xl text-center lg:text-left",
               mounted ? "animate-in fade-in-50 duration-1000" : "opacity-0"
            )}>
               <h1 className="mb-2">
                  <span className="block text-4xl font-bold text-green-500 sm:text-5xl md:text-6xl">
                     Canopy Charts
                  </span>
                  <span className="mt-2 block text-3xl font-bold text-gray-200 sm:text-4xl md:text-5xl lg:mt-4">
                     Data Visualization
                     <br />
                     Made Simple
                  </span>
               </h1>
               <p className="mb-8 mt-4 text-lg text-gray-400 sm:text-xl md:text-2xl">
                  Transform your data into beautiful, interactive visualizations
               </p>
               <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  <Button
                     size="lg"
                     className="bg-green-600 text-lg hover:bg-green-700"
                  >
                     Get Started
                  </Button>
                  <Button
                     size="lg"
                     variant="secondary"
                     className="bg-[#2A2A2A] text-lg text-gray-300 hover:bg-[#353535]"
                  >
                     View on GitHub
                  </Button>
               </div>
            </div>

            {/* Logo Container */}
            <div className={cn(
               "relative w-full max-w-[300px] lg:absolute lg:right-4 lg:top-1/2 lg:max-w-[500px] lg:-translate-y-1/2 xl:right-8",
               mounted ? "animate-in fade-in-50 slide-in-from-right-20 duration-1000" : "opacity-0"
            )}>
               <div className="relative aspect-square">
                  {/* Glow effect */}
                  <div className="absolute inset-0 animate-pulse rounded-full bg-green-500/20 blur-3xl" />
                  {/* Logo Component */}
                  <Logo />
               </div>
            </div>
         </div>
      </div>
   )
}