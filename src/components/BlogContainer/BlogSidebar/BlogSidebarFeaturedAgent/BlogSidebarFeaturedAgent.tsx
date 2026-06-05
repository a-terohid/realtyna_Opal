"use client"

import { type EmblaCarouselType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react"

import CarouselDot from "@/components/common/CarouselDot/CarouselDot"
import { agentsInfo } from "@/data/agents_data"
import { cn } from "@/utils/helpers"

import BlogSidebarAgentCard from "./BlogSidebarAgentCard/BlogSidebarAgentCard"

const BlogSidebarFeaturedAgent = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
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
    <div className="flex w-full flex-col items-start justify-start gap-[10px] overflow-hidden rounded-[15px] p-3 shadow-primary">
      <div className="flex w-full items-center justify-center gap-2">
        <span className="whitespace-nowrap text-lg font-bold text-black">
          Featured Agents
        </span>
        <span className='flex w-full items-center justify-center after:block after:h-px after:w-full after:bg-black after:opacity-30 after:content-[""]' />
      </div>
      <div
        className="flex w-full items-center justify-center overflow-hidden"
        ref={emblaRef}
      >
        <div className="flex size-full">
          {[...agentsInfo.featured, ...agentsInfo.simple].map((item, index) => (
            <div
              key={index}
              className="relative flex flex-[0_0_100%] items-stretch justify-center rounded-[.625rem] outline-none"
            >
              <BlogSidebarAgentCard agent={item} key={index} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex h-3 w-full items-center justify-center gap-4">
        {scrollSnaps.map((_, index) => (
          <CarouselDot
            aria-label="agent slide dot"
            key={index}
            index={index}
            scrollTo={scrollTo}
            selectedIndex={selectedIndex}
          />
        ))}
      </div>
    </div>
  )
}

export default BlogSidebarFeaturedAgent
