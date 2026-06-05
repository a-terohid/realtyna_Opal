"use client"

import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const toggleVariants = cva(
  "data-[state=on]:bg-primary-gradient inline-flex items-center justify-center rounded-md text-sm font-medium outline-none transition-colors hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:text-white",
  {
    variants: {
      variant: {
        default: "bg-transparent"
      },
      size: {
        default: "h-8 px-2",
        sm: "h-7 px-1.5",
        lg: "h-9 px-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={toggleVariants({ variant, size, className })}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
