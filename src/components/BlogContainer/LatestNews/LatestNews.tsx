import { mdiNewspaper } from "@mdi/js"
import Icon from "@mdi/react"
import { Suspense } from "react"

import BlogCard from "@/components/common/BlogCard/BlogCard"
import type { BlogData } from "@/types/blog.type"

import LatestNewsPaginate from "./LatestNewsPaginate"

const LatestNews = ({ newsData }: { newsData: BlogData }) => {
  return (
    <section className="col-span-full flex w-full flex-col items-center justify-start gap-8 md:col-span-8 lg:col-span-9">
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <div className="flex items-center justify-center">
          <Icon path={mdiNewspaper} size={1.1} className="text-primary-1" />
          <span className="text-2xl font-bold text-black">Latest News</span>
        </div>
        {/*  <Button size={"sm"}>View More</Button> */}
      </div>
      {newsData.posts.length > 0 ? (
        <>
          <div className="grid w-full auto-rows-[1fr] grid-cols-2 items-start justify-items-center gap-6">
            {newsData.posts.map((item, index) => (
              <BlogCard data={item} key={index} />
            ))}
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <LatestNewsPaginate totalPosts={Number(newsData.totalPosts)} />
          </Suspense>
        </>
      ) : (
        <span className="w-full text-center text-lg font-semibold ">
          No blog post!
        </span>
      )}
    </section>
  )
}

export default LatestNews
