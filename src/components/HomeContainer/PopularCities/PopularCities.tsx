"use client"

import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import toast from "react-hot-toast"

import HomeSectionTitle from "@/components/common/HomeSectionTitle/HomeSectionTitle"
import { cityListData } from "@/data/home_city_data"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { getListingsData } from "@/services/listings/getListings"
import type { THomeData } from "@/types/site-settings.type"
import { cn } from "@/utils/helpers"

import CityCard from "./CityCard/CityCard"

interface IProps {
  data: THomeData["cities"]
}

const PopularCities: React.FC<IProps> = ({ data: { shadowTitle, title } }) => {
  const [cityList, setCityList] = useState(cityListData)

  const [isInView, ref] = useIntersectionObserver()

  const { isLoading } = useQuery({
    queryKey: ["popularCities"],
    queryFn: async () => {
      const cityData = await getListingsData({
        query:
          "?$apply=groupby((City), (aggregate($count as Count))))&$filter=City eq 'Chicago' or City eq 'Los Angeles' or City eq 'PHILADELPHIA' or City eq 'Dallas' or City eq 'Atlanta' or City eq 'New York' or City eq 'San Francisco' or City eq 'Seattle' or City eq 'Miami'"
      })

      if (!cityData.value) {
        toast.error("Something went wrong")
      }

      if (cityData.value) {
        if (cityData.value.length > 0) {
          const updatedCityList = cityList.map((row) =>
            row.map((city) => ({
              ...city,
              listings: cityData.value.find((item) => item.City?.toLowerCase() === city.title.toLowerCase())?.Count || 0
            }))
          )
          setCityList(updatedCityList)
        }
      }

      return cityData.value
    },
    enabled: isInView
  })

  return (
    <section ref={ref} className="box-container flex w-full flex-col items-center justify-center gap-10">
      <HomeSectionTitle title={title} borderedTitle={shadowTitle} />
      <div className="grid w-full grid-cols-1 items-stretch justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cityList.map((grid, index) => (
          <div key={index} className={cn("grid w-full grid-cols-1 items-stretch justify-items-center gap-6")}>
            {grid.map((city, index) => (
              <CityCard key={index} city={city} isLoading={isLoading} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default PopularCities
