// ThemeContext
// - theme state (light/dark)
// - toggleTheme()
// - Persist to localStorage

import { createContext } from 'react'

export const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  // To be implemented in Commit 5
  return <>{children}</>
}
