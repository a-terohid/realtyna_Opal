import type { NextPage } from "next"

import { appliancesList } from "@/data/property_appliances"
import type { AgentValue } from "@/types/agent.type"
import type { ListingsValue } from "@/types/listings.type"

import Disclaimers from "../common/Disclaimers/Disclaimers"
import NearbyProperties from "./NearbyProperties/NearbyProperties"
import PropertyAbout from "./PropertyAbout/PropertyAbout"
import PropertyAdditionalInfo from "./PropertyAdditionalInfo/PropertyAdditionalInfo"
import PropertyAgentInfo from "./PropertyAgentInfo/PropertyAgentInfo"
import PropertyAppliances from "./PropertyAppliances/PropertyAppliances"
import PropertyBasicDetails from "./PropertyBasicDetails/PropertyBasicDetails"
import PropertyFeature from "./PropertyFeature/PropertyFeature"
import ContentActions from "./PropertyImages/ContentActions/ContentActions"
import PropertyImages from "./PropertyImages/PropertyImages"
import PropertyInfo from "./PropertyInfo/PropertyInfo"
import PropertyLandInfo from "./PropertyLandInfo/PropertyLandInfo"
import PropertyLocationGoogle from "./PropertyLocation/PropertyLocationGoogle"
import PropertyPriceAndTax from "./PropertyPriceAndTax/PropertyPriceAndTax"
import PropertySchoolInfo from "./PropertySchoolInfo/PropertySchoolInfo"
import PropertySidebar from "./PropertySidebar/PropertySidebar"

interface IProps {
  details: ListingsValue & { blurredData: string }
  agent: AgentValue
}

const PropertyDetailsContainer: NextPage<IProps> = ({ details, agent }) => {

  const newList = appliancesList.filter((item) =>
    details.Appliances?.includes(item.name)
  )
    
  const isGeoExist =
    (!!details.Latitude && !!details.Longitude) ||
    (!!details.Coordinates?.[0] && !!details.Coordinates?.[1])

  return (
    <div className="flex w-full flex-col items-center justify-start gap-[2.1875rem]">
      <PropertyInfo details={details} />
      <section className="relative flex w-full items-start justify-center">
        {details.Media && <PropertyImages details={details} />}
        <ContentActions details={details} />
      </section>

      <PropertyAgentInfo agent={agent} details={details} />
      <div className="col-span-full grid grid-cols-12 items-start justify-center gap-y-10 lg:gap-10">
        <div className="col-span-12 grid grid-cols-12 items-start justify-center gap-[1.5625rem] lg:col-span-8 ">
          {details.PublicRemarks && (
            <PropertyAbout description={details.PublicRemarks} />
          )}
          <PropertyBasicDetails details={details} />
          {newList.length > 0 && <PropertyAppliances list={newList} />}
          <PropertyFeature details={details} />
          <PropertyLandInfo details={details} />
          {isGeoExist && (
            <PropertyLocationGoogle
              details={details}
              lng={details.Longitude ?? details.Coordinates[0]}
              lat={details.Latitude ?? details.Coordinates[1]}
            />
          )}
          <PropertyPriceAndTax details={details} />
          <PropertySchoolInfo details={details} />
          <PropertyAdditionalInfo details={details} />
        </div>
        <PropertySidebar details={details} isGeoExist={isGeoExist} />
      </div>
      <Disclaimers
        name={details.OriginatingSystemName}
        lastUpdate={details.ModificationTimestamp}
      />
      {isGeoExist && <NearbyProperties details={details} />}
    </div>
  )
}

export default PropertyDetailsContainer
