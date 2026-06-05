import dynamic from "next/dynamic"

import type { AgentValue } from "@/types/agent.type"

const ContactLocationGoogle = dynamic(
  () => import("./ContactLocationGoogle/ContactLocationGoogle"),
  {
    ssr: false
  }
)

const ContactLocation = ({ agentData }: { agentData: AgentValue }) => {
  return (
    <section className="relative h-[480px] w-full">
      <ContactLocationGoogle agentData={agentData} />
    </section>
  )
}

export default ContactLocation
