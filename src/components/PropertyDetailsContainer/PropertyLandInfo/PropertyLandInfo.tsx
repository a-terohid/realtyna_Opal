import React from "react"

import type { ListingsValue } from "@/types/listings.type"

import DetailRow from "../PropertyBasicDetails/DetailRow/DetailRow"

interface IProps {
  details: ListingsValue
}

const PropertyLandInfo: React.FC<IProps> = ({ details }) => {
  const data = [
    {
      key: 1,
      value: details.PossibleUse,
      title: "Possible Use",
      isMulti: true
    },
    {
      key: 2,
      value: details.LotSizeSquareFeet,
      title: "Lot Size Square Feet",
      isMulti: false
    },
    {
      key: 3,
      value: details.LotSizeAcres,
      title: "Lot Size Acres",
      isMulti: false
    },
    {
      key: 4,
      value: details.LotSizeDimensions,
      title: "Lot Size Dimensions",
      isMulti: false
    },
    {
      key: 5,
      value: details.LotFeatures,
      title: "Lot Features",
      isMulti: false
    }
  ]

  const newData = data.filter((val) => {
    if (val.value && val.value !== "NONE") {
      return val
    }
  })

  return (
    <>
      {newData?.length > 0 ? (
        <section className="col-span-full flex flex-col items-start justify-center gap-[.875rem]">
          <h2 className="text-2xl font-bold text-black">Property Land Info</h2>
          <div className="grid w-full grid-cols-1 gap-[25px] rounded-[.9375rem] p-[.9375rem] shadow-primary md:grid-cols-2">
            {newData.map((item) => {
              return (
                <DetailRow
                  value={item.value}
                  key={item.key}
                  label={item.title}
                  isMulti={item.isMulti}
                />
              )
            })}
          </div>
        </section>
      ) : null}
    </>
  )
}

export default PropertyLandInfo
