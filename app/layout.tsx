'use client'

import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/app/_components/ui/theme-provider"
import { Navbar } from "@/app/_components/layout/navbar"
import { ThemeColorProvider } from '@/app/_components/providers/theme-context'
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
   return children;
}