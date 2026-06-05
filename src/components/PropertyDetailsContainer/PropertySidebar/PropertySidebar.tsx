import type { ListingsValue } from "@/types/listings.type"

import MortgageCalculator from "./MortgageCalculator/MortgageCalculator"
import PropertyDetailsContactForm from "./PropertyDetailsContactForm/PropertyDetailsContactForm"
import PropertyDetailsWeather from "./PropertyDetailsWeather/PropertyDetailsWeather"

interface IProps {
  details: ListingsValue
  isGeoExist: boolean
}

const PropertySidebar: React.FC<IProps> = ({ details, isGeoExist }) => {
  return (
    <aside className="col-span-full grid grid-cols-6 items-center justify-start gap-5 lg:col-span-4 lg:col-start-9">
      <PropertyDetailsContactForm />
      {isGeoExist ? (
        <PropertyDetailsWeather
          lat={details?.Latitude || details.Coordinates?.[1]}
          lng={details?.Longitude || details.Coordinates?.[0]}
        />
      ) : null}
      <MortgageCalculator price={details?.ListPrice} />
    </aside>
  )
}

export default PropertySidebar
