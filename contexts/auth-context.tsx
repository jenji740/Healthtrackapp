"use client"
import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { supabase } from "@/lib/supabaseClient"

interface AuthContextProps {
  session: any
}

const AuthContext = createContext<AuthContextProps>({ session: null })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    // Fetch the current session when the component mounts
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    // Cleanup subscription on unmount
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
