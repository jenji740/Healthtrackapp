import Link from "next/link"
import { Heart, Activity, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-4 lg:px-6 h-16 border-b">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">HealthTrack</span>
        </Link>
        <nav className="flex gap-4">
          <Link
            href="#features"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Features
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm">Dashboard</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-1 items-center justify-center bg-gradient-to-b from-background to-muted py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
            Your Personal Health Journey Starts Here
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Track your health metrics, set goals, and visualize your progress with our advanced health tracking platform.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-24 lg:py-32 flex items-center justify-center">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="text-center">
        <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
          Features
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
          Everything You Need to Track Your Health
        </h2>
        <p className="mt-2 max-w-3xl mx-auto text-muted-foreground md:text-xl">
          Our platform provides all the tools you need to monitor and improve your health.
        </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3 justify-items-center">
        <div className="flex flex-col items-center rounded-lg border p-6 shadow-sm w-full max-w-sm">
          <Activity className="h-12 w-12 text-primary" />
          <h3 className="mt-4 text-xl font-bold">Activity Tracking</h3>
          <p className="mt-2 text-center text-muted-foreground">
            Monitor your daily steps, distance, and active minutes.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-lg border p-6 shadow-sm w-full max-w-sm">
          <Heart className="h-12 w-12 text-red-500" />
          <h3 className="mt-4 text-xl font-bold">Heart Rate Monitoring</h3>
          <p className="mt-2 text-center text-muted-foreground">
            Keep track of your heart rate throughout the day.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-lg border p-6 shadow-sm w-full max-w-sm">
          <TrendingUp className="h-12 w-12 text-green-500" />
          <h3 className="mt-4 text-xl font-bold">Progress Visualization</h3>
          <p className="mt-2 text-center text-muted-foreground">
            See your health trends over time with beautiful charts.
          </p>
        </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container px-4 md:px-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} HealthTrack. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
