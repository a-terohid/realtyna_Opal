"use client"

import { type EmblaCarouselType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react"

import CarouselDot from "@/components/common/CarouselDot/CarouselDot"
import HomeSectionTitle from "@/components/common/HomeSectionTitle/HomeSectionTitle"
import { agentsInfo } from "@/data/agents_data"
import type { Section } from "@/types/site-settings.type"
import { cn } from "@/utils/helpers"

import AgentCard from "./AgentCard/AgentCard"

interface IProps {
  data: Section
}

const FeaturedAgents: React.FC<IProps> = ({ data }) => {
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
    inViewThreshold: 1
  })

  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(0)

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const scrollTo = useCallback(
    (index: number) => embla && embla.scrollTo(index),
    [embla]
  )

  useEffect(() => {
    const onSelect = () => {
      setSelectedIndex(embla?.selectedScrollSnap())
    }
    if (embla) {
      embla.on("select", onSelect)
      onInit(embla)
      onSelect()
    }
    return () => embla && embla.destroy()
  }, [embla, onInit])

  return (
    <section className="relative flex w-full max-w-[1000px] flex-col items-center justify-center gap-y-0 text-center">
      <HomeSectionTitle title={data.title} borderedTitle={data.shadowTitle} />

      <div className="w-full overflow-hidden py-10" ref={emblaRef}>
        <div className="flex w-full touch-pan-y">
          {[...agentsInfo.featured, ...agentsInfo.simple]
            .slice(0, 5)
            .map((item, index) => (
              <div
                aria-disabled={
                  selectedIndex === index - 1 || selectedIndex === index + 1
                }
                className={cn(
                  "ml-[0] flex min-w-max max-w-max flex-[0_0_40%] items-center justify-center opacity-0 transition-opacity duration-300 sm:basis-[50%]",
                  selectedIndex === index && "z-[1] opacity-100",
                  selectedIndex === index - 1 && "opacity-70 [&>div]:scale-90",
                  selectedIndex === index + 1 && "opacity-70 [&>div]:scale-90",
                  selectedIndex === 4 &&
                    index === 0 &&
                    "opacity-70  [&>div]:scale-90",
                  selectedIndex === 0 &&
                    index === 4 &&
                    "opacity-70  [&>div]:scale-90"
                )}
                key={index}
              >
                <AgentCard key={index} agent={item} />
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
    </section>
  )
}

export default FeaturedAgents
