"use client"

import { Navbar } from "@/app/navbar"
import { Hero } from "@/app/hero"
import { Features } from "@/app/features"
import { Footer } from "@/app/footer"
import { MouseTrail } from "@/app/components/mouse-trail"

export default function Home() {
   return (
      <div className="relative min-h-screen bg-[#1B1B1B]">
         <MouseTrail />
         <Navbar />
         <main>
            <Hero />
            <Features />
         </main>
         <Footer />
      </div>
   )
}
