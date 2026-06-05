"use client"

import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef } from "react"

import { cn } from "@/utils/helpers"

export type Color =
  | "primary"
  | "black"
  | "neutral"
  | "gold"
  | "secondary"
  | "transparent"
  | "custom"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-white transition-colors duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        outline:
          'before:bg-neutral-gradient hover:after:bg-neutral-gradient hover:before:bg-neutral-gradient relative !bg-transparent text-gray-20 before:absolute before:inset-0 before:z-[-1] before:block before:rounded-full before:content-[""] after:absolute after:inset-[.125rem] after:z-[-1] after:block after:rounded-full after:bg-white after:content-[""] hover:!bg-transparent hover:text-white'
      },
      gradient: {
        primary: "bg-primary-gradient hover:bg-primary-gradient-hover",
        black: "bg-black-gradient hover:bg-black-gradient-hover",
        neutral: "bg-neutral-gradient hover:bg-neutral-gradient-hover",
        gold: "bg-gold-gradient hover:bg-gold-gradient-hover",
        secondary: "bg-secondary-gradient hover:bg-secondary-gradient-hover",
        transparent: "bg-transparent hover:bg-transparent"
      },
      size: {
        default: "px-8 py-3",
        sm: "px-6 py-2",
        lg: "px-10 py-3",
        icon: "size-9"
      },
      textSize: {
        default: "text-base",
        sm: "text-sm",
        lg: "text-lg",
        xl: "text-xl"
      }
    },
    defaultVariants: {
      variant: "default",
      gradient: "secondary",
      size: "default",
      textSize: "default"
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  customBg?: string
  customHoverBg?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      gradient,
      size,
      textSize,
      asChild = false,
      customBg,
      customHoverBg,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, textSize, gradient, className })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
export default Button
