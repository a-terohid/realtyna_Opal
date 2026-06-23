import { useQuery } from "@tanstack/react-query"
import { mapyna as mapynaMap } from "mapyna"
import { useSearchParams } from "next/navigation"
import { parseAsJson } from "nuqs"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import Loading from "@/components/common/Loading"
import { stateListData } from "@/data/state_data"
import { useGetPathName } from "@/hooks/useGetPathName"
import { useInvalidateQueries } from "@/hooks/useInvalidateQueries"
import { useJsApiLoader } from "@/hooks/useJsApiLoader"
import { useQueryParams } from "@/hooks/useQueryParams"
import { getLatLng } from "@/services/location/getLatLng"
import useStore from "@/store/useStore"
import type { ListingsData } from "@/types/listings.type"
import { cn } from "@/utils/helpers"
import { handleMapConfig } from "@/utils/mapyna.util"

interface IProps {
  listingsData: ListingsData
}

type TMapynaData = {
  type: string
  geometry:
    | {
        northWest: {
          lat: number
          lng: number
        }
        southWest: {
          lat: number
          lng: number
        }
        northEast: {
          lat: number
          lng: number
        }
        southEast: {
          lat: number
          lng: number
        }
      }
    | google.maps.LatLngLiteral[]
}

const ListingsMapGoogle: React.FC<IProps> = ({ listingsData }) => {
  const [isUpdate, setIsUpdate] = useState<any | null>(null)
  const [isDrawingDone, setIsDrawingDone] = useState<any | null>(null)

  const [initialLoad, setInitialLoad] = useState(true)

  const { get, set } = useQueryParams()

  const searchParams = useSearchParams()
  const pathname = useGetPathName()

  const mapyna = useStore((state) => state.mapyna)
  const setMapyna = useStore((state) => state.setMapyna)
  const { polygon } = useStore.getState().mapFilters
  const setPolygon = useStore((state) => state.setPolygon)

  const invalidateQueries = useInvalidateQueries()

  const { isLoaded, loadError } = useJsApiLoader({})

  useEffect(() => {
    if (isUpdate) {
      setIsUpdate(false)
      handleUpdate(isUpdate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate])

  useEffect(() => {
    if (isDrawingDone) {
      setIsDrawingDone(false)
      handleDrawingDone(isDrawingDone)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDrawingDone])

  useEffect(() => {
    if (loadError) {
      toast.error(loadError.message)
    }
  }, [loadError])

  /**
  |--------------------------------------------------
  | Initial setup for mapyna
  |--------------------------------------------------
  */

  useEffect(() => {
    if (isLoaded) initMapyna()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded])

  async function initMapyna() {
    let instance = null

    if (!isLoaded) return

    let lat: number | undefined, lng: number | undefined

    // In case of address | street address search
    // as data in MiamiRE is not reliable because of using OSM for coordination
    if (get("coordination")) {
      lat = get("coordination")?.lat
      lng = get("coordination")?.lng
    }

    // in case of opening pages without search params, as it might get wrong coordinates from listings data
    let mapFitboundsViewport: google.maps.LatLngBounds | null = null

    const viewport = searchParams.get("viewport")

    if (pathname.type === "state" && pathname.state && !viewport) {
      const state = stateListData[pathname.state as keyof typeof stateListData]
      lat = state.center.lat
      lng = state.center.lng
      mapFitboundsViewport = new google.maps.LatLngBounds(state.viewport)
    } else if (pathname.type === "city" && pathname.city && pathname.state === "FL" && !viewport) {
      const res = await getLatLng(pathname.city.replace(/-/g, " "))
      if (res) {
        const foundItem = res.results.find((item) => {
          const state = item.address_components?.find((component) =>
            component.types.includes("administrative_area_level_1")
          )?.short_name as string

          return state === pathname.state
        })

        if (foundItem) {
          const geometry = foundItem.geometry
          const { location, viewport } = geometry
          lat = location.lat
          lng = location.lng
          mapFitboundsViewport = new google.maps.LatLngBounds({
            north: viewport.northeast.lat,
            south: viewport.southwest.lat,
            east: viewport.northeast.lng,
            west: viewport.southwest.lng
          })
        }
      }
    } else if (pathname.type === "neighborhood" && pathname.neighborhood && pathname.state === "FL" && !viewport) {
      const res = await getLatLng(pathname.neighborhood)
      if (res && res.results.length > 0) {
        const foundItem = res.results.find((item) => {
          const city = item.address_components?.find((component) => component.types.includes("locality"))
            ?.short_name as string

          return city === pathname.city
        })

        if (foundItem) {
          const geometry = foundItem.geometry
          const { location, viewport } = geometry
          lat = location.lat
          lng = location.lng
          mapFitboundsViewport = new google.maps.LatLngBounds({
            north: viewport.northeast.lat,
            south: viewport.southwest.lat,
            east: viewport.northeast.lng,
            west: viewport.southwest.lng
          })
        }
      }
    }

    let totalLat = 0
    let totalLng = 0
    let count = 0

    if (listingsData && listingsData.value && listingsData.value.length > 0) {
      for (let i = 0; i < 10; i++) {
        const listing = listingsData.value[i]

        if (
          listing &&
          listing.Coordinates &&
          listing.Coordinates.length === 2 &&
          listing.Coordinates[0] !== 0 &&
          listing.Coordinates[1] !== 0
        ) {
          totalLat += listing.Coordinates[1]
          totalLng += listing.Coordinates[0]
          count++
        } else if (
          listing &&
          listing.Latitude &&
          listing.Latitude !== 0 &&
          listing.Longitude &&
          listing.Longitude !== 0
        ) {
          totalLat += listing.Latitude
          totalLng += listing.Longitude
          count++
        }
      }
    }

    lat = count > 0 ? totalLat / count : undefined
    lng = count > 0 ? totalLng / count : undefined


    // in case of no listings and no city then set lat and lng from search params if exist

    if (viewport && !lat && !lng) {
      const { northeast, southwest } = JSON.parse(decodeURIComponent(viewport))

      const centerLat = (+northeast.lat + +southwest.lat) / 2
      const centerLng = (+northeast.lng + +southwest.lng) / 2

      lat = +centerLat
      lng = +centerLng
    }

    // in case of no listings and no city then set lat and lng from env
    const mapConfig = await handleMapConfig(lat ?? +process.env.NEXT_PUBLIC_LAT!, lng ?? +process.env.NEXT_PUBLIC_LNG!)

    instance = mapynaMap().googleMap(mapConfig)

    const mapBounds = window.localStorage.getItem("mapBounds")
    if ((mapBounds || mapFitboundsViewport) && !lat && !lng) {
      instance.fitBounds(mapBounds ? JSON.parse(mapBounds) : mapFitboundsViewport)
      mapBounds && window.localStorage.removeItem("mapBounds")
    }

    const zoom = searchParams.get("zoom")
    zoom && instance.map?.setZoom(+zoom)

if (listingsData?.value?.length) {
  instance.updateData(listingsData.value)
}

setMapyna(instance)
  }

  useEffect(() => {
  if (!mapyna) return
  if (!listingsData?.value) return

  mapyna.updateData(listingsData.value)
}, [mapyna, listingsData])

  /**
  |--------------------------------------------------
  | Event handlers
  |--------------------------------------------------
  */

  useEffect(() => {
    if (!mapyna) {
      return
    }
    mapyna?.on("drawingDone", setIsDrawingDone)
    mapyna?.on("update", setIsUpdate)

    return () => {
      mapyna?.off("drawingDone", handleDrawingDone)
      mapyna?.off("update", setIsUpdate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapyna])

  /**
  |--------------------------------------------------
  | Query functions
  |--------------------------------------------------
  */

  const {
    isFetching: isFetchingMapMarkers,
    isLoading: isLoadingMapMarkers,
    isRefetching: isRefetchingMapMarkers
  } = useQuery({
    queryKey: ["mapListings"],
    enabled: false
  })

  /**
  |--------------------------------------------------
  | Event handlers functions
  |--------------------------------------------------
  */


  const handleDrawingDone = async (data: {
    geometry: {
      lat: number
      lng: number
    }[]
    mode: string
  }) => {
    setPolygon(data.geometry)

    const drawingPolygon = parseAsJson().serialize(data.geometry)

    invalidateQueries(searchParams, drawingPolygon)
  }

  const handleUpdate = async (data: TMapynaData) => {
    if (!mapyna || !data.geometry) return

    const zoom = mapyna.zoom().toFixed(0)
    set("zoom", zoom)

    // Map zone layers polygon
    if (data.type === "zone" && Array.isArray(data.geometry)) {
      setPolygon(data.geometry)

      const polygon = parseAsJson().serialize(data.geometry)

      invalidateQueries(searchParams, polygon)
    }

    // Map move
    if ("northEast" in data.geometry && "southWest" in data.geometry) {
      const ne = data.geometry.northEast
      const sw = data.geometry.southWest

      if (data.type === "drawingRemoved") {
        setPolygon(null)
        set("viewport", {
          northeast: { lat: ne?.lat.toString(), lng: ne?.lng.toString() },
          southwest: { lat: sw?.lat.toString(), lng: sw?.lng.toString() }
        }).then((res) => {
          invalidateQueries(res)
        })
      }

      if (data.type === "zoneRemoved") {
        setPolygon(null)
        set("viewport", {
          northeast: { lat: ne?.lat.toString(), lng: ne?.lng.toString() },
          southwest: { lat: sw?.lat.toString(), lng: sw?.lng.toString() }
        }).then((res) => {
          invalidateQueries(res)
        })
      }

      if (!polygon) {
        set("viewport", {
          northeast: { lat: ne?.lat.toString(), lng: ne?.lng.toString() },
          southwest: { lat: sw?.lat.toString(), lng: sw?.lng.toString() }
        }).then((res) => {
          setInitialLoad(false)
          invalidateQueries(res, "", initialLoad)
        })
      }
    }
  }

  return (
    <>
      <div className={cn("!w-full min-h-dvh relative bg-gray-2 rounded-l-md items-center justify-center")} id="mapyna">
        {(isFetchingMapMarkers || isLoadingMapMarkers || isRefetchingMapMarkers) && (
          <Loading wrapperClass="absolute top-16 left-5 z-[3]" />
        )}
      </div>
    </>
  )
}

export default ListingsMapGoogle
