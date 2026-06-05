"use server"

import type { TGoogleGeocodeResult } from "@/types/filter.type"

export const getLatLng = async (
  value: string
): Promise<TGoogleGeocodeResult> => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${process.env.GOOGLE_API_KEY_SERVER}&language=en&components=country:US | country:CA`
  )
  const data = await response.json()
  return data
}
