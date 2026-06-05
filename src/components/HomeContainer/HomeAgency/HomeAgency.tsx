"use client"

import Image from "next/image"

import HomeSectionTitle from "@/components/common/HomeSectionTitle/HomeSectionTitle"
import { Progress } from "@/components/common/Progress"
import type { THomeData } from "@/types/site-settings.type"
import { cn } from "@/utils/helpers"

interface IProps {
  agencyData: THomeData["agency"]
}

const HomeAgency: React.FC<IProps> = ({ agencyData }) => {
  return (
    <section className="box-container flex w-full flex-col items-center justify-center gap-x-12 gap-y-[4.6875rem] lg:mt-20 lg:flex-row lg:items-start">
      <div
        className={cn(
          "relative flex max-w-[576px] flex-col items-start justify-center gap-6"
        )}
      >
        <HomeSectionTitle
          titleClassName="mt-[36px]"
          title={agencyData.title}
          borderedTitle={agencyData.shadowTitle}
        />

        <div className="flex flex-col items-start justify-center gap-4 capitalize text-gray-19">
          <p>{agencyData.description}</p>
          <div className="flex w-full flex-wrap items-center justify-start gap-4">
            <div className="grid items-center justify-items-start">
              <span
                aria-hidden="true"
                className="bg-primary-1 !bg-clip-text text-4xl font-extrabold text-transparent"
              >
                {agencyData.count &&
                  agencyData.count.length > 0 &&
                  agencyData.count[0].title}
              </span>
              <span className="pb-[5px] text-sm text-gray-16">
                {agencyData.count &&
                  agencyData.count.length > 0 &&
                  agencyData.count[0].subtitle}
              </span>
              <Progress
                aria-label="customers percentage"
                value={50}
                className="w-28"
              />
            </div>
            <div className="grid items-center justify-items-start">
              <span
                aria-hidden="true"
                className="bg-primary-1 !bg-clip-text text-4xl font-extrabold text-transparent"
              >
                {agencyData.count &&
                  agencyData.count.length > 0 &&
                  agencyData.count[1].title}
              </span>
              <span className="pb-[5px] text-sm text-gray-16">
                {agencyData.count &&
                  agencyData.count.length > 0 &&
                  agencyData.count[1].subtitle}
              </span>
              <Progress
                aria-label="agents percentage"
                value={50}
                className="w-28"
              />
            </div>
            <div className="grid items-center justify-items-start">
              <span
                aria-hidden="true"
                className="bg-primary-1 !bg-clip-text text-4xl font-extrabold text-transparent"
              >
                {agencyData.count &&
                  agencyData.count.length > 0 &&
                  agencyData.count[2].title}
              </span>
              <span className="pb-[5px] text-sm text-gray-16">
                {agencyData.count &&
                  agencyData.count.length > 0 &&
                  agencyData.count[2].subtitle}
              </span>
              <Progress
                aria-label="property percentage"
                value={60}
                className="w-28"
              />
            </div>
            <div className="grid items-center justify-items-start">
              <span
                aria-hidden="true"
                className="bg-primary-1 !bg-clip-text text-4xl font-extrabold text-transparent"
              >
                {agencyData.count &&
                  agencyData.count.length > 0 &&
                  agencyData.count[3].title}
              </span>
              <span className="pb-[5px] text-sm text-gray-16">
                {agencyData.count &&
                  agencyData.count.length > 0 &&
                  agencyData.count[3].subtitle}
              </span>
              <Progress
                aria-label="agency percentage"
                value={60}
                className="w-28"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          'relative flex items-center justify-center after:absolute after:right-[-2.1875rem] after:z-[0] after:hidden after:h-[115%] after:w-[85%] after:rounded-[30px] after:bg-gradient-1 after:opacity-60 after:content-[""] sm:after:block'
        )}
      >
        <Image
          className="z-[1] min-w-0 max-w-[300px] rounded-[30px] shadow-about-img sm:max-w-[400] lg:min-w-[28.125rem]"
          width={400}
          height={600}
          src={agencyData.image}
          alt="about_bg"
        />
      </div>
    </section>
  )
}

export default HomeAgency
