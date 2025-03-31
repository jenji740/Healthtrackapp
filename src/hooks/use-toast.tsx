import { toast } from "sonner"

type ToastType = "success" | "error" | "info" | "warning"

interface UseToastOptions {
  duration?: number
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"
  icon?: React.ReactNode
}

export function useToast() {
  const showToast = (
    message: string,
    type: ToastType = "info",
    options?: UseToastOptions
  ) => {
    switch (type) {
      case "success":
        toast.success(message, options)
        break
      case "error":
        toast.error(message, options)
        break
      case "warning":
        toast.warning(message, options)
        break
      case "info":
      default:
        toast(message, options)
        break
    }
  }

  return {
    toast: showToast,
    success: (message: string, options?: UseToastOptions) => showToast(message, "success", options),
    error: (message: string, options?: UseToastOptions) => showToast(message, "error", options),
    warning: (message: string, options?: UseToastOptions) => showToast(message, "warning", options),
    info: (message: string, options?: UseToastOptions) => showToast(message, "info", options),
  }
}