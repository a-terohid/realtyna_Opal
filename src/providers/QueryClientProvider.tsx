"use client"

import {
  QueryCache,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query"
import type { ReactNode } from "react"
import { useState } from "react"
import toast from "react-hot-toast"

interface IProps {
  children: ReactNode
}

const QueryProvider = ({ children }: IProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            if (query?.meta?.errorMessage) {
              toast.error(
                (query?.meta?.errorMessage as string) || "Something went wrong"
              )
            }
          }
        }),
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            retry: false
          }
        }
      })
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryProvider
