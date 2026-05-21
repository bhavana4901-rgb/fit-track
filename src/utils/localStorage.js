export const storage = {
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  },
  getItem: (key) => {
    try {
      const item = localStorage.getItem(key)
      if (!item) return null
      try {
        return JSON.parse(item)
      } catch {
        return item
      }
    } catch (error) {
      console.error('Failed to read from localStorage:', error)
      return null
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Failed to remove from localStorage:', error)
    }
  },
  clearAll: () => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Failed to clear localStorage:', error)
    }
  }
}
