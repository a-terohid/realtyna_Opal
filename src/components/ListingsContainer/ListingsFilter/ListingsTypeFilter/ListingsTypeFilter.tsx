import { mdiChevronDown, mdiSignRealEstate } from "@mdi/js"
import Icon from "@mdi/react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/common/Popover"

import ListingsTypeFilterContent from "./ListingsTypeFilterContent"

const ListingsTypeFilter = () => {
  return (
    <Popover>
      <PopoverTrigger className="justify-between gap-2 border border-black/10 text-black/80 shadow-search">
        <div className="flex items-center justify-center gap-[.3125rem]">
          <Icon path={mdiSignRealEstate} size={1} className="text-black/70" />
          <span className="text-[.9375rem] font-normal text-black/80">
            Listings Type
          </span>
        </div>
        <Icon path={mdiChevronDown} size={1} className="text-black/60" />
      </PopoverTrigger>
      <PopoverContent>
        <ListingsTypeFilterContent />
      </PopoverContent>
    </Popover>
  )
}

export default ListingsTypeFilter
