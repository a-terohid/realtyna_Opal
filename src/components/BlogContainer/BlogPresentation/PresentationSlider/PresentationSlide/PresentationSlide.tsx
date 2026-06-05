import { mdiAccountCircle, mdiClock } from "@mdi/js"
import Icon from "@mdi/react"
import dayjs from "dayjs"
import Image from "next/image"

import placeholder from "@/assets/images/placeholder.png"
import type { Post } from "@/types/blog.type"
import { cn } from "@/utils/helpers"

interface IProps {
  presentation: Post
}

const PresentationSlide: React.FC<IProps> = ({ presentation }) => {
  return (
    <div className="flex w-full items-stretch justify-start gap-2 text-white">
      <div className='relative flex aspect-square size-[110px] shrink-0 items-center justify-center overflow-hidden rounded-[15px] duration-300 animate-in fade-in-50 after:absolute after:inset-0 after:z-[1] after:block after:bg-presentationOverlay after:content-[""]'>
        <Image
          className="bg-center object-cover"
          alt={presentation.title.rendered}
          sizes="15vw"
          fill
          src={presentation.x_featured_media_original || placeholder}
        />
      </div>
      <div className="flex grow flex-col items-start justify-between gap-1 pb-1">
        <div className="flex h-full flex-col items-start justify-start gap-1">
          <span className="text-sm opacity-[85%]">Presentation</span>
          <span className="line-clamp-2 text-base font-semibold">
            {presentation.title.rendered}
          </span>
        </div>

        <div
          className={cn(
            "flex flex-wrap items-end justify-start gap-3 text-[13px] font-normal text-white opacity-[85%]"
          )}
        >
          <div className="flex items-center justify-center gap-1 capitalize">
            <Icon size={0.9} path={mdiAccountCircle} className="text-gray-3" />
            <span className="whitespace-nowrap">{presentation.x_author}</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <Icon size={0.88} path={mdiClock} className="text-gray-3" />
            <span className="whitespace-nowrap">
              {dayjs(presentation.date).format("MMM, D, YYYY")}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PresentationSlide
