"use server"

import type { ListingsData } from "@/types/listings.type"

import { generateToken } from "./generateToken"
import { getToken } from "./getToken"

const xApiKey = process.env.API_KEY || ""

export async function getNearbyProperties({
  lat,
  lng
}: {
  lat: string | number
  lng: string | number
}): Promise<ListingsData> {
  const accessToken = await getToken()

  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/reso/odata/Property?$select=ALL&$top=5&$filter=geo.distance(Coordinates, POINT(${lng} ${lat})) lt 0.02857142857142857`

  // Fetch listings Data using generated query
  try {
    const res = await fetch(apiUrl, {
      next: { revalidate: 1800 },

      headers: {
        "x-api-key": xApiKey,
        Origin: process.env.ORIGIN || "",
        Referer: process.env.ORIGIN ? process.env.ORIGIN + "/" : "",
        Authorization: "Bearer " + accessToken
      }
    })

    if (!res.ok && res.status === 403) {
      throw new Error("403 Forbidden")
    }

    return res.json()
  } catch (error) {
    console.error("error", error)
    if (error instanceof Error && error.message === "403 Forbidden") {
      // Retry logic here
      await generateToken()
      return getNearbyProperties({ lat, lng })
    }

    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    )
  }
}
