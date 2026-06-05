import { useQueryClient } from "@tanstack/react-query"
import _debounce from "lodash/debounce"
import { useParams } from "next/navigation"
import buildQuery from "odata-query"
import toast from "react-hot-toast"

import type { TAgentSimple } from "@/data/agents_data"
import { agentsInfo } from "@/data/agents_data"
import { getListingsData } from "@/services/listings/getListings"
import useStore from "@/store/useStore"
import type { ListingsData } from "@/types/listings.type"
import { capitalize, fixContainsQuery, generateQueryFilter, parseAndDecode } from "@/utils/helpers"

import { useGetPathName } from "./useGetPathName"

export const useInvalidateQueries = () => {
  const queryClient = useQueryClient()

  const params = useParams()
  const pathname = useGetPathName()

  const mapyna = useStore((state) => state.mapyna)
  const setTotalListings = useStore((state) => state.setTotalListings)

  const invalidateQueries = _debounce((searchParams: URLSearchParams, polygon?: string, isInitialLoad?: boolean) => {
    /**
     * Convert URLSearchParams to object
     */
    const query = searchParams && Object.fromEntries(searchParams.entries())

    /**
     * Check if MLS Agent ID exist
     */
    if (params.id) {
      const agents = [...agentsInfo.featured, ...agentsInfo.simple]

      const agentName = params.id as string

      const agentInfo = agents.find(
        (agent: TAgentSimple) => agent.name.toLowerCase() === agentName.replace("-", " ").toLowerCase()
      )

      if (agentInfo) {
        query.mlsAgentId = agentInfo.mlsAgentId
      }
    }

    /**
     * Generate query
     */
    const { queryFilter, sortBy } = generateQueryFilter({
      neighborhood:
        pathname.type === "neighborhood" && pathname.neighborhood && !searchParams.get("location")
          ? capitalize(pathname.neighborhood.replace(/-/g, " "))
          : query.neighborhood,
      city:
        pathname.type === "city" && pathname.city && !searchParams.get("location")
          ? capitalize(pathname.city.replace(/-/g, " "))
          : query.city,
      state:
        pathname.type === "state" && pathname.state && !searchParams.get("location")
          ? (pathname.state as string).toUpperCase()
          : query.state,

      ...query,
      polygon
    })

    /**
    |--------------------------------------------------
    | Fetch Map Listings
    |--------------------------------------------------
    */

    queryClient
      .fetchQuery({
        queryKey: ["mapListings"],
        queryFn: async () => {
          const generateQuery = buildQuery({
            top: 200,
            orderBy: sortBy,
            select: "ListingKey,ListPrice,Longitude,Latitude,Coordinates,StateOrProvince,SubdivisionName,City",
            filter: queryFilter
          })

          const updatedGenerateQuery = fixContainsQuery(generateQuery)

          const data: ListingsData = await getListingsData({
            query: updatedGenerateQuery
          })

          // set latitude and longitude for address or street address search
          // as their value is incorrect in the response (MiamiRE MLS)
          if (searchParams.get("address") || searchParams.get("streetAddress")) {
            const coordinations = parseAndDecode(
              searchParams.get("coordinations") as string
            ) as google.maps.LatLngLiteral

            data.value.forEach((listing) => {
              if (listing.StateOrProvince === "FL") {
                listing.Latitude = coordinations.lat
                listing.Longitude = coordinations.lng
              }
            })
          }

          if (searchParams.get("location") && !searchParams.get("viewport") && data.value[0]) {
            mapyna?.map?.setZoom(14)

            const coordinates = data.value[0].Coordinates || [data.value[0].Latitude, data.value[0].Longitude]
            mapyna?.map?.setCenter({
              lat: coordinates[1],
              lng: coordinates[0]
            })
          }

          return data
        }
      })
      .then((data) => {
        if (data?.value) {
          mapyna?.updateData(data.value)
        } else {
          toast.error("Something went wrong while fetching listings")
        }
      })

    /**
    |--------------------------------------------------
    | Fetch Listings
    |--------------------------------------------------
    */

    if (!isInitialLoad) {
      queryClient.fetchQuery({
        queryKey: ["latlang"],
        queryFn: async () => {
          setTotalListings(null)

          const generateQuery = buildQuery({
            top: 12,
            orderBy: sortBy,
            filter: queryFilter,
            select: "ALL"
          })

          const updatedGenerateQuery = fixContainsQuery(generateQuery)

          const data = await getListingsData({
            query: updatedGenerateQuery
          })

          setTotalListings(data["@odata.count"])

          queryClient.setQueryData(["listingsData"], {
            pageParams: [undefined],
            pages: [data]
          })

          return data
        }
      })
    }
  }, 500)

  return invalidateQueries
}
