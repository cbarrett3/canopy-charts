"use client"

import { Hero } from "@/app/hero"
import { Features } from "@/app/features"
import { Footer } from "@/app/footer"
import { MouseTrail } from "@/app/components/mouse-trail"

export default function Home() {
   return (
      <div className="relative min-h-screen bg-background dark:bg-[#1B1B1B] overflow-x-hidden">
         <MouseTrail />
         <main className="w-full">
            <Hero />
            <Features />
         </main>
         <Footer />
      </div>
   )
}
