import { cn } from "@/utils/helpers"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("animate-pulse bg-gray-100", className)} {...props} />
  )
}

export { Skeleton }
