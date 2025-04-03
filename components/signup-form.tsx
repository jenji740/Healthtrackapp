"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Heart } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/lib/supabaseClient"  // <-- Import supabase client
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import React from "react"

// Password strength regex patterns
const containsUppercase = /[A-Z]/
const containsLowercase = /[a-z]/
const containsNumber = /[0-9]/
const containsSpecialChar = /[^A-Za-z0-9]/

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .refine((val) => containsUppercase.test(val), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((val) => containsLowercase.test(val), {
        message: "Password must contain at least one lowercase letter.",
      })
      .refine((val) => containsNumber.test(val), {
        message: "Password must contain at least one number.",
      })
      .refine((val) => containsSpecialChar.test(val), {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export default function SignupForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    mode: "onChange",
  })

  const watchPassword = form.watch("password")

  React.useEffect(() => {
    let strength = 0

    if (watchPassword.length >= 8) strength += 1
    if (containsUppercase.test(watchPassword)) strength += 1
    if (containsLowercase.test(watchPassword)) strength += 1
    if (containsNumber.test(watchPassword)) strength += 1
    if (containsSpecialChar.test(watchPassword)) strength += 1

    setPasswordStrength(strength)

    if (watchPassword.length > 0) {
      if (strength <= 2) {
        toast.warning("Weak password", {
          description: "Try adding uppercase letters, numbers, and special characters.",
          id: "password-strength",
          duration: 3000,
        })
      } else if (strength <= 4) {
        toast.info("Moderate password strength", {
          description: "Your password is getting stronger!",
          id: "password-strength",
          duration: 3000,
        })
      } else {
        toast.success("Strong password", {
          description: "Your password meets all security requirements!",
          id: "password-strength",
          duration: 3000,
        })
      }
    }
  }, [watchPassword])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    })

    if (error) {
      toast.error("Account creation failed", {
        description: error.message,
      })
      setIsLoading(false)
    } else {
      toast.success("Account created successfully!", {
        description: "Welcome to HealthTrack!",
      })
      router.push("/dashboard")
    }
  }

  const checkEmailAvailability = (email: string) => {
    if (!email || !z.string().email().safeParse(email).success) return

    setTimeout(() => {
      const isEmailTaken = email.endsWith("@example.com")
      if (isEmailTaken) {
        toast.error("Email already in use", {
          description: "Please use a different email address or try logging in.",
          id: "email-check",
        })
      } else {
        toast.success("Email available", {
          description: "This email address is available for registration.",
          id: "email-check",
        })
      }
    }, 1000)
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <div className="flex justify-center">
          <Heart className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your information to create your HealthTrack account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    {...field}
                    onBlur={(e) => {
                      field.onBlur()
                      checkEmailAvailability(e.target.value)
                    }}
                  />
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
                <div className="mt-2">
                  <div className="flex items-center space-x-1 text-xs">
                    <div className="flex h-1 flex-1 rounded-full overflow-hidden bg-gray-200">
                      <div
                        className={`h-full ${
                          passwordStrength <= 2
                            ? "bg-red-500"
                            : passwordStrength <= 4
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-muted-foreground">
                      {passwordStrength <= 2
                        ? "Weak"
                        : passwordStrength <= 4
                        ? "Moderate"
                        : "Strong"}
                    </span>
                  </div>
                </div>
                <FormDescription>
                  Password must include uppercase, lowercase, number, and special character.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to the{" "}
                    <Link href="#" className="text-primary hover:underline">
                      terms of service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-primary hover:underline">
                      privacy policy
                    </Link>
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Sign in
        </Link>
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
            toast.loading("Connecting to Google...", { id: "google-signup" })
            setTimeout(() => {
              toast.success("Google signup successful", {
                id: "google-signup",
                description: "Your account has been created with Google.",
              })
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
            toast.loading("Connecting to Apple...", { id: "apple-signup" })
            setTimeout(() => {
              toast.success("Apple signup successful", {
                id: "apple-signup",
                description: "Your account has been created with Apple.",
              })
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
