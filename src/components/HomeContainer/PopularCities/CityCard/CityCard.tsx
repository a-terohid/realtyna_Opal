import { mdiHomeCity } from "@mdi/js"
import Icon from "@mdi/react"
import Image from "next/image"
import Link from "next/link"

import { Skeleton } from "@/components/common/Skeleton"
import type { TCityData } from "@/data/home_city_data"
import { cn } from "@/utils/helpers"

interface IProps {
  city: TCityData
  isLoading: boolean
}

const CityCard: React.FC<IProps> = ({ city, isLoading }) => {
  const url = city.neighborhood
    ? `/neighborhood/${city.state}/${city.city.replace(/ /g, "-")}/${city.neighborhood.replace(/ /g, "-")}?viewport=${JSON.stringify(city.viewport)}`
    : `/city/${city.state}/${city.city.replace(/ /g, "-")}?viewport=${JSON.stringify(city.viewport)}`

  return (
    <Link
      href={url}
      className={cn(
        "group relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl group",
        city.customClass
      )}
    >
      <Image
        fill
        sizes="22vw"
        className="size-full object-cover"
        src={city.img}
        alt={city.title + "City"}
      />
      <div
        className={cn(
          "absolute inset-0 z-[2] flex flex-col items-start gap-2 bg-cityCardOverlay p-4 ",
          city.justify
        )}
      >
        <span className="absolute inset-0 z-[-1] bg-cityCardOverlayHover opacity-0 duration-300 group-hover:opacity-100" />
        <div className="flex flex-col items-start justify-center gap-2">
          <span aria-hidden="true" className="text-2xl font-bold text-white">
            {city.title}
          </span>
          <span aria-hidden="true" className="text-sm font-normal text-white">
            {city.desc}
          </span>
        </div>
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <div className="flex items-center justify-center">
            {city.agents.map((agent, index) => (
              <Image
                src={agent}
                alt={city.title + "agent" + Math.round(Math.random() * 50)}
                className={cn(
                  "h-[2.1875rem] w-[2.1875rem] rounded-full border-[1px] border-white",
                  index === 0 ? "ml-0" : "ml-[-10px]"
                )}
                key={index}
              />
            ))}
          </div>
          {isLoading ? (
            <Skeleton className="h-[24px] w-[32px] rounded-sm" />
          ) : (
            <div className="flex items-center justify-center gap-1 text-white/80">
              <Icon size={0.8} path={mdiHomeCity} />
              <span>{city.listings}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default CityCard
