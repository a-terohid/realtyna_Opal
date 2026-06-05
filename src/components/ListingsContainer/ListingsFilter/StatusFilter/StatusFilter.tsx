"use client"

import { mdiChevronDown, mdiListStatus } from "@mdi/js"
import Icon from "@mdi/react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/common/Popover"
import { cn } from "@/utils/helpers"

import StatusFilterContent from "./StatusFilterContent"

const StatusFilter = () => {
  return (
    <Popover>
      <PopoverTrigger
        className={cn("justify-between gap-2 border shadow-search")}
      >
        <div className="flex items-center justify-center gap-[.3125rem]">
          <Icon path={mdiListStatus} size={1} className={cn("text-black/70")} />

          <span className={cn("text-[.9375rem] font-normal", "text-black/80")}>
            Listings Status
          </span>
        </div>
        <Icon path={mdiChevronDown} size={1} className={cn("text-black/70")} />
      </PopoverTrigger>
      <PopoverContent>
        <StatusFilterContent />
      </PopoverContent>
    </Popover>
  )
}

export default StatusFilter
