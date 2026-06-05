import { mdiAccount, mdiPhonePlus, mdiViewList } from "@mdi/js"
import Icon from "@mdi/react"
import cn from "clsx"
import Image from "next/image"
import Link from "next/link"

import AgentContacts from "@/components/common/AgentContacts/AgentContacts"
import { Button } from "@/components/common/Button"
import Rating from "@/components/PropertyDetailsContainer/ReviewContainer/Reviews/Review/Rating/Rating"
import type { TAgentSimple } from "@/data/agents_data"

interface IProps {
  agent: TAgentSimple
  listStyle?: "grid" | "list"
}

const SimpleAgentCard: React.FC<IProps> = ({ agent, listStyle }) => {
  return (
    <div
      className={cn(
        "relative col-span-full flex h-full flex-col justify-between rounded-[.9375rem] border border-gray-2 px-1 py-4",
        listStyle === "grid"
          ? "items-center gap-4 sm:col-span-6 lg:col-span-4 xl:col-span-3"
          : "items-center gap-3 sm:flex-row md:col-span-6 "
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center justify-center text-center",
          listStyle === "grid"
            ? ""
            : "shrink-0 basis-40 md:basis-36 lg:basis-40"
        )}
      >
        <div className="relative mb-1 flex size-[6.25rem] items-center justify-center">
          <Image
            className="rounded-full shadow-primary"
            src={agent.photo}
            alt="agent photo"
          />
        </div>
        <span className="text-base font-semibold text-gray-21">
          {agent.name}
        </span>
        <span className="text-sm font-normal text-gray-14">{agent.group}</span>
        <div className="mt-1 flex">
          <Rating rating={5} iconSize={0.5} />
        </div>
      </div>
      <div
        className={cn(
          "flex flex-col items-start justify-center gap-2",
          listStyle === "grid" ? "h-full px-1" : "flex-grow"
        )}
      >
        <div
          className={cn(
            "z-10 flex flex-wrap items-center justify-center gap-[.625rem] pb-2",
            listStyle === "grid"
              ? "relative mb-auto mt-0 w-full"
              : "right-3 top-3 w-full sm:justify-start xl:absolute xl:justify-end"
          )}
        >
          <Button
            className="px-3 py-1.5 text-sm font-normal text-white shadow-primary"
            size={"sm"}
            aria-label="call agent"
            gradient="secondary"
          >
            <Icon path={mdiPhonePlus} size={0.9} className="lg:hidden" />

            <span className="hidden  lg:block">Contact Agent</span>
          </Button>
          <Button
            asChild
            variant="outline"
            aria-label="about agent"
            gradient={"transparent"}
            className="group px-4 py-1.5 text-sm font-normal"
          >
            <a rel="noreferrer noopener" target="_blank" href={agent.about}>
              <Icon
                path={mdiAccount}
                size={0.9}
                className="text-gray-12 group-hover:text-white lg:hidden"
              />

              <span className="hidden lg:block">About</span>
            </a>
          </Button>
          <Button
            asChild
            size={"sm"}
            aria-label="view listings"
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
              <Icon
                path={mdiViewList}
                size={0.9}
                className="text-gray-12 group-hover:text-white lg:hidden"
              />
              <span className="hidden lg:block">View Listings</span>
            </Link>
          </Button>
        </div>
        <AgentContacts
          textClass="text-gray-14 font-normal text-sm break-all"
          iconSize={0.9}
          iconClass="text-gray-11"
          address={agent.address}
          email={agent.email}
          phone={agent.phone}
        />
      </div>
    </div>
  )
}

export default SimpleAgentCard
