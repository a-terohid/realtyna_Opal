import { mdiListBox } from "@mdi/js"
import Icon from "@mdi/react"

import BlogCard from "@/components/common/BlogCard/BlogCard"
import type { Post } from "@/types/blog.type"

const FeaturedNews = ({ blogData }: { blogData: Array<Post> }) => {
  return (
    <section className="box-container flex w-full flex-col items-center justify-start gap-8">
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <div className="flex items-center justify-center">
          <Icon path={mdiListBox} size={1.1} className="text-primary-1" />
          <span className="text-2xl font-bold text-black">Featured News</span>
        </div>
        {/* <Button size={"sm"}>View More</Button> */}
      </div>
      <div className="grid w-full grid-cols-1 items-start justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogData.slice(0, 3).map((item, index: number) => (
          <BlogCard
            isShowingBadge={false}
            data={item}
            variant="stack"
            key={index}
          />
        ))}
      </div>
    </section>
  )
}

export default FeaturedNews
