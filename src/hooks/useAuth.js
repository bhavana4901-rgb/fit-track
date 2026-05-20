// useAuth hook
// - Access AuthContext
// - Get current user, login, logout
// - Usage: const { user, login, logout } = useAuth()

import { useContext } from 'react'
import { AuthContext } from '../contexts'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
