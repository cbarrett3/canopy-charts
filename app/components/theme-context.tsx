'use client'

import { createContext, useContext, useState } from 'react'

interface ThemeContextType {
  themeColor: string
  setThemeColor: (color: string) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  themeColor: '#6366f1',
  setThemeColor: () => {},
})

export const useThemeColor = () => useContext(ThemeContext)

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
  const [themeColor, setThemeColor] = useState('#6366f1')

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  )
}
