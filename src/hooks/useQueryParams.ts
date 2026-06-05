import { useParams } from "next/navigation"
import { parseAsInteger, parseAsJson, parseAsStringLiteral, useQueryState } from "nuqs"
import { useMemo } from "react"

import type {
  TBathroomsFilter,
  TBedroomsFilter,
  TPropertyTypeFilter,
  TSortByFilter,
  TStatusFilter,
  TViewportFilter
} from "@/types/filter.type"

export function useQueryParams() {
  const params = useParams()

  const [sID, setSID] = useQueryState("sID", parseAsInteger)

  /**
   * Location Filters
   */
  const [location, setLocation] = useQueryState("location")
  const [address, setAddress] = useQueryState("address")
  const [streetAddress, setStreetAddress] = useQueryState("streetAddress")
  const [city, setCity] = useQueryState("city")
  const [zipCode, setZipCode] = useQueryState("zipCode")
  const [state, setState] = useQueryState("state")
  const [county, setCounty] = useQueryState("county")
  const [neighborhood, setNeighborhood] = useQueryState("neighborhood")
  const [highSchool, setHighSchool] = useQueryState("highSchool")
  const [middleSchool, setMiddleSchool] = useQueryState("middleSchool")
  const [elementarySchool, setElementarySchool] = useQueryState("elementarySchool")

  /**
   * Listings Filteres
   * */
  const [sortBy, setSortBy] = useQueryState(
    "sortBy",
    parseAsJson<TSortByFilter>().withDefault("OriginalEntryTimestamp desc")
  )
  const [status, setStatus] = useQueryState("status", parseAsJson<TStatusFilter>().withDefault(["Active"]))
  const [listingsType, setListingsType] = useQueryState(
    "listingsType",
    parseAsStringLiteral(["For Any", "For Sale", "For Rent"] as const).withDefault("For Sale")
  )
  const [propertyType, setPropertyType] = useQueryState(
    "propertyType",
    parseAsJson<TPropertyTypeFilter>().withDefault({
      Residential: [],
      Commercial: []
    })
  )
  const [priceRange, setPriceRange] = useQueryState("priceRange", parseAsJson<string[]>().withDefault(["", ""]))
  const [exactBeds, setExactBeds] = useQueryState("exactBeds", parseAsJson<boolean>().withDefault(true))
  const [exactBaths, setExactBaths] = useQueryState("exactBaths", parseAsJson<boolean>().withDefault(true))
  const [anyBeds, setAnyBeds] = useQueryState("anyBeds", parseAsJson<boolean>().withDefault(true))
  const [anyBaths, setAnyBaths] = useQueryState("anyBaths", parseAsJson<boolean>().withDefault(true))
  const [beds, setBeds] = useQueryState("beds", parseAsJson<TBedroomsFilter>().withDefault(["Any"]))
  const [baths, setBaths] = useQueryState("baths", parseAsJson<TBathroomsFilter>().withDefault(["Any"]))

  /**
   * Map Filters
   */
  const [zoom, setZoom] = useQueryState("zoom")
  const [viewport, setViewport] = useQueryState("viewport", parseAsJson<TViewportFilter>())
  const [coordination, setCoordination] = useQueryState("coordinations", parseAsJson<google.maps.LatLngLiteral>())

  /**
   * Other Filters
   */
  const [listingsDOM, setListingsDOM] = useQueryState("listingsDOM")
  const [yearBuilt, setYearBuilt] = useQueryState("yearBuilt", parseAsJson<string[]>().withDefault(["", ""]))
  const [features, setFeatures] = useQueryState("features", parseAsJson<Record<string, any>>())

  const queryParams = {
    sID,
    location,
    zoom,
    address,
    streetAddress,
    city,
    zipCode,
    state,
    county,
    neighborhood,
    highSchool,
    middleSchool,
    elementarySchool,
    sortBy,
    status,
    listingsType,
    propertyType,
    priceRange,
    exactBeds,
    exactBaths,
    anyBeds,
    anyBaths,
    beds,
    baths,
    viewport,
    coordination,
    listingsDOM,
    yearBuilt,
    features
  }

  const locationParams: (string | null)[] = useMemo(
    () => [
      location,
      address,
      streetAddress,
      zipCode,
      neighborhood,
      highSchool,
      middleSchool,
      elementarySchool,
      city,
      state,
      params.neighborhood && decodeURIComponent(params.neighborhood as string).replace(/-/g, " "),
      params.city && decodeURIComponent(params.city as string).replace(/-/g, " "),
      params.state as string
    ],
    [
      location,
      address,
      streetAddress,
      zipCode,
      neighborhood,
      highSchool,
      middleSchool,
      elementarySchool,
      city,
      state,
      params.neighborhood,
      params.city,
      params.state
    ]
  )

  async function removeLocationParams(): Promise<URLSearchParams> {
    return new Promise((resolve) => {
      for (const [key, value] of Object.entries([
        location,
        address,
        streetAddress,
        zipCode,
        neighborhood,
        highSchool,
        middleSchool,
        elementarySchool,
        city,
        state
      ])) {
        if (value) {
          const objectKey = Object.keys(setters)[+key]
          const res = setters[objectKey as keyof typeof setters](null)
          if (res) {
            resolve(res)
          }
        }
      }
      resolve(new URLSearchParams())
    })
  }

  const setters = {
    sID: setSID,
    location: setLocation,
    address: setAddress,
    streetAddress: setStreetAddress,
    city: setCity,
    state: setState,
    zipCode: setZipCode,
    neighborhood: setNeighborhood,
    county: setCounty,
    highSchool: setHighSchool,
    middleSchool: setMiddleSchool,
    elementarySchool: setElementarySchool,
    zoom: setZoom,
    coordination: setCoordination,
    viewport: setViewport,
    listingsType: setListingsType,
    propertyType: setPropertyType,
    status: setStatus,
    priceRange: setPriceRange,
    exactBeds: setExactBeds,
    exactBaths: setExactBaths,
    anyBeds: setAnyBeds,
    anyBaths: setAnyBaths,
    beds: setBeds,
    baths: setBaths,
    sortBy: setSortBy,
    listingsDOM: setListingsDOM,
    yearBuilt: setYearBuilt,
    features: setFeatures
  }

  function setParam<K extends keyof typeof queryParams>(
    name: K,
    value: (typeof queryParams)[K] | ((old: (typeof queryParams)[K] | null) => (typeof queryParams)[K] | null) | null
  ): Promise<URLSearchParams> {
    return setters[name](value as any)
  }

  function getParam<K extends keyof typeof queryParams>(name: K): (typeof queryParams)[K] {
    return queryParams[name]
  }

  const getQueryParams = () => {
    return Object.fromEntries(Object.entries(queryParams).filter(([_, value]) => value))
  }

  return {
    removeLocationParams,
    locationParams,
    getQueryParams,
    get: getParam,
    set: setParam
  }
}
