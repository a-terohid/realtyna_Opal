import React from "react"

import type { ListingsValue } from "@/types/listings.type"
import { priceFormatter } from "@/utils/helpers"

import DetailRow from "./DetailRow/DetailRow"

interface IProps {
  details: ListingsValue
}

const PropertyBasicDetails: React.FC<IProps> = ({ details }) => {
  return (
    <section className="col-span-full flex flex-col justify-start gap-[.875rem]">
      <h2 className="text-2xl font-bold text-black">Basic Details</h2>
      <div className="grid grid-cols-1 gap-[25px] rounded-[.9375rem] p-[.9375rem] shadow-primary md:grid-cols-2">
        {details.PropertyType && (
          <DetailRow label="Property Type" value={details.PropertyType} />
        )}
        {details.ListingId && (
          <DetailRow label="Listing ID" value={details.ListingId} />
        )}
        {details.BedroomsTotal && (
          <DetailRow label="Bedrooms" value={details.BedroomsTotal} />
        )}
        {details.BathroomsHalf && (
          <DetailRow label="Half Bathrooms" value={details.BathroomsHalf} />
        )}
        {details.YearBuilt && (
          <DetailRow label="Year Built" value={details.YearBuilt} />
        )}
        {details.StructureType && (
          <DetailRow label="Structure Type" value={details.StructureType} />
        )}
        {details.PropertyType && (
          <DetailRow label="Listing Type" value={details.PropertyType} />
        )}
        {details.ListPrice && (
          <DetailRow
            label="Price"
            value={priceFormatter.format(details.ListPrice)}
          />
        )}
        {details.BathroomsFull && (
          <DetailRow label="Bathrooms" value={details.BathroomsFull} />
        )}
        {details.BedroomsTotal && (
          <DetailRow label="Rooms" value={details.BedroomsTotal} />
        )}
        {details.LotSizeArea && (
          <DetailRow label="Lot Area" value={details.LotSizeArea} />
        )}
        {details.PropertySubType && (
          <DetailRow
            label="Property Sub Type"
            value={details.PropertySubType}
          />
        )}
      </div>
    </section>
  )
}

export default PropertyBasicDetails
