import { cn } from "@/utils/helpers"

import { Skeleton } from "../Skeleton"

const PropertyCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex h-[350px] w-full flex-col items-center justify-start rounded-[15px] bg-white p-2",
        className
      )}
    >
      <Skeleton className="h-1/2 w-full rounded-[15px]" />
      <div
        className={cn(
          "flex h-2/4 w-full flex-col items-center justify-between rounded-b-lg bg-white pt-2"
        )}
      >
        <Skeleton className="h-[15%] w-full" />
        <Skeleton className="h-1/5 w-full" />
        <div className="flex h-[14%] w-full items-center justify-start gap-4">
          <Skeleton className="h-full w-1/5" />
          <Skeleton className="h-full w-1/5" />
          <Skeleton className="h-full w-1/5" />
        </div>
        <div className="flex h-[26%] w-full items-center justify-start gap-2">
          <Skeleton className="aspect-square h-full rounded-full" />
          <div className="flex size-full flex-col items-start justify-center gap-1">
            <Skeleton className="h-[14px] w-full" />
            <Skeleton className="h-[14px] w-2/4" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCardSkeleton
