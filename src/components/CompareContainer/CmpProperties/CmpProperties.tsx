"use client"

import { mdiClose, mdiCompare, mdiPlus, mdiTabPlus } from "@mdi/js"
import Icon from "@mdi/react"
import Link from "next/link"
import React, { useState } from "react"

import { Button } from "@/components/common/Button"
import PropertyCard from "@/components/common/PropertyCard/PropertyCard"
import useStore from "@/store/useStore"
import type { TCompareList } from "@/types/compare.type"

import ListingsModal from "./ListingsModal/ListingsModal"

interface IProps {
  compareList: TCompareList
}

const CmpProperties = React.forwardRef(({ compareList }: IProps, ref) => {
  const [isOpen, setIsOpen] = useState(false)

  const setCompareList = useStore((state) => state.setCompareList)

  const emptyValues = ["empty", "empty", "empty", "empty"]

  const listLength = compareList.filter((item) => item !== "empty")

  const handleRemoveProperty = (id: number | string) => {
    const filtered = compareList.filter(
      (item) => typeof item === "string" || item.property.ListingKey !== id
    )

    setCompareList([...filtered])
  }

  return (
    <div className="relative flex w-full flex-col items-end justify-center gap-[1.875rem]">
      <ListingsModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex w-full flex-col items-start justify-start gap-2 sm:flex-row sm:items-center">
        <Icon size={1} path={mdiCompare} className="text-gray-17" />
        <span className="text-xl font-bold text-gray-21 sm:text-2xl">
          Compare {listLength.length > 0 ? listLength.length : 0} Properties
        </span>
        <Button
          onClick={() => {
            setCompareList(["empty", "empty", "empty", "empty"])
          }}
          className="px-2 py-1 text-sm"
        >
          Clear All
        </Button>
      </div>
      <div className="flex w-full flex-col items-center justify-end gap-4 sm:flex-row sm:gap-0">
        <div className="flex w-full items-center justify-center sm:w-1/5 md:w-1/4">
          <Button
            onClick={() =>
              setCompareList([...compareList, ...(emptyValues as "empty"[])])
            }
            className="size-[5.625rem] rounded-[.9375rem] bg-gray-1 text-white hover:bg-gray-2"
          >
            <div className="bg-primary-gradient flex aspect-square h-[2.8125rem] items-center justify-center rounded-full">
              <Icon path={mdiTabPlus} size={1.3} />
            </div>
          </Button>
        </div>
        <div
          className="flex w-full items-center justify-center overflow-hidden"
          ref={ref as React.RefObject<HTMLDivElement>}
        >
          <div className="flex size-full">
            {compareList.map((item, index) => {
              return typeof item === "string" ? (
                <div
                  key={index}
                  className="flex h-full flex-[0_0_80%] items-center justify-center sm:flex-[0_0_60%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]"
                >
                  <Link
                    href={"/listings"}
                    className="flex size-[5.625rem] items-center justify-center rounded-[.9375rem] bg-gray-1 text-white transition-colors hover:bg-gray-2"
                  >
                    <div className="bg-primary-gradient flex aspect-square h-[2.8125rem] items-center justify-center rounded-full">
                      <Icon path={mdiPlus} size={1.3} />
                    </div>
                  </Link>
                </div>
              ) : (
                <div
                  key={item.property.ListingKey}
                  className="min-h-full w-full flex-[0_0_80%] px-1 sm:flex-[0_0_60%] sm:px-2 md:flex-[0_0_50%] md:px-[.75rem]  lg:flex-[0_0_33.333%]  xl:flex-[0_0_25%]  "
                >
                  <div className="flex size-full flex-col">
                    <PropertyCard variant="compare" data={item.property} />
                    <Button
                      size={"icon"}
                      onClick={() =>
                        handleRemoveProperty(item.property.ListingKey)
                      }
                      className="mx-auto mt-5 aspect-square shrink-0"
                    >
                      <Icon path={mdiClose} size={0.8} />
                    </Button>
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

CmpProperties.displayName = "CmpProperties"

export default CmpProperties
