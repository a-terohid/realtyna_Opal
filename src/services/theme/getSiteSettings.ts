"use server"

import { readFileSync } from "fs"
import { unstable_noStore as noStore } from "next/cache"
import path from "path"

import type { TSiteSettings } from "@/types/site-settings.type"

export const getSiteSettings = async (): Promise<TSiteSettings> => {
  noStore()

  const jsonFile = path.join(process.cwd(), "files", `site_settings.json`)
  const jsonData = readFileSync(jsonFile, "utf-8")
  const settings = JSON.parse(jsonData)

  return settings
}
