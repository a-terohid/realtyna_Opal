import React from "react"

import type { ListingsValue } from "@/types/listings.type"
import { priceFormatter } from "@/utils/helpers"

import DetailRow from "./DetailRow/DetailRow"

interface IProps {
  details: ListingsValue
}

const PropertyBasicDetails: React.FC<IProps> = ({ details }) => {

  const {PropertyType , ListingId , BedroomsTotal , BathroomsHalf , YearBuilt , StructureType , PropertySubType , ListPrice , BathroomsFull , LotSizeArea } = details


  return (
    <section className="col-span-full flex flex-col justify-start gap-[.875rem]">
      <h2 className="text-2xl font-bold text-black">Basic Details</h2>
      <div className="grid grid-cols-1 gap-[25px] rounded-[.9375rem] p-[.9375rem] shadow-primary md:grid-cols-2">
        {PropertyType ? (
          <DetailRow label="Property Type" value={PropertyType} />
        ): null}
        {ListingId ? (
          <DetailRow label="Listing ID" value={ListingId} />
        ): null}
        {BedroomsTotal ? (
          <DetailRow label="Bedrooms" value={BedroomsTotal} />
        ): null}
        {BathroomsHalf ? (
          <DetailRow label="Half Bathrooms" value={BathroomsHalf} />
        ): null}
        {YearBuilt ? (
          <DetailRow label="Year Built" value={YearBuilt} />
        ): null}
        {StructureType ? (
          <DetailRow label="Structure Type" value={StructureType} />
        ): null}
        {PropertyType ? (
          <DetailRow label="Listing Type" value={PropertyType} />
        ): null}
        {ListPrice ? (
          <DetailRow
            label="Price"
            value={priceFormatter.format(ListPrice)}
          />
        ): null}
        {BathroomsFull ? (
          <DetailRow label="Bathrooms" value={BathroomsFull} />
        ): null}
        {BedroomsTotal ? (
          <DetailRow label="Rooms" value={BedroomsTotal} />
        ): null}
        {LotSizeArea ? (
          <DetailRow label="Lot Area" value={LotSizeArea} />
        ): null}
        {PropertySubType ? (
          <DetailRow
            label="Property Sub Type"
            value={PropertySubType}
          />
        ): null}
      </div>
    </section>
  )
}

export default PropertyBasicDetails
