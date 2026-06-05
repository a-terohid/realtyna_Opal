import axios from "axios"
import { type ClassValue, clsx } from "clsx"
import dayjs from "dayjs"
import { compact, isEqual, omit, transform } from "lodash"
import type { ParsedUrlQuery } from "querystring"
import { twMerge } from "tailwind-merge"

import type { TPropertyType } from "@/data/prop_type"
import {
  propertyTypesCommercialData,
  propertyTypesResidentialData
} from "@/data/prop_type"
import type { ListingsFilter } from "@/store/listingsFilterSlice"
import type {
  TLocationGooglePrediction,
  TLocationSuggestionOSM
} from "@/types/filter.type"
import type { ListingsValue } from "@/types/listings.type"
import type { TSiteSettings } from "@/types/site-settings.type"

type TCategorizeByTypeProps =
  | {
      data: TLocationSuggestionOSM[]
      provider: "osm"
    }
  | {
      data: TLocationGooglePrediction[]
      provider: "google"
    }

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const priceFormatter = Intl.NumberFormat("en", { notation: "compact" }) // Format price number

export const getCustomDate = (utc: string): string => {
  const date = new Date(utc)
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
  )
}

export const IsSameUrl = (url1: string, url2: string): boolean => {
  return (
    url1.toLowerCase() === url2.toLowerCase() ||
    url1.toLowerCase() === url2.toLowerCase() + "/" ||
    url1.toLowerCase() + "/" === url2.toLowerCase()
  )
}

export const formatBytes = (
  bytes: number,
  decimals = 2
): { size: number; format: string } => {
  if (bytes === 0) return { size: 0, format: "Bytes" }

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
  return { size: size, format: sizes[i] }
}

export function calculateNumbersInRange(value: string[] | number[]): string[] {
  const numbers: string[] = []

  const start = Number(value[0])
  const end = Number(value[1])

  for (let i = start; i <= end; i++) {
    numbers.push(i.toString())
  }

  return numbers
}

export const getListingsType = (propertyType: string) => {
  if (["Commercial Lease", "Residential Lease"].includes(propertyType)) {
    return "For Rent"
  } else if (
    [
      "Residential Income",
      "Residential",
      "ManufacturedInPark",
      "Land",
      "Farm",
      "Commercial Sale",
      "Business Opportunity"
    ].includes(propertyType)
  ) {
    return "For Sale"
  }
}

export function compareFilters(
  obj1: ListingsFilter,
  obj2: Partial<ListingsFilter>
): Partial<ListingsFilter> {
  return transform(
    obj2,
    (result: Record<string, unknown>, value, key) => {
      if (isEqual(value, obj1[key as keyof ListingsFilter])) {
        return
      }
      const newKey = key as keyof Partial<ListingsFilter>
      result[newKey] = value
    },
    {}
  )
}

export function convertToNumber(value: string | string[]): number | number[] {
  if (Array.isArray(value)) {
    if (value.length >= 2) {
      const numbers = value.map((element) => parseInt(element, 10))
      const shortest = Math.min(...numbers)
      const largest = Math.max(...numbers)
      return [shortest, largest]
    } else if (value.length === 1) {
      const number = parseInt(value[0], 10)
      const result = number.toString().replace("+", "")
      return parseInt(result, 10)
    } else {
      throw new Error("Invalid input length. Expected 1 or more.")
    }
  } else {
    throw new Error("Invalid input type. Expected array.")
  }
}

export const parseAndDecode = (value: string | string[] | undefined) => {
  return value ? JSON.parse(decodeURIComponent(value as string)) : []
}

export const generateQueryFilter = ({
  viewport: viewportQuery,
  beds: bedroomQuery,
  baths: bathroomQuery,
  priceRange: priceRangeQuery,
  propertyType: propertyTypeQuery,
  status: statusQuery,
  sortBy: sortByQuery = `"OriginalEntryTimestamp desc"`,
  listingsType: listingsTypeQuery,
  polygon: polygonQuery,
  city: cityQuery,
  address: addressQuery,
  streetAddress: streetAddressQuery,
  neighborhood: neighborhoodQuery,
  zipCode: zipCodeQuery,
  state: stateQuery,
  county: countyQuery,
  highSchool: highSchoolQuery,
  middleSchool: middleSchoolQuery,
  elementarySchool: elementarySchoolQuery,
  mlsAgentId,
  listingsDOM,
  yearBuilt: yearBuiltQuery,
  features: featuresQuery
}: ParsedUrlQuery) => {
  const viewport = parseAndDecode(viewportQuery)
  const bedrooms = parseAndDecode(bedroomQuery)
  const bathrooms = parseAndDecode(bathroomQuery)
  const priceRange = parseAndDecode(priceRangeQuery)
  const polygon = parseAndDecode(polygonQuery)
  const sortBy = parseAndDecode(sortByQuery)
  const status = parseAndDecode(statusQuery)
  const yearBuilt = parseAndDecode(yearBuiltQuery)
  const features = parseAndDecode(featuresQuery)

  const residentialProperty =
    parseAndDecode(propertyTypeQuery as string).Residential || []
  const commercialProperty =
    parseAndDecode(propertyTypeQuery as string).Commercial || []
  const listingsType = listingsTypeQuery
    ? decodeURIComponent(listingsTypeQuery as string)
    : []

  const city = cityQuery ? decodeURIComponent(cityQuery as string) : ""
  const address = addressQuery ? decodeURIComponent(addressQuery as string) : ""
  const streetAddress = streetAddressQuery
    ? decodeURIComponent(streetAddressQuery as string)
    : ""
  const neighborhood = neighborhoodQuery
    ? decodeURIComponent(neighborhoodQuery as string)
    : ""
  const zipCode = zipCodeQuery ? decodeURIComponent(zipCodeQuery as string) : ""
  const state = stateQuery ? decodeURIComponent(stateQuery as string) : ""
  const county = countyQuery ? decodeURIComponent(countyQuery as string) : ""
  const highSchool = highSchoolQuery
    ? decodeURIComponent(highSchoolQuery as string)
    : ""
  const middleSchool = middleSchoolQuery
    ? decodeURIComponent(middleSchoolQuery as string)
    : ""
  const elementarySchool = elementarySchoolQuery
    ? decodeURIComponent(elementarySchoolQuery as string)
    : ""

  const queryFilter: unknown[] = []

  const filterPropertyTypes = (
    propertyList: string[],
    propertyTypesData: TPropertyType[]
  ): TPropertyType[] => {
    const filteredList = propertyList.map((property) =>
      propertyTypesData.find((type) => type.name === property)
    )
    const cleanedList = compact(filteredList)
    return cleanedList
  }

  const residentialPropertyTypes = filterPropertyTypes(
    residentialProperty,
    propertyTypesResidentialData
  )
  const commercialPropertyTypes = filterPropertyTypes(
    commercialProperty,
    propertyTypesCommercialData
  )

  const statusItems = {
    Active: ["Active", "Active Under Contract", "Coming Soon"],
    Pending: ["Pending"],
    Sold: ["Sold"]
  }

  queryFilter.push({
    StandardStatus:
      status.length > 1
        ? {
            in: status.map((item: string) =>
              statusItems[item as keyof typeof statusItems].join()
            )
          }
        : status.length === 1
          ? statusItems[status[0] as keyof typeof statusItems].length > 1
            ? { in: statusItems[status[0] as keyof typeof statusItems] }
            : { eq: statusItems[status[0] as keyof typeof statusItems][0] }
          : { in: statusItems.Active }
  })

  if (!bedrooms.includes("Any") && bedrooms.length > 0) {
    queryFilter.push({
      or: [
        ...bedrooms.map((bedroom: string) => {
          if (bedroom.includes("+")) {
            const bedroomValue = bedroom.replace("+", "")
            return {
              BedroomsTotal: { gt: +bedroomValue }
            }
          } else {
            return {
              BedroomsTotal: +bedroom
            }
          }
        })
      ]
    })
  }

  if (!bathrooms.includes("Any") && bathrooms.length > 0) {
    queryFilter.push({
      or: [
        ...bathrooms.map((bathroom: string) => {
          if (bathroom.includes("+")) {
            const bathroomValue = bathroom.replace("+", "")
            return {
              BathroomsTotalInteger: { gt: +bathroomValue }
            }
          } else {
            return {
              BathroomsTotalInteger: +bathroom
            }
          }
        })
      ]
    })
  }

  if (residentialPropertyTypes.length > 0) {
    queryFilter.push({
      or: [
        ...residentialPropertyTypes.map((row) => {
          return {
            and: {
              PropertyType:
                listingsType === "For Sale"
                  ? [...row.propTypes.forSale].length > 1
                    ? {
                        in: [...row.propTypes.forSale]
                      }
                    : {
                        eq: [...row.propTypes.forSale][0]
                      }
                  : listingsType === "For Rent"
                    ? [...row.propTypes.forRent].length > 1
                      ? {
                          in: [...row.propTypes.forRent]
                        }
                      : {
                          eq: [...row.propTypes.forRent][0]
                        }
                    : [...row.propTypes.forSale, ...row.propTypes.forRent]
                          .length > 1
                      ? {
                          in: [
                            ...row.propTypes.forSale,
                            ...row.propTypes.forRent
                          ]
                        }
                      : {
                          eq: [
                            ...row.propTypes.forSale,
                            ...row.propTypes.forRent
                          ][0]
                        },
              PropertySubType:
                row.propSubTypes.length > 1
                  ? { in: row.propSubTypes }
                  : { eq: row.propSubTypes[0] }
            }
          }
        })
      ]
    })
  }

  if (commercialPropertyTypes.length > 0) {
    queryFilter.push({
      or: [
        ...commercialPropertyTypes.map((row) => {
          return {
            and: {
              PropertyType:
                listingsType === "For Sale"
                  ? [...row.propTypes.forSale].length > 1
                    ? {
                        in: [...row.propTypes.forSale]
                      }
                    : {
                        eq: [...row.propTypes.forSale][0]
                      }
                  : listingsType === "For Rent"
                    ? [...row.propTypes.forRent].length > 1
                      ? {
                          in: [...row.propTypes.forRent]
                        }
                      : {
                          eq: [...row.propTypes.forRent][0]
                        }
                    : [...row.propTypes.forSale, ...row.propTypes.forRent]
                          .length > 1
                      ? {
                          in: [
                            ...row.propTypes.forSale,
                            ...row.propTypes.forRent
                          ]
                        }
                      : {
                          eq: [
                            ...row.propTypes.forSale,
                            ...row.propTypes.forRent
                          ][0]
                        },
              PropertySubType:
                row.propSubTypes.length > 1
                  ? { in: row.propSubTypes }
                  : { eq: row.propSubTypes[0] }
            }
          }
        })
      ]
    })
  }

  if (
    residentialPropertyTypes.length === 0 &&
    commercialPropertyTypes.length === 0 &&
    listingsType &&
    listingsType === "For Rent"
  ) {
    queryFilter.push({
      PropertyType: { in: ["CommercialLease", "ResidentialLease"] }
    })
  } else if (
    residentialPropertyTypes.length === 0 &&
    commercialPropertyTypes.length === 0 &&
    listingsType &&
    listingsType === "For Sale"
  ) {
    queryFilter.push({
      PropertyType: {
        in: [
          "ResidentialIncome",
          "Residential",
          "ManufacturedInPark",
          "Land",
          "Farm",
          "CommercialSale",
          "BusinessOpportunity"
        ]
      }
    })
  }

  if (priceRange && priceRange.length === 2) {
    priceRange[0] &&
      queryFilter.push({ ListPrice: { ge: Number(priceRange[0]) } })
    priceRange[1] &&
      priceRange[1] > 0 &&
      queryFilter.push({ ListPrice: { le: Number(priceRange[1]) } })
  }

  if (polygon && polygon[0] && polygon[1] && polygon[2]) {
    queryFilter.push(
      `geo.intersects(Coordinates, POLYGON((${polygon.map(
        (row: { lng: number; lat: number }) => row.lng + " " + row.lat
      )},${polygon[0].lng} ${polygon[0].lat})))`
    )
  } else if (polygon && polygon?.radius && polygon?.center) {
    queryFilter.push(
      `geo.distance(Coordinates, POINT(${polygon.center.lng} ${
        polygon.center.lat
      })) le ${parseInt(polygon.radius) / 1000}km`
    )
  } else if (
    viewport &&
    viewport.southwest &&
    viewport.northeast &&
    !address &&
    !streetAddress
  ) {
    const IntersectsPolyPath = [
      {
        lng: viewport.southwest.lng,
        lat: viewport.southwest.lat
      },
      {
        lng: viewport.northeast.lng,
        lat: viewport.southwest.lat
      },
      {
        lng: viewport.northeast.lng,
        lat: viewport.northeast.lat
      },
      {
        lng: viewport.southwest.lng,
        lat: viewport.northeast.lat
      }
    ]

    queryFilter.push(
      `geo.intersects(Coordinates, POLYGON((${IntersectsPolyPath.map(
        (row) => row.lng + " " + row.lat
      )},${IntersectsPolyPath[0].lng} ${IntersectsPolyPath[0].lat})))`
    )
  }

  if (city && city !== "") {
    queryFilter.push({ City: city })
  }

  if ((address && address !== "") || (streetAddress && streetAddress !== "")) {
    const addressParts = address
      ? address.split("--")
      : streetAddress.split("--")

    if (addressParts.length > 1) {
      const firstArrItemThreeParts = addressParts[0]
        .split(" ")
        .slice(0, 3)
        .join(" ")
      const secondArrItemThreeParts = addressParts[1]
        .split(" ")
        .slice(0, 3)
        .join(" ")
      queryFilter.push({
        or: [
          {
            UnparsedAddress: { contains: firstArrItemThreeParts.toLowerCase() }
          },
          {
            UnparsedAddress: { contains: secondArrItemThreeParts.toLowerCase() }
          }
        ]
      })
    } else {
      const firstThreeParts =
        address.split(" ").slice(0, 3).join(" ") ||
        streetAddress.split(" ").slice(0, 3).join(" ")
      queryFilter.push({
        UnparsedAddress: { contains: firstThreeParts.toLowerCase() }
      })
    }
  }

  if (neighborhood && neighborhood !== "") {
    queryFilter.push({
      SubdivisionName: { contains: neighborhood.toLowerCase() }
    })
  }

  if (zipCode && zipCode !== "") {
    queryFilter.push({ PostalCode: zipCode })
  }

  if (state && state !== "") {
    queryFilter.push({ StateOrProvince: state })
  }

  if (county && county !== "") {
    queryFilter.push({ CountyOrParish: county })
  }

  if (highSchool && highSchool !== "") {
    const highSchoolRemoved = highSchool.replace(/ high school/gi, "")

    queryFilter.push({
      HighSchool: { contains: highSchoolRemoved.toLowerCase() }
    })
  }

  if (middleSchool && middleSchool !== "") {
    const middleSchoolRemoved = middleSchool.replace(/ middle school/gi, "")

    queryFilter.push({
      MiddleOrJuniorSchool: { contains: middleSchoolRemoved.toLowerCase() }
    })
  }

  if (elementarySchool && elementarySchool !== "") {
    const elementarySchoolRemoved = elementarySchool.replace(
      / elementary school/gi,
      ""
    )

    queryFilter.push({
      ElementarySchool: { contains: elementarySchoolRemoved.toLowerCase() }
    })
  }

  if (mlsAgentId) {
    queryFilter.push({ ListAgentMlsId: mlsAgentId })
  }

  if (listingsDOM) {
    const date = new Date()

    date.setDate(date.getDate() - 15)
    const dateString = date.toISOString().slice(0, 19) + "Z"

    queryFilter.push({ OriginalEntryTimestamp: { gt: dateString } })
  }

  if (yearBuilt && yearBuilt.length === 2) {
    yearBuilt[0] &&
      queryFilter.push({ YearBuilt: { ge: Number(yearBuilt[0]) } })
    yearBuilt[1] &&
      yearBuilt[1] > 0 &&
      queryFilter.push({ YearBuilt: { le: Number(yearBuilt[1]) } })
  }

  if (features) {
    Object.entries(features).forEach(([key, value]) => {
      switch (key) {
        case "pool":
          if (value)
            queryFilter.push({
              or: [
                {
                  PoolFeatures: { contains: "Community" }
                },
                {
                  PoolFeatures: {
                    contains: "In Ground"
                  }
                },
                {
                  PoolFeatures: {
                    contains: "Private"
                  }
                }
              ]
            })
          break
        case "garage":
          if (value)
            queryFilter.push({
              GarageYN: true
            })
          break
        /*  case "basement":
          if (value)
            queryFilter.push({
              BasementYN: true
            })
          break */
        case "airConditioning":
          if (value)
            queryFilter.push({
              or: [
                {
                  InteriorFeatures: { contains: "Air Conditioning" }
                },
                {
                  InteriorFeatures: {
                    contains: "Air Conditioned"
                  }
                },
                {
                  Cooling: {
                    contains: "Central Air"
                  }
                },
                {
                  PublicRemarks: { contains: "air conditioning" }
                }
              ]
            })
          break
        default:
          break
      }
    })
  }

  return { queryFilter, sortBy }
}

export function generateMeta(siteSettings: TSiteSettings) {
  if (siteSettings) {
    return {
      title: siteSettings ? siteSettings.site_identity.title : null,
      description: siteSettings ? siteSettings.site_identity.description : null,

      icons: {
        icon: {
          url: siteSettings.site_identity.site_icon,
          type: "image/png",
          sizes: "32x32"
        },
        shortcut: siteSettings.site_identity.site_icon,
        apple: siteSettings.site_identity.site_icon,
        other: {
          rel: siteSettings.site_identity.site_icon,
          url: siteSettings.site_identity.site_icon
        }
      }
    }
  } else {
    return {
      title: null,
      description: null
    }
  }
}

export function createLightDarkGradient(
  gradientColor: string,
  hexColor: string,
  step: number
) {
  const hexToRgb = (hex: string) => {
    hex = hex.replace(/^#/, "")
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    return { r, g, b }
  }

  const {
    r: lightR,
    g: lightG,
    b: lightB
  } = hexToRgb(gradientColor || hexColor)

  const { r, g, b } = hexToRgb(hexColor)

  const darkerR = Math.max(0, lightR - step)
  const darkerG = Math.max(0, lightG - step)
  const darkerB = Math.max(0, lightB - step)

  return [
    `${darkerR} ${darkerG} ${darkerB}`,
    `${r} ${g} ${b}`,
    `${lightR} ${lightG} ${lightB}`
  ]
}

export async function downloadFile(file: string) {
  const response = await axios.get(file, { responseType: "arraybuffer" })
  const base64Data = Buffer.from(response.data, "binary").toString("base64")
  return base64Data
}

export function base64Img(img: string) {
  const mimeType = getMimeType(img)

  return `data:image/${mimeType};base64,${img}`
}

const getMimeType = (base64: string) => {
  const signatures: Record<string, string> = {
    JVBERi0: "application/pdf",
    R0lGODdh: "gif",
    R0lGODlh: "gif",
    iVBORw0KGgo: "png",
    "/9j/": "jpeg",
    PHN2ZyB: "svg+xml",
    UklGR: "webp"
  }

  const cleanedBase64 = base64.replace(/[\n\r]/g, "") // Remove line breaks
  for (const sign in signatures) {
    if (cleanedBase64.startsWith(sign)) {
      return signatures[sign]
    }
  }
  return "unknown"
}

export function getFileFormatFromLink(link: string) {
  // Extract the file name from the link
  const fileName = link.substring(link.lastIndexOf("/") + 1)

  // Extract the file format from the file name using regex
  const fileFormatMatch = fileName.match(/\.(.*?)$/)

  // Check if a file format is found
  if (fileFormatMatch) {
    const fileFormat = fileFormatMatch[1]
    return fileFormat
  } else {
    return "Unknown"
  }
}

export function removeCommaAndWhitespaceAtStart(value: string) {
  if (!value || value.length === 0) return ""
  const start = value.match(/^,?\s*/)
  return start ? value.slice(start[0].length) : value
}

/**
 * Fix odata contains space in query
 */
export function fixContainsQuery(generateQuery: string): string {
  // Regular expression for matching "contains" with a term
  const regex = /contains\(([^)]+),([^)]*)\)/gi

  const updatedGenerateQuery = generateQuery.replace(regex, (match) => {
    // Replace commas with comma and space
    return match.replace(/,/g, ", ")
  })

  return updatedGenerateQuery
}

export function calculateBoundingBox(lat: number, lon: number, radius = 50) {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (radius / R) * (180 / Math.PI)
  const dLon =
    ((radius / R) * (180 / Math.PI)) / Math.cos(lat * (Math.PI / 180))

  const neLat = lat - dLat
  const swLat = lat + dLat
  const neLng = lon - dLon
  const swLng = lon + dLon

  return { neLat, swLat, neLng, swLng }
}

/**
 * Categorize location predictions by type
 */

export function categorizeByType({
  data,
  provider
}: TCategorizeByTypeProps): Record<string, TLocationGooglePrediction[]> {
  const categories: Record<string, TLocationGooglePrediction[]> = {}

  if (provider === "google") {
    for (const item of data) {
      const types = item.types

      const hasSecondarySchool = types.includes("secondary_school")
      const hasPrimarySchool = types.includes("primary_school")

      // Exclude secondary_school and primary_school if they exist
      const typeMap: Record<string, string> = {
        locality: "city",
        administrative_area_level_1: "state",
        secondary_school: "high school",
        primary_school: "elementary school",
        school: "middle / junior school",
        sublocality_level_1: "neighborhood",
        street_address: "street address",
        premise: "address",
        postal_code: "zip code",
        neighborhood: "neighborhood"
      }

      if (!hasSecondarySchool && !hasPrimarySchool) {
        const mappedType =
          Object.keys(typeMap).find((key) => types.includes(key)) &&
          typeMap[
            Object.keys(typeMap).find((key) => types.includes(key)) as string
          ]
        /* : "other" */

        if (mappedType) {
          categories[mappedType] = categories[mappedType] || []
          categories[mappedType].push(item)
        }
      }

      if (hasSecondarySchool) {
        categories["high school"] = categories["high school"] || []
        categories["high school"].push(item)
      }

      if (hasPrimarySchool) {
        categories["elementary school"] = categories["elementary school"] || []
        categories["elementary school"].push(item)
      }
    }
  }

  return categories
}

export function getLotSize(details: ListingsValue) {
  const { LotSizeAcres, LotSizeSquareFeet, LotSizeUnits, LotSizeArea } = details

  if (LotSizeAcres) {
    return { value: LotSizeAcres, label: "Acres" }
  }

  if (LotSizeSquareFeet) {
    return { value: LotSizeSquareFeet, label: "Square Feet" }
  }

  if (LotSizeUnits) {
    return { value: LotSizeArea, label: LotSizeUnits }
  }

  return { value: LotSizeArea, label: "" }
}

export const openInNewTab = (url: string) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer")
  if (newWindow) newWindow.opener = null
}

export function capitalize(string: string) {
  return string[0].toUpperCase() + string.slice(1)
}

export function getDateSince(timestamp: Date) {
  const originalEntryTimestamp = new Date(timestamp)
  const today = new Date()
  return dayjs(today).diff(dayjs(originalEntryTimestamp), "day")
}

export function genViewport(point: google.maps.LatLngLiteral) {
  const latRadian = (point.lat * Math.PI) / 180
  const earthRadius = 6371
  const angularRadius = 50 / earthRadius
  const minLat =
    point.lat - (angularRadius * (180 / Math.PI)) / Math.cos(latRadian)
  const maxLat =
    point.lat + (angularRadius * (180 / Math.PI)) / Math.cos(latRadian)
  const minLng =
    point.lng - (angularRadius * (180 / Math.PI)) / Math.cos(latRadian)
  const maxLng =
    point.lng + (angularRadius * (180 / Math.PI)) / Math.cos(latRadian)

  return {
    northeast: { lat: maxLat, lng: maxLng },
    southwest: { lat: minLat, lng: minLng }
  }
}
