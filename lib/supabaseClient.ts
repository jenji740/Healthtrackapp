// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Ensure the session persists
    // Only use localStorage in the browser
    storage: typeof window !== "undefined" ? localStorage : undefined,
  },
})

// For development only: expose supabase on window so you can test in the console
if (typeof window !== "undefined") {
  // @ts-ignore
  window.supabase = supabase
}

