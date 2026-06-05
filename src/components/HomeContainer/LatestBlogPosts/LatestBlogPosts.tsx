"use client"

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

import BlogCard from "@/components/common/BlogCard/BlogCard"
import BlogCardSkeleton from "@/components/common/BlogCard/BlogCardSkeleton"
import { Button } from "@/components/common/Button"
import HomeSectionTitle from "@/components/common/HomeSectionTitle/HomeSectionTitle"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { getBlogPosts } from "@/services/blog/getBlogPosts"
import type { THomeData } from "@/types/site-settings.type"

interface IProps {
  data: THomeData["blog_posts"]
}

const LatestBlogPosts: React.FC<IProps> = ({
  data: { title, buttonText, description, shadowTitle }
}) => {
  const [isInView, ref] = useIntersectionObserver()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["latestBlogPosts"],
    queryFn: async () => {
      const res = await getBlogPosts({
        query: "/wp-json/wp/v2/news?_embed&order=desc"
      })

      return res.data
    },
    enabled: isInView
  })

  return (
    <section
      ref={ref}
      className="box-container grid w-full grid-cols-1 items-start justify-center justify-items-center gap-10 md:grid-cols-2"
    >
      {isError && (
        <span className="col-span-full flex w-full items-center justify-center text-center font-semibold text-red-500">
          Something went wrong getting blog posts!
        </span>
      )}
      <>
        <div className="order-2 flex w-full flex-col items-center justify-start gap-10 md:order-1">
          {isLoading && <BlogCardSkeleton />}
          {data && <BlogCard data={data[1]} variant="stack" />}
          {isLoading && <BlogCardSkeleton />}
          {data && <BlogCard data={data[2]} variant="stack" />}
        </div>
        {(data || isLoading) && (
          <div className="order-1 flex flex-col items-center justify-start gap-10">
            <div className="flex max-w-[33.125rem] flex-col items-center justify-center gap-4 text-center">
              <HomeSectionTitle
                titleClassName="mt-[20px]"
                borderedClassName="text-[32px] sm:text-[34px] md:text-[38px] lg:text-[40px]"
                title={title}
                borderedTitle={shadowTitle}
              />

              <p>{description}</p>
              <Button
                gradient={"secondary"}
                asChild
                className="h-[50px] w-[150px]"
              >
                <Link href={"/blog"}>{buttonText}</Link>
              </Button>
            </div>
            {isLoading && <BlogCardSkeleton />}
            {data && <BlogCard data={data[0]} variant="stack" />}
          </div>
        )}
      </>
    </section>
  )
}

export default LatestBlogPosts
