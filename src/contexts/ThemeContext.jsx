import { createContext, useState, useCallback } from 'react'
import { storage } from '../utils/localStorage'

export const ThemeContext = createContext(null)

function applyTheme(isDark) {
  const root = document.documentElement
  root.style.setProperty('color-scheme', isDark ? 'dark' : 'light')
  if (isDark) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

function getSavedTheme() {
  const saved = storage.getItem('fittrack_theme')
  if (saved === 'dark') return true
  if (saved === 'light') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const dark = getSavedTheme()
    applyTheme(dark)
    return dark
  })

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev
      applyTheme(next)
      storage.setItem('fittrack_theme', next ? 'dark' : 'light')
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
