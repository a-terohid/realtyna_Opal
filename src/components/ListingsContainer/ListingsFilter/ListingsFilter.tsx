import { mdiRestore, mdiTune } from "@mdi/js"
import Icon from "@mdi/react"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { parseAsJson } from "nuqs"
import { useState } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/common/Accordion"
import { Button } from "@/components/common/Button"
import { Skeleton } from "@/components/common/Skeleton"
import { useInvalidateQueries } from "@/hooks/useInvalidateQueries"
import { useJsApiLoader } from "@/hooks/useJsApiLoader"
import { useQueryParams } from "@/hooks/useQueryParams"
import useStore from "@/store/useStore"
import { cn } from "@/utils/helpers"

import BedBathFilter from "./BedBathFilter/BedBathFilter"
import BedBathFilterContent from "./BedBathFilter/BedBathFilterContent"
import ListingsTypeFilter from "./ListingsTypeFilter/ListingsTypeFilter"
import ListingsTypeFilterContent from "./ListingsTypeFilter/ListingsTypeFilterContent"
import LocationFilter from "./LocationFilter/LocationFilter"
import PriceRangeFilter from "./PriceRangeFilter/PriceRangeFilter"
import PriceRangeFilterContent from "./PriceRangeFilter/PriceRangeFilterContent"
import PropertyTypeFilter from "./PropertyTypeFilter/PropertyTypeFilter"
import PropertyTypeFilterContent from "./PropertyTypeFilter/PropertyTypeFilterContent"
import StatusFilter from "./StatusFilter/StatusFilter"

const FiltersList = dynamic(() => import("./FiltersList/FiltersList"), {
  ssr: false
})

const ListingsFilter: React.FC = () => {
  const [error, setError] = useState("")

  const polygon = useStore((state) => state.mapFilters.polygon)

  const invalidateQueries = useInvalidateQueries()
  const { get, set } = useQueryParams()

  const searchParams = useSearchParams()

  async function resetFilters() {
    const viewport = searchParams.get("viewport")

    if (!viewport) {
      const query = new URLSearchParams()
      invalidateQueries(query, parseAsJson().serialize(polygon))
    } else {
      window.history.pushState({ viewport }, "", `?viewport=${viewport}`)
      const query = new URLSearchParams({
        viewport: viewport
      })

      invalidateQueries(query, parseAsJson().serialize(polygon))
    }
  }

  const { isLoaded } = useJsApiLoader({})

  async function handleSearch() {
    if (
      get("priceRange") &&
      +get("priceRange")[1] &&
      +get("priceRange")[1] < +get("priceRange")[0]
    ) {
      setError("Max Price must be greater than Min Price")
      return
    }

    set("sID", (prev) => (prev || 0) + 1).then((res) => {
      invalidateQueries(res, parseAsJson().serialize(polygon))
    })
  }

  return (
    <div
      id="listings-filter"
      className={cn(
        "z-[1002] flex w-full flex-col items-center justify-center border-b border-gray-3/40 bg-white py-6 text-base text-black"
      )}
    >
      <div className="box-container hidden w-full flex-wrap items-start justify-start gap-2 sm:flex [&>*]:max-w-xs [&>*]:grow [&>*]:basis-0 [&>*]:whitespace-nowrap">
        {isLoaded ? (
          <LocationFilter />
        ) : (
          <Skeleton className="h-[38px] rounded-full sm:min-w-[320px]" />
        )}
        <StatusFilter />
        <ListingsTypeFilter />
        <PropertyTypeFilter />
        <PriceRangeFilter />
        <BedBathFilter />
      </div>
      <Accordion type="single" collapsible className="w-full px-3 sm:hidden">
        <AccordionItem value="item-1">
          <div className="flex w-full items-center justify-center gap-3 [&>div]:w-full [&>div]:!min-w-0">
            {isLoaded ? (
              <LocationFilter isMobile={true} />
            ) : (
              <Skeleton className="h-[38px] rounded-full" />
            )}
            <AccordionTrigger aria-label="mobile filter">
              <Icon path={mdiTune} size={1} />
            </AccordionTrigger>
          </div>
          <AccordionContent>
            <section className="flex w-full flex-col gap-3 [&>*]:grow [&>first-child]:w-full">
              <ListingsTypeFilterContent />
              <PropertyTypeFilterContent />
              <PriceRangeFilterContent />
              <BedBathFilterContent />
            </section>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="box-container flex w-full items-center justify-end gap-2 pt-4">
        <Button
          gradient="transparent"
          aria-label="reset filters"
          size={"icon"}
          onClick={() => {
            resetFilters()
          }}
        >
          <Icon
            size={1.1}
            path={mdiRestore}
            className="text-3xl text-secondary-1"
          />
        </Button>
        <Button
          onClick={() => handleSearch()}
          gradient="secondary"
          size={"sm"}
          textSize={"sm"}
          className="gap-1 shadow-secondary"
        >
          <span>Search</span>
        </Button>
      </div>
      {error && (
        <span className="text-center text-[15px] text-red-600">{error}</span>
      )}
      <FiltersList handleSearch={handleSearch} />
    </div>
  )
}

export default ListingsFilter
