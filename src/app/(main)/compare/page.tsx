import type { Metadata } from "next"
import dynamic from "next/dynamic"

import Breadcrumb from "@/components/BreadCrumb/BreadCrumb"
import NewsLetter from "@/components/NewsLetter/NewsLetter"

const CompareContainer = dynamic(
  () => import("@/components/CompareContainer/CompareContainer"),
  {
    ssr: false
  }
)

export const metadata: Metadata = {
  title: "Compare Properties"
}

export default function Home() {
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Compare", href: "/compare" }
        ]}
      />
      <main className="mx-auto grid max-w-[90rem] grid-cols-1 gap-[1.875rem] px-3 pb-[5.625rem] pt-[1.5625rem] sm:px-[1.5625rem] md:gap-[5.1875rem] md:px-10 lg:px-[3.4375rem] xl:px-[4.375rem]">
        <CompareContainer />
        <NewsLetter />
      </main>
    </>
  )
}
