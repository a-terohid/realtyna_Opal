import { mdiAccountCircle, mdiClock } from "@mdi/js"
import Icon from "@mdi/react"
import dynamic from "next/dynamic"
import Image from "next/image"
import React, { Suspense } from "react"

import placeholder from "@/assets/images/placeholder.png"
import type { Post } from "@/types/blog.type"
import { cn } from "@/utils/helpers"

import PostAuhor from "./PostAuhor/PostAuhor"
const PostShare = dynamic(() => import("./PostShare/PostShare"), {
  ssr: false
})

interface IProps {
  data: Post
}

const BlogPostBasicDetails: React.FC<IProps> = ({ data }) => {
  return (
    <section className="box-container flex w-full flex-col items-center justify-start gap-5">
      <div className="flex w-full flex-wrap items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-21">
          {data.title.rendered}
        </h1>
        <div
          className={cn(
            "flex flex-wrap justify-start items-start font-normal text-[13px] pt-3 gap-3 text-gray-21"
          )}
        >
          <div className="flex items-center justify-center gap-1 capitalize">
            <Icon size={0.9} className="text-gray-18" path={mdiAccountCircle} />
            {data.x_author}
          </div>
          {/*  <div className='flex justify-center items-center gap-1'>
            <Icon
              size={0.9}
              path={mdiChat}
            />
            6
          </div> */}
          <div className="flex items-center justify-center gap-1">
            <Icon size={0.9} className="text-gray-18" path={mdiClock} />
            {data.x_date}
          </div>
        </div>
      </div>
      <div className="relative flex h-[610px] w-full flex-col items-center justify-center rounded-[30px] shadow-primary">
        <Image
          fill
          priority
          sizes="90vw"
          className="size-full rounded-[30px] object-cover"
          src={data.x_featured_media_original || placeholder}
          alt={`${data.slug}`}
        />
        <Suspense>
          <PostAuhor authorLink={data._links.author[0].href} />
        </Suspense>
        <PostShare />
      </div>
    </section>
  )
}

export default BlogPostBasicDetails
