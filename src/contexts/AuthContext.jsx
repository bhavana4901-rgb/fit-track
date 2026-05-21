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
  const login = (email, name, avatar = null) => {
    const userData = { 
      email, 
      name, 
      avatar,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    setUser(userData)
    storage.setItem('fittrack_user', userData)
  }
  const logout = () => {
    setUser(null)
    storage.removeItem('fittrack_user')
  }
  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    storage.setItem('fittrack_user', updatedUser)
  }
  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}
