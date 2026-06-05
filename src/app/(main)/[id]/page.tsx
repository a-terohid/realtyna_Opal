import type { Metadata } from "next"
import buildQuery from "odata-query"

import AgentContainer from "@/components/AgentContainer/AgentContainer"
import ListingsContainer from "@/components/ListingsContainer/ListingsContainer"
import NewsLetter from "@/components/NewsLetter/NewsLetter"
import type { TAgentSimple } from "@/data/agents_data"
import { agentsInfo } from "@/data/agents_data"
import { getListingsData } from "@/services/listings/getListings"
import {
  calculateBoundingBox,
  capitalize,
  fixContainsQuery,
  generateQueryFilter
} from "@/utils/helpers"

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const id = decodeURIComponent(params.id)

  const resultString = `${id
    .split("-")
    .map((word) => capitalize(word))
    .join(" ")
    .replace(",", "")} Listings`

  return {
    title: resultString,
    description: "Agent Listings Page"
  }
}

export default async function AgentListings(
  props: {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  let queryFilter
  let sortBy
  let agentInfo = null

  if (
    JSON.stringify(searchParams) !== "{}" ||
    (process.env.NEXT_PUBLIC_LAT && process.env.NEXT_PUBLIC_LNG)
  ) {
    if (
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

    if (!searchParams.mlsAgentId) {
      const agents = [...agentsInfo.featured, ...agentsInfo.simple]

      agentInfo = agents.find(
        (agent: TAgentSimple) =>
          agent.name.toLowerCase() === params.id.replace("-", " ").toLowerCase()
      )

      if (agentInfo) {
        searchParams.mlsAgentId = agentInfo.mlsAgentId
      }
    }

    const filters = generateQueryFilter(searchParams)
    queryFilter = filters.queryFilter
    sortBy = filters.sortBy
  }

  const generateQuery = buildQuery({
    top: 12,
    orderBy: sortBy ? sortBy : "OriginalEntryTimestamp desc",
    select: "ALL",
    filter: queryFilter ? queryFilter : undefined
  })

  const updatedGenerateQuery = fixContainsQuery(generateQuery)

  const listings = await getListingsData({ query: updatedGenerateQuery })

  return (
    <>
      <main className="mx-auto flex flex-col items-center justify-center gap-[3.75rem] pb-[5.625rem] pt-10">
        {agentInfo ? <AgentContainer agentInfo={agentInfo} /> : null}
        <ListingsContainer listingsData={listings} />
        <NewsLetter />
      </main>
    </>
  )
}
