import type { Metadata } from "next"

import ContactContainer from "@/components/ContactContainer/ContactContainer"
import NewsLetter from "@/components/NewsLetter/NewsLetter"

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Us Page"
}

async function getAgentData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/app/agent-profile`,
    {
      next: {
        revalidate: 3600
      },
      headers: {
        "x-api-key": process.env.API_KEY!
      }
    }
  )
  if (!res.ok) {
    throw new Error("Failed to fetch agent Data : " + res.status)
  }

  return res.json()
}

export default async function Home() {
  const agentData = await getAgentData()

  return (
    <>
      <main className="mx-auto grid grid-cols-1 gap-[35px] pb-[5.625rem]">
        <ContactContainer agentData={agentData.result} />
        <NewsLetter />
      </main>
    </>
  )
}
