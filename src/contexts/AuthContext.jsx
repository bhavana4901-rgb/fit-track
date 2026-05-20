import { createContext, useState, useEffect } from 'react'
import { storage } from '../utils/localStorage'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = storage.getItem('fittrack_user')
    if (savedUser) {
      setUser(savedUser)
    }
    setIsLoading(false)
  }, [])

  const login = (email, name) => {
    const userData = { email, name, id: Date.now() }
    setUser(userData)
    storage.setItem('fittrack_user', userData)
  }

  const logout = () => {
    setUser(null)
    storage.removeItem('fittrack_user')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
