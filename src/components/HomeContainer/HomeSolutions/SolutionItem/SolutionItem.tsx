import Icon from "@mdi/react"

import type { CountItem } from "@/types/site-settings.type"
import { cn } from "@/utils/helpers"

import Svg from "./Svg"

interface IProps {
  id: number
  data: CountItem

  icon: string
}

const SolutionItem: React.FC<IProps> = ({ id, data, icon }) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center sm:w-[45%] md:absolute md:w-1/4",
        id === 0 && "left-0 top-0 mx-auto",
        id === 1 && "left-[25%] top-[15%] mx-auto",
        id === 2 && "right-[25%] top-0 mx-auto",
        id === 3 && "right-0 top-[-15%] mx-auto"
      )}
    >
      <div className="relative flex w-full items-center justify-center">
        <Svg
          className={cn(
            "h-[150px] w-[150px] shrink-0",
            id === 0 && "rotate-0",
            id === 1 && "rotate-[26deg]",
            id === 2 && "rotate-[38deg]",
            id === 3 && "rotate-[-30deg]"
          )}
        />
        <Icon
          className="absolute aspect-square w-12 text-white sm:w-14"
          path={icon}
        />
      </div>
      <span className="pt-4 text-center text-base font-normal text-gray-21">
        {data.title}
      </span>
      <span className="whitespace-nowrap text-center text-sm font-normal text-gray-14">
        {data.subtitle}
      </span>
    </div>
  )
}

export default SolutionItem
