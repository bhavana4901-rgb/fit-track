// AuthContext
// - login(email, password)
// - logout()
// - user state
// - loading state
// - error state

import { createContext } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // To be implemented in Commit 5
  return <>{children}</>
}
