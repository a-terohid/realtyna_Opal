import { mdiFacebook, mdiInstagram, mdiTwitter } from "@mdi/js"
import Icon from "@mdi/react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import AgentContacts from "@/components/common/AgentContacts/AgentContacts"
import { Button } from "@/components/common/Button"
import Rating from "@/components/PropertyDetailsContainer/ReviewContainer/Reviews/Review/Rating/Rating"
import type { TAgentFeatured, TAgentSimple } from "@/data/agents_data"
import { cn } from "@/utils/helpers"

interface IProps {
  agent: TAgentFeatured | TAgentSimple
}

const AgentCard: React.FC<IProps> = ({ agent }) => {
  return (
    <div
      className={cn(
        "flex h-[380px] w-[306px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-white shadow-home-agent-card transition-all duration-300"
      )}
    >
      <div
        className={cn(
          "flex h-full w-full flex-col items-center justify-center gap-4 bg-white bg-contain bg-no-repeat px-8 py-4"
        )}
      >
        <svg
          width="306"
          className="absolute top-0"
          role="presentation"
          height="156"
          viewBox="0 0 306 156"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 306 117.298 C 306 117.298 256.598 129.938 247.296 132.3 C 214.955 140.513 190.093 147.343 153.526 153.932 C 108.365 145.77 81.955 139.063 55.17 131.629 C 34.316 125.841 0 115.678 0 115.678 L 0 14.767 C 0 6.612 6.716 0 15 0 L 291 0 C 299.284 0 306 6.612 306 14.767 L 306 117.298 Z"
            fill="url(#home_agent_card_bg)"
          />
          <defs>
            <linearGradient
              id="home_agent_card_bg"
              x1="153"
              y1="156"
              x2="153"
              y2="-1.71419e-05"
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(1, 0, 0, 0.984494, 0, 0)"
            >
              <stop stopColor="rgb(var(--color-primary-gradient-from))" />
              <stop
                offset="1"
                stopColor="rgba(var(--color-primary-gradient-from))"
              />
            </linearGradient>
          </defs>
        </svg>
        <div
          aria-hidden="true"
          className="z-[1] flex flex-col items-center justify-center gap-4"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex flex-col items-center justify-center gap-1 text-center">
              <span className="text-base font-semibold text-white">
                {agent.name}
              </span>
              <span className="text-sm font-light text-white">
                {agent.group}
              </span>
              <div className="flex">
                <Rating rating={5} iconSize={0.5} />
              </div>
            </div>
          </div>
          <div className="relative flex size-[6.25rem] items-center justify-center">
            <Image
              src={agent.photo}
              alt={agent.name}
              className="size-full rounded-full border-2 border-white"
            />
            {/*  <Link
              aria-label="social link"
              target="_blank"
              rel="noreferrer noopener"
              className="bg-secondary-gradient group-hover:bg-secondary-gradient-hover group absolute bottom-[-2%] left-[5%] flex size-[1.5625rem] items-center justify-center rounded-full text-white shadow-primary transition-all duration-300"
              href="http://facebook.com"
            >
              <Icon path={mdiFacebook} size={0.8} />
            </Link>
            <Link
              aria-label="social link"
              target="_blank"
              rel="noreferrer noopener"
              className="bg-secondary-gradient group-hover:bg-secondary-gradient-hover group absolute bottom-[-10%] flex size-[1.5625rem] items-center justify-center rounded-full text-white shadow-primary transition-all duration-300"
              href="http://facebook.com"
            >
              <Icon path={mdiTwitter} size={0.7} />
            </Link>
            <Link
              aria-label="social link"
              target="_blank"
              rel="noreferrer noopener"
              className="bg-secondary-gradient group-hover:bg-secondary-gradient-hover group absolute bottom-[-2%] right-[5%] flex size-[1.5625rem] items-center justify-center rounded-full text-white shadow-primary transition-all duration-300"
              href="http://facebook.com"
            >
              <Icon path={mdiInstagram} size={0.8} />
            </Link> */}
          </div>
        </div>
        <div className="z-[1] flex w-full flex-col items-start justify-center gap-4 text-start">
          <AgentContacts
            textClass="text-gray-15 font-normal text-sm"
            iconClass="text-gray-20"
            iconSize={0.9}
            address={agent.address}
            email={agent.email}
            phone={agent.phone}
          />
        </div>
        <div className="z-[1] flex w-full items-center justify-center gap-[.625rem]">
          <Button
            size={"sm"}
            className="h-8 w-[7.5rem] whitespace-nowrap text-sm font-normal text-white shadow-primary"
            gradient="primary"
          >
            Contact Agent
          </Button>
          <Button
            size={"sm"}
            className="h-8 w-[7.5rem] whitespace-nowrap text-sm font-normal text-white shadow-primary"
            gradient="secondary"
          >
            View Listing
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AgentCard
