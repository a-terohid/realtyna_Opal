import {
  mdiAccountGroup,
  mdiEarthPlus,
  mdiHeadphonesSettings,
  mdiShieldHome
} from "@mdi/js"

import HomeSectionTitle from "@/components/common/HomeSectionTitle/HomeSectionTitle"
import type { THomeData } from "@/types/site-settings.type"

import SolutionItem from "./SolutionItem/SolutionItem"

const solutionsItem = [
  {
    icon: mdiEarthPlus,
    title: "Enterprise Solutions",
    desc: "Multisite Solutions"
  },
  {
    icon: mdiShieldHome,
    title: "License Model",
    desc: "Owned License Model"
  },
  {
    icon: mdiAccountGroup,
    title: "Clientele",
    desc: "Proven track record"
  },
  {
    icon: mdiHeadphonesSettings,
    title: "Customer Service",
    desc: "Exceptional customer service"
  }
]

interface IProps {
  data: THomeData["solutions"]
}

const HomeSolutions: React.FC<IProps> = ({ data }) => {
  return (
    <section className="relative flex min-h-[320px] w-full flex-col items-center justify-start gap-6 overflow-hidden md:gap-6">
      <HomeSectionTitle
        titleClassName="sm:mt-[44px]"
        title={data.title}
        borderedTitle={data.shadowTitle}
      />

      <div
        role="img"
        aria-label="solutionsBg"
        className="absolute flex w-full bg-contain bg-center bg-no-repeat md:mt-14 md:h-[250px] md:bg-solutionBg lg:mt-12 xl:mt-6 2xl:mt-2"
      ></div>
      <div className="relative mx-auto flex min-h-[250px] w-full max-w-[850px] flex-wrap items-center justify-center gap-x-4 gap-y-7 md:space-y-0">
        {data.count &&
          data.count.length > 0 &&
          data.count
            .slice(0, 4)
            .map((item, index) =>
              item.title && item.subtitle ? (
                <SolutionItem
                  id={index}
                  key={index}
                  data={item}
                  icon={solutionsItem[index].icon}
                />
              ) : (
                ""
              )
            )}
      </div>
    </section>
  )
}

export default HomeSolutions
