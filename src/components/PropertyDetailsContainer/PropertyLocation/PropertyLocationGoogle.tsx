"use client"

import type { ListingsValue } from "@/types/listings.type"

import EachItemPriceAndTax from "./EachItemPriceAndTax/EachItemPriceAndTax"

interface IProps {
  lat: number
  lng: number
  details: ListingsValue
}

const PropertyLocationGoogle: React.FC<IProps> = ({ lat, lng, details }) => {
  return (
    <section className="col-span-full flex flex-col items-start justify-center gap-[.875rem]">
      <h2 className="text-2xl font-bold text-black">Location</h2>
      <ul className="flex w-full flex-col justify-start gap-3">
        {details.SubdivisionName && details.SubdivisionName !== "NONE" ? (
          <EachItemPriceAndTax
            text={details.SubdivisionName}
            title="Subdivision Name"
            isMulti={false}
          />
        ) : null}

        {details.PostalCode && details.PostalCode !== "NONE" ? (
          <EachItemPriceAndTax
            text={details.PostalCode}
            title="Postal Code"
            isMulti={false}
          />
        ) : null}

        {details.DirectionFaces && details.DirectionFaces !== "NONE" ? (
          <EachItemPriceAndTax
            text={details.DirectionFaces}
            title="Direction Faces "
            isMulti={false}
          />
        ) : null}
      </ul>
      <div className="relative flex h-[17.8125rem] w-full items-center justify-center gap-[1.5625rem] overflow-hidden rounded-[.9375rem] p-[.9375rem] shadow-primary">
        <iframe
          title="google map"
          className="size-full rounded-[12px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&q=${lat},${lng}&center=${lat},${lng}`}
        />
      </div>
    </section>
  )
}

export default PropertyLocationGoogle
