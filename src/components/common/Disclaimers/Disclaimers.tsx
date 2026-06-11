"use client"

import { useQuery } from "@tanstack/react-query"

import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { getDisclaimer } from "@/services/listings/getDisclaimer"
import { cn } from "@/utils/helpers"

import { Skeleton } from "../Skeleton"
import Disclaimer from "./Disclaimer"

const Disclaimers = ({
  name,
  className,
  lastUpdate
}: {
  name?: string
  className?: string
  lastUpdate?: Date
}) => {
  const [isInView, ref] = useIntersectionObserver()

  const { data, isLoading } = useQuery({
    queryKey: ["disclaimer", name],
    queryFn: () => getDisclaimer(),
    enabled: isInView
  })

  const currentDisclaimer = (name: string) => {
    const disclaimer =
      data &&
      data.result &&
      data.result.length > 0 &&
      data.result[0].disclaimer &&
      data.result.find(
        (row) => row.short_name.toLowerCase() === name.toLowerCase()
      )

      console.log(disclaimer)

    return (
      <>
        {disclaimer ? (
          <Disclaimer
            disclaimer={disclaimer}
            lastUpdate={lastUpdate}
            name={name}
            listOfficeName={name}
          />
        ) : (
          ""
        )}
      </>
    )
  }

  return (
    <section
      ref={ref}
      className={cn("mt-5 grid w-full divide-y pb-3 text-sm ", className)}
    >
      {isLoading ? (
        <div className="grid gap-3 py-3">
          <Skeleton className="h-7 w-72 rounded-lg" />
          <Skeleton className="h-7 w-72 rounded-lg" />
          <div className="flex items-center justify-start gap-3">
            <Skeleton className="size-24 rounded-full" />
            <Skeleton className="h-full w-10/12 rounded-lg" />
          </div>
        </div>
      ) : name ? (
        currentDisclaimer(name)
      ) : (
        data &&
        data.result &&
        data.result.length > 0 &&
        data.result[0].disclaimer &&
        data.result.map((disclaimer) => (
          <Disclaimer
            key={disclaimer.id}
            disclaimer={disclaimer}
            lastUpdate={lastUpdate}
            name={name}
            listOfficeName={name}
          />
        ))
      )}
    </section>
  )
}

export default Disclaimers
