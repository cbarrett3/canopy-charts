import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "./navbar"

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
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={`${spaceGrotesk.className} ${spaceGrotesk.variable} min-h-screen bg-background font-sans antialiased`}>
            <ThemeProvider
               attribute="class"
               defaultTheme="system"
               enableSystem
               disableTransitionOnChange
            >
               <Navbar />
               {children}
            </ThemeProvider>
         </body>
      </html>
   )
}