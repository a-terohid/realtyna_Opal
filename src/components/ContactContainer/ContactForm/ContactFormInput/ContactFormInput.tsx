"use client"

import type { LegacyRef } from "react"
import { forwardRef } from "react"

import { cn } from "@/utils/helpers"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string
  id: string
  inputClassName?: string
}

const ContactFormInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(({ className, inputClassName, label, id, type, ...props }, ref) => {
  return (
    <div
      className={cn(
        className,
        "relative flex w-full flex-col items-center justify-center gap-[5px] border-b border-gray-2 pb-2"
      )}
    >
      {label && (
        <label
          className="w-full text-start text-sm font-normal text-[#61657a]"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          ref={ref as LegacyRef<HTMLTextAreaElement>}
          id={id}
          {...props}
          placeholder={props.placeholder}
          className={cn(
            "tsm:text-sm flex w-full bg-transparent text-sm font-normal text-black outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-8  disabled:cursor-not-allowed disabled:opacity-50",
            inputClassName
          )}
        />
      ) : (
        <input
          ref={ref as LegacyRef<HTMLInputElement>}
          {...props}
          className={cn(
            "tsm:text-sm flex h-7 w-full bg-transparent text-sm font-normal text-black outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-8  disabled:cursor-not-allowed disabled:opacity-50",
            inputClassName
          )}
          id={id}
          placeholder={props.placeholder}
          type={type}
        />
      )}
    </div>
  )
})
ContactFormInput.displayName = "ContactFormInput"

export { ContactFormInput }
