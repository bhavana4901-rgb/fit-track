// UserContext
// - user profile data (name, email, avatar, bio, etc.)
// - updateProfile()
// - Persist to localStorage

import { createContext } from 'react'

export const UserContext = createContext(null)

export function UserProvider({ children }) {
  // To be implemented in Commit 5
  return <>{children}</>
}
