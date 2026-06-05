"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"

import { Skeleton } from "@/components/common/Skeleton"
import type { BlogTag } from "@/types/blog.type"

const BlogTags = () => {
  const { data, isLoading } = useQuery<BlogTag[]>({
    queryKey: ["blog-sidebar-tags"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/tags`
      )
      const data = res.data
      return data
    }
  })

  return (
    <div className="flex w-full flex-col items-start justify-start gap-[10px] rounded-[15px] p-3 shadow-primary">
      <div className="flex w-full items-center justify-center gap-2">
        <span className="text-lg font-bold text-black">Tags</span>
        <span className='flex w-full items-center justify-center after:block after:h-px after:w-full after:bg-black after:opacity-30 after:content-[""]' />
      </div>
      <ul className="flex w-full list-inside list-disc flex-wrap items-start justify-start gap-[5px] text-[13px] font-normal text-gray-11 marker:text-gray-17">
        {isLoading && (
          <>
            <Skeleton className="h-[30px] w-1/4 rounded-full" />
            <Skeleton className="h-[30px] w-1/5 rounded-full" />
            <Skeleton className="h-[30px] w-2/6 rounded-full" />
            <Skeleton className="h-[30px] w-2/5 rounded-full" />
            <Skeleton className="h-[30px] w-1/4 rounded-full" />
            <Skeleton className="h-[30px] w-1/5 rounded-full" />
            <Skeleton className="h-[30px] w-1/4 rounded-full" />
            <Skeleton className="h-[30px] w-1/6 rounded-full" />
            <Skeleton className="h-[30px] w-2/6 rounded-full" />
            <Skeleton className="h-[30px] w-2/3 rounded-full" />
          </>
        )}
        {data &&
          data.map((item, index) => (
            <li
              key={index}
              className="block rounded-full border border-gray-3 px-4 py-1.5 capitalize shadow-primary"
            >
              <Link href={`/`}>{item.name}</Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default BlogTags
