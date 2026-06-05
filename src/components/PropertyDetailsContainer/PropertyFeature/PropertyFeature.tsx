"use client"

import React, { useState } from "react"

import type { ListingsValue } from "@/types/listings.type"

import DetailRow from "../PropertyBasicDetails/DetailRow/DetailRow"

interface IProps {
  details: ListingsValue
}

const PropertyFeature: React.FC<IProps> = ({ details }) => {
  const data = [
    {
      key: 1,
      value: details.InteriorFeatures,
      title: "Interior Features",
      isMulti: true
    },
    {
      key: 2,
      value: details.Cooling,
      title: "Cooling",
      isMulti: true
    },
    {
      key: 3,
      value: details.View,
      title: "View",
      isMulti: true
    },
    {
      key: 4,
      value: details.PoolFeatures,
      title: "Pool",
      isMulti: true
    },
    {
      key: 5,
      value: details.PoolPrivateYN,
      title: "Pool Private Yes/No",
      isMulti: false
    },
    {
      key: 7,
      value: details.FireplaceFeatures,
      title: "Fireplace",
      isMulti: false
    },
    {
      key: 8,
      value: details.FireplaceYN,
      title: "Fireplace Yes/No",
      isMulti: false
    },
    {
      key: 9,
      value: details.FireplacesTotal,
      title: "Fireplaces Total",
      isMulti: false
    },
    {
      key: 10,
      value: details.Heating,
      title: "Heating",
      isMulti: true
    },
    {
      key: 11,
      value: details.HeatingYN,
      title: "Heating Yes/No",
      isMulti: false
    },
    {
      key: 12,
      value: details.ParkingFeatures,
      title: "Parking Features",
      isMulti: true
    },
    {
      key: 13,
      value: details.PatioAndPorchFeatures,
      title: "Patio",
      isMulti: true
    },
    {
      key: 14,
      value: details.DistanceToPhoneServiceNumeric,
      title: "Distance To Phone Service Numeric",
      isMulti: false
    },
    {
      key: 15,
      value: details.DistanceToPhoneServiceUnits,
      title: "Distance To Phone Service Units",
      isMulti: false
    },
    {
      key: 16,
      value: details.Electric,
      title: "Electric",
      isMulti: true
    },
    {
      key: 17,
      value: details.Sewer,
      title: "Sewer",
      isMulti: true
    },
    {
      key: 18,
      value: details.CarportSpaces,
      title: "Carport Spaces",
      isMulti: false
    },
    {
      key: 19,
      value: details.Basement,
      title: "Basement",
      isMulti: true
    },
    {
      key: 20,
      value: details.CoolingYN,
      title: "Cooling Yes/No",
      isMulti: false
    },
    {
      key: 21,
      value: details.DirectionFaces,
      title: "Direction Faces",
      isMulti: false
    },
    {
      key: 22,
      value: details.ExteriorFeatures,
      title: "Exterior Features",
      isMulti: true
    },
    {
      key: 23,
      value: details.Flooring,
      title: "Flooring",
      isMulti: true
    },
    {
      key: 24,
      value: details.GarageSpaces,
      title: "Garage Spaces",
      isMulti: false
    },
    {
      key: 25,
      value: details.NewConstructionYN,
      title: "New Construction Yes/No",
      isMulti: false
    },
    {
      key: 26,
      value: details.OnMarketDate,
      title: "On Market Date",
      isMulti: false
    },
    {
      key: 27,
      value: details.WaterSource,
      title: "Water Source",
      isMulti: true
    },
    {
      key: 28,
      value: details.WaterfrontYN,
      title: "Waterfront Yes/No",
      isMulti: false
    }
  ]

  const newData = data.filter((val) => {
    if (val.value) {
      return val
    }
  })

  return (
    <>
      {newData?.length > 0 ? (
        <section className="col-span-full flex flex-col items-start justify-center gap-[.875rem]">
          <h2 className="text-2xl font-bold text-black">Property Features</h2>
          <div className="grid w-full grid-cols-1 gap-[25px] rounded-[.9375rem] p-[.9375rem] shadow-primary md:grid-cols-2">
            {newData.map((item) => (
              <DetailRow
                key={item.key}
                label={item.title}
                isMulti={item.isMulti}
                value={item.value}
              />
            ))}
          </div>
        </section>
      ) : null}
    </>
  )
}

export default PropertyFeature
