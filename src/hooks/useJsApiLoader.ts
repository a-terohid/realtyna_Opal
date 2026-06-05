import type { Library } from "@googlemaps/js-api-loader"
import { Loader } from "@googlemaps/js-api-loader"
import { useEffect, useMemo, useRef, useState } from "react"

export type Libraries = Library[]

export interface UseLoadScriptOptions {
  googleMapsApiKey?: string | ""
  googleMapsClientId?: string | undefined
  version?: string | undefined
  language?: string | undefined
  region?: string | undefined
  libraries?: Libraries | undefined
  channel?: string | undefined
  mapIds?: string[] | undefined
  authReferrerPolicy?: "origin" | undefined
  id?: string | undefined
  nonce?: string | undefined
}

const defaultLibraries: Libraries = ["places", "marker"]

export function useJsApiLoader({
  id = "google-maps-script",
  version = "weekly",
  nonce,
  googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || "",
  language,
  region,
  libraries = defaultLibraries,
  mapIds,
  authReferrerPolicy
}: UseLoadScriptOptions): {
  isLoaded: boolean
  loadError: Error | undefined
} {
  const isMounted = useRef(false)
  const [isLoaded, setLoaded] = useState(false)
  const [loadError, setLoadError] = useState<Error | undefined>(undefined)

  useEffect(function trackMountedState() {
    isMounted.current = true
    return (): void => {
      isMounted.current = false
    }
  }, [])

  const loader = useMemo(() => {
    return new Loader({
      id,
      apiKey: googleMapsApiKey,
      version,
      libraries,
      language: language || "en",
      region: region || "US",
      mapIds: mapIds || [],
      nonce: nonce || "",
      authReferrerPolicy: authReferrerPolicy || "origin"
    })
  }, [
    id,
    googleMapsApiKey,
    version,
    libraries,
    language,
    region,
    mapIds,
    nonce,
    authReferrerPolicy
  ])

  useEffect(function effect() {
    if (isLoaded) {
      return
    } else {
      loader
        .load()
        .then(() => {
          if (isMounted.current) {
            setLoaded(true)
          }

          return
        })
        .catch((error) => {
          setLoadError(error)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const prevLibraries = useRef<undefined | Libraries>()

  useEffect(() => {
    if (prevLibraries.current && libraries !== prevLibraries.current) {
      console.warn(
        "Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables"
      )
    }
    prevLibraries.current = libraries
  }, [libraries])

  return { isLoaded, loadError }
}
