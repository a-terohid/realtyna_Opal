import type { Metadata } from "next"

import Breadcrumb from "@/components/BreadCrumb/BreadCrumb"
import NewsLetter from "@/components/NewsLetter/NewsLetter"
import PropertyDetailsContainer from "@/components/PropertyDetailsContainer/PropertyDetailsContainer"
import { getAgentData } from "@/services/listings/getAgentDetails"
import { getPropertyDetails } from "@/services/listings/getPropertyDetails"
import { getSiteSettings } from "@/services/theme/getSiteSettings"
import { removeCommaAndWhitespaceAtStart } from "@/utils/helpers"

type Props = {
  params: { id: string }
  searchParams: Record<string, string | string[] | undefined>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const listing = await getPropertyDetails(params)
  const {
    site_identity: { siteName }
  } = await getSiteSettings()

  const description = `${siteName} has ${listing?.Media?.length || 0} photos of this $${listing?.ListPrice} ${listing?.BedroomsTotal || 0} beds, ${listing?.BathroomsTotalInteger || 0} baths, and ${listing?.LivingArea || listing?.LotSizeArea || 0} Square Feet ${listing?.PropertySubType} home located at ${listing?.UnparsedAddress} built-in ${listing?.YearBuilt || "N/A"}. MLS# ${listing?.ListingId}.`

  return {
    title: `${listing.UnparsedAddress} | MLS# ${listing?.ListingId} | ${siteName}`,
    description
  }
}

export default async function ListingDetailsPage(props: Props) {
  const params = await props.params;
  const listing = await getPropertyDetails(params)
  const agent = await getAgentData()

  const [agentData, propertyDetails] = await Promise.all([agent, listing])

  const breadCrumbArray = () => {
    if (propertyDetails) {
      const state = propertyDetails.StateOrProvince || ""
      const city = propertyDetails.City || ""
      const address = removeCommaAndWhitespaceAtStart(
        propertyDetails.UnparsedAddress || ""
      )

      return [
        { name: "Home", href: "/" },
        { name: "Property Listings", href: "/listings" },
        { name: state, href: `/state/${state}` },
        { name: city, href: `/city/${state}/${city.replace(/ /g, "-")}` },
        {
          name: address ?? propertyDetails.ListingKey,
          href: ""
        }
      ];
    } else {
      return []
    }
  }

  return (
    <>
      <Breadcrumb breadcrumbs={breadCrumbArray()} />
      <main className="box-container mx-auto grid grid-cols-1 gap-[1.875rem] pb-[5.625rem] pt-[1.5625rem] md:gap-[5.1875rem]">
        <PropertyDetailsContainer agent={agentData} details={propertyDetails} />
        <NewsLetter /> 
      </main>
    </>
  )
}
