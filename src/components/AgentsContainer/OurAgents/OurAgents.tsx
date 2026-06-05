"use client"

import { mdiAccountMultiplePlus, mdiFormatListText, mdiViewGrid } from "@mdi/js"
import Icon from "@mdi/react"
import { useState } from "react"

import { Button } from "@/components/common/Button"
import { agentsInfo } from "@/data/agents_data"

import SimpleAgentCard from "./SimpleAgentCard/SimpleAgentCard"

const OurAgents = () => {
  const [listStyle, setListStyle] = useState<"list" | "grid">("list")
  const [count, setCount] = useState<number>(8)

  const handleShowMore = () => {
    setCount(count + 5)
  }

  const visibleItems = agentsInfo.simple.slice(0, count)

  return (
    <section className="col-span-full grid grid-cols-12 items-start justify-center gap-6">
      <div className="col-span-full flex items-center justify-start gap-2">
        <Icon path={mdiAccountMultiplePlus} size={1} className="text-gray-19" />

        <div className="flex w-full items-center justify-between">
          <h1 className="col-span-full text-2xl font-bold text-gray-21">
            Our Agents
          </h1>
          <div className="flex items-center justify-center gap-2">
            <Button
              onClick={() => setListStyle("list")}
              gradient={listStyle === "list" ? "secondary" : "primary"}
              aria-label="list view"
              size={"icon"}
            >
              <Icon path={mdiFormatListText} size={0.8} />
            </Button>
            <Button
              gradient={listStyle === "grid" ? "secondary" : "primary"}
              onClick={() => setListStyle("grid")}
              aria-label="grid view"
              size={"icon"}
            >
              <Icon path={mdiViewGrid} size={0.8} />
            </Button>
          </div>
        </div>
      </div>
      {visibleItems.map((agent, index) => (
        <SimpleAgentCard listStyle={listStyle} key={index} agent={agent} />
      ))}
      {count < agentsInfo.simple.length && (
        <div className="col-span-full flex items-center justify-center pt-4">
          <Button
            gradient="neutral"
            size={"default"}
            onClick={handleShowMore}
            className="text-sm  font-normal shadow-primary ring-1 ring-gray-12 ring-offset-4"
          >
            Show More
          </Button>
        </div>
      )}
    </section>
  )
}

export default OurAgents
