import type { Metadata } from "next"

import { AgentsContainer } from "@/components/AgentsContainer/AgentsContainer"
import Breadcrumb from "@/components/BreadCrumb/BreadCrumb"
import NewsLetter from "@/components/NewsLetter/NewsLetter"
import { getSiteSettings } from "@/services/theme/getSiteSettings"

export const metadata: Metadata = {
  title: "Our Agents"
}

export const dynamic = "force-static"

export default async function Home() {
  const {
    site_identity: { siteName }
  } = await getSiteSettings()

  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { name: siteName, href: "/" },
          { name: "Our Agents", href: "/agents" }
        ]}
      />
      <main className="mx-auto grid max-w-[90rem] grid-cols-1 items-center justify-center gap-[8.125rem] bg-white px-3 pb-[5.625rem] pt-[3.75rem] sm:px-[1.5625rem] md:px-10 lg:px-[3.4375rem] xl:px-[4.375rem]">
        <AgentsContainer />
        <NewsLetter />
      </main>
    </>
  )
}
