"use client"

import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartDataset,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

// Generate mock data for the past 7 days
const generateMockData = (metric: string) => {
  const today = new Date()
  const labels = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (6 - i))
    return date.toLocaleDateString("en-US", { weekday: "short" })
  })

  let data: number[]
  switch (metric) {
    case "steps":
      data = [7823, 9102, 8432, 10254, 7654, 9876, 8543]
      break
    case "heartRate":
      data = [72, 68, 70, 65, 72, 68, 66]
      break
    case "sleep":
      data = [7.2, 6.8, 8.1, 7.5, 6.9, 7.8, 7.5]
      break
    case "water":
      data = [1600, 1800, 2100, 1750, 1900, 2000, 1800]
      break
    default:
      data = [0, 0, 0, 0, 0, 0, 0]
  }

  return { labels, data }
}

interface HealthMetricChartProps {
  metric: "steps" | "heartRate" | "sleep" | "water"
  color: string
}

export default function HealthMetricChart({ metric, color }: HealthMetricChartProps) {
  const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    const { labels, data } = generateMockData(metric)

    const dataset: ChartDataset<"line"> = {
      label: metric.charAt(0).toUpperCase() + metric.slice(1),
      data,
      borderColor: color,
      backgroundColor: `${color}20`,
      tension: 0.3,
      fill: true,
      borderWidth: 2,
    }

    setChartData({
      labels,
      datasets: [dataset],
    })
  }, [metric, color])

  if (!chartData) return <div>Loading chart...</div>

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  }

  return <Line data={chartData} options={options} />
}
