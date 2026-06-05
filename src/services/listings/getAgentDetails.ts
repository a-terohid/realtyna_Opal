"use server"

import type { AgentData, AgentValue } from "@/types/agent.type"

export async function getAgentData(): Promise<AgentValue> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/app/agent-profile`,
    {
      next: {
        revalidate: 3600
      },
      headers: {
        "x-api-key": process.env.API_KEY!,
        Origin: process.env.ORIGIN || "",
        Referer: process.env.ORIGIN ? process.env.ORIGIN + "/" : ""
      }
    }
  )
  if (!res.ok) {
    throw new Error("Failed to fetch agent Data : " + res.status)
  }

  const data: AgentData = await res.json()

  return data.result
}
