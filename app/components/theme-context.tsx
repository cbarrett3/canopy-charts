'use client'

import { createContext, useContext } from 'react'

interface ThemeContextType {
  themeColor: string
  setThemeColor: (color: string) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  themeColor: '#6366f1',
  setThemeColor: () => {},
})

export const useThemeColor = () => useContext(ThemeContext)
