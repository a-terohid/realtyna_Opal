"use client"

import { mdiFolderHome } from "@mdi/js"
import Icon from "@mdi/react"
import { useQuery } from "@tanstack/react-query"
import type { EmblaCarouselType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react"

import CarouselDot from "@/components/common/CarouselDot/CarouselDot"
import PropertyCard from "@/components/common/PropertyCard/PropertyCard"
import PropertyCardSkeleton from "@/components/common/PropertyCard/PropertyCardSkeleton"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { getNearbyProperties } from "@/services/listings/getNearbyProperties"
import type { ListingsValue } from "@/types/listings.type"

interface IProps {
  details: ListingsValue
}

const NearbyProperties: React.FC<IProps> = ({ details }) => {
  const [isIntersecting, ref] = useIntersectionObserver()

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: [
      "similarProperties",
      details.ListingKey,
      details.Latitude,
      details.Coordinates?.[1],
      details.Longitude,
      details.Coordinates?.[0]
    ],
    queryFn: async () => {
      const data = await getNearbyProperties({
        lat: details.Latitude ?? details.Coordinates?.[1],
        lng: details.Longitude ?? details.Coordinates?.[0]
      })

      const filtered = data.value.filter(
        (property) => property.ListingKey !== details.ListingKey
      )

      if (filtered.length > 4) {
        filtered.splice(4)
      }

      return filtered
    },

    enabled: isIntersecting
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 1,
    breakpoints: {
      "(min-width:1280px)": {
        active: false
      }
    }
  })
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  useEffect(() => {
    if (!emblaApi) return
    onInit(emblaApi)
    onSelect()
    emblaApi.on("reInit", onInit)
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect, onInit])

  return (
    <section className="col-span-full flex size-full flex-col items-start justify-center gap-[.9375rem]">
      <div className="flex items-center justify-center gap-[.4375rem]">
        <Icon path={mdiFolderHome} size={1.2} className="text-gray-19" />

        <h2 className="text-[22px] font-bold">Nearby Properties</h2>
      </div>
      <div
        ref={ref}
        className="flex w-full flex-col items-start justify-center gap-6"
      >
        {(isLoading || isFetching) && (
          <div className="flex w-full items-center justify-center">
            <PropertyCardSkeleton />
            <PropertyCardSkeleton className="hidden sm:flex" />
            <PropertyCardSkeleton className="hidden md:flex" />
            <PropertyCardSkeleton className="hidden xl:flex" />
          </div>
        )}
        {isError && (
          <span className="flex w-full items-center justify-center text-center font-semibold text-red-500">
            Something went wrong getting listings!
          </span>
        )}

        {data && data.length > 0 ? (
          <>
            <div
              className="flex w-full items-center justify-center overflow-hidden"
              ref={emblaRef}
            >
              <div className="flex size-full">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="relative flex w-full flex-[0_0_100%] items-stretch justify-center rounded-[.625rem] outline-none sm:flex-[0_0_50%] sm:px-[8px] md:flex-[0_0_33.333%] xl:flex-[0_0_25%]"
                  >
                    <PropertyCard variant="grid" key={index} data={item} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex h-3 w-full items-center justify-center gap-4 xl:hidden">
              {scrollSnaps.map((_, index) => (
                <CarouselDot
                  aria-label="nearby properties slide dot"
                  key={index}
                  index={index}
                  scrollTo={scrollTo}
                  selectedIndex={selectedIndex}
                />
              ))}
            </div>
          </>
        ) : (
          !isError &&
          !isLoading && (
            <span className="flex w-full items-start justify-start text-start font-medium text-gray-10">
              No nearby properties found.
            </span>
          )
        )}
      </div>
    </section>
  )
}

export default NearbyProperties
