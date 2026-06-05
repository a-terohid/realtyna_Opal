"use client"

import type { HTMLReactParserOptions } from "html-react-parser"
import parser, { domToReact, Element } from "html-react-parser"
import Image from "next/image"
import React from "react"

import type { Post } from "@/types/blog.type"
import { cn } from "@/utils/helpers"

interface IProps {
  data: Post
}

const BlogPostDetails: React.FC<IProps> = ({ data }) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === "p") {
        return (
          <p className={cn("w-full text-start text-gray-21")}>
            {domToReact(domNode.children, options)}
          </p>
        )
      }
      if (domNode instanceof Element && domNode.name === "strong") {
        return (
          <span
            className={cn(
              "w-full text-start text-lg font-semibold text-gray-21"
            )}
          >
            {domToReact(domNode.children, options)}
          </span>
        )
      }
      if (domNode instanceof Element && domNode.name === "figure") {
        return <>{domToReact(domNode.children, options)}</>
      }
      if (domNode instanceof Element && domNode.name === "div") {
        return (
          <div className="flex w-full flex-wrap items-start justify-center gap-3">
            {domToReact(domNode.children, options)}
          </div>
        )
      }

      if (domNode instanceof Element && domNode.name === "img") {
        return (
          <Image
            width={+domNode.attribs.width}
            height={+domNode.attribs.height}
            alt={domNode.attribs.alt}
            src={domNode.attribs.src}
            className={cn("rounded-[15px] object-cover shadow-primary")}
          />
        )
      }
    }
  }

  return (
    <section className="flex w-full flex-col items-center justify-start rounded-[15px] p-4 text-start shadow-primary md:p-7">
      {parser(data.content.rendered, options)}
    </section>
  )
}

export default BlogPostDetails
