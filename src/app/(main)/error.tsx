"use client"

import Link from "next/link"
import { useEffect } from "react"

import { Button } from "@/components/common/Button"

export default function Error({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <>
      <div className="flex min-h-[calc(100dvh-20rem)] w-full flex-col items-center justify-center px-6 py-20 text-center">
        <span className="text-base font-semibold text-red-700">
          There was a problem
        </span>
        <span className="mt-4 text-xl font-bold tracking-tight text-zinc-900 md:text-2xl">
          {error.message || "Something went wrong"}
        </span>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          <Button
            size={"sm"}
            gradient="neutral"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
          <Button size={"sm"} asChild>
            <Link prefetch={false} href={"/"}>
              Go back home
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
