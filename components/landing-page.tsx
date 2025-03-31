import Link from "next/link"
import { Heart, Activity, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">HealthTrack</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
        </nav>
        <div className="ml-4 flex items-center gap-2">
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
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Your Personal Health Journey Starts Here
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Track your health metrics, set goals, and visualize your progress with our health tracking platform.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/dashboard">
                  <Button size="lg" className="px-8">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto flex items-center justify-center">
              <div className="rounded-lg bg-muted p-8 shadow-lg">
                <div className="flex flex-col space-y-2 text-center">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold">Track Your Health</h2>
                    <p className="text-sm text-muted-foreground">Monitor steps, heart rate, sleep, and more</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Everything You Need to Track Your Health
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Our platform provides all the tools you need to monitor and improve your health.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Activity className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Activity Tracking</h3>
              <p className="text-center text-muted-foreground">
                Monitor your daily steps, distance, and active minutes.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Heart className="h-12 w-12 text-red-500" />
              <h3 className="text-xl font-bold">Heart Rate Monitoring</h3>
              <p className="text-center text-muted-foreground">Keep track of your heart rate throughout the day.</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <TrendingUp className="h-12 w-12 text-green-500" />
              <h3 className="text-xl font-bold">Progress Visualization</h3>
              <p className="text-center text-muted-foreground">
                See your health trends over time with beautiful charts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 border-t mt-auto">
        <div className="container px-4 md:px-6">
          <div className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} HealthTrack. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

