"use client"

import { AppProgressBar as ProgressBar } from "next-nprogress-bar"
import type { ReactNode } from "react"
import { Toaster } from "react-hot-toast"

interface IProps {
  children: ReactNode
}

const LayoutProvider = ({ children }: IProps) => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ProgressBar
        height="4px"
        options={{ showSpinner: false }}
        color="rgb(var(--color-secondary-gradient-from))"
      />
      {children}
    </>
  )
}

export default LayoutProvider
