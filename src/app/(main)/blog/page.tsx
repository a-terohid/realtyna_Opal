import type { Metadata } from "next"
import type { ReadonlyURLSearchParams } from "next/navigation"

import BlogContainer from "@/components/BlogContainer/BlogContainer"
import Breadcrumb from "@/components/BreadCrumb/BreadCrumb"
import NewsLetter from "@/components/NewsLetter/NewsLetter"
import { getAgentData } from "@/services/listings/getAgentDetails"
import type { BlogData, Post } from "@/types/blog.type"
import type { TSearchParamsObject } from "@/types/filter.type"

export const metadata: Metadata = {
  title: "Our Blog",
  description: "This is our blog page"
}

async function getDefatulNews(page: number): Promise<BlogData | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/news?_embed&order=desc&page=${page}&per_page=6`,
    {
      next: { revalidate: 1800 }
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch blog posts: " + res.status)
  }

  const data = await res.json()

  if (data && typeof data === "object") {
    const newData = {
      posts: data,
      totalPosts: res.headers.get("x-wp-total")!
    }
    return newData
  } else {
    console.error("Unexpected data format:", data)
    return null
  }
}

async function getSpecialNews(): Promise<Post[] | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/news?_embed&order=desc&category_slug=special`,
    {
      next: { revalidate: 1800 }
    }
  )
  if (!res.ok) {
    throw new Error("Failed to fetch special blog posts " + res.status)
  }

  const data = await res.json()

  if (data && typeof data === "object") {
    return data
  } else {
    console.error("Unexpected data format:", data)
    return null
  }
}

async function getFeaturedNews(): Promise<Post[] | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/news?_embed&order=desc&category_slug=featured`,
    {
      next: { revalidate: 1800 }
    }
  )
  if (!res.ok) {
    throw new Error("Failed to fetch featured blog posts: " + res.status)
  }

  const data = await res.json()

  if (data && typeof data === "object") {
    return data
  } else {
    console.error("Unexpected data format:", data)
    return null
  }
}

async function getPresentations(): Promise<Post[] | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/presentations?_embed&order=desc`,
    {
      next: { revalidate: 1800 }
    }
  )
  if (!res.ok) {
    throw new Error("Failed to fetch featured presenations: " + res.status)
  }

  const data = await res.json()

  if (data && typeof data === "object") {
    return data
  } else {
    console.error("Unexpected data format:", data)
    return null
  }
}

export default async function Blog(
  props: {
    searchParams: Promise<TSearchParamsObject>
  }
) {
  const searchParams = await props.searchParams;
  const page = +searchParams.page || 1

  const defaultNews = await getDefatulNews(page)
  const specialNews = await getSpecialNews()
  const featuredNews = await getFeaturedNews()
  const presentations = await getPresentations()
  const agent = await getAgentData()

  const [
    newsData,
    specialNewsData,
    featuredNewsData,
    presentationsData,
    agentData
  ] =
    defaultNews && specialNews && featuredNews && presentations
      ? await Promise.all([
          defaultNews,
          specialNews,
          featuredNews,
          presentations,
          agent
        ])
      : [null, null, null, null, null]

  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Our Blog", href: "/blog" }
        ]}
      />
      <main className="mx-auto grid grid-cols-1 items-center justify-center gap-[8.125rem] bg-white pb-[5.625rem] pt-[3.75rem]">
        {newsData &&
          specialNewsData &&
          featuredNewsData &&
          presentationsData && (
            <BlogContainer
              agentData={agentData}
              newsData={newsData}
              specialNewsData={specialNewsData}
              featuredNewsData={featuredNewsData}
              presentationsData={presentationsData}
            />
          )}

        <NewsLetter />
      </main>
    </>
  )
}
