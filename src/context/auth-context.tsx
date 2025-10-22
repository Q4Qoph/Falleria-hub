"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import apiClient from "@/lib/axios-client"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: "student" | "admin"
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken")
      if (token) {
        try {
          const response = await apiClient.get("/auth/me")
          setUser(response.data.user)
        } catch (error) {
          localStorage.removeItem("authToken")
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await apiClient.post("/auth/login", { email, password })
    localStorage.setItem("authToken", response.data.token)
    setUser(response.data.user)
  }

  const signup = async (firstName: string, lastName: string, email: string, password: string) => {
    const response = await apiClient.post("/auth/signup", { firstName, lastName, email, password })
    localStorage.setItem("authToken", response.data.token)
    setUser(response.data.user)
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
