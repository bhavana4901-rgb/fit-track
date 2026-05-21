import { createContext, useState, useEffect } from 'react'
import { storage } from '../utils/localStorage'
export const UserContext = createContext(null)
export function UserProvider({ children }) {
  const [profile, setProfile] = useState(null)
  useEffect(() => {
    const savedProfile = storage.getItem('fittrack_profile')
    if (savedProfile) {
      setProfile(savedProfile)
    }
  }, [])
  const updateProfile = (newProfile) => {
    setProfile(newProfile)
    storage.setItem('fittrack_profile', newProfile)
  }
  return (
    <UserContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserContext.Provider>
  )
}
