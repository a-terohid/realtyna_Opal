import { mdiPound } from "@mdi/js"
import Icon from "@mdi/react"
import React from "react"

import type { Post } from "@/types/blog.type"

interface IProps {
  data: Post
}

const BlogPostRelatedTags: React.FC<IProps> = ({ data }) => {
  return (
    <section className="flex w-full flex-col items-start justify-start gap-3">
      <div className="flex items-center justify-center gap-1">
        <Icon path={mdiPound} size={1} className="text-primary-1" />
        <h2 className="text-lg font-bold text-black">Related Tags</h2>
      </div>
      <ul className="flex flex-wrap items-center justify-start gap-2">
        {data.x_tags.split(",").map((item, index) => (
          <li
            className="rounded-full border border-gray-14 bg-white px-4 py-1.5 text-sm text-gray-16 shadow-secondary"
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BlogPostRelatedTags
