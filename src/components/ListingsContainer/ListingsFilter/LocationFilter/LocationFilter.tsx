import { mdiClose, mdiMagnify, mdiMap } from "@mdi/js"
import Icon from "@mdi/react"
import { debounce } from "lodash"
import { useSearchParams } from "next/navigation"
import { parseAsJson } from "nuqs"
import buildQuery from "odata-query"
import type { Dispatch, SetStateAction } from "react"
import { useCallback, useEffect, useState } from "react"
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService"
import toast from "react-hot-toast"

import Loading from "@/components/common/Loading"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/common/Popover"
import type { TUrlSearchParams } from "@/components/HomeContainer/Hero/HeroFilters/HeroFilters"
import { useInvalidateQueries } from "@/hooks/useInvalidateQueries"
import { useQueryParams } from "@/hooks/useQueryParams"
import { getListingsData } from "@/services/listings/getListings"
import { getSiteSettings } from "@/services/theme/getSiteSettings"
import useStore from "@/store/useStore"
import type { TLocationGooglePrediction } from "@/types/filter.type"
import type { ListingsValue } from "@/types/listings.type"
import {
  categorizeByType,
  cn,
  fixContainsQuery,
  generateQueryFilter,
  openInNewTab,
  removeCommaAndWhitespaceAtStart
} from "@/utils/helpers"

interface IProps {
  openSearchPage?: () => void
  isSearchOnly?: boolean
  isHome?: boolean
  isMobile?: boolean
  setSearchType?: Dispatch<SetStateAction<string>>
  setUrlSearchParams?: Dispatch<SetStateAction<TUrlSearchParams>>
}

const featureType = {
  city: "LOCALITY",
  state: "ADMINISTRATIVE_AREA_LEVEL_1",
  "zip code": "POSTAL_CODE"
}

const LocationFilter: React.FC<IProps> = ({
  isHome = false,
  isMobile = false,
  isSearchOnly,
  openSearchPage,
  setSearchType,
  setUrlSearchParams
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [siteName, setSiteName] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selected, setSelected] = useState<{ groupType: string; item: TLocationGooglePrediction } | undefined>()
  const [options, setOptions] = useState<Record<string, TLocationGooglePrediction[]>>({})
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const mapyna = useStore((state) => state.mapyna)
  const viewMode = useStore((state) => state.viewMode)

  const invalidateQueries = useInvalidateQueries()
  const { set, get, removeLocationParams, locationParams } = useQueryParams()

  const searchParams = useSearchParams()

  const { placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
    options: {
      input: searchTerm,
      componentRestrictions: {
        country: "us"
      }
    }
  })

  /**
   * Get Location Suggestions
   */
  useEffect(() => {
    if (placePredictions && placePredictions.length > 0) {
      const categorizedData = categorizeByType({
        data: placePredictions,
        provider: "google"
      })

      if (Object.keys(categorizedData).length === 0) {
        setOptions({
          "No result! \u{1F50D} Search on Map ?": [
            {
              description: searchTerm || "",
              place_id: "0",
              types: ["search_on_map"]
            }
          ]
        })
      } else {
        setOptions(categorizedData)
      }
      setIsOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placePredictions])

  const setQueryStatesByType = {
    city: (v: string | null) => set("city", v),
    address: (v: string | null) => set("address", v),
    "street address": (v: string | null) => set("streetAddress", v),
    state: (v: string | null) => set("state", v),
    neighborhood: (v: string | null) => set("neighborhood", v),
    "zip code": (v: string | null) =>
      isHome && setUrlSearchParams ? setUrlSearchParams((prev) => ({ ...prev, zipCode: v })) : set("zipCode", v),
    "high school": (v: string | null) =>
      isHome && setUrlSearchParams ? setUrlSearchParams((prev) => ({ ...prev, highSchool: v })) : set("highSchool", v),
    "middle / junior school": (v: string | null) =>
      isHome && setUrlSearchParams
        ? setUrlSearchParams((prev) => ({ ...prev, middleSchool: v }))
        : set("middleSchool", v),
    "elementary school": (v: string | null) =>
      isHome && setUrlSearchParams
        ? setUrlSearchParams((prev) => ({ ...prev, elementarySchool: v }))
        : set("elementarySchool", v)
  }

  /**
   * Set search location value in query params into search term
   */
  useEffect(() => {
    if (!isHome) {
      const existingValues = locationParams.filter(Boolean)

      if (existingValues.length > 0) {
        const value = existingValues[0]?.split("--")[0] ?? ""

        setSearchTerm(value)
      } else {
        setSearchTerm("")
      }
    }
  }, [isHome, locationParams])

  /**
   * Search exact listings address
   */
  async function handleAddressSearch({
    locationDetails,
    locationDescription
  }: {
    locationDetails: google.maps.places.PlaceResult
    locationDescription: string
  }) {
    const northeast = locationDetails?.geometry?.viewport?.getNorthEast()
    const southwest = locationDetails?.geometry?.viewport?.getSouthWest()

    const query = {
      viewport: parseAsJson().serialize({
        northeast,
        southwest
      })
    }

    const { queryFilter } = generateQueryFilter(query)

    const generateQuery = buildQuery({
      filter: queryFilter,
      select: "UnparsedAddress,ListingKey"
    })

    const updatedGenerateQuery = fixContainsQuery(generateQuery)

    const data = await getListingsData({
      query: updatedGenerateQuery
    })

    let isMatched: ListingsValue | null = null

    for (const v of data.value) {
      const unparsedAddressSplit = v.UnparsedAddress.split(",")
      const formattedAddressSplit = locationDetails?.formatted_address?.split(",")
      const locationDescriptionSplit = locationDescription.split(",")

      if (
        unparsedAddressSplit[0].split(" ")[0] ===
        (formattedAddressSplit?.[0].split(" ")[0] || locationDescriptionSplit[0].split(" ")[0])
      ) {
        if (isMatched) {
          isMatched = null
          break
        }
        isMatched = v
      }
    }

    if (isMatched) {
      const [address, subAddress] = removeCommaAndWhitespaceAtStart(isMatched.UnparsedAddress).split(",", 2)

      const url = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listings/${isMatched.ListingKey}${
        address ? `-${(address + subAddress).replace(/\s+/g, "-").replace(/[/\\]/g, "-")}` : ""
      }`

      openInNewTab(url)
    }
  }

  /**
   * Draw boundary on map for selected location
   */

  function styleBoundary(placeid?: string, type?: string) {
    const featureLayer = mapyna?.map?.getFeatureLayer(type || "LOCALITY")

    // Define a style of transparent purple with opaque stroke.
    const styleFill = {
      strokeColor: "#4c99cc",
      strokeOpacity: 1.0,
      strokeWeight: 3.0,
      fillColor: "#397299",
      fillOpacity: 0.5
    }

    featureLayer.style = (params: { feature: { placeId: string } }) => {
      if (params.feature.placeId === placeid) {
        return styleFill
      } else {
        return null
      }
    }
  }

  /**
   * Get Location Suggestions
   */
  function handleSearch(value: string) {
    setSearchTerm(value)
    value.length > 0 && debounceFn(value)
  }

  /**
   * Handle keydown event
   */
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && options) {
      event.preventDefault()
      event.stopPropagation()
      if (Object.entries(options)) {
        handleAddressSelect(Object.entries(options)[0][0], Object.entries(options)[0][1][0])
      }
    }
  }

  function handleAddressSelect(groupType: string, value: TLocationGooglePrediction) {
    if (get("priceRange")[1] && +get("priceRange")[1] < +get("priceRange")[0]) {
      toast.error("Please enter a valid price range")
      return
    }
    setSelected({ groupType, item: value })
    getDetails({ groupType, item: value })
  }

  /**
   * debounce function to get location suggestions
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(
    debounce((value) => getPlacePredictions({ input: value }), 500),
    []
  )

  async function getDetails({ groupType, item }: { groupType: string; item: TLocationGooglePrediction }) {
    setIsLoading(true)

    // Remove all existing values from url query and polygons on new search
    const searchParams = await removeLocationParams()

    if (!isHome) {
      styleBoundary()
    }

    if (item.place_id !== "0") {
      placesService?.getDetails({ placeId: item.place_id }, async (data) => {
        if (data) {
          // Destructure data
          const formattedAddress = data?.formatted_address?.split(",")
          const { viewport, location } = data.geometry || {}

          if (!viewport || !location) return

          const northeast = viewport.getNorthEast().toJSON()
          const southwest = viewport.getSouthWest().toJSON()

          /**
           * Check if type is one the predefined ones for precise location search
           */
          if (groupType in setQueryStatesByType) {
            /**
             * Check if type is address
             */
            if (groupType === "address") {
              await handleAddressSearch({
                locationDetails: data,
                locationDescription: item.description
              })

              const cityComponent = data.address_components?.find((component) => component.types.includes("locality"))
              const city = cityComponent ? (cityComponent.short_name as string) : ""

              const mainText = item.description.split(",")[0]

              if (isHome && setSearchType && setUrlSearchParams) {
                setSearchType("address")
                setUrlSearchParams((prev) => ({
                  ...prev,
                  address:
                    mainText !== (data.name || formattedAddress?.[0])
                      ? `${mainText}--${data.name || formattedAddress?.[0]}`
                      : data.name || formattedAddress?.[0] || "",
                  coordinations: location?.toJSON(),
                  city: city
                }))
              } else {
                const url = `${process.env.NEXT_PUBLIC_BASE_PATH || "/"}listings?${searchParams.toString()}`

                document.title = "Homes & Real Estates"
                window.history.pushState({}, "", url)

                if (mainText !== (data.name || formattedAddress?.[0])) {
                  const address = `${mainText}--${data.name || formattedAddress?.[0]}`
                  set("address", address)
                } else {
                  set("address", data.name || formattedAddress?.[0] || "")
                }
                set("coordination", location?.toJSON())
                set("city", city)
              }

              /**
               * Check if type is street address
               */
            } else if (groupType === "street address") {
              const cityComponent = data.address_components?.find((component) =>
                component.types.includes("locality")
              )?.short_name

              const city = cityComponent ?? ""

              const mainText = item.description.split(",")[0]

              if (isHome && setSearchType && setUrlSearchParams) {
                setSearchType("street address")
                setUrlSearchParams((prev) => ({
                  ...prev,
                  streetAddress:
                    mainText !== (data.name || formattedAddress?.[0])
                      ? `${mainText}--${data.name || formattedAddress?.[0]}`
                      : data.name || formattedAddress?.[0] || "",
                  coordinations: location?.toJSON(),
                  city: city
                }))
              } else {
                const url = `${process.env.NEXT_PUBLIC_BASE_PATH || "/"}listings?${searchParams.toString()}`

                document.title = "Homes & Real Estates"
                window.history.pushState({}, "", url)

                if (mainText !== (data.name || formattedAddress?.[0])) {
                  const address = `${mainText}--${data.name || formattedAddress?.[0]}`
                  set("streetAddress", address)
                } else {
                  set("streetAddress", data.name || formattedAddress?.[0] || "")
                }
                set("coordination", location?.toJSON())
                set("city", city)
              }

              /**
               * Check if type is state
               */
            } else if (groupType === "state") {
              const state = data.address_components?.[0]?.short_name as string

              const url = `${process.env.NEXT_PUBLIC_BASE_PATH || "/"}state/${state}?${searchParams.toString()}`

              const title = `${state} Homes & Real Estates`

              if (isHome && setSearchType && setUrlSearchParams) {
                setSearchType("state")
                setUrlSearchParams((prev) => ({
                  ...prev,
                  state: state,
                  zoom: "7"
                }))
              } else {
                document.title = title + ` | ${siteName}`
                window.history.pushState({}, "", url)
                set("state", state)
              }

              /**
               * Check if type is city
               */
            } else if (groupType === "city") {
              const state = data.address_components?.find((component) =>
                component.types.includes("administrative_area_level_1")
              )?.short_name as string

              const url = `${process.env.NEXT_PUBLIC_BASE_PATH || "/"}city/${state}/${data.name?.replace(/ /g, "-")}?${searchParams.toString()}`

              const title = `${data.name}, ${state} Homes & Real Estates`

              if (isHome && setSearchType && setUrlSearchParams) {
                setSearchType("city")
                setUrlSearchParams((prev) => ({
                  ...prev,
                  city: data.name as string,
                  state
                }))
              } else {
                document.title = title + ` | ${siteName}`
                window.history.pushState({}, "", url)
                set("city", data.name as string)
              }

              /**
               * Check if type is neighborhood
               */
            } else if (groupType === "neighborhood") {
              const state = data.address_components?.find((component) =>
                component.types.includes("administrative_area_level_1")
              )?.short_name as string

              const city = data.address_components?.find((component) => component.types.includes("locality"))
                ?.short_name as string

              const url = `${process.env.NEXT_PUBLIC_BASE_PATH || "/"}neighborhood/${state}/${city.replace(/ /g, "-")}/${(data.name as string).replace(/ /g, "-")}?${searchParams.toString()}`

              const title = `${data.name}, ${city}, ${state} Homes & Real Estates`

              if (isHome && setSearchType && setUrlSearchParams) {
                setSearchType("neighborhood")
                setUrlSearchParams((prev) => ({
                  ...prev,
                  neighborhood: data.name as string,
                  city,
                  state
                }))
              } else {
                document.title = title + ` | ${siteName}`
                window.history.pushState({}, "", url)
                set("neighborhood", data.name as string)
              }

              /**
               * Check if type is any other
               */
            } else {
              if (isHome && setSearchType) {
                setSearchType(groupType)
                setQueryStatesByType[groupType as keyof typeof setQueryStatesByType](data.name as string)
              } else {
                const url = `${process.env.NEXT_PUBLIC_BASE_PATH || "/"}listings?${searchParams.toString()}`

                document.title = "Homes & Real Estates"
                window.history.pushState({}, "", url)

                await setQueryStatesByType[groupType as keyof typeof setQueryStatesByType](data.name as string)
              }
            }

            // Else use the viewport value for search
          } else {
            if (isHome && setSearchType && setUrlSearchParams) {
              setSearchType("location")
              setUrlSearchParams((prev) => ({
                ...prev,
                location: data.name || formattedAddress?.[0] || ""
              }))
            } else {
              const url = `${process.env.NEXT_PUBLIC_BASE_PATH || "/"}listings?${searchParams.toString()}`

              document.title = "Homes & Real Estates"
              window.history.pushState({}, "", url)

              // Set location to formatted address or name
              set("location", data.name || formattedAddress?.[0] || "")
            }
          }

          setSearchTerm(data.name || formattedAddress?.[0] || "")
          if (isHome && setUrlSearchParams) {
            setUrlSearchParams((prev) => ({
              ...prev,
              viewport: {
                northeast,
                southwest
              }
            }))
          } else {
            set("viewport", {
              northeast,
              southwest
            })
          }
          // Check if its a featureType from google in order to draw a polygon over map
          const isFeaturedType = featureType[groupType as keyof typeof featureType]

          const bounds = new google.maps.LatLngBounds(viewport)

          if (isHome) {
            window.localStorage.setItem("mapBounds", JSON.stringify(bounds))
          }

          // For schools we set a custom zoom value to fit the properties in viewport
          if (
            groupType === "high school" ||
            groupType === "middle / junior school" ||
            groupType === "elementary school"
          ) {
            if (isHome && setSearchType && setUrlSearchParams) {
              const school =
                groupType === "high school"
                  ? "highSchool"
                  : groupType === "middle / junior school"
                    ? "middleSchool"
                    : "elementarySchool"
              setUrlSearchParams((prev) => ({
                ...prev,
                zoom: "12",
                [school]: data.name
              }))
            } else {
              if (viewMode === "map") {
                mapyna?.map?.setZoom(12)
                set("zoom", "12")
                mapyna?.map?.setCenter(data.geometry?.location || viewport.getCenter())
              } else {
                set("sID", (prev) => (prev || 0) + 1).then((res) => {
                  invalidateQueries(res)
                })
              }
            }
          }
          // Else set the map to fit the viewport
          else {
            if (isHome) {
              window.localStorage.setItem("mapBounds", JSON.stringify(bounds))
            } else {
              if (viewMode === "map") {
                mapyna?.map?.fitBounds(bounds)
              } else {
                set("sID", (prev) => (prev || 0) + 1).then((res) => {
                  invalidateQueries(res)
                })
              }
            }
          }

          // Style the boundary for the selected location if it exists else remove the existing
          if (isFeaturedType && !isHome) {
            styleBoundary(data.place_id, isFeaturedType)
          }

          setIsOpen(false)
          setSelected(undefined)

          if (isHome && openSearchPage) {
            openSearchPage()
          }
        }
      })
      // In case of no search result from google
    } else {
      if (isHome && setSearchType && setUrlSearchParams && openSearchPage) {
        setSearchType("location")
        setUrlSearchParams((prev) => ({
          ...prev,
          zoom: "14",
          location: searchTerm || ""
        }))

        openSearchPage()
      } else {
        const url = `${process.env.NEXT_PUBLIC_BASE_PATH || "/"}listings?${searchParams.toString()}`

        document.title = "Homes & Real Estates"
        window.history.pushState({}, "", url)

        set("location", searchTerm || "")
        set("viewport", null).then((res) => {
          invalidateQueries(res)
        })
      }

      setIsOpen(false)
      setSelected(undefined)
    }

    setIsLoading(false)
  }

  async function handleClear() {
    setSearchTerm("")
    setSelected(undefined)
    setOptions({})
    set("coordination", null)

    if (isHome && setSearchType) {
      setSearchType("")
    } else {
      const url = `${process.env.NEXT_PUBLIC_BASE_PATH || "/"}listings?${searchParams.toString()}`

      window.history.pushState({}, "", url)
      document.title = "Homes & Real Estates"
      styleBoundary()
    }

    removeLocationParams().then((res) => {
      invalidateQueries(res)
    })
  }

  useEffect(() => {
    async function handleSiteName() {
      const { site_identity } = await getSiteSettings()
      setSiteName(site_identity.siteName)
    }

    handleSiteName()
  }, [])

  return (
    <Popover modal={false} open={isOpen} onOpenChange={(e) => !e && setIsOpen(false)}>
      <div
        className={cn(
          "relative flex h-9 items-center justify-center gap-[.3125rem] px-[.625rem] shadow-search sm:min-w-[320px]",
          isHome
            ? isSearchOnly
              ? "flex h-[65px] w-full items-center justify-center gap-[.3125rem] border-b px-[.625rem] text-white"
              : "w-full border-white/20 bg-white text-black sm:w-auto rounded-full border"
            : "border-black/10 text-black text-black/80 rounded-full border"
        )}
      >
        {!isHome && <Icon path={mdiMap} size={1} className={cn(isHome ? "text-white/70" : "text-black/70")} />}

        <PopoverTrigger asChild>
          <button aria-label="location menu" className="!sr-only bottom-0 left-0 w-full" />
        </PopoverTrigger>
        <input
          type="text"
          aria-label="location"
          id={isMobile ? "location_mobile" : "location"}
          onKeyDown={(e) => {
            handleKeyDown(e)
          }}
          onClick={() => searchTerm && options && Object.keys(options).length > 0 && setIsOpen(true)}
          autoComplete="off"
          placeholder={
            isHome && isSearchOnly ? "Search by Address, MLS ID or School District" : "Enter address, zip code or ..."
          }
          value={searchTerm || ""}
          onChange={(e) => handleSearch(e.target.value)}
          className={cn(
            "w-full bg-transparent z-50 text-[.9375rem] font-normal outline-none",
            isHome
              ? isSearchOnly
                ? "placeholder:text-white md:text-xl lg:text-[1.35rem] text-lg "
                : "placeholder:text-black/50"
              : "placeholder:text-black/50"
          )}
        />
        {isHome && isSearchOnly && (
          <label htmlFor={isMobile ? "location_mobile" : "location"}>
            <Icon path={mdiMagnify} rotate={90} size={1.6} />
          </label>
        )}
        {isPlacePredictionsLoading && <Loading className="mr-0 size-5" />}
        {(searchTerm || get("location")) && (
          <button onClick={() => handleClear()}>
            <Icon path={mdiClose} size={1} />
          </button>
        )}
      </div>

      <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()} className="w-full flex-1 p-1" align="start">
        {Object.entries(options).map((item, index) => (
          <div key={index} className="flex w-full flex-1 flex-col items-start justify-start">
            <span className="w-full rounded-lg bg-gray-1 px-2 py-1.5 text-center text-sm font-medium capitalize">
              {item[0]}
            </span>
            {item[1].map((value, index) => {
              const highlightSearchTerm = (str: string) => {
                if (!searchTerm) return str
                const regex = new RegExp(searchTerm, "i")
                return str.replace(regex, `<span class="bg-secondary-1/30">${searchTerm}</span>`)
              }

              return (
                <div
                  onClick={() => {
                    handleAddressSelect(item[0], value)
                  }}
                  className="relative flex w-full flex-1 cursor-pointer select-none items-center justify-start gap-2 rounded-lg px-2 py-1.5 text-[15px] transition-colors hover:bg-gray-2"
                  key={index}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightSearchTerm(value.description)
                    }}
                  />
                  {(isPlacePredictionsLoading || isLoading) && value.description === selected?.item.description ? (
                    <Loading className="size-4" />
                  ) : (
                    ""
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}

export default LocationFilter
