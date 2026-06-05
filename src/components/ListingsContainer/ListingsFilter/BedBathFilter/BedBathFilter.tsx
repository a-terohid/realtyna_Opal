import { mdiBed, mdiChevronDown, mdiShowerHead } from "@mdi/js"
import Icon from "@mdi/react"
import type { Dispatch, SetStateAction } from "react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/common/Popover"
import type { TUrlSearchParams } from "@/components/HomeContainer/Hero/HeroFilters/HeroFilters"
import { cn } from "@/utils/helpers"

import BedBathFilterContent from "./BedBathFilterContent"

interface IProps {
  isHome?: boolean
  urlSearchParams?: TUrlSearchParams
  setUrlSearchParams?: Dispatch<SetStateAction<TUrlSearchParams>>
}

const BedBathFilter: React.FC<IProps> = ({
  isHome = false,
  urlSearchParams,
  setUrlSearchParams
}) => {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "justify-between gap-2 border shadow-search",
          isHome
            ? "w-full border-white/20 bg-white text-black/80 sm:w-auto"
            : "border-black/10 text-black/80"
        )}
      >
        <span
          className={cn(
            "flex items-center justify-center gap-2 text-[.9375rem] font-normal",
            isHome ? "text-black/80" : "text-black/80"
          )}
        >
          {!isHome && (
            <Icon
              size={1}
              path={mdiBed}
              className={cn(isHome ? "text-black/70" : "text-black/70")}
            />
          )}
          Bed
          <Icon
            size={1}
            path={mdiChevronDown}
            className={cn(isHome ? "text-black/70" : "text-black/70")}
          />
        </span>
        <span
          className={cn(
            "flex items-center justify-center gap-2 text-[.9375rem] font-normal",
            isHome ? "text-black/80" : "text-black/80"
          )}
        >
          {!isHome && (
            <Icon
              size={1}
              path={mdiShowerHead}
              className={cn(isHome ? "text-black/70" : "text-black/70")}
            />
          )}
          Bath
          <Icon
            size={1}
            path={mdiChevronDown}
            className={cn(isHome ? "text-black/70" : "text-black/70")}
          />
        </span>
      </PopoverTrigger>
      <PopoverContent>
        <BedBathFilterContent
          urlSearchParams={urlSearchParams}
          setUrlSearchParams={setUrlSearchParams}
          isHome={isHome}
        />
      </PopoverContent>
    </Popover>
  )
}

export default BedBathFilter
