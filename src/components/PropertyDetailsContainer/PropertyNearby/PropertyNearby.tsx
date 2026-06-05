"use client"

import {
  mdiBasket,
  mdiBookOpenBlankVariant,
  mdiCoffee,
  mdiShieldHalfFull,
  mdiSubwayVariant,
  mdiTownHall
} from "@mdi/js"
import React from "react"

import PropertyNearbySlider from "./PropertyNearbySlider/PropertyNearbySlider"

const data = [
  {
    name: "School",
    value: 3
  },
  {
    name: "Police Station",
    value: 1
  },
  {
    name: "Mall",
    value: 2
  },
  {
    name: "Library",
    value: 1
  },
  {
    name: "Coffe Shop",
    value: 6
  },
  {
    name: "Subway",
    value: 1
  },
  {
    name: "Subway1",
    value: 1
  },
  {
    name: "Subway2",
    value: 1
  },
  {
    name: "Subway3",
    value: 1
  }
]

// Define an array of nearby properties with their respective icons
const nearbyList = [
  { name: "School", icon: mdiTownHall },
  { name: "Police Station", icon: mdiShieldHalfFull },
  { name: "Mall", icon: mdiBasket },
  { name: "Library", icon: mdiBookOpenBlankVariant },
  { name: "Coffe Shop", icon: mdiCoffee },
  { name: "Subway", icon: mdiSubwayVariant },
  { name: "Subway1", icon: mdiSubwayVariant },
  { name: "Subway2", icon: mdiSubwayVariant },
  { name: "Subway3", icon: mdiSubwayVariant }
  // Add more nearby properties here
]

const PropertyNearby: React.FC = () => {
  // Create a list of nearby properties with their respective counts
  const nearbyListWithCounts = nearbyList.map((nearby) => {
    const count = data
      .filter((item) => item.name === nearby.name)
      .reduce((total, item) => total + item.value, 0)
    return {
      name: nearby.name,
      icon: nearby.icon,
      count: count
    }
  })

  return (
    <section className="col-span-full flex flex-col items-start justify-center gap-[.875rem]">
      <h2 className="text-2xl font-bold text-black">
        Nearby
        <span className="font-normal">
          (2629-Loyola-Northway-Baltimore-MD-35215)
        </span>
      </h2>
      <div className="flex w-full flex-col items-start justify-start gap-4">
        <PropertyNearbySlider data={nearbyListWithCounts} />
      </div>
    </section>
  )
}

export default PropertyNearby
