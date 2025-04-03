"use client"

import { Activity, Moon, Droplets, Apple } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data - in a real app, this would come from a database or API
const weeklyGoals = [
  {
    id: 1,
    name: "Steps",
    current: 52450,
    target: 70000,
    icon: Activity,
    color: "bg-green-500",
  },
  {
    id: 2,
    name: "Sleep",
    current: 49,
    target: 56,
    icon: Moon,
    color: "bg-purple-500",
    unit: "hours",
  },
  {
    id: 3,
    name: "Water",
    current: 12000,
    target: 14000,
    icon: Droplets,
    color: "bg-blue-500",
    unit: "ml",
  },
  {
    id: 4,
    name: "Calories",
    current: 13500,
    target: 14000,
    icon: Apple,
    color: "bg-orange-500",
  },
]

export default function WeeklyGoalsProgress() {
  return (
    <div className="space-y-6">
      {weeklyGoals.map((goal) => {
        const progress = Math.min(100, Math.round((goal.current / goal.target) * 100))
        const Icon = goal.icon

        return (
          <div key={goal.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{goal.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {goal.current.toLocaleString()}
                {goal.unit ? ` ${goal.unit}` : ""} / {goal.target.toLocaleString()}
                {goal.unit ? ` ${goal.unit}` : ""}
              </span>
            </div>
            <div className="space-y-1">
              <Progress value={progress} className={`h-2 ${goal.color}`} />
              <p className="text-xs text-right text-muted-foreground">{progress}% complete</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
