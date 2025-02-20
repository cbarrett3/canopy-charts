import { Hero } from "@/app/_components/ui/hero"
import { Features } from "@/app/_components/ui/features"
import { Footer } from "@/app/_components/layout/footer"
import { MouseTrail } from "@/app/_components/effects/mouse-trail"

export const Home = () => {
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
