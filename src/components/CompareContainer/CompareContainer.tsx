"use client"

import { type EmblaCarouselType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react"

import useStore from "@/store/useStore"

import CarouselDot from "../common/CarouselDot/CarouselDot"
import CmpAddressMap from "./CmpAddressMap/CmpAddressMap"
import CmpBasicDetails from "./CmpBasicDetails/CmpBasicDetails"
import CmpFeatures from "./CmpFeatures/CmpFeatures"
import CmpProperties from "./CmpProperties/CmpProperties"

const CompareContainer = () => {
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const compareList = useStore((state) => state.compareList)

  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ dragFree: true })
  const [emblaAddressRef, emblaAddressApi] = useEmblaCarousel({
    dragFree: true
  })
  const [emblaBasicRef, emblaBasicApi] = useEmblaCarousel({ dragFree: true })
  const [emblaFeaturesRef, emblaFeaturesApi] = useEmblaCarousel({
    dragFree: true
  })

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaMainApi) emblaMainApi.scrollTo(index)
      if (emblaAddressApi) emblaAddressApi.scrollTo(index)
      if (emblaBasicApi) emblaBasicApi.scrollTo(index)
      if (emblaFeaturesApi) emblaFeaturesApi.scrollTo(index)
    },
    [emblaMainApi, emblaAddressApi, emblaBasicApi, emblaFeaturesApi]
  )

  const onInit = useCallback((api: EmblaCarouselType) => {
    return () => {
      setScrollSnaps(api.scrollSnapList())
    }
  }, [])

  const onSelect = useCallback(
    (api: EmblaCarouselType) => {
      return () => {
        if (!api) return
        setSelectedIndex(api.selectedScrollSnap())
        if (emblaMainApi) emblaMainApi.scrollTo(api.selectedScrollSnap())
        if (emblaAddressApi) emblaAddressApi.scrollTo(api.selectedScrollSnap())
        if (emblaBasicApi) emblaBasicApi.scrollTo(api.selectedScrollSnap())
        if (emblaFeaturesApi)
          emblaFeaturesApi.scrollTo(api.selectedScrollSnap())
      }
    },
    [
      emblaMainApi,
      emblaAddressApi,
      emblaBasicApi,
      emblaFeaturesApi,
      setSelectedIndex
    ]
  )

  useEffect(() => {
    if (emblaMainApi) {
      onInit(emblaMainApi)()
      onSelect(emblaMainApi)()
      emblaMainApi.on("reInit", onInit(emblaMainApi))
      emblaMainApi.on("select", onSelect(emblaMainApi))
      emblaMainApi.on("reInit", onSelect(emblaMainApi))
    }
    if (emblaAddressApi) {
      emblaAddressApi.on("select", onSelect(emblaAddressApi))
      emblaAddressApi.on("reInit", onSelect(emblaAddressApi))
    }
    if (emblaBasicApi) {
      emblaBasicApi.on("select", onSelect(emblaBasicApi))
      emblaBasicApi.on("reInit", onSelect(emblaBasicApi))
    }
    if (emblaFeaturesApi) {
      emblaFeaturesApi.on("select", onSelect(emblaFeaturesApi))
      emblaFeaturesApi.on("reInit", onSelect(emblaFeaturesApi))
    }
  }, [
    emblaMainApi,
    emblaAddressApi,
    emblaBasicApi,
    emblaFeaturesApi,
    onSelect,
    onInit
  ])

  return (
    <div className="relative flex w-full flex-col items-center justify-start gap-[3.125rem]">
      <div className="absolute right-1 top-2 z-[1] flex h-4 w-full items-center justify-end gap-2 ">
        {scrollSnaps.map((_, index) => (
          <CarouselDot
            aria-label="compare slide dot"
            key={index}
            index={index}
            scrollTo={scrollTo}
            selectedIndex={selectedIndex}
          />
        ))}
      </div>
      <CmpProperties compareList={compareList} ref={emblaMainRef} />
      <CmpAddressMap compareList={compareList} ref={emblaAddressRef} />
      <CmpBasicDetails compareList={compareList} ref={emblaBasicRef} />
      <CmpFeatures compareList={compareList} ref={emblaFeaturesRef} />
    </div>
  )
}

export default CompareContainer
