import axios from "axios"
import { writeFileSync } from "fs"
import path from "path"
import qs from "qs"

export async function generateToken() {
  const { CLIENT_ID, CLIENT_SECRET, API_KEY, ORIGIN } = process.env

  const data = qs.stringify({
    grant_type: "client_credentials",
    client_id: CLIENT_ID,
    referer: ORIGIN || "",
    origin: ORIGIN || "",
    api_key: API_KEY
  })

  const authHeader = `Basic ${Buffer.from(
    `${CLIENT_ID}:${CLIENT_SECRET}`
  ).toString("base64")}`

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.realtyfeed.com/v1/auth/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: authHeader,
      "x-api-key": API_KEY || ""
    },
    data: data
  }

  try {
    const response = await axios.request(config)

    if (response && response.data && response.data.access_token) {
      const { access_token } = response.data
      const token = {
        token: access_token
      }
      const updatedJsonData = JSON.stringify(token, null, 2)

      const jsonFile = path.join(process.cwd(), "files", `access_token.json`)
      writeFileSync(jsonFile, updatedJsonData, "utf-8")
      console.log("JSON file has been updated.")
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("OAuth Token Error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        clientId: CLIENT_ID?.substring(0, 5) + "...",
        url: config.url
      })
    } else {
      console.error("Token generation error:", error)
    }
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    )
  }
}
