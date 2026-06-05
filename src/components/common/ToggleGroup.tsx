"use client"

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import type {VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority"
import React, { createContext } from "react"

import { cn } from "@/utils/helpers"

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

const ToggleGroupContext = createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default"
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={toggleVariants({ variant, size, className })}
    {...props}
  />
))

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
