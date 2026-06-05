"use client"

import { mdiArrowRight } from "@mdi/js"
import Icon from "@mdi/react"
import { useRouter } from "next-nprogress-bar"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import { Button } from "@/components/common/Button"
import Loading from "@/components/common/Loading"
import BedBathFilter from "@/components/ListingsContainer/ListingsFilter/BedBathFilter/BedBathFilter"
import LocationFilter from "@/components/ListingsContainer/ListingsFilter/LocationFilter/LocationFilter"
import PriceRangeFilter from "@/components/ListingsContainer/ListingsFilter/PriceRangeFilter/PriceRangeFilter"
import PropertyTypeFilter from "@/components/ListingsContainer/ListingsFilter/PropertyTypeFilter/PropertyTypeFilter"
import { useJsApiLoader } from "@/hooks/useJsApiLoader"
import type {
  TBathroomsFilter,
  TBedroomsFilter,
  TPriceRangeFilter,
  TPropertyTypeFilter,
  TViewportFilter
} from "@/types/filter.type"
import { cn } from "@/utils/helpers"

export type TUrlSearchParams = {
  exactBeds: boolean
  exactBaths: boolean
  anyBeds: boolean
  anyBaths: boolean
  zoom: string | null
  location: string | null
  address: string | null
  streetAddress: string | null
  city: string | null
  zipCode: string | null
  state: string | null
  county: string | null
  neighborhood: string | null
  highSchool: string | null
  middleSchool: string | null
  elementarySchool: string | null
  viewport: TViewportFilter | null
  coordinations: google.maps.LatLngLiteral | null
  listingsType: string
  priceRange: TPriceRangeFilter
  beds: TBedroomsFilter | null
  baths: TBathroomsFilter | null
  propertyType: TPropertyTypeFilter
}

const HeroFilters = ({ isSearchOnly }: { isSearchOnly?: boolean }) => {
  const [isOpenSearchPage, setOpenSearchPage] = useState(false)
  const [searchType, setSearchType] = useState("")
  const [urlSearchParams, setUrlSearchParams] = useState<TUrlSearchParams>({
    address: null,
    city: null,
    county: null,
    elementarySchool: null,
    highSchool: null,
    middleSchool: null,
    neighborhood: null,
    state: null,
    streetAddress: null,
    zipCode: null,
    coordinations: null,
    viewport: null,
    listingsType: "For Sale",
    priceRange: ["", ""],
    baths: ["Any"],
    beds: ["Any"],
    location: "",
    propertyType: {
      Residential: [],
      Commercial: []
    },
    exactBeds: true,
    exactBaths: true,
    anyBeds: true,
    anyBaths: true,
    zoom: null
  })

  const { isLoaded } = useJsApiLoader({})
  const router = useRouter()

  useEffect(() => {
    if (isOpenSearchPage) {
      handleSearch()
      setOpenSearchPage(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenSearchPage])

  function handleSearch() {
    if (
      +urlSearchParams.priceRange[1] &&
      +urlSearchParams.priceRange[1] < +urlSearchParams.priceRange[0]
    ) {
      toast.error("Max Price must be greater than Min Price")
      return
    }

    const searchParams = Object.entries(urlSearchParams)
      .filter(([key, value]) => {
        if (key === "listingsType" && value === "For Any") {
          return false
        }
        if (typeof value === "object" && !Array.isArray(value)) {
          return JSON.stringify(value) !== "[]" && value !== null
        }
        if (Array.isArray(value) && value.some((item) => item !== "")) {
          return true
        }
        if (value === "" || value === null) {
          return false
        }
        return false
      })
      .map(([key, value]) => {
        return `${key}=${
          typeof value === "object" || Array.isArray(value)
            ? Array.isArray(value)
              ? JSON.stringify(
                  value.map((item) => {
                    return typeof item === "string"
                      ? encodeURIComponent(item)
                      : item
                  })
                )
              : JSON.stringify(value)
            : typeof value === "string"
              ? encodeURIComponent(value)
              : value
        }`
      })
      .join("&")

    const url =
      searchType === "neighborhood"
        ? `neighborhood/${urlSearchParams.state}/${(urlSearchParams.city as string).replace(/ /g, "-")}/${(urlSearchParams.neighborhood as string).replace(/ /g, "-")}?${searchParams}`
        : searchType === "city"
          ? `city/${urlSearchParams.state}/${(urlSearchParams.city as string).replace(/ /g, "-")}?${searchParams}`
          : searchType === "state"
            ? `state/${urlSearchParams.state}?${searchParams}`
            : `listings?${searchParams}`

    router.push(url)
  }

  return (
    <div
      className={cn(
        "mt-3 flex w-full flex-col justify-center gap-3 sm:mt-10",
        isSearchOnly ? "items-center" : "items-start"
      )}
    >
      {!isSearchOnly && (
        <div className="col-span-full flex w-full items-center justify-start gap-3">
          <Button
            onClick={(e) =>
              setUrlSearchParams((prev) => ({
                ...prev,
                listingsType: "For Rent"
              }))
            }
            size={"sm"}
            gradient={
              urlSearchParams.listingsType === "For Rent"
                ? "secondary"
                : "transparent"
            }
          >
            For Rent
          </Button>
          <Button
            size={"sm"}
            onClick={(e) =>
              setUrlSearchParams((prev) => ({
                ...prev,
                listingsType: "For Sale"
              }))
            }
            gradient={
              urlSearchParams.listingsType === "For Sale"
                ? "secondary"
                : "transparent"
            }
          >
            For Sale
          </Button>
        </div>
      )}

      <div
        className={cn(
          "z-[1002] flex flex-wrap items-center gap-3 p-5 shadow-hero-filter lg:rounded-full",
          isSearchOnly
            ? "w-full max-w-[800px] justify-center"
            : "w-fit justify-start rounded-3xl bg-primary-1/70"
        )}
      >
        {isLoaded ? (
          <LocationFilter
            setSearchType={setSearchType}
            openSearchPage={() => setOpenSearchPage(true)}
            isSearchOnly={isSearchOnly}
            isHome={true}
            setUrlSearchParams={setUrlSearchParams}
          />
        ) : (
          <Loading />
        )}
        {!isSearchOnly && (
          <>
            <PropertyTypeFilter
              isHome={true}
              setUrlSearchParams={setUrlSearchParams}
              urlSearchParams={urlSearchParams}
            />
            <PriceRangeFilter
              isHome={true}
              setUrlSearchParams={setUrlSearchParams}
              urlSearchParams={urlSearchParams}
            />
            <BedBathFilter
              isHome={true}
              setUrlSearchParams={setUrlSearchParams}
              urlSearchParams={urlSearchParams}
            />
            <Button
              onClick={() => handleSearch()}
              gradient="secondary"
              size={"sm"}
              textSize={"sm"}
              className="relative flex gap-1 pl-8 shadow-secondary"
            >
              <Icon
                path={mdiArrowRight}
                size={0.8}
                className="absolute left-2"
              />{" "}
              Search
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default HeroFilters
