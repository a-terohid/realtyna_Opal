import "../globals.css"

import { Open_Sans } from "next/font/google"
import Script from "next/script"

import Footer from "@/components/HomeContainer/Footer/Footer"
import LayoutProvider from "@/providers/LayoutProvider"
import QueryProvider from "@/providers/QueryClientProvider"
import { getSiteSettings } from "@/services/theme/getSiteSettings"
import { cn, generateMeta } from "@/utils/helpers"

const open_sans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open_sans",
  fallback: ["system-ui", "arial"]
})

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()
  const metadata = generateMeta(siteSettings)
  return metadata
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const siteSettings = await getSiteSettings()

  const roomvo = process.env.ROOMVO_SCRIPT

  return (
    <>
      <html
        lang="en"
        style={
          {
            "--color-primary-gradient-from": `${siteSettings.styles.primary_color_from}`,
            "--color-primary-gradient-to": `${siteSettings.styles.primary_color_to}`,
            "--color-primary-gradient-hover": `${siteSettings.styles.primary_color_hover}`,
            "--color-secondary-gradient-from": `${siteSettings.styles.secondary_color_from}`,
            "--color-secondary-gradient-to": `${siteSettings.styles.secondary_color_to}`,
            "--color-secondary-gradient-hover": `${siteSettings.styles.secondary_color_hover}`,
            "--color-neutral-gradient-from": `${siteSettings.styles.neutral_color_from}`,
            "--color-neutral-gradient-to": `${siteSettings.styles.neutral_color_to}`,
            "--color-neutral-gradient-hover": `${siteSettings.styles.neutral_color_hover}`
          } as Record<string | number, string>
        }
      >
        {roomvo && <Script src={roomvo} />}
        <body
          className={cn(
            "mx-auto w-full bg-white font-sans",
            open_sans.variable
          )}
        >
          <QueryProvider>
            <LayoutProvider>
              <div
                theme-name={siteSettings.site_identity.siteName}
                className="sr-only"
              />
              {children}
              <Footer siteSettings={siteSettings} />
            </LayoutProvider>
          </QueryProvider>
        </body>
      </html>
    </>
  )
}
