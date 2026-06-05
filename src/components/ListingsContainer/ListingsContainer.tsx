/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { mdiArrowUpBold } from "@mdi/js"
import Icon from "@mdi/react"
import dynamic from "next/dynamic"
import { useEffect } from "react"

import { useGetPathName } from "@/hooks/useGetPathName"
import { useQueryParams } from "@/hooks/useQueryParams"
import { useScrollTop } from "@/hooks/useScrollTop"
import useStore from "@/store/useStore"
import type { ListingsData } from "@/types/listings.type"
import { cn } from "@/utils/helpers"

import { Button } from "../common/Button"
import Disclaimers from "../common/Disclaimers/Disclaimers"
import Listings from "./Listings/Listings"
import ListingsFilter from "./ListingsFilter/ListingsFilter"
import ListingsMapContainer from "./ListingsMap/ListingsMapContainer"

const Demographic = dynamic(() => import("../Demographic/Demographic"), {
  ssr: false
})

interface IProps {
  listingsData: ListingsData
  initialFilters?: Record<string, string>
}

const ListingsContainer: React.FC<IProps> = ({ listingsData, initialFilters }) => {
  const viewMode = useStore((state) => state.viewMode)
  const mobileView = useStore((state) => state.mobileView)
  const setMobileView = useStore((state) => state.setMobileView)

  const { set } = useQueryParams()
  const params = useGetPathName()

  const { isVisible, scrollToTop } = useScrollTop()

  useEffect(() => {
    if (initialFilters) {
      Object.entries(initialFilters).forEach(([key, value]) => {
        try {
          const parsedValue = JSON.parse(value)
          set(key as any, parsedValue)
        } catch (error) {
          set(key as any, value)
        }
      })
    }
  }, [initialFilters])

  return (
    <div className="relative flex w-full flex-col items-center justify-start">
      <ListingsFilter />
      {viewMode === "map" && (
        <Button
          onClick={() => setMobileView(mobileView === "mapOnly" ? "listOnly" : "mapOnly")}
          gradient={"secondary"}
          className="fixed bottom-10 z-[1002] md:hidden"
        >
          {mobileView === "mapOnly" ? "Map View" : "List View"}
        </Button>
      )}
      <div
        className={cn(
          "relative flex w-full flex-col items-center justify-start",
          viewMode === "map" && "max-w-[2560px] flex-row-reverse items-start justify-center"
        )}
      >
        {viewMode === "map" && <ListingsMapContainer listingsData={listingsData} />}
        <Listings listingsData={listingsData} />
      </div>
      {isVisible && (
        <Button
          gradient={"black"}
          size={"icon"}
          className="fixed bottom-8 right-8 z-20 size-14 rounded-full"
          onClick={scrollToTop}
        >
          <Icon size={1} path={mdiArrowUpBold} />
        </Button>
      )}
      {params.type === "neighborhood" && listingsData?.value.length > 0 && (
        <Demographic listings={listingsData.value} className="mt-10" />
      )}
      <Disclaimers className="px-20" />
    </div>
  )
}

export default ListingsContainer
