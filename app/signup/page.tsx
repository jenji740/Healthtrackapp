// src/app/signup/page.tsx

import SignupForm from "@/components/signup-form"
import { Metadata } from "next"
// import SignupForm from "@/components/auth/signup-form"


export const metadata: Metadata = {
  title: "HealthTrack | Sign Up",
  description: "Create your HealthTrack account",
}

export default function SignupPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <SignupForm />
    </div>
  )
}