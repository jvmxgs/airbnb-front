"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = ({ data }) => {
    setUser(data.user)
    setToken(data.token)
    setIsLoggedIn(true)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
    setIsLoggedIn(false)
  }

  const contextValue = {
    user,
    token,
    isLoggedIn,
    login,
    logout
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = JSON.parse(localStorage.getItem('user'))

    if (storedToken) {
      setToken(storedToken)
      setUser(storedUser)
      setIsLoggedIn(true)
    }
  }, [])

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
