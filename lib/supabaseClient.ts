// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    // Only use localStorage in the browser to avoid SSR issues
    storage: typeof window !== "undefined" ? localStorage : undefined,
  },
});

// For development only: Expose supabase on window for debugging
if (typeof window !== "undefined") {
  // @ts-ignore
  window.supabase = supabase;
}
