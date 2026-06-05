import dynamic from "next/dynamic"
import React from "react"

import type { AgentValue } from "@/types/agent.type"
import type { BlogData, Post } from "@/types/blog.type"

import BlogSidebar from "./BlogSidebar/BlogSidebar"
import BlogSlider from "./BlogSlider/BlogSlider"
import FeaturedNews from "./FeaturedNews/FeaturedNews"
import LatestNews from "./LatestNews/LatestNews"

const BlogPresentation = dynamic(
  () => import("./BlogPresentation/BlogPresentation"),
  {
    ssr: false
  }
)

type BlogPosts = {
  newsData: BlogData
  specialNewsData: Array<Post>
  featuredNewsData: Array<Post>
  presentationsData: Array<Post>
  agentData: AgentValue
}

const BlogContainer: React.FC<BlogPosts> = ({
  newsData,
  specialNewsData,
  featuredNewsData,
  presentationsData,
  agentData
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-y-[5.625rem]">
      <BlogSlider blogData={specialNewsData} />
      <FeaturedNews blogData={featuredNewsData} />
      <div className="box-container grid w-full grid-cols-12 items-start justify-center gap-6">
        <LatestNews newsData={newsData} />
        <BlogSidebar agentData={agentData} />
      </div>
      <BlogPresentation presentationsData={presentationsData} />
    </div>
  )
}

export default BlogContainer
