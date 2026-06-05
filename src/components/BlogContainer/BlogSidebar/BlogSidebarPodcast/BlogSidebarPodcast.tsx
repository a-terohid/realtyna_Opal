"use client"

import { mdiPlay } from "@mdi/js"
import Icon from "@mdi/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { HTMLReactParserOptions } from "html-react-parser"
import parser, { domToReact, Element } from "html-react-parser"
import Image from "next/image"
import { useState } from "react"
import ReactPlayer from "react-player/lazy"

import { Button } from "@/components/common/Button"
import { Skeleton } from "@/components/common/Skeleton"
import placeholder from "@/assets/images/placeholder.png"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { cn } from "@/utils/helpers"

const BlogSidebarPodcast = () => {
  const [podcastURL, setPodcastURL] = useState<string>("")
  const [isStarted, setIsStarted] = useState(false)
  const [isInView, ref] = useIntersectionObserver()

  const { data, isLoading } = useQuery({
    queryKey: ["blog-sidebar-podcast"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/podcasts`
      )
      const data = res.data

      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = data[0].content.rendered

      const audioElement = tempDiv.querySelector("audio")

      if (audioElement) {
        const source = audioElement.querySelector("a")
        const srcValue = source?.getAttribute("href") as string
        setPodcastURL(srcValue)
      } else {
        console.log("Audio element not found")
      }

      return data
    },
    enabled: isInView
  })

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === "p") {
        return (
          <span
            className={cn(
              "line-clamp-2 max-w-[60%] text-sm font-normal text-[#EBEBEB]"
            )}
          >
            {domToReact(domNode.children, options)}
          </span>
        )
      }
    }
  }

  return (
    <div
      ref={ref}
      className="flex w-full flex-col items-start justify-start gap-[10px] rounded-[15px] p-3 shadow-primary"
    >
      <div className="flex w-full items-center justify-center gap-2">
        <span className="whitespace-nowrap text-lg font-bold text-black">
          Podcast Of The Week
        </span>
        <span className='flex w-full items-center justify-center after:block after:h-px after:w-full after:bg-black after:opacity-30 after:content-[""]' />
      </div>
      {isLoading && (
        <>
          <Skeleton className="h-[145px] w-full rounded-xl" />
          <Skeleton className="h-[30px] w-full rounded-xl" />
        </>
      )}
      {podcastURL && (
        <div
          style={{
            backgroundImage: `url(${data[0].x_featured_media_original || placeholder.src})`
          }}
          className="relative flex size-full items-center justify-center overflow-hidden rounded-[15px] bg-cover bg-center bg-no-repeat shadow-primary"
        >
          {isStarted && (
            <div className="absolute inset-0 mx-auto flex w-full flex-col items-start justify-start gap-2 p-3 text-white backdrop-blur-sm">
              <span className="text-base font-semibold">
                {data[0].title.rendered}
              </span>
              {parser(data[0].excerpt.rendered, options)}
              <div className="flex w-full flex-wrap items-center justify-start gap-2">
                {data[0].x_tags &&
                  data[0].x_tags
                    .split(",")
                    .map((tag: string, index: number) => (
                      <span
                        className="bg-neutral-gradient rounded-full px-3 py-1 text-xs "
                        key={index}
                      >
                        {tag}
                      </span>
                    ))}
              </div>
            </div>
          )}
          <ReactPlayer
            url={podcastURL}
            light={
              <Image
                src={data[0].x_featured_media_original || placeholder}
                sizes="(max-width: 576px) 80vw, 25vw"
                alt="video_of_the_week"
                fill
                className="object-cover blur-sm"
              />
            }
            onStart={() => setIsStarted(true)}
            controls
            playIcon={
              <Button
                aria-label="play / pause"
                size={"icon"}
                className="bg-primary-gradient z-0 size-[45px]"
              >
                <Icon path={mdiPlay} size={1} />
              </Button>
            }
            className={`relative flex !h-[175px] !w-full items-end justify-center [&>audio]:m-2 [&>audio]:!h-[30px] [&>div]:relative`}
          />
        </div>
      )}
    </div>
  )
}

export default BlogSidebarPodcast
