import { Space_Grotesk } from "next/font/google"
import "./globals.css"

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
      <html lang="en" className={`dark ${spaceGrotesk.variable}`}>
         <body className={spaceGrotesk.className}>{children}</body>
      </html>
   )
}