"use client"

import { Activity, Heart, Moon, Droplets } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"

// Mock data - in a real app, this would come from a database or API
const initialHealthData = {
  steps: { current: 8432, goal: 10000, trend: "up" },
  heartRate: { current: 68, range: "60-100", trend: "stable" },
  sleep: { current: 7.5, goal: 8, trend: "down" },
  water: { current: 1800, goal: 2000, trend: "up" },
}

export default function HealthMetricCards() {
  const [healthData, setHealthData] = useState(initialHealthData)

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHealthData((prev) => ({
        ...prev,
        steps: {
          ...prev.steps,
          current: prev.steps.current + Math.floor(Math.random() * 10),
        },
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Steps</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{healthData.steps.current.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((healthData.steps.current / healthData.steps.goal) * 100)}% of daily goal
          </p>
        </CardContent>
        <CardFooter>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${Math.min(100, (healthData.steps.current / healthData.steps.goal) * 100)}%` }}
            />
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
          <Heart className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{healthData.heartRate.current} BPM</div>
          <p className="text-xs text-muted-foreground">Normal range: {healthData.heartRate.range} BPM</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sleep</CardTitle>
          <Moon className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{healthData.sleep.current} hrs</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((healthData.sleep.current / healthData.sleep.goal) * 100)}% of target
          </p>
        </CardContent>
        <CardFooter>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500"
              style={{ width: `${Math.min(100, (healthData.sleep.current / healthData.sleep.goal) * 100)}%` }}
            />
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Water Intake</CardTitle>
          <Droplets className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{healthData.water.current} ml</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((healthData.water.current / healthData.water.goal) * 100)}% of daily goal
          </p>
        </CardContent>
        <CardFooter>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${Math.min(100, (healthData.water.current / healthData.water.goal) * 100)}%` }}
            />
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

