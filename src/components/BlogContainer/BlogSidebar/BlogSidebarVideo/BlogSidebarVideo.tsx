"use client"

import { mdiPlay } from "@mdi/js"
import Icon from "@mdi/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import ReactPlayer from "react-player/lazy"

import placeholder from "@/assets/images/placeholder.png"
import { Button } from "@/components/common/Button"
import { Skeleton } from "@/components/common/Skeleton"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"

const BlogSidebarVideo = () => {
  const [videoURL, setVideoURL] = useState<string>()
  const [isInView, ref] = useIntersectionObserver()

  const { data, isLoading } = useQuery({
    queryKey: ["blog-sidebar-video"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/videos`
      )
      const data = res.data

      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = data[0].content.rendered

      const videoElement = tempDiv.querySelector("video")

      if (videoElement) {
        const source = videoElement.querySelector("a")
        const srcValue = source?.getAttribute("href") as string
        setVideoURL(srcValue)
      } else {
        console.log("Video element not found")
      }

      return data
    },
    enabled: isInView
  })

  return (
    <div
      ref={ref}
      className="flex w-full flex-col items-start justify-start gap-[.625rem] rounded-[15px] p-3 shadow-primary"
    >
      <div className="flex w-full items-center justify-center gap-2">
        <span className="whitespace-nowrap text-lg font-bold text-black">
          Video Of The Week
        </span>
        <span className='flex w-full items-center justify-center after:block after:h-px after:w-full after:bg-black after:opacity-30 after:content-[""]' />
      </div>
      {isLoading && (
        <>
          <Skeleton className="h-[145px] w-full rounded-xl" />
          <Skeleton className="h-[30px] w-full rounded-xl" />
        </>
      )}
      {videoURL && (
        <ReactPlayer
          url={videoURL}
          light={
            <Image
              src={data[0].x_featured_media_original || placeholder}
              alt="video_of_the_week"
              sizes="(max-width: 576px) 80vw, 25vw"
              fill
              className="w-full object-cover"
            />
          }
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
          className="relative !h-[175px] !w-full overflow-hidden rounded-[15px] shadow-primary [&>div]:relative [&>video]:aspect-video"
        />
      )}
    </div>
  )
}

export default BlogSidebarVideo
