import { existsSync, mkdirSync, writeFileSync } from "fs"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import path from "path"

import { createLightDarkGradient, getFileFormatFromLink } from "@/utils/helpers"

export async function POST(request: NextRequest) {
  const siteSettings = await request.json()

  // Create Array from images to convert them to base64
  const filesArray = [
    siteSettings.siteIdentity["lightLogo"]
      ? {
          name: "light_logo",
          value: siteSettings.siteIdentity["lightLogo"]
        }
      : null,
    siteSettings.siteIdentity["darkLogo"]
      ? {
          name: "dark_logo",
          value: siteSettings.siteIdentity["darkLogo"]
        }
      : null,
    siteSettings.siteIdentity["siteIcon"]
      ? {
          name: "site_icon",
          value: siteSettings.siteIdentity["siteIcon"]
        }
      : null,
    siteSettings.homeSearch["bgImage"]
      ? {
          name: "home_bg_img",
          value: siteSettings.homeSearch["bgImage"]
        }
      : null,
    siteSettings.homeAgency["image"]
      ? {
          name: "home_agency_img",
          value: siteSettings.homeAgency["image"]
        }
      : null
  ]

  const filesBase64: Record<string, unknown> = {}

  await Promise.all(
    filesArray.map(async (file) => {
      if (file) {
        try {
          const response = await fetch(file.value)
          const arrayBuffer = await response.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)
          const fileFormat = getFileFormatFromLink(file.value)

          const fileName = file.name + "." + fileFormat
          const localFolderPath = `./public/images`
          const savePath = `${localFolderPath}/${fileName}`
          const localFilePath = `${
            process.env.NEXT_PUBLIC_BASE_PATH || "/"
          }images/${fileName}`

          // Create the local folder if it doesn't exist
          if (!existsSync(localFolderPath)) {
            mkdirSync(localFolderPath)
          }

          // Save the file locally
          writeFileSync(savePath, buffer)

          filesBase64[file.name] = localFilePath
        } catch (error) {
          console.log("error", error)
        }
      }
    })
  )

  // Generate Colors and gradients
  const primary_color = siteSettings.styles["primaryColor"]
  const primary_color_gradient =
    siteSettings.styles["primaryColorGradient"] ?? null
  const secondary_color = siteSettings.styles["secondaryColor"]
  const secondary_color_gradient =
    siteSettings.styles["secondaryColorGradient"] ?? null
  const neutral_color = siteSettings.styles["neutralColor"]
  const neutral_color_gradient =
    siteSettings.styles["neutralColorGradient"] ?? null

  const [primaryHover, primaryFrom, primaryTo] = createLightDarkGradient(
    primary_color_gradient,
    primary_color,
    20
  )
  const [secondaryHover, secondaryFrom, secondaryTo] = createLightDarkGradient(
    secondary_color_gradient,
    secondary_color,
    20
  )

  const [neutralHover, neutralFrom, neutralTo] = createLightDarkGradient(
    neutral_color_gradient,
    neutral_color,
    20
  )

  // Create final data object
  const newData = {
    site_identity: {
      light_logo: filesBase64["light_logo"],
      dark_logo: filesBase64["dark_logo"],
      site_icon: filesBase64["site_icon"],
      title: siteSettings.siteIdentity["blogName"],
      description: siteSettings.siteIdentity["blogDescription"]
    },
    styles: {
      primary_color_hover: primaryHover,
      primary_color_from: primaryFrom,
      primary_color_to: primaryTo,
      secondary_color_hover: secondaryHover,
      secondary_color_from: secondaryFrom,
      secondary_color_to: secondaryTo,
      neutral_color_hover: neutralHover,
      neutral_color_from: neutralFrom,
      neutral_color_to: neutralTo
    },
    menus: {
      main_menu: siteSettings.menus["mainMenu"]
        ? siteSettings.menus["mainMenu"].map((item: { title: string }) => {
            return item.title
          })
        : null,
      sidebar_blog_menu: siteSettings.menus["sidebarBlogMenu"]
        ? siteSettings.menus["sidebarBlogMenu"].map(
            (item: { title: string }) => {
              return item.title
            }
          )
        : null,
      footer_menu: siteSettings.menus["footerMenu"]
        ? siteSettings.menus["footerMenu"].map((item: { title: string }) => {
            return item.title
          })
        : null
    },

    home_sections: [...siteSettings.homeBasics.sections] ?? [],
    home_data: {
      search: siteSettings.homeSearch
        ? {
            ...siteSettings.homeSearch,
            bg_image: filesBase64["home_bg_img"],
            searchOnly: siteSettings.homeSearch["searchOnly"] ?? false
          }
        : null,
      agency: siteSettings.homeAgency
        ? { ...siteSettings.homeAgency, image: filesBase64["home_agency_img"] }
        : null,
      solutions: siteSettings.homeSolutions ? siteSettings.homeSolutions : null,
      services: siteSettings.homeServices ? siteSettings.homeServices : null,
      blog_posts: siteSettings.homeBlog ? siteSettings.homeBlog : null,
      listings: siteSettings.properties ? siteSettings.properties : null,
      cities: siteSettings.cities ? siteSettings.cities : null,
      agents: siteSettings.agents ? siteSettings.agents : null
    }
  }

  // convert js to json
  const updatedJsonData = JSON.stringify(newData, null, 2)

  const jsonFile = path.join(process.cwd(), "files", `site_settings.json`)

  writeFileSync(jsonFile, updatedJsonData, "utf-8")

  console.log("Site Settings file has been updated.")

  return NextResponse.json({})
}
