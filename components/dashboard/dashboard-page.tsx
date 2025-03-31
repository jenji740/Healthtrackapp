"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HealthMetricCards from "./health-metric-cards"
import AddHealthDataForm from "./add-health-data-form"
import HealthMetricChart from "./health-metric-chart"


export default function DashboardPage() {
  const [showAddData, setShowAddData] = useState(false)

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold">HealthTrack</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button onClick={() => setShowAddData(!showAddData)} variant={showAddData ? "secondary" : "default"}>
            {showAddData ? "Close Form" : "Add Health Data"}
          </Button>
        </div>
      </header>
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
                <HealthMetricChart metric="steps" color="#22c55e" />
              </TabsContent>
              <TabsContent value="heart" className="h-80">
                <HealthMetricChart metric="heartRate" color="#ef4444" />
              </TabsContent>
              <TabsContent value="sleep" className="h-80">
                <HealthMetricChart metric="sleep" color="#8b5cf6" />
              </TabsContent>
              <TabsContent value="water" className="h-80">
                <HealthMetricChart metric="water" color="#3b82f6" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

