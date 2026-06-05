"use server"

export async function getDemographic({ endpoint, zcta }: { endpoint: string; zcta: string }): Promise<any | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DEMOGRAPHIC_API_BASE_URL}/${endpoint}?zcta=${zcta}`)

    const json = await response.json()

    return json
  } catch (error) {
    console.error(error)
    return null
  }
}
