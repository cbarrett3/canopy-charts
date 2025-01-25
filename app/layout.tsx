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
   return children;
}