import type { Metadata } from "next"
import DashboardPage from "@/components/dashboard/dashboard-page"

export const metadata: Metadata = {
  title: "HealthTrack | Dashboard",
  description: "Monitor and improve your health with advanced tracking",
}

export default function Dashboard() {
  return <DashboardPage />
}

