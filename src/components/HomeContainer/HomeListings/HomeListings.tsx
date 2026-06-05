"use client"

import { mdiHomeGroupPlus } from "@mdi/js"
import Icon from "@mdi/react"
import { useQuery } from "@tanstack/react-query"
import type { EmblaCarouselType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import Link from "next/link"
import buildQuery from "odata-query"
import React, { useCallback, useEffect, useState } from "react"

import { Button } from "@/components/common/Button"
import CarouselDot from "@/components/common/CarouselDot/CarouselDot"
import HomeSectionTitle from "@/components/common/HomeSectionTitle/HomeSectionTitle"
import PropertyCard from "@/components/common/PropertyCard/PropertyCard"
import PropertyCardSkeleton from "@/components/common/PropertyCard/PropertyCardSkeleton"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { getListingsData } from "@/services/listings/getListings"
import type { THomeData } from "@/types/site-settings.type"
import { cn } from "@/utils/helpers"

interface IProps {
  isServicesExist: boolean
  data: THomeData["listings"]
}

const HomeListings: React.FC<IProps> = ({ isServicesExist, data }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const [isInView, ref] = useIntersectionObserver()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: "auto"
  })

  const {
    data: listingsData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["homeListings"],
    queryFn: async () => {
      const generateQuery = buildQuery({
        top: 8,
        orderBy: "OriginalEntryTimestamp desc",
        select: "ALL"
      })

      const listings = await getListingsData({ query: generateQuery })

      return listings
    },
    enabled: isInView
  })

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
    <section
      className={cn(
        "relative flex min-h-[400px] w-full items-start justify-center bg-[#F4F4F4] pb-[120px] pt-[140px]",
        isServicesExist && "pt-[80px]"
      )}
    >
      <svg
        className={cn(
          "absolute top-0 h-20 w-full bg-[#F4F4F4] fill-white",
          isServicesExist && "fill-[#F4F4F4]"
        )}
        role="presentation"
        preserveAspectRatio="none"
        version="1.1"
        viewBox="0 0 1600 200"
      >
        <path
          d="M0,0l133.3,22.4C266.7,43.9,533.3,90,800,89.3c266.7,0.6,533.3-45.4,666.7-66.9L1600,0v200H0L0,0z M1600,0H0
	v200h1600V0z"
        />
      </svg>

      <>
        <div
          ref={ref}
          className="box-container flex w-full flex-col items-center justify-start gap-6"
        >
          <HomeSectionTitle
            titleClassName="mt-[36px]"
            title={data.title}
            borderedTitle={data.shadowTitle}
          />

          {(listingsData || isLoading) && (
            <>
              <div
                className="flex w-full items-center justify-center overflow-hidden"
                ref={emblaRef}
              >
                <div className="flex size-full ">
                  {isError && (
                    <span className="col-span-full flex w-full items-center justify-center text-center font-semibold text-red-500">
                      Something went wrong getting listings!
                    </span>
                  )}
                  {isLoading && (
                    <div className="flex w-full items-center justify-center gap-4 [&>*:nth-child(1)]:flex sm:[&>*:nth-child(2)]:flex md:[&>*:nth-child(3)]:flex xl:[&>*:nth-child(4)]:flex [&>*]:hidden ">
                      <PropertyCardSkeleton />
                      <PropertyCardSkeleton />
                      <PropertyCardSkeleton />
                      <PropertyCardSkeleton />
                    </div>
                  )}

                  {listingsData &&
                    listingsData.value &&
                    listingsData.value.length > 0 &&
                    listingsData.value.map((item, index: number) => (
                      <div
                        key={index}
                        className="relative flex w-full flex-[0_0_100%] items-stretch justify-center rounded-[.625rem] outline-none sm:w-2/4 sm:flex-[0_0_50%] sm:px-[8px] md:w-1/3 md:flex-[0_0_33.333%] xl:w-1/4 xl:flex-[0_0_25%]"
                      >
                        <PropertyCard data={item} variant="grid" />
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex h-3 w-full items-center justify-center gap-4">
                {scrollSnaps.map((_, index) => (
                  <CarouselDot
                    aria-label="listings slide dot"
                    key={index}
                    index={index}
                    scrollTo={scrollTo}
                    selectedIndex={selectedIndex}
                  />
                ))}
              </div>
            </>
          )}
          <svg
            version="1.1"
            className="absolute bottom-0 -mb-px w-full bg-transparent fill-white"
            id="Layer_1"
            role="presentation"
            preserveAspectRatio="none"
            viewBox="0 0 1600 89.3"
          >
            <path
              d="M0,0l133.3,22.4C266.7,43.9,533.3,90,800,89.3c266.7,0.6,533.3-45.4,666.7-66.9L1600,0v89.3
	            c0,0-516.6,0-783.3,0C550,89.3,0,89.3,0,89.3V0z"
            />
          </svg>
        </div>
        <Button
          gradient="secondary"
          size={"icon"}
          asChild
          className="absolute bottom-[-20px] size-14 text-white"
        >
          <Link
            title="listings page"
            aria-label="listings page link"
            href={"/listings"}
          >
            <Icon path={mdiHomeGroupPlus} size={1.3} />
          </Link>
        </Button>
      </>
    </section>
  )
}

export default HomeListings
