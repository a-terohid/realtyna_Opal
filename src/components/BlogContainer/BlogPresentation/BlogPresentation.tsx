/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { mdiAccountCircle, mdiClock, mdiPlay } from "@mdi/js"
import Icon from "@mdi/react"
import dayjs from "dayjs"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import ReactPlayer from "react-player/lazy"

import placeholder from "@/assets/images/placeholder.png"
import { Button } from "@/components/common/Button"
import type { Post } from "@/types/blog.type"
import { cn } from "@/utils/helpers"

import PresentationSlider from "./PresentationSlider/PresentationSlider"

const BlogPresentation = ({
  presentationsData
}: {
  presentationsData: Array<Post>
}) => {
  const [mainSlide, setMainSlide] = useState(presentationsData[0])
  const [isPreview, setIsPreview] = useState(false)
  const [videoURL, setVideoURL] = useState<string | null>("")

  const playerRef = useRef<ReactPlayer>(null)

  function handleMainSlide(slide: Post) {
    setMainSlide(slide)
    playerRef?.current?.showPreview()
  }

  useEffect(() => {
    getVideUrl()
  }, [])

  function getVideUrl() {
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = mainSlide.content.rendered

    const videoElement = tempDiv.querySelector("video")

    if (videoElement) {
      const source = videoElement.querySelector("a")
      const srcValue =
        source && source.getAttribute("href") ? source.getAttribute("href") : ""
      setVideoURL(srcValue)
    } else {
      console.log("Video element not found")
    }
  }

  return (
    <section className="box-container relative flex w-full flex-col items-center justify-start gap-7">
      <h2 className="relative w-full text-center text-xl font-bold capitalize text-gray-21 md:text-3xl">
        Presentations
        <div className="bordered-text absolute inset-x-0 top-[-.625rem] mx-auto w-full text-4xl font-bold capitalize leading-[1.875rem] opacity-10 md:whitespace-nowrap md:text-6xl">
          Presentations
        </div>
      </h2>
      <div className="relative flex min-h-[650px] w-full flex-col items-center justify-between gap-16 overflow-hidden rounded-[26px] bg-cover bg-no-repeat px-4 pb-[44px] pt-[80px] shadow-services-video">
        {!isPreview && (
          <Image
            fill
            sizes="80vw"
            src={mainSlide.x_featured_media_original || placeholder}
            alt={mainSlide.title.rendered}
            className="inset-0 object-cover"
          />
        )}

        <div className="absolute inset-0 z-0 rounded-[26px] bg-presentationBgOverlay shadow-secondary" />
        {!isPreview && (
          <div className="z-[1] flex flex-col items-center justify-center gap-3">
            <span className="bg-secondary-gradient left-5 top-5 z-[1] flex h-[40px] w-[145px] select-none items-center justify-center rounded-full text-center text-base font-normal text-white shadow-primary">
              Presentations
            </span>

            <h2 className="text-center text-3xl font-bold text-white">
              {mainSlide.title.rendered}
            </h2>
            <div
              className={cn(
                "flex items-start justify-start gap-3 pt-3 text-[13px] font-normal text-white opacity-[85%]"
              )}
            >
              <div className="flex items-center justify-center gap-1 capitalize">
                <Icon
                  size={0.9}
                  path={mdiAccountCircle}
                  className="text-gray-3"
                />
                <span className="capitalize">{mainSlide.x_author}</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <Icon size={0.88} path={mdiClock} className="text-gray-3" />
                <span>{dayjs(mainSlide.date).format("MMM, D, YYYY")}</span>
              </div>
            </div>
          </div>
        )}
        <ReactPlayer
          url={videoURL || ""}
          light
          ref={playerRef}
          onClickPreview={() => {
            setIsPreview(true)
          }}
          onEnded={() => {
            setIsPreview(false)
            playerRef && playerRef.current && playerRef.current.showPreview()
          }}
          controls
          playIcon={
            <Button
              aria-label="play button"
              size={"icon"}
              gradient={"transparent"}
              customBg="bg-transparent"
              customHoverBg="bg-transparent"
              className="z-[1] aspect-square size-[65px] rounded-full bg-white ring-2 ring-white ring-offset-2 ring-offset-transparent"
            >
              <Icon path={mdiPlay} size={1.2} className="text-secondary-1" />
            </Button>
          }
          className={`absolute top-0 flex !h-full !w-full items-end justify-center`}
        />
        {!isPreview && (
          <PresentationSlider
            presentationsData={presentationsData}
            mainSlide={mainSlide}
            handleMainSlide={handleMainSlide}
          />
        )}
      </div>

      {/*  <Button
        gradient="neutral"
        className='ring-offset-4 ring-1 ring-gray-12'
      >
        Show More
      </Button> */}
    </section>
  )
}

export default BlogPresentation
