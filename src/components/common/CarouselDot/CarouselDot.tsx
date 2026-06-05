import React from "react"

import { cn } from "@/utils/helpers"

interface IProps extends React.HTMLAttributes<HTMLSpanElement> {
  index: number
  selectedIndex?: number
  scrollTo: (index: number) => void
}

const CarouselDot: React.FC<IProps> = ({
  index,
  scrollTo,
  selectedIndex,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={() => scrollTo(index)}
      className={cn(
        "inline-flex aspect-square w-3 cursor-pointer touch-manipulation appearance-none rounded-full bg-gray-3",
        index === selectedIndex && "bg-primary-gradient"
      )}
      key={index}
    />
  )
}

export default CarouselDot
