import { mdiMapPlus } from "@mdi/js"
import Icon from "@mdi/react"
import Image from "next/image"
import React from "react"

import flag from "@/assets/images/us_flag.svg"
import type { TCompareList } from "@/types/compare.type"

interface IProps {
  compareList: TCompareList
}

const CmpAddressMap = React.forwardRef(({ compareList }: IProps, ref) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <div className="flex w-full items-center justify-start gap-5">
        <div className="bg-primary-gradient flex aspect-square size-[3.75rem] items-center justify-center rounded-full text-white">
          <Icon size={1.2} path={mdiMapPlus} className="" />
        </div>

        <span className="whitespace-nowrap text-base font-bold text-black">
          Address Map
        </span>

        <span className="relative w-full before:absolute before:h-px before:w-full before:bg-black/10" />
      </div>
      <div className="relative flex w-full items-start justify-between">
        <div className="flex w-1/3 flex-col items-start justify-center text-sm font-normal md:w-1/4 md:text-base">
          <span className="flex h-24 items-center justify-center">Country</span>
          <span className="flex h-24 items-center justify-center">State</span>
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
                  className="flex-[0_0_80%] flex-col items-center justify-between gap-[5.9375rem] sm:flex-[0_0_60%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]"
                  key={+property.property.ListingKey}
                >
                  <div className="relative flex h-24 items-center justify-center">
                    <Image
                      src={flag}
                      className="h-24 w-11"
                      alt="property_flag"
                    />
                  </div>
                  <div className="flex h-24 items-center justify-center text-sm md:text-base">
                    {property.property.StateOrProvince ?? "N/A"}
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

CmpAddressMap.displayName = "CmpAddressMap"

export default CmpAddressMap
