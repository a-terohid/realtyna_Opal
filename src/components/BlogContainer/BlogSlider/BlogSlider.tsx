"use client"

import { type EmblaCarouselType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import React, { useCallback, useEffect, useState } from "react"

import BlogCard from "@/components/common/BlogCard/BlogCard"
import CarouselDot from "@/components/common/CarouselDot/CarouselDot"
import type { Post } from "@/types/blog.type"
import { cn } from "@/utils/helpers"

interface IProps {
  blogData: Array<Post>
}

const BlogSlider: React.FC<IProps> = ({ blogData }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true
  })
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onInit(emblaApi)
    onSelect()
    emblaApi.on("reInit", onInit)
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect, onInit])

  return (
    <section className="flex w-full flex-col items-center justify-center gap-y-8 text-center ">
      <div
        className="flex w-full items-center justify-center overflow-hidden"
        ref={emblaRef}
      >
        <div className="flex size-full">
          {blogData.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-[0_0_100%] items-stretch justify-center rounded-[.625rem] px-4 outline-none sm:flex-[0_0_70%] md:flex-[0_0_60%]"
            >
              <BlogCard priority={true} variant="overlay" data={item} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex h-3 w-full items-center justify-center gap-4">
        {scrollSnaps.map((_, index) => (
          <CarouselDot
            aria-label="blog slide dot"
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

export default BlogSlider
