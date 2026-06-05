import { mdiChevronDown, mdiSortNumericVariant } from "@mdi/js"
import Icon from "@mdi/react"
import type { Dispatch, SetStateAction } from "react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/common/Popover"
import type { TUrlSearchParams } from "@/components/HomeContainer/Hero/HeroFilters/HeroFilters"
import { cn } from "@/utils/helpers"

import PriceRangeFilterContent from "./PriceRangeFilterContent"

interface IProps {
  isHome?: boolean
  urlSearchParams?: TUrlSearchParams
  setUrlSearchParams?: Dispatch<SetStateAction<TUrlSearchParams>>
}

const PriceRangeFilter: React.FC<IProps> = ({
  isHome,
  setUrlSearchParams,
  urlSearchParams
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
        <div className="flex items-center justify-center gap-[.3125rem]">
          {!isHome && (
            <Icon
              path={mdiSortNumericVariant}
              size={1}
              className={cn(isHome ? "text-black/70" : "text-black/70")}
            />
          )}

          <span
            className={cn(
              "text-[.9375rem] font-normal",
              isHome ? "text-black/80" : "text-black/80"
            )}
          >
            Price Range
          </span>
        </div>

        <Icon
          path={mdiChevronDown}
          size={1}
          className={cn(isHome ? "text-black/70" : "text-black/70")}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PriceRangeFilterContent
          isHome={isHome}
          urlSearchParams={urlSearchParams}
          setUrlSearchParams={setUrlSearchParams}
        />
      </PopoverContent>
    </Popover>
  )
}

export default PriceRangeFilter
