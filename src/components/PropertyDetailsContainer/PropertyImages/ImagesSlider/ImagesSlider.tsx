/* eslint-disable react-hooks/exhaustive-deps */
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import React, { useCallback, useEffect, useState } from "react"
import ImageWithFallback from "@/components/common/ImageWithFallback"


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/common/Dialog"
import type { ListingsValue, Media } from "@/types/listings.type"
import { cn } from "@/utils/helpers"

interface IProps {
  images: Media[]
  blurredImages: string
  details: ListingsValue
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ImagesSlider: React.FC<IProps> = ({
  blurredImages,
  images,
  isOpen,
  setIsOpen,
  details
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ watchResize: true })
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true
  })

  useEffect(() => {
    setTimeout(() => emblaMainApi && emblaMainApi.reInit(), 200)
  }, [isOpen, emblaMainApi])

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on("select", onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex w-full flex-col items-center justify-between gap-4 rounded-[15px] ">
        <DialogHeader>
          <DialogTitle>{details.UnparsedAddress} Gallery</DialogTitle>
        </DialogHeader>
        <div className="size-full overflow-hidden" ref={emblaMainRef}>
          <div className="flex size-full">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative flex flex-[0_0_100%] cursor-grab items-center justify-center rounded-[.625rem] px-[3px] outline-none"
              >
                <div className="absolute right-3 top-3 z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-4/20 p-2 text-lg text-black">
                  {image.Order}
                </div>
                <div className="relative block size-full min-h-[60dvh] md:min-h-[70dvh]">
                  <ImageWithFallback
                    placeholder={blurredImages ? "blur" : "empty"}
                    fill={true}
                    blurDataURL={blurredImages}
                    sizes="(max-width: 1024px) 80vw, (max-width: 1280px) 60vw, 50vw"
                    src={image.MediaURL}
                    alt="Selected Image"
                    className="rounded-xl bg-gray-100 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="flex w-full items-center justify-center overflow-hidden"
          ref={emblaThumbsRef}
        >
          <div className="flex size-full gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => onThumbClick(index)}
                className="relative flex h-20 flex-[0_0_25%] cursor-pointer items-stretch justify-center rounded-[.625rem] outline-none sm:flex-[0_0_20%] md:flex-[0_0_15%] lg:flex-[0_0_10%] xl:flex-[0_0_8%]"
              >
                <div className="absolute right-2 top-2 z-10 flex size-6 shrink-0 items-center justify-center rounded-full bg-gray-4/20 p-2 text-base text-gray-19">
                  {image.Order}
                </div>
                <ImageWithFallback
                  placeholder={blurredImages ? "blur" : "empty"}
                  fill={true}
                  src={image.Thumbnail}
                  sizes="20vw"
                  blurDataURL={blurredImages}
                  alt="Selected Image"
                  className={cn(
                    "h-full w-full rounded-xl object-cover opacity-30",
                    index === selectedIndex && "opacity-100"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImagesSlider
