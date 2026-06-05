import { mdiHomeEdit } from "@mdi/js"
import Icon from "@mdi/react"
import React from "react"

import type { TCompareList } from "@/types/compare.type"
import { getListingsType } from "@/utils/helpers"

interface IProps {
  compareList: TCompareList
}

const CmpBasicDetails = React.forwardRef(({ compareList }: IProps, ref) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-[1.375rem]">
      <div className="flex w-full items-center justify-start gap-5">
        <div className="bg-primary-gradient flex aspect-square size-[3.75rem] items-center justify-center rounded-full text-white">
          <Icon size={1.2} path={mdiHomeEdit} className="" />
        </div>
        <span className="whitespace-nowrap text-base font-bold text-black">
          Basic Details
        </span>
        <span className="relative w-full before:absolute before:h-px before:w-full before:bg-black/10" />
      </div>
      <div className="relative flex w-full items-center justify-center">
        <div className="flex w-1/3 flex-col items-start justify-center text-sm md:w-1/4 md:text-base">
          <span className="flex h-14 items-center justify-center">
            Property Type
          </span>
          <span className="flex h-14 items-center justify-center">
            Half Bathrooms
          </span>
          <span className="flex h-14 items-center justify-center">
            Lot Area
          </span>
          <span className="flex h-14 items-center justify-center">
            Listing Type
          </span>
          <span className="flex h-14 items-center justify-center">
            Listing ID
          </span>
          <span className="flex h-14 items-center justify-center">
            Built Year
          </span>
        </div>
        <div
          className="flex w-full items-center justify-center overflow-hidden"
          ref={ref as React.RefObject<HTMLDivElement>}
        >
          <div className="flex size-full">
            {compareList.map((property, index) => {
              return typeof property === "string" ? (
                <React.Fragment key={index}></React.Fragment>
              ) : (
                <div
                  className="flex-[0_0_80%] px-[.75rem] text-center text-sm sm:flex-[0_0_60%] md:flex-[0_0_50%] md:text-base lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]"
                  key={+property.property.ListingKey}
                >
                  <div className="flex h-14 items-center justify-center font-bold">
                    {property.property.PropertySubType}
                  </div>
                  <div className="flex h-14 items-center justify-center">
                    {property.property.BathroomsHalf}
                  </div>
                  <div className="flex h-14 items-center justify-center font-bold">
                    {property.property.LotSizeArea || "N/A"}
                    {property.property.LotSizeArea && "Sqft"}
                  </div>
                  <div className="flex h-14 items-center justify-center">
                    {getListingsType(property.property.PropertyType)}
                  </div>
                  <div className="flex h-14 items-center justify-center">
                    {property.property.ListingKey}
                  </div>
                  <div className="flex h-14 items-center justify-center">
                    {property.property.YearBuilt}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
})

CmpBasicDetails.displayName = "CmpBasicDetails"

export default CmpBasicDetails
