"use client"

import { useState } from "react"

import { cn } from "@/utils/helpers"

interface IProps {
  description: string
}

const PropertyAbout: React.FC<IProps> = ({ description }) => {
  const [readMore, setReadMore] = useState(false)

  return (
    <section className="col-span-full flex flex-col items-start justify-start gap-[.875rem]">
      <h2 className="text-2xl font-bold text-black">About</h2>
      <div
        className={cn(
          "pl-1 text-[15px] text-gray-18 lowercase",
          readMore ? "line-clamp-none" : "line-clamp-4"
        )}
      >
        {description}
      </div>
      <button
        onClick={() => setReadMore(!readMore)}
        className="text-sm font-medium text-gray-12"
      >
        {readMore ? "Show Less" : "Read More"}
      </button>
    </section>
  )
}

export default PropertyAbout
