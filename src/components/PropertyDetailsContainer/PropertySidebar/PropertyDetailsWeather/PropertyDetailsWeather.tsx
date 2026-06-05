"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"

import weatherBg from "@/assets/images/weather.webp"

interface IProps {
  lat: number
  lng: number
}

const PropertyDetailsWeather: React.FC<IProps> = ({ lat, lng }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["weather", lat, lng],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=e671bd354503c7386fd68b82a8a1bdb1&units=imperial`
      )

      const data = res.data
      return data
    }
  })

  const today = new Date()

  const todayDateFormatted = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short"
  })

  return (
    <section className="col-span-full flex h-full flex-col rounded-[.9375rem] shadow-primary sm:col-span-3 lg:col-span-full">
      <div className="relative flex-1">
        <div className="absolute left-[1.875rem] top-[1.5625rem] z-20 flex flex-col items-start justify-center text-white">
          <span className="text-[2.8125rem] font-bold leading-[3.75rem]">
            {data && Math.round(data.main.feels_like)}
            {data && <span className="font-normal">°</span>}
          </span>
          <span className="text-2xl font-bold">{data && data.name}</span>
        </div>
        <div className="relative h-full">
          <div className="bg-neutral-gradient absolute inset-0 z-10 rounded-t-[.9375rem] opacity-75" />
          <Image
            className="size-full overflow-hidden rounded-t-[.9375rem] object-cover"
            src={weatherBg}
            alt="weather_img"
          />
        </div>
      </div>
      <div className="flex items-center justify-between p-[1.1875rem]">
        <div className="flex flex-col items-center justify-start">
          <span className="text-center text-lg font-bold text-gray-20">
            {todayDateFormatted}
          </span>
          <div className="flex w-full flex-col text-sm font-semibold text-gray-14">
            <span>{data && data.weather[0].main}</span>
            <span>
              {data && Math.round(data.main.temp_min)}° -{" "}
              {data && Math.round(data.main.temp_max)}°
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PropertyDetailsWeather
