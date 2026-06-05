import cn from "clsx"
import Image from "next/image"
import { useEffect, useState } from "react"

import { Button } from "@/components/common/Button"

import Replay from "../Replay/Replay"
import Rating from "./Rating/Rating"

const Review = ({
  name,
  img,
  date,
  stars,
  description,
  genFunc,
  replies,
  path
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  const [minimized, setMinimized] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [isReply, setIsReply] = useState(false)

  useEffect(() => {
    if (path.length > 2 && path.length % 2 === 0) {
      setHidden(true)
    }
    if (path[path.length - 1] > 3) {
      setHidden(true)
    }
  }, [path])

  return (
    <>
      {hidden ? (
        <Button
          onClick={() => {
            setHidden(false)
          }}
          className="my-2 h-5 w-24 rounded-full text-sm"
        >
          Show More
        </Button>
      ) : (
        <>
          <div
            onClick={() => {
              setMinimized((current) => !current)
            }}
            className="flex flex-col items-start justify-center gap-[.875rem] border-b border-gray-2 py-7"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center justify-center gap-[.8125rem]">
                <Image
                  src={img}
                  className="rounded-full shadow-primary"
                  alt="reviewer_photo"
                />
                <div className="flex flex-col items-start justify-center gap-[.125rem]">
                  <span className="text-sm font-semibold text-black">
                    {name}
                  </span>
                  <span className="text-xs font-normal text-gray-16">
                    {date}
                  </span>
                  <div>
                    <Rating rating={Number(stars)} />
                  </div>
                </div>
              </div>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsReply((current) => !current)
                }}
                color="transparent"
              >
                {/*  <IconWrapper
                  wrapperClass='hover:saturate-[1.4]'
                  gradient="primary"
                  icon={mdiReplay}
                  iconSize={1}
                /> */}
              </Button>
            </div>
            <div className={cn("", minimized ? "hidden" : "")}>
              <p className="text-sm font-normal text-gray-16">{description}</p>
            </div>
            <Replay isReply={isReply} />
          </div>
          <div
            className={cn(
              minimized ? " hidden" : "",
              path.length > 0 && "ml-4"
            )}
          >
            {genFunc(replies, [...path])}
          </div>
        </>
      )}
    </>
  )
}

export default Review
