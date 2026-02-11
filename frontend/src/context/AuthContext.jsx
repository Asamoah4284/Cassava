import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getMe, getToken, setToken, setUser, getUser, clearAuth } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(() => getUser())
  const [loading, setLoading] = useState(!!getToken())

  const loadUser = useCallback(async () => {
    const token = getToken()
    if (!token) {
      setLoading(false)
      return
    }
    try {
      const u = await getMe(token)
      setUser(u)
      setUserState(u)
    } catch {
      clearAuth()
      setUserState(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  const setAuth = useCallback((token, userData) => {
    setToken(token)
    setUser(userData)
    setUserState(userData)
  }, [])

  const updateUser = useCallback((userData) => {
    setUser(userData)
    setUserState(userData)
  }, [])

  const logout = useCallback(() => {
    clearAuth()
    setUserState(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, setAuth, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
