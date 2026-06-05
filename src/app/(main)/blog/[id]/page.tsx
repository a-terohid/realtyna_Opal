import type { Metadata } from "next"

import BlogPostContainer from "@/components/BlogPostContainer/BlogPostContainer"
import Breadcrumb from "@/components/BreadCrumb/BreadCrumb"
import NewsLetter from "@/components/NewsLetter/NewsLetter"
import type { Post } from "@/types/blog.type"
import { capitalize } from "@/utils/helpers"

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

function generateTitle(id: string) {
  const parts = id.split("-")

  for (let i = 0; i < parts.length; i++) {
    parts[i] = capitalize(parts[i])
  }

  const resultString = parts.join(" ")
  return resultString
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const id = params.id
  const resultString = generateTitle(id)

  return {
    title: resultString,
    description: "Blog Details Page"
  }
}

async function getListingsData(params: { id: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/news?slug=${params.id}`,
    {
      next: {
        revalidate: 3600
      }
    }
  )
  if (!res.ok) {
    throw new Error("Failed to fetch blog post: " + res.status)
  }

  return res.json()
}

// Fetch agent Data
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

export default async function Listings(props: Props) {
  const params = await props.params;
  const data: Post[] = await getListingsData(params)
  const agent = await getAgentData()

  const resultString = generateTitle(params.id)

  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          {
            name: resultString,
            href: `/blog/${data[0].slug}`
          }
        ]}
      />
      <main className="mx-auto grid grid-cols-1 gap-[1.875rem] pb-[5.625rem] pt-[1.5625rem] md:gap-[5.1875rem]">
        <BlogPostContainer data={data[0]} agentData={agent} />
        <NewsLetter />
      </main>
    </>
  )
}
