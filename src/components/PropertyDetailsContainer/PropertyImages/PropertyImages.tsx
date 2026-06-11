"use client"

import Image from "next/image"
import React, { useState } from "react"

import PlaceholderImage from "@/assets/images/placeholder.png"
import useWindowSize from "@/hooks/useWindowSize"
import type { ListingsValue } from "@/types/listings.type"
import { cn } from "@/utils/helpers"

import ImagesSlider from "./ImagesSlider/ImagesSlider"
import ShowMoreOverlay from "./ShowMoreOverlay/ShowMoreOverlay"

export interface Images {
  Order: number
  MediaURL: string
  ClassName: string | null
  MediaType: string
  Thumbnail: string
  ResourceName: string
  MediaCategory: string
  MediaObjectID: string
  ResourceRecordKey: string
}

interface IProps {
  details: ListingsValue & { blurredData: string }
}

const PropertyImages: React.FC<IProps> = ({ details }) => {
  const [isOpen, setIsOpen] = useState(false)

  const { width } = useWindowSize()

  // Fix Cannot assign to read only property '0' of object '[object Array]'
  const propertyDetails = [...details.Media]

  // Sort images by Order number
  const sortedImages = propertyDetails?.sort((a, b) => a.Order - b.Order)
  
  return (
    <section className="relative col-span-full grid h-[445px] w-full grid-cols-4 gap-[.77rem]">
      <ImagesSlider
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        details={details}
        images={sortedImages}
        blurredImages={details.blurredData}
      />
      <div className="relative col-span-full h-full rounded-[15px] md:col-span-3 lg:col-span-2 xl:col-span-1">
        <div className="relative flex size-full items-center justify-center rounded-[15px] shadow-primary">
          {sortedImages.length > 1 && width && width <= 767 && (
            <ShowMoreOverlay
              setIsOpen={setIsOpen}
              imagesLength={sortedImages.length}
            />
          )}

          <Image
            onClick={() => setIsOpen(true)}
            priority={true}
            src={sortedImages[0] ? sortedImages[0].MediaURL : PlaceholderImage}
            sizes="(max-width: 767px) 100vw, (max-width: 1024px) 75vw, (max-width: 1280px) 50vw, 25vw"
            placeholder={details.blurredData ? "blur" : "empty"}
            fill
            blurDataURL={details.blurredData}
            alt="property"
            className={cn(
              "rounded-[.9375rem] object-cover",
              sortedImages[0] && "cursor-pointer"
            )}
          />
        </div>
      </div>
      <div className="col-span-1 hidden h-full flex-col justify-between md:flex">
        <div className="relative h-[13.305rem] rounded-[.9375rem] shadow-primary">
          <Image
            onClick={() => setIsOpen(true)}
            src={sortedImages[1] ? sortedImages[1].MediaURL : PlaceholderImage}
            priority={true}
            sizes="(max-width: 767px) 0vw, 25vw"
            fill
            placeholder={details.blurredData ? "blur" : "empty"}
            blurDataURL={details.blurredData}
            alt="property"
            className={cn(
              "h-full w-full rounded-[.9375rem] object-cover",
              sortedImages[1] && "cursor-pointer"
            )}
          />
        </div>
        <div className="relative h-[13.8056rem] rounded-[.9375rem] shadow-primary">
          {sortedImages.length > 1 && width && width <= 1023 && (
            <ShowMoreOverlay
              setIsOpen={setIsOpen}
              imagesLength={sortedImages.length}
            />
          )}
          <Image
            onClick={() => setIsOpen(true)}
            priority={true}
            sizes="(max-width: 767px) 0vw, 25vw"
            src={sortedImages[2] ? sortedImages[2].MediaURL : PlaceholderImage}
            placeholder={details.blurredData ? "blur" : "empty"}
            fill
            blurDataURL={details.blurredData}
            alt="property"
            className={cn(
              "h-full w-full rounded-[.9375rem] object-cover",
              sortedImages[2] && "cursor-pointer"
            )}
          />
        </div>
      </div>
      <div className="col-span-1 hidden h-full flex-col justify-between lg:flex">
        <div className=" relative h-[17.6788rem] rounded-[.9375rem] shadow-primary">
          <Image
            onClick={() => setIsOpen(true)}
            priority={true}
            fill
            sizes="(max-width: 1023px) 0vw, 25vw"
            placeholder={details.blurredData ? "blur" : "empty"}
            src={sortedImages[3] ? sortedImages[3].MediaURL : PlaceholderImage}
            alt="property"
            blurDataURL={details.blurredData}
            className={cn(
              "h-full w-full rounded-[.9375rem] object-cover",
              sortedImages[3] && "cursor-pointer"
            )}
          />
        </div>
        <div className="relative h-[9.2456rem] rounded-[.9375rem] shadow-primary">
          {sortedImages.length > 1 && width && width <= 1279 && (
            <ShowMoreOverlay
              setIsOpen={setIsOpen}
              imagesLength={sortedImages.length}
            />
          )}
          <Image
            onClick={() => setIsOpen(true)}
            priority={true}
            sizes="(max-width: 1023px) 0vw, 25vw"
            fill
            src={sortedImages[4] ? sortedImages[4].MediaURL : PlaceholderImage}
            blurDataURL={details.blurredData}
            placeholder={details.blurredData ? "blur" : "empty"}
            alt="property"
            className={cn(
              "h-full w-full rounded-[.9375rem] object-cover",
              sortedImages[4] && "cursor-pointer"
            )}
          />
        </div>
      </div>
      <div className="col-span-2 hidden h-full flex-col justify-between lg:col-span-1 xl:flex">
        <div className="relative h-[13.4931rem] rounded-[.9375rem] shadow-primary">
          <Image
            onClick={() => setIsOpen(true)}
            priority={true}
            sizes="(max-width: 1279px) 0vw, 25vw"
            fill
            src={sortedImages[5] ? sortedImages[5].MediaURL : PlaceholderImage}
            placeholder={details.blurredData ? "blur" : "empty"}
            alt="property"
            blurDataURL={details.blurredData}
            className={cn(
              "h-full w-full rounded-[.9375rem] object-cover",
              sortedImages[5] && "cursor-pointer"
            )}
          />
        </div>
        <div className="relative flex h-[13.4931rem] items-center justify-center rounded-[.9375rem] shadow-primary">
          {sortedImages.length > 1 && width && width > 1279 && (
            <ShowMoreOverlay
              setIsOpen={setIsOpen}
              imagesLength={sortedImages.length}
            />
          )}
          <Image
            onClick={() => setIsOpen(true)}
            priority={true}
            sizes="(max-width: 1279px) 0vw, 25vw"
            fill
            src={sortedImages[6] ? sortedImages[6].MediaURL : PlaceholderImage}
            placeholder={details.blurredData ? "blur" : "empty"}
            blurDataURL={details.blurredData}
            alt="property"
            className={cn(
              "h-full w-full rounded-[.9375rem] object-cover",
              sortedImages[6] && "cursor-pointer"
            )}
          />
        </div>
      </div>
    </section>
  )
}

export default PropertyImages
