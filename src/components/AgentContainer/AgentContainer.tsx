import { mdiMapMarker } from "@mdi/js"
import Icon from "@mdi/react"
import Image from "next/image"

import type { TAgentSimple } from "@/data/agents_data"

import AgentContacts from "../common/AgentContacts/AgentContacts"
import Button from "../common/Button"

interface IProps {
  agentInfo: TAgentSimple
}

const AgentContainer: React.FC<IProps> = ({ agentInfo }) => {
  const expertise = [
    "#ForSale",
    "#ForRent",
    "#RealEstateAgent",
    "#FirstTimeBuyers"
  ]

  const zipCodes = ["12345", "67890", "11111", "22222"]

  const areaOfActivity = ["Area of activity 1"]

  const languages = ["English", "French"]

  return (
    <div className="box-container col-span-full grid w-full grid-cols-1 items-start justify-center gap-6">
      <span className="text-[32px] font-bold">Welcome to My Home Page</span>
      <div className="grid w-full space-y-7 divide-y divide-gray-2 rounded-2xl border border-gray-2 p-3 sm:p-5 md:p-7 lg:p-10">
        <div className="flex w-full flex-wrap items-start justify-between gap-8">
          <div className="relative flex shrink-0">
            <Image
              className="size-[210px] shrink-0 rounded-full"
              src={agentInfo.photo}
              width={200}
              height={200}
              alt={agentInfo.name}
            />
          </div>
          <div className="flex flex-col items-start justify-start">
            <span className="text-gray-19">Site.com</span>
            <span className="text-2xl font-bold text-gray-21">
              {agentInfo.name}
            </span>
            <div className="mt-6 grid gap-2">
              <AgentContacts
                textClass="text-gray-14 font-normal text-sm break-all"
                iconSize={0.9}
                iconClass="text-gray-11"
                website={agentInfo.website}
                email={agentInfo.email}
                phone={agentInfo.phone}
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start">
            <span className="text-lg font-bold text-[#0A0A0A]">Trophies</span>
            <div>No trophies</div>
          </div>
          <div className="flex flex-col items-end justify-start">
            <Button size={"lg"} className="">
              Contact {agentInfo.name}
            </Button>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-start justify-between gap-16 pt-7">
          <div className="grid">
            <span className="mb-3 text-lg font-bold text-[#0A0A0A]">
              About {agentInfo.name}
            </span>
            <span className="text-base font-semibold text-[#232323]">
              Realtor ( 8 years experience)
            </span>
            <span className="mt-1 text-base font-semibold text-[#232323]">
              Specialties:{" "}
              <span className="font-bold">
                Buyers Agent, Listing Agent, Relocating Staing
              </span>
            </span>
            <span className="mt-6 text-lg font-bold">Certificates</span>
            <div>No certificates</div>
          </div>
          <div className="flex flex-col items-start justify-start gap-6">
            <div className="grid gap-2">
              <span className="text-[15px] font-bold text-gray-22">
                Expertise
              </span>
              <div className="flex flex-wrap items-start justify-start gap-2">
                {expertise.map((item, index) => (
                  <span
                    key={index}
                    className="rounded-md bg-[#F5E8EF] px-2 py-1.5 text-sm font-medium text-[#9F1C64]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-1 flex-col items-start justify-start gap-2">
              <span className="text-[15px] font-bold text-gray-22">
                ZIP codes
              </span>
              <div className="flex flex-wrap items-start justify-start gap-2">
                {zipCodes.map((item, index) => (
                  <span
                    key={index}
                    className="flex items-center justify-start gap-1 rounded-md bg-[#ECE5F5] px-2 py-1.5 text-sm font-medium text-[#430098]"
                  >
                    <Icon
                      path={mdiMapMarker}
                      size={0.8}
                      className="opacity-70"
                    />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <span className="text-[15px] font-bold text-gray-22">
                Areas of activity
              </span>
              <div className="flex flex-wrap items-start justify-start gap-2">
                {areaOfActivity.map((item, index) => (
                  <span
                    key={index}
                    className="flex items-center justify-start gap-1 rounded-md bg-[#F7F7FA] px-2 py-1.5 text-sm font-normal text-gray-22"
                  >
                    <Icon
                      path={mdiMapMarker}
                      size={0.8}
                      className="opacity-40"
                    />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <span className="text-[15px] font-bold text-gray-22">
                Language
              </span>
              <div className="flex flex-wrap items-start justify-start gap-2">
                {languages.map((item, index) => (
                  <span
                    key={index}
                    className="rounded-md bg-[#ECE5F5] px-2 py-1.5 text-sm font-medium text-[#430098]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentContainer
