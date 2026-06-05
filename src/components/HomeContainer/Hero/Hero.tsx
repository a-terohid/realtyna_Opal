import Image from "next/image"

import mouse from "@/assets/icons/mouse.svg"
import { getSiteSettings } from "@/services/theme/getSiteSettings"
import { cn } from "@/utils/helpers"

import HeroFilters from "./HeroFilters/HeroFilters"

const Hero = async () => {
  const { home_data, home_sections } = await getSiteSettings()
  const isFiltersExist = home_sections.includes("search")
  const HeroData = home_data["search"]
  const isSearchOnly = home_data["search"].searchOnly === "true"

  return (
    <section className="relative flex h-[42rem] w-full flex-col items-center justify-between pb-5">
      <div
        className={cn(
          "box-container w-full pt-20 text-white md:pt-24 lg:pt-28",
          isFiltersExist
            ? isSearchOnly
              ? "text-center"
              : "text-start"
            : "flex flex-col gap-4 pt-52 text-center text-white md:pt-52 lg:pt-52"
        )}
      >
        <h1
          className={cn(
            "mb-2 font-bold capitalize",
            isFiltersExist
              ? isSearchOnly
                ? "text-3xl font-light sm:text-4xl md:text-[40px] lg:text-[52px]"
                : "text-4xl"
              : "text-[32px] md:text-5xl lg:text-[44px]"
          )}
        >
          {HeroData.titleDisplay ? HeroData.title : ""}
        </h1>
        <span aria-level={2} role="heading" className="text-2xl font-light">
          {HeroData.subTitle ? HeroData.subTitle : ""}
        </span>
        {home_sections.includes("search") && (
          <HeroFilters isSearchOnly={isSearchOnly} />
        )}
      </div>

      <Image
        src={mouse}
        alt="scroll-button"
        className="h-7 w-10 self-center fill-white opacity-50"
      />
      <svg
        role="presentation"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1599 265"
        width="100%"
        preserveAspectRatio="none"
        className="absolute -bottom-px block max-h-[60px] w-full sm:max-h-[80px] md:max-h-[100px] lg:max-h-[120px]"
        fill="none"
      >
        <path
          className="w-full"
          d="M0 4.09644C0 4.09644 216.97 -41.7767 732.952 219.127C733.085 219.199 777.928 240.085 799.584 240.745C825.453 241.533 866.948 219.242 867.098 219.127C1369.75 -34.3797 1599.22 4.09644 1599.22 4.09644V265H0V4.09644Z"
          fill="white"
        />
      </svg>
    </section>
  )
}

export default Hero
