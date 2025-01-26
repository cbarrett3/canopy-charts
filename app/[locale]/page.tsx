"use client"

import { Hero } from "@/app/_components/ui/hero"
import { Features } from "@/app/_components/ui/features"
import { Footer } from "@/app/_components/layout/footer"
import { MouseTrail } from "@/app/_components/effects/mouse-trail"
import { Navbar } from "@/app/_components/layout/navbar"
import { useTranslations } from 'next-intl'

export default function LocalePage() {
   return (
      <div className="relative min-h-screen bg-background dark:bg-[#1B1B1B] overflow-x-hidden">
         <Navbar />
         <MouseTrail />
         <main className="w-full">
            <Hero />
            <Features />
         </main>
         <Footer />
      </div>
   )
}
