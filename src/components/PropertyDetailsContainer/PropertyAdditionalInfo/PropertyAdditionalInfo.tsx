"use client"

import type { ListingsValue } from "@/types/listings.type"

import DetailRow from "../PropertyBasicDetails/DetailRow/DetailRow"

interface IProps {
  details: ListingsValue
}

const PropertyAdditionalInfo: React.FC<IProps> = ({ details }) => {
  const data = [
    {
      key: 1,
      value: details.BodyType,
      title: "Body Type",
      isMulti: true
    },
    {
      key: 2,
      value: details.BusinessType,
      title: "Business Type",
      isMulti: true
    },
    {
      key: 3,
      value: details.CurrentUse,
      title: "Current Use",
      isMulti: true
    },

    {
      key: 8,
      value: details.WaterSource,
      title: "Water Source",
      isMulti: true
    },
    {
      key: 9,
      value: details.CloseDate,
      title: "Close Date",
      isMulti: false
    },
    {
      key: 10,
      value: details.ClosePrice,
      title: "Close Price",
      isMulti: false
    },
    {
      key: 11,
      value: details.MLSAreaMajor,
      title: "MLS Area Major",
      isMulti: false
    },
    {
      key: 15,
      value: details.Skirt,
      title: "Skirt",
      isMulti: true
    },
    {
      key: 16,
      value: details.SpecialListingConditions,
      title: "Special details Conditions",
      isMulti: true
    },
    {
      key: 17,
      value: details.StatusChangeTimestamp,
      title: "Status Change Timestamp",
      isDate: true,
      isMulti: false
    },
    {
      key: 18,
      value: details.Zoning,
      title: "Zoning",
      isMulti: false
    },
    {
      key: 19,
      value: details.MLSStatus,
      title: "MLS Status",
      isMulti: false
    },
    {
      key: 20,
      value: details.Utilities,
      title: "Utilities",
      isMulti: true
    }
  ]

  const newData = data.filter((val) => {
    if (val.value && val.value !== null && val.value !== "NONE") {
      return val
    }
  })

  return (
    <>
      {newData?.length > 0 ? (
        <section className="col-span-full flex flex-col items-start justify-center gap-[.875rem]">
          <h2 className="text-2xl font-bold text-black">
            Property Additional Info
          </h2>
          <div className="grid w-full grid-cols-1 gap-[25px] rounded-[.9375rem] p-[.9375rem] shadow-primary md:grid-cols-2">
            {newData.map((item) => {
              return (
                <DetailRow
                  label={item.title}
                  key={item.key}
                  isDate={item.isDate}
                  value={item.value}
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

export default PropertyAdditionalInfo
