"use client"

import dynamic from "next/dynamic"

import useStore from "@/store/useStore"
import type { ListingsData } from "@/types/listings.type"
import { cn } from "@/utils/helpers"

import ListingsCards from "./ListingsCards/ListingsCards"
import ListingsViewOptions from "./ListingsViewOptions/ListingsViewOptions"

const ListingsTitle = dynamic(() => import("./ListingsTitle/ListingsTitle"), {
  ssr: false
})

interface IProps {
  listingsData: ListingsData
}

const Listings: React.FC<IProps> = ({ listingsData }) => {
  const viewMode = useStore((state) => state.viewMode)
  const mobileView = useStore((state) => state.mobileView)

  return (
    <div
      className={cn(
        "max-w-[120rem] space-y-[.75rem] bg-white",
        viewMode === "map"
          ? mobileView === "mapOnly"
            ? "invisible -z-10 w-0 p-0 md:visible md:z-0 md:w-[40%] md:px-8 md:pt-4"
            : "z-0 w-full px-3 pt-4 md:w-[40%] md:px-4 lg:px-5 xl:px-8"
          : "mt-[2.25rem] w-full px-3 sm:px-[25px] md:px-[40px] lg:px-[55px] xl:px-[4.375rem]"
      )}
    >
      <ListingsTitle />
      <ListingsViewOptions />
      <ListingsCards listingsData={listingsData} />
    </div>
  )
}

export default Listings
