"use client"

import { mdiNewspaper } from "@mdi/js"
import Icon from "@mdi/react"
import { useQuery } from "@tanstack/react-query"
import { type EmblaCarouselType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react"

import BlogCard from "@/components/common/BlogCard/BlogCard"
import BlogCardSkeleton from "@/components/common/BlogCard/BlogCardSkeleton"
import CarouselDot from "@/components/common/CarouselDot/CarouselDot"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { getBlogPosts } from "@/services/blog/getBlogPosts"
import type { Post } from "@/types/blog.type"
import { cn } from "@/utils/helpers"

const BlogPostRelatedNews = () => {
  const [isInView, ref] = useIntersectionObserver()

  const { data, isLoading } = useQuery({
    queryKey: ["homeListings"],
    queryFn: async () => {
      const res = await getBlogPosts({
        query: "/wp-json/wp/v2/news/?per_page=6"
      })
      const data = res.data
      return data
    },
    enabled: isInView
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: "auto"
  })
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
    <section
      ref={ref}
      className="flex w-full flex-col items-start justify-start gap-3 overflow-hidden"
    >
      <div className="flex items-center justify-center gap-1 px-3 sm:px-0">
        <Icon path={mdiNewspaper} size={1} className="text-primary-1" />
        <h2 className="text-lg font-bold text-black">Related News</h2>
      </div>

      {isLoading && (
        <div className="flex w-full items-center justify-center gap-6">
          <BlogCardSkeleton />
          <BlogCardSkeleton className="hidden lg:flex" />
        </div>
      )}
      {data && data.length > 0 && (
        <>
          <div
            className="flex w-full items-center justify-center overflow-hidden"
            ref={emblaRef}
          >
            <div className="flex size-full">
              {data.map((item: Post, index: number) => (
                <div
                  key={index}
                  className="relative flex flex-[0_0_100%] items-stretch justify-center rounded-[.625rem] px-2 pb-4 outline-none lg:flex-[0_0_50%]"
                >
                  <BlogCard
                    isShowingBadge={false}
                    isShowingDesc={false}
                    variant="stack"
                    data={item}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex h-3 w-full items-center justify-center gap-4">
            {scrollSnaps.map((_, index) => (
              <CarouselDot
                aria-label="blog post slide dot"
                key={index}
                index={index}
                scrollTo={scrollTo}
                selectedIndex={selectedIndex}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default BlogPostRelatedNews
