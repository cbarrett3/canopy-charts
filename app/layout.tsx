'use client'

import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "./navbar"
import { ThemeContext } from './components/theme-context'
import { useState } from 'react'

const spaceGrotesk = Space_Grotesk({
   subsets: ["latin"],
   display: 'swap',
   variable: '--space-grotesk',
})

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   const [themeColor, setThemeColor] = useState('#6366f1')

   return (
      <html lang="en" suppressHydrationWarning>
         <head />
         <body className={`${spaceGrotesk.className} ${spaceGrotesk.variable} min-h-screen bg-background dark:bg-[#1B1B1B] font-sans antialiased`}>
            <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
               <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
               >
                  <Navbar />
                  {children}
               </ThemeProvider>
            </ThemeContext.Provider>
         </body>
      </html>
   )
}