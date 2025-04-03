"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HealthMetricCards from "./health-metric-cards"
import AddHealthDataForm from "./add-health-data-form"
import HealthMetricChart from "./health-metric-chart"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { supabase } from "@/lib/supabaseClient"
import { toast } from "sonner"

export default function DashboardPage() {
  const [showAddData, setShowAddData] = useState(false)
  const { session } = useAuth()
  const userEmail = session?.user?.email || "User"
  const router = useRouter()

  async function handleLogout() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error("Logout failed", { description: error.message })
    } else {
      toast.success("Logged out successfully")
      router.push("/login")
    }
  }

  // In this example, "Switch Account" is implemented as a logout.
  const handleSwitchAccount = () => {
    handleLogout()
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        {/* Left side: HealthTrack link to home */}
        <Link href="/" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold">HealthTrack</h1>
        </Link>
        {/* Right side: User email dropdown and Add Health Data button */}
        <div className="ml-auto flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-sm font-medium underline hover:no-underline">
                {userEmail}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2">
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
          <Button
            onClick={() => setShowAddData(!showAddData)}
            variant={showAddData ? "secondary" : "default"}
          >
            {showAddData ? "Close Form" : "Add Health Data"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <HealthMetricCards />
        </div>

        {showAddData && (
          <Card className="border-2 border-primary/20 shadow-md">
            <CardHeader>
              <CardTitle>Add New Health Data</CardTitle>
              <CardDescription>Record your latest health metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <AddHealthDataForm onComplete={() => setShowAddData(false)} />
            </CardContent>
          </Card>
        )}

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Health Trends</CardTitle>
            <CardDescription>View your progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="steps">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="steps">Steps</TabsTrigger>
                <TabsTrigger value="heart">Heart Rate</TabsTrigger>
                <TabsTrigger value="sleep">Sleep</TabsTrigger>
                <TabsTrigger value="water">Water</TabsTrigger>
              </TabsList>
              <TabsContent value="steps" className="h-80">
                <HealthMetricChart metric="steps" color="#22c55e" goal={10000} />
              </TabsContent>
              <TabsContent value="heart" className="h-80">
                <HealthMetricChart metric="heartRate" color="#ef4444" goal={70} />
              </TabsContent>
              <TabsContent value="sleep" className="h-80">
                <HealthMetricChart metric="sleep" color="#8b5cf6" goal={8} />
              </TabsContent>
              <TabsContent value="water" className="h-80">
                <HealthMetricChart metric="water" color="#3b82f6" goal={2000} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
