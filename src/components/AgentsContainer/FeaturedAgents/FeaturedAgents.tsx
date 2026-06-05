import { mdiShieldAccount } from "@mdi/js"
import Icon from "@mdi/react"

import { agentsInfo } from "@/data/agents_data"

import AgentCard from "./FeaturedAgentCard/FeaturedAgentCard"

const FeaturedAgents = () => {
  return (
    <section className="col-span-full grid grid-cols-12 items-start justify-center gap-6">
      <div className="col-span-full flex items-center justify-start gap-2">
        <Icon path={mdiShieldAccount} size={1} className="text-gray-19" />

        <h2 className="col-span-full text-2xl font-bold text-gray-21">
          Featured Agents
        </h2>
      </div>
      {agentsInfo.featured.map((agent, index) => (
        <AgentCard key={index} agent={agent} />
      ))}
    </section>
  )
}

export default FeaturedAgents
