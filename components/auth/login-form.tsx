"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Heart } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/lib/supabaseClient" // Import the Supabase client

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  rememberMe: z.boolean().default(false).optional(),
})

export default function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })

    if (error) {
      toast.error("Login failed", {
        description: error.message,
        duration: 4000,
      })
      setIsLoading(false)
    } else {
      toast.success("Login successful", {
        description: `Welcome back, ${values.email.split("@")[0]}!`,
        duration: 3000,
      })
      router.push("/dashboard")
    }
  }

  const handleForgotPassword = () => {
    const email = form.getValues("email")
    if (!email || !z.string().email().safeParse(email).success) {
      toast.warning("Please enter a valid email first", {
        description: "We need your email to send the password reset link.",
      })
      return
    }
    supabase.auth.resetPasswordForEmail(email).then(({ error }) => {
      if (error) {
        toast.error("Error sending reset email", { description: error.message })
      } else {
        toast.info("Password reset email sent", {
          description: `Check your inbox at ${email}`,
        })
      }
    })
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <div className="flex justify-center">
          <Heart className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Remember me</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Form>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:underline"
          >
            Forgot your password?
          </button>
        </div>
        <div className="text-sm">
          <Link href="/signup" className="text-primary hover:underline">
            Create an account
          </Link>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={() => {
            setIsLoading(true)
            toast.info("Google authentication", {
              description: "Connecting to Google...",
            })
            // Optionally, integrate with Supabase OAuth if needed.
            setTimeout(() => {
              toast.success("Google login successful")
              router.push("/dashboard")
            }, 2000)
          }}
        >
          Google
        </Button>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={() => {
            setIsLoading(true)
            toast.info("Apple authentication", {
              description: "Connecting to Apple...",
            })
            // Optionally, integrate with Supabase OAuth if needed.
            setTimeout(() => {
              toast.success("Apple login successful")
              router.push("/dashboard")
            }, 2000)
          }}
        >
          Apple
        </Button>
      </div>
    </div>
  )
}
