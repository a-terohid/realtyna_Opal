import React from "react"

import type { AgentValue } from "@/types/agent.type"
import type { Post } from "@/types/blog.type"

import BlogSidebar from "../BlogContainer/BlogSidebar/BlogSidebar"
import BlogPostBasicDetails from "./BlogPostBasicDetails/BlogPostBasicDetails"
import BlogPostDetails from "./BlogPostDetails/BlogPostDetails"
import BlogPostRelatedNews from "./BlogPostRelatedNews/BlogPostRelatedNews"
import BlogPostRelatedTags from "./BlogPostRelatedTags/BlogPostRelatedTags"

interface IProps {
  data: Post
  agentData: AgentValue
}

const BlogPostContainer: React.FC<IProps> = ({ data, agentData }) => {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-16">
      <BlogPostBasicDetails data={data} />
      <div className="box-container grid w-full grid-cols-12 items-start justify-center gap-6">
        <div className="col-span-full flex w-full flex-col items-center justify-start gap-16 md:col-span-8 lg:col-span-9">
          <BlogPostDetails data={data} />
          {data.x_tags.length > 0 && <BlogPostRelatedTags data={data} />}
          <BlogPostRelatedNews />
        </div>
        <BlogSidebar agentData={agentData} />
      </div>
    </div>
  )
}

export default BlogPostContainer
