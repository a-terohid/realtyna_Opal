"use client"

import { mdiPlay } from "@mdi/js"
import Icon from "@mdi/react"
import { useRef } from "react"
import ReactPlayer from "react-player"

import { Button } from "@/components/common/Button"

const HomeVideo = ({ video }: { video: string }) => {
  const videoRef = useRef<HTMLDivElement | null>(null)

  return (
    <div
      ref={videoRef}
      className="box-container z-[1] mx-1 mb-[-240px] flex w-full items-center justify-center rounded-[2.125rem]"
    >
      <ReactPlayer
        url={video}
        /*  light={
          <Image
            src={
              ""
            }
            alt="homepage_video_cover"
            fill
            sizes="50vw"
            className="aspect-video bg-white object-cover"
          />
        } */
        controls
        playIcon={
          <Button
            aria-label="play / pause"
            size={"icon"}
            className="z-0 size-[45px] bg-secondary-1 md:size-[65px]"
          >
            <Icon path={mdiPlay} size={1.2} />
          </Button>
        }
        className="relative aspect-video !h-full !w-full overflow-hidden rounded-[30px] bg-white shadow-services-video lg:!w-[850px] [&>div]:relative"
      />
    </div>
  )
}

export default HomeVideo
