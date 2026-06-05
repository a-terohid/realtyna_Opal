import { mdiAccountCircle, mdiClock } from "@mdi/js"
import Icon from "@mdi/react"
import type { HTMLReactParserOptions } from "html-react-parser"
import parser, { domToReact, Element } from "html-react-parser"
import Image from "next/image"
import Link from "next/link"

import placeholder from "@/assets/images/placeholder.png"
import type { Post } from "@/types/blog.type"
import { cn } from "@/utils/helpers"

interface IProps {
  variant?: "default" | "stack" | "overlay"
  isShowingBadge?: boolean
  isShowingDesc?: boolean
  priority?: boolean
  data: Post
}

const BlogCard: React.FC<IProps> = ({
  data,
  isShowingBadge = true,
  isShowingDesc = true,
  priority = false,
  variant = "default"
}) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === "p") {
        return (
          <span
            className={cn(
              "line-clamp-2 text-gray-15",
              variant === "overlay" && "text-inherit"
            )}
          >
            {domToReact(domNode.children, options)}
          </span>
        )
      }
    }
  }

  return (
    <Link
      href={`/blog/${data.slug}`}
      className={cn(
        "relative flex w-full cursor-pointer flex-col items-center justify-start",
        variant === "overlay" && "items-end rounded-[15px] text-white",
        variant === "stack" && "col-span-3 md:col-span-1",
        variant === "default" && "col-span-2 lg:col-span-1"
      )}
    >
      {variant === "overlay" && (
        <span className="absolute inset-0 z-[1] rounded-2xl bg-presentationBgOverlay" />
      )}
      {isShowingBadge && (
        <span className="absolute left-5 top-5 z-[1] flex h-[30px] w-[125px] items-center justify-center rounded-full bg-gradient-3 text-center text-sm font-normal text-white shadow-primary">
          Market Reports
        </span>
      )}
      <div
        className={cn(
          "relative h-full w-full overflow-hidden rounded-2xl shadow-secondary",
          variant === "stack" && "h-[270px] min-h-[270px]",
          variant === "overlay" && "h-[430px] min-h-[430px] shadow-none",
          variant === "default" && "h-[305px] min-h-[305px] rounded-b-none"
        )}
      >
        <Image
          fill
          priority={priority}
          sizes={
            variant === "stack"
              ? "(max-width: 768px) 80vw, (max-width: 1024x) 45vw, 33vw"
              : variant === "overlay"
                ? "(max-width: 1024px) 80vw, 60vw"
                : variant === "default"
                  ? "(max-width: 768px) 80vw, (max-width: 1024x) 45vw, 33vw"
                  : "(max-width: 768px) 80vw, (max-width: 1024x) 45vw, 33vw"
          }
          className="object-cover"
          src={data.x_featured_media_original || placeholder}
          alt="blog_card"
        />
      </div>
      <div
        className={cn(
          "z-[1] flex w-full flex-col items-start justify-start gap-2 rounded-2xl bg-white p-4 text-start shadow-secondary",
          variant === "overlay"
            ? "absolute bottom-2 left-0 bg-transparent text-white"
            : "text-gray-11",
          variant === "stack" && "-mt-[15%] h-full max-w-[88%]",
          variant === "default" && "h-full justify-between rounded-t-none"
        )}
      >
        <h2
          className={cn(
            "line-clamp-2 text-lg font-bold text-black",
            variant === "overlay" && "text-inherit"
          )}
        >
          {data.title.rendered}
        </h2>
        {isShowingDesc && parser(data.excerpt.rendered, options)}
        <div
          className={cn(
            "flex flex-wrap items-start justify-start gap-3 pt-3 text-[13px] font-normal",
            variant === "overlay" && "opacity-[85%]"
          )}
        >
          <div className="flex items-center justify-center gap-1 capitalize">
            <Icon size={0.9} path={mdiAccountCircle} />
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
            <Icon size={0.9} path={mdiClock} />
            {data.x_date}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard
