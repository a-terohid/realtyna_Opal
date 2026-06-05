import {
  mdiBed,
  mdiCalendarWeek,
  mdiCity,
  mdiGarageVariant,
  mdiMapMarker,
  mdiRulerSquare,
  mdiRulerSquareCompass,
  mdiShowerHead
} from "@mdi/js"
import Icon from "@mdi/react"

import type { ListingsValue } from "@/types/listings.type"

interface IProps {
  details: ListingsValue
}

const PropertyInfo: React.FC<IProps> = ({ details }) => {
  const array = [
    {
      icon: mdiBed,
      value: details.BedroomsTotal ?? "",
      label: "Bed"
    },
    {
      icon: mdiShowerHead,
      value: details.BathroomsTotalInteger ?? "",
      label: "Bath"
    },
    {
      icon: mdiRulerSquare,
      value: details.LotSizeArea ? details.LotSizeArea.toLocaleString() : "",
      label: details.LotSizeArea && "Sqft"
    },
    {
      icon: mdiCity,
      value: details.PropertyType
    },
    {
      icon: mdiGarageVariant,
      value: details.GarageSpaces ?? "",
      label: "Car"
    },
    {
      icon: mdiRulerSquareCompass,
      value: details.DaysOnMarket ?? "",
      label: "Days in Market"
    },
    {
      icon: mdiCalendarWeek,
      value: details.YearBuilt ?? ""
    }
  ]

  let addressText = details.UnparsedAddress

  if (details.UnparsedAddress) {
    if (details.City) {
      addressText += ", " + details.City
    }

    if (details.StateOrProvince) {
      addressText += ", " + details.StateOrProvince
    }

    if (details.PostalCode) {
      addressText += " " + details.PostalCode
    }
  }

  return (
    <section className="flex w-full flex-col items-center justify-center gap-[1.875rem]">
      <div className="flex w-full flex-col items-start justify-between gap-3 text-start sm:flex-row">
        <div className="flex w-full flex-col items-start justify-start gap-2">
          <h1 className="text-2xl font-bold text-black lg:text-2xl">
            {addressText}
          </h1>
          {details.City && (
            <div className="flex w-max items-center justify-start gap-[.3125rem]">
              <Icon className="text-gray-14" path={mdiMapMarker} size={0.875} />
              <span className="text-start text-base font-bold text-gray-14">
                {details.City}
              </span>
            </div>
          )}
        </div>
        {details.ListPrice && (
          <span className="bg-primary-gradient w-full !bg-clip-text text-start text-4xl font-bold text-transparent sm:text-end">
            ${details.ListPrice.toLocaleString()}
          </span>
        )}
      </div>
      <div className="grid w-full max-w-[60rem] grid-cols-2 flex-wrap justify-start gap-[1.5625rem] self-start md:grid-cols-3 lg:grid-cols-4">
        {array.map((item, index) => {
          return item.value ? (
            <div
              key={index}
              className="flex items-center justify-start gap-[.5rem]"
            >
              <div className="flex h-[2.8125rem] min-w-[2.8125rem] items-center justify-center rounded-[.3125rem] text-gray-18 shadow-primary">
                <Icon size={1} path={item.icon} />
              </div>
              <span className="font-normal text-gray-16">{item.value}</span>
              <span className="w-max font-normal text-gray-16">
                {item.label}
              </span>
            </div>
          ) : null
        })}
      </div>
    </section>
  )
}

export default PropertyInfo
