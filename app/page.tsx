import { Navbar } from "@/app/navbar"
import { Hero } from "@/app/hero"
import { Features } from "@/app/features"
import { Footer } from "@/app/footer"

export default function Home() {
   return (
      <div className="min-h-screen bg-[#1B1B1B]">
         <Navbar />
         <main>
            <Hero />
            <Features />
         </main>
         <Footer />
      </div>
   )
}

