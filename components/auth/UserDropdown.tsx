"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContext"  // our global auth provider

export default function UserDropdown() {
  const router = useRouter()
  const { session } = useAuth()

  // Handler to log the user out
  async function handleLogout() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error("Error logging out", { description: error.message })
    } else {
      toast.success("Logged out successfully")
      router.push("/login")
    }
  }

  // In this example, "Switch Account" is just a logout so the user can log in again with a different account.
  function handleSwitchAccount() {
    handleLogout()
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="flex items-center">
          {session && session.user.email ? session.user.email : "Account"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div className="flex flex-col space-y-2">
          <button onClick={handleLogout} className="text-left hover:underline">
            Logout
          </button>
          <button onClick={handleSwitchAccount} className="text-left hover:underline">
            Switch Account
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
