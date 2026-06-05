import Image from "next/image"
import Link from "next/link"

import AgentContacts from "@/components/common/AgentContacts/AgentContacts"
import type { TAgentSimple } from "@/data/agents_data"
import { agentsInfo } from "@/data/agents_data"
import type { AgentValue } from "@/types/agent.type"
import type { ListingsValue } from "@/types/listings.type"

import AgentSocials from "./AgentSocials/AgentSocials"

interface IProps {
  agent: AgentValue
  details: ListingsValue
}

const PropertyAgentInfo: React.FC<IProps> = ({ agent, details }) => {
  const agentsList = [...agentsInfo.featured, ...agentsInfo.simple]

  const agentInfo = agentsList.find(
    (agent: TAgentSimple) => agent.mlsAgentId === details.ListAgentMlsId
  )

  return (
    <section className="col-span-full flex w-full flex-col items-center justify-between gap-5 md:flex-row">
      <div className="flex items-center justify-center gap-[.9375rem]">
        <div className="flex flex-col items-center justify-center text-center lg:pl-5">
          {agentInfo?.photo && (
            <div className="relative flex size-[5.5rem] items-center justify-center">
              <Image
                src={agentInfo?.photo}
                alt={`${agentInfo?.name} photo`}
                sizes="(max-width: 576px) 30vw,(max-width: 1024px) 20vw,(max-width: 1280px) 15vw, 10vw"
                fill
                className="max-h-[5.5rem] max-w-[5.5rem] rounded-full shadow-primary"
              />
            </div>
          )}
          <span className="mt-[.3125rem] text-base font-semibold text-gray-21">
            {details.ListAgentFullName ||
              details.ListAgentFirstName + " " + details.ListAgentLastName}
          </span>
          {details.ListOfficeName && (
            <span className="text-xs font-light text-gray-14">
              {details.ListOfficeName}
            </span>
          )}
        </div>
        {agentInfo && (
          <div className="flex flex-col items-start justify-center gap-[.625rem] md:items-start ">
            <AgentContacts
              phone={
                details.ListAgentDirectPhone ||
                agentInfo?.phone ||
                agent.professional_phone
              }
              email={
                details.ListAgentEmail ||
                agentInfo?.email ||
                agent.professional_email
              }
              website={details.ListAgentURL || agentInfo?.website || agent.url}
            />
          </div>
        )}
      </div>
      {!agentInfo &&
        (agent.facebook ||
          agent.youtube ||
          agent.instagram ||
          agent.twitter) && (
          <div className="flex items-center justify-center gap-[.1875rem] empty:hidden">
            <AgentSocials
              instagram={agent.instagram}
              facebook={agent.facebook}
              youtube={agent.youtube}
              twitter={agent.twitter}
            />
          </div>
        )}

      <Link
        href={
          agentInfo?.mlsAgentId
            ? `/${agentInfo.name.replace(" ", "-").toLowerCase()}`
            : "/listings"
        }
        className="bg-secondary-gradient hover:bg-secondary-gradient-hover flex h-[2.8125rem] w-[11.25rem] items-center justify-center rounded-full text-center text-base font-normal text-white shadow-primary transition-colors "
      >
        View Listing
      </Link>
    </section>
  )
}

export default PropertyAgentInfo
