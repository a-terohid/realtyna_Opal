import Image from "next/image"
import React from "react"

import floor1_img from "@/assets/images/floor1.webp"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/common/Accordion"
import { Button } from "@/components/common/Button"
import type { ListingsValue } from "@/types/listings.type"
import { cn } from "@/utils/helpers"

interface IProps {
  details: ListingsValue
}

const plans = [
  {
    id: "1",
    floor: "First Floor",
    beds: "3",
    baths: "3",
    sqft: "635",
    meter: "52.4",
    image: floor1_img,
    description:
      "A Real Estate Floor Plan Is A Drawing To Scale That Shows The Property As Seen From Above. It Shows The Relationship Between Rooms And Spaces And The Overall",
    location: "Resident B",
    price: "125000",
    parking: "yes"
  },
  {
    id: "2",
    floor: "Second Floor",
    beds: "3",
    baths: "3",
    sqft: "635",
    meter: "52.4",
    image: floor1_img,
    description:
      "A Real Estate Floor Plan Is A Drawing To Scale That Shows The Property As Seen From Above. It Shows The Relationship Between Rooms And Spaces And The Overall",
    location: "Resident B",
    price: "125000",
    parking: "yes"
  },
  {
    id: "3",
    floor: "Third Floor",
    beds: "3",
    baths: "3",
    sqft: "635",
    meter: "52.4",
    image: floor1_img,
    description:
      "A Real Estate Floor Plan Is A Drawing To Scale That Shows The Property As Seen From Above. It Shows The Relationship Between Rooms And Spaces And The Overall",
    location: "Resident B",
    price: "125000",
    parking: "yes"
  }
]

const PropertyPlan: React.FC<IProps> = ({ details }) => {
  return (
    <section className="col-span-full flex flex-col items-start justify-center gap-[.875rem]">
      <h2 className="text-2xl font-bold text-black">Floor Plan</h2>
      <Accordion
        type="single"
        collapsible
        className="flex w-full flex-col items-center justify-center gap-5"
      >
        {plans.map((data, index) => (
          <AccordionItem
            key={index}
            className="w-full gap-[1.5625rem] rounded-[.9375rem] p-[.625rem] shadow-primary sm:p-[.9375rem]"
            value={`item-${index + 1}`}
          >
            <AccordionTrigger className="gap-3 p-0">
              <div className="flex w-full items-start justify-between">
                <span className="text-base font-normal">{data.floor}</span>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-normal text-gray-16">
                    Beds:
                    <span className="text-black">{details.BedroomsTotal}</span>
                  </span>
                  <span className="text-sm font-normal text-gray-16">
                    Baths:
                    <span className="text-black">
                      {details.BathroomsTotalInteger}
                    </span>
                  </span>
                  <span className="text-sm font-normal text-gray-16">
                    Sqft:
                    <span className="text-black">{details.LotSizeArea}</span>
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="">
              <div
                className={cn(
                  "flex w-full flex-col-reverse items-center justify-between gap-3 sm:flex-row sm:items-start"
                )}
              >
                <div className="flex w-full flex-col items-start justify-start">
                  <span className="text-base font-normal text-black">
                    {details.LotSizeArea} m2
                  </span>
                  <p className="mt-[1.5625rem] text-sm font-normal text-gray-16 sm:max-w-[25.25rem]">
                    {details.PublicRemarks}
                  </p>
                  <div className="mt-4 flex w-full flex-col items-start gap-2 divide-y divide-gray-16/[0.15] sm:max-w-[20.3125rem]">
                    <div
                      className={cn(
                        "flex w-full justify-between text-sm text-black"
                      )}
                    >
                      <span className="font-normal">Location</span>
                      <span className="font-semibold">{data.location}</span>
                    </div>
                    {details.BedroomsTotal ||
                      (details.BathroomsTotalInteger && (
                        <div
                          className={cn(
                            "flex w-full justify-between text-sm text-black"
                          )}
                        >
                          <span className="font-normal">Bed/Bath</span>
                          <span className="font-semibold">
                            {details.BedroomsTotal &&
                              details.BedroomsTotal +
                                "/" +
                                details.BathroomsTotalInteger &&
                              details.BathroomsTotalInteger}
                          </span>
                        </div>
                      ))}

                    {details.ListPrice && (
                      <div
                        className={cn(
                          "flex w-full justify-between text-sm text-black"
                        )}
                      >
                        <span className="font-normal">Price</span>
                        <span className="font-semibold">
                          ${details.ListPrice.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {details.GarageYN && (
                      <div
                        className={cn(
                          "flex w-full justify-between text-sm text-black"
                        )}
                      >
                        <span className="font-normal">Parking</span>
                        <span className="font-semibold">
                          {details.GarageYN}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-[1.6875rem] flex w-full items-center justify-start gap-[.25rem]">
                    <Button
                      size={"sm"}
                      textSize={"sm"}
                      className="shadow-primary"
                    >
                      Explore in VR
                    </Button>
                    <Button
                      size={"sm"}
                      textSize={"sm"}
                      className="shadow-primary"
                    >
                      I Am Intersted
                    </Button>
                  </div>
                </div>
                <div className="flex size-full items-center justify-center self-center">
                  <Image src={data.image} alt={`${data.floor} image`} />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

export default PropertyPlan
