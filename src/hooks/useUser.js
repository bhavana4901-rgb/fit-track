// useUser hook
// - Access UserContext
// - Get user profile, updateProfile
// - Usage: const { profile, updateProfile } = useUser()

import { useContext } from 'react'
import { UserContext } from '../contexts'

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}
