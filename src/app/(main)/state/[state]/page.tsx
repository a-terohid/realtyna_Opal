import type { Metadata } from "next"
import buildQuery from "odata-query"

import ListingsContainer from "@/components/ListingsContainer/ListingsContainer"
import NewsLetter from "@/components/NewsLetter/NewsLetter"
import { getListingsData } from "@/services/listings/getListings"
import { getSiteSettings } from "@/services/theme/getSiteSettings"
import {
  calculateBoundingBox,
  fixContainsQuery,
  generateQueryFilter
} from "@/utils/helpers"

type Props = {
  params: { state: string }
  searchParams: Record<string, string | string[] | undefined>
}

function generateQuery({ params, searchParams }: Props) {
  if (
    !params.state &&
    !searchParams.viewport &&
    !searchParams.polygon &&
    !searchParams.city &&
    !searchParams.state &&
    !searchParams.county &&
    !searchParams.highSchool &&
    !searchParams.middleSchool &&
    !searchParams.elementarySchool &&
    !searchParams.location &&
    process.env.NEXT_PUBLIC_LAT &&
    process.env.NEXT_PUBLIC_LNG
  ) {
    const bounds = calculateBoundingBox(
      +process.env.NEXT_PUBLIC_LAT,
      +process.env.NEXT_PUBLIC_LNG
    )

    const viewport = {
      northeast: {
        lat: bounds.neLat,
        lng: bounds.neLng
      },
      southwest: {
        lat: bounds.swLat,
        lng: bounds.swLng
      }
    }

    searchParams.viewport = JSON.stringify(viewport)
  }

  if (params && params.state) {
    searchParams.state = params.state
  }

  const filters = generateQueryFilter(searchParams)
  const queryFilter = filters.queryFilter
  const sortBy = filters.sortBy

  const generateQuery = buildQuery({
    top: 12,
    orderBy: sortBy ? sortBy : "OriginalEntryTimestamp desc",
    select: "ALL",
    filter: queryFilter ? queryFilter : undefined
  })

  const updatedGenerateQuery = fixContainsQuery(generateQuery)

  return updatedGenerateQuery
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const updatedGenerateQuery = generateQuery({ params, searchParams })
  const listings = await getListingsData({ query: updatedGenerateQuery })
  const {
    site_identity: { siteName }
  } = await getSiteSettings()

  return {
    title: `${params.state} Real Estate & Homes for Sale | ${siteName}`,
    description: `There are currently ${listings["@odata.count"] || 0} homes for sale in ${params.state}. Explore and find your perfect match. View listing photos, Review property details, and Contact a ${siteName} agent for more information`
  }
}

export default async function Listings(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const updatedGenerateQuery = generateQuery({ params, searchParams })
  const listings = await getListingsData({ query: updatedGenerateQuery })

  return (
    <>
      <main className="mx-auto flex flex-col items-center justify-center gap-[3.75rem] pb-[5.625rem]">
        <ListingsContainer listingsData={listings} />
        <NewsLetter />
      </main>
    </>
  )
}
