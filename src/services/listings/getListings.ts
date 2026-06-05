"use server"

import type { ListingsData } from "@/types/listings.type"

import { generateToken } from "./generateToken"
import { getToken } from "./getToken"

const xApiKey = process.env.API_KEY || ""

export async function getListingsData({
  url,
  query
}: {
  url?: string
  query?: string
}): Promise<ListingsData> {
  const accessToken = await getToken()

  const apiUrl =
    url ??
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/reso/odata/Property${query ?? ""}&$expand=Media`

  // Fetch listings Data using generated query
  try {
    const res = await fetch(apiUrl, {
      next: { revalidate: 900 }, // 15 minutes

      headers: {
        "x-api-key": xApiKey,
        Origin: process.env.ORIGIN || "",
        Referer: process.env.ORIGIN ? `${process.env.ORIGIN}/` : "",
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (!res.ok && res.status === 403) {
      throw new Error("403 Forbidden")
    }

    if (!res.ok) {
      const errorText = await res.text()
      console.error(`API Error ${res.status}:`, errorText)
      console.error(`Failed URL:`, apiUrl)
      throw new Error(`API returned ${res.status}: ${errorText}`)
    }

    const data = await res.json()
    console.log('Listings API Response:', {
      count: data['@odata.count'],
      valueLength: data.value?.length,
      hasNextLink: !!data['@odata.nextLink']
    })
    return data
  } catch (error) {
    console.error("error", error)

    if (error instanceof Error && error.message === "403 Forbidden") {
      // Retry logic here
      await generateToken()
      return getListingsData({ url, query })
    }

    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    )
  }
}
