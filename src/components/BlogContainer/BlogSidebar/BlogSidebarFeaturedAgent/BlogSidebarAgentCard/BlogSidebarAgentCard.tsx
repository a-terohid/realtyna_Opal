import { mdiFacebook, mdiInstagram, mdiTwitter } from "@mdi/js"
import Icon from "@mdi/react"
import Image from "next/image"
import React from "react"

import AgentContacts from "@/components/common/AgentContacts/AgentContacts"
import { Button } from "@/components/common/Button"
import type { TAgentFeatured, TAgentSimple } from "@/data/agents_data"
import { cn } from "@/utils/helpers"

interface IProps {
  agent: TAgentFeatured | TAgentSimple
}

const BlogSidebarAgentCard: React.FC<IProps> = ({ agent }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-white"
      )}
    >
      <div
        className={cn(
          "flex h-full w-full flex-col items-center justify-center gap-2 px-4 py-4 lg:px-8"
        )}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="relative flex size-[6.25rem] items-center justify-center">
            <Image
              src={agent.photo}
              alt="agent photo"
              className="size-full rounded-full shadow-primary"
            />
            <a
              aria-label="facebook link"
              target="_blank"
              rel="noreferrer noopener"
              className="bg-primary-gradient absolute -left-1 top-3 flex size-[1.5625rem] items-center justify-center rounded-full text-white shadow-primary transition-colors duration-300"
              href="http://facebook.com"
            >
              <Icon path={mdiFacebook} size={0.8} />
            </a>
            <a
              aria-label="twitter link"
              target="_blank"
              rel="noreferrer noopener"
              className="bg-primary-gradient absolute -left-4 flex size-[1.5625rem] items-center justify-center rounded-full text-white shadow-primary transition-colors duration-300"
              href="http://twitter.com"
            >
              <Icon path={mdiTwitter} size={0.7} />
            </a>
            <a
              aria-label="instagram link"
              target="_blank"
              rel="noreferrer noopener"
              className="bg-primary-gradient absolute -left-1 bottom-3 flex size-[1.5625rem] items-center justify-center rounded-full text-white shadow-primary transition-colors duration-300"
              href="http://instagram.com"
            >
              <Icon path={mdiInstagram} size={0.8} />
            </a>
          </div>
          <div className="flex flex-col items-center justify-center gap-0.5 text-center">
            <span className="text-base font-semibold text-gray-16">
              {agent.name}
            </span>
            <span className="text-sm font-light text-gray-16">
              {agent.group}
            </span>
          </div>
        </div>
        <div className="mt-3 flex w-full flex-col items-start justify-center gap-2 text-start">
          <AgentContacts
            textClass="text-gray-15 font-normal text-[13px]"
            iconClass="text-gray-16"
            iconSize={0.9}
            address={agent.address}
            email={agent.email}
            phone={agent.phone}
          />
        </div>
        <div className="mt-2 flex w-full items-center justify-center gap-[.625rem]">
          <Button
            size={"sm"}
            className="h-8 w-[7.5rem] whitespace-nowrap text-sm font-normal text-white shadow-primary"
            gradient="primary"
          >
            View Listing
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BlogSidebarAgentCard
