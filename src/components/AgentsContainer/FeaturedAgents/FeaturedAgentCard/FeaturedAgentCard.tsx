import Image from "next/image"
import Link from "next/link"

import AgentContacts from "@/components/common/AgentContacts/AgentContacts"
import { Button } from "@/components/common/Button"
import Rating from "@/components/PropertyDetailsContainer/ReviewContainer/Reviews/Review/Rating/Rating"
import type { TAgentFeatured } from "@/data/agents_data"
import { cn } from "@/utils/helpers"

interface IProps {
  agent: TAgentFeatured
}

const FeaturedAgentCard: React.FC<IProps> = ({ agent }) => {
  return (
    <div className="relative col-span-full grid h-full auto-rows-fr grid-cols-12 items-center justify-center overflow-hidden rounded-2xl border border-gray-2 @container md:col-span-6">
      <div className="col-span-full flex size-full flex-col items-center justify-start gap-4 px-4 pb-16 pt-4 @[630px]:col-span-6 @[630px]:justify-center @[630px]:pb-4 @[630px]:pr-12">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <span className="bg-primary-gradient !bg-clip-text text-base font-semibold text-transparent">
            {agent.name}
          </span>
          {agent.group ? (
            <span className="text-sm font-normal text-gray-14">
              {agent.group}
            </span>
          ) : (
            ""
          )}
          <div className={cn("flex", !agent.group && !agent.group_logo && "")}>
            <Rating rating={5} iconSize={0.5} />
          </div>
          {agent.group_logo ? (
            <Image src={agent.group_logo} alt="agent_group_logo" />
          ) : (
            ""
          )}
        </div>
        <div className="z-[2] flex w-full items-center justify-center gap-[.625rem]">
          <Button
            size={"sm"}
            className="max-w-[120px] whitespace-nowrap px-4 py-1.5 text-sm font-normal text-white shadow-primary"
            gradient="secondary"
          >
            Contact Agent
          </Button>
          <Button
            asChild
            size={"sm"}
            className="max-w-[110px] whitespace-nowrap px-4 py-1.5 text-sm font-normal text-white shadow-primary"
            gradient="secondary"
          >
            <a rel="noopener noreferrer" target="_blank" href={agent.about}>
              About
            </a>
          </Button>
        </div>
        <div>
          <Button
            asChild
            size={"sm"}
            className="max-w-[110px] whitespace-nowrap px-4 py-1.5 text-sm font-normal text-white shadow-primary"
            gradient="gold"
          >
            <Link
              href={
                agent.mlsAgentId
                  ? `/${agent.name.replace(" ", "-").toLowerCase()}`
                  : ""
              }
            >
              View Listings
            </Link>
          </Button>
        </div>
      </div>
      <div className="absolute z-[1] col-span-full m-auto flex size-[6.25rem] items-center justify-center place-self-center after:absolute after:-inset-1 after:z-[-1] after:rounded-full after:bg-white">
        <Image
          src={agent.photo}
          alt="agent photo"
          className="size-[100px] rounded-full object-cover"
        />
      </div>
      <div className="bg-neutral-gradient col-span-full mb-0 mt-auto flex h-full flex-col items-start justify-end gap-4 px-4 pb-4 pt-16 @[630px]:col-span-6 @[630px]:justify-center @[630px]:py-10 @[630px]:pl-16">
        <AgentContacts
          textClass="text-white font-normal text-sm break-all"
          iconClass="text-white/90"
          iconSize={0.9}
          website={agent.website}
          email={agent.email}
          phone={agent.phone}
        />
      </div>
    </div>
  )
}

export default FeaturedAgentCard
