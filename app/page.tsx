import LandingPage from "@/components/landing-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "HealthTrack | Your Personal Health Companion",
  description: "Monitor and improve your health with advanced tracking and insights",
}

export default function Home() {
  return <LandingPage />
}
