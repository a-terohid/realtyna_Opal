"use server"

import type { TDisclaimer } from "@/types/disclaimer.type"

import { getToken } from "./getToken"

const xApiKey = process.env.API_KEY || ""

export async function getDisclaimer(): Promise<TDisclaimer | null> {
  const accessToken = await getToken()

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/providers/mls/mlsDisclaimer`,
      {
        headers: {
          "x-api-key": xApiKey,
          Origin: process.env.ORIGIN || "",
          Referer: process.env.ORIGIN ? process.env.ORIGIN + "/" : "",
          Authorization: "Bearer " + accessToken
        }
      }
    )

    const json = await response.json()

    return json
  } catch (error) {
    console.error(error)
    return null
  }
}
