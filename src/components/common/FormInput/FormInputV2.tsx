"use client"

import { forwardRef } from "react"

import { cn } from "@/utils/helpers"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string
  id?: string
  inputClassName?: string
}

const InputV2 = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className, inputClassName, label, id, type = "text", ...props }, ref) => {
    return (
      <div
        className={cn(
          className,
          "relative flex w-full flex-col items-center justify-center"
        )}
      >
        {label && (
          <label
            className="absolute -top-4 left-2 z-10 mt-2 self-start rounded-full bg-white px-2 text-[13px] font-semibold text-gray-16 text-opacity-80"
            htmlFor={id}
          >
            {label} {props.required && <span className="text-red-500">*</span>}
          </label>
        )}

        {type === "textarea" ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...props}
            id={id}
            className={cn(
              "group relative flex h-28 w-full resize-none items-center justify-start gap-1 rounded-lg border border-gray-4 px-4 py-3 text-sm font-normal text-black text-opacity-80 placeholder:text-gray-5 focus-within:border-gray-12 focus-within:outline-none md:text-[15px]",
              inputClassName
            )}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            {...props}
            id={id}
            className={cn(
              "group relative flex h-12 w-full items-center justify-start gap-1 rounded-lg border border-gray-4 px-4 py-3 text-sm font-normal text-black text-opacity-80 placeholder:text-gray-5 focus-within:border-gray-12 focus-within:outline-none md:text-[15px]",
              inputClassName
            )}
            type={type}
          />
        )}
      </div>
    )
  }
)
InputV2.displayName = "InputV2"

export { InputV2 }
