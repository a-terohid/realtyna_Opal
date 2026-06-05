"use client"

import { mdiEyeOffOutline, mdiEyeOutline } from "@mdi/js"
import Icon from "@mdi/react"
import type { LegacyRef} from "react";
import { forwardRef, useState } from "react"

import { cn } from "@/utils/helpers"

import { Skeleton } from "../Skeleton"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string
  id?: string
  icon?: string
  inputClassName?: string
  isLoading?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, inputClassName, isLoading, label, icon, id, type, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    const inputTypeForPassword = showPassword ? "text" : "password"

    return (
      <div
        className={cn(
          "relative flex w-full max-w-[18.75rem] flex-col items-center justify-center gap-[.3125rem]",
          className
        )}
      >
        {label && (
          <label
            className="w-full text-start text-sm font-normal text-gray-14"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        {isLoading ? (
          <Skeleton className="h-10 w-full rounded-lg" />
        ) : (
          <>
            <div
              className={cn(
                "flex w-full items-center justify-start gap-3 border border-gray-2 bg-gray-1/80 px-3 py-[.375rem] shadow-input focus-within:bg-white",
                type === "textarea"
                  ? "h-auto rounded-md"
                  : "h-[2.5rem] rounded-[18.75rem]"
              )}
            >
              {icon && <Icon className="text-gray-10" path={icon} size={1} />}

              {type === "textarea" ? (
                <textarea
                  ref={ref as LegacyRef<HTMLTextAreaElement>}
                  id={id}
                  {...props}
                  placeholder={props.placeholder}
                  className={cn(
                    "flex w-full bg-transparent text-sm font-normal text-black outline-none  placeholder:text-gray-9 disabled:cursor-not-allowed disabled:opacity-50",
                    inputClassName
                  )}
                />
              ) : (
                <input
                  ref={ref}
                  {...props}
                  className={cn(
                    "flex h-10 w-full bg-transparent text-sm font-normal text-black outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-9 disabled:cursor-not-allowed disabled:opacity-50",
                    inputClassName
                  )}
                  id={id}
                  placeholder={props.placeholder}
                  type={type === "password" ? inputTypeForPassword : type}
                />
              )}
              {type === "password" && (
                <button
                  type="button"
                  className="absolute right-2 rounded-full bg-gray-1/80 group-focus-within:bg-white peer-focus:bg-white"
                  aria-label="Reveal Password"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <Icon
                      className="text-gray-10"
                      path={mdiEyeOutline}
                      size={0.6}
                    />
                  ) : (
                    <Icon
                      className="text-gray-10"
                      path={mdiEyeOffOutline}
                      size={0.6}
                    />
                  )}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
