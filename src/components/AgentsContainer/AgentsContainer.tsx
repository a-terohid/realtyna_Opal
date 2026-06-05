import React from "react"

import FeaturedAgents from "./FeaturedAgents/FeaturedAgents"
import OurAgents from "./OurAgents/OurAgents"

export const AgentsContainer = () => {
  return (
    <div className="col-span-full grid grid-cols-1 items-start justify-center gap-[4.0625rem]">
      <FeaturedAgents />
      <OurAgents />
    </div>
  )
}
