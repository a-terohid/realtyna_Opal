"use server"

import { readFileSync } from "fs"
import { unstable_noStore } from "next/cache"
import path from "path"

export const getToken = async () => {
  unstable_noStore()
  const jsonFile = path.join(process.cwd(), "files", `access_token.json`)

  const jsonData = readFileSync(jsonFile, "utf-8")
  const accessToken = JSON.parse(jsonData).token

  return accessToken
}
