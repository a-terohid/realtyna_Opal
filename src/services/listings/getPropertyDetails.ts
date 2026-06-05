"use server"

import { getPlaiceholder } from "plaiceholder"

import type { ListingsValue, Media } from "@/types/listings.type"

import { generateToken } from "./generateToken"
import { getToken } from "./getToken"

const xApiKey = process.env.API_KEY || ""

export async function getPropertyDetails(params: {
  id: string
}): Promise<ListingsValue & { blurredData: string }> {
  const accessToken = await getToken()

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reso/odata/Property('${
        params.id.split("-")[0]
      }')?$expand=Media`,
      {
        next: {
          revalidate: 3600
        },
        headers: {
          "x-api-key": xApiKey,
          Origin: process.env.ORIGIN || "",
          Referer: process.env.ORIGIN ? process.env.ORIGIN + "/" : "",
          Authorization: "Bearer " + accessToken
        }
      }
    )
    if (!res.ok && res.status === 403) {
      throw new Error("403 Forbidden")
    }

    const data = await res.json()

    let blurredData

    try {
      if (data.Media && data.Media.length > 0) {
        blurredData = await getImages(data.Media[0])
      }
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Input buffer contains unsupported image format"
      ) {
        return data
      }
      throw error
    }

    return {
      ...data,
      blurredData: blurredData
    }
  } catch (error) {
    console.error(error)
    if (error instanceof Error && error.message === "403 Forbidden") {
      // Retry logic here
      await generateToken()
      return getPropertyDetails(params)
    }

    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    )
  }
}

async function getImages(file: Media) {
  const buffer = await fetch(file.MediaURL).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  )

  const { base64 } = await getPlaiceholder(buffer)

  return base64
}
