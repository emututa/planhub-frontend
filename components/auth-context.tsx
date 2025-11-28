"use client"

import { createContext } from "react"

interface User {
  id: string
  name: string
  email: string
}

export const AuthContext = createContext<{
  user: User | null
  setUser: (user: User | null) => void
}>({
  user: null,
  setUser: () => {},
})
