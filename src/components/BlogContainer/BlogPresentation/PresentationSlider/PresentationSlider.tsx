import useEmblaCarousel from "embla-carousel-react"

import type { Post } from "@/types/blog.type"

import PresentationSlide from "./PresentationSlide/PresentationSlide"

interface IProps {
  presentationsData: Array<Post>
  handleMainSlide: (presentation: Post) => void
  mainSlide: Post
}

const PresentationSlider: React.FC<IProps> = ({
  presentationsData,
  handleMainSlide,
  mainSlide
}) => {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    dragFree: true
  })

  return (
    <div
      className="flex w-full items-center justify-center overflow-hidden"
      ref={emblaRef}
    >
      <div className="flex size-full">
        {presentationsData
          .filter((item) => item.id !== mainSlide.id)
          .map((presentation, index) => (
            <div
              onClick={() => handleMainSlide(presentation)}
              key={index}
              className="relative flex flex-[0_0_100%] cursor-pointer items-stretch justify-center sm:flex-[0_0_80%] md:flex-[0_0_60%] lg:flex-[0_0_50%] xl:flex-[0_0_33%]"
            >
              <PresentationSlide presentation={presentation} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default PresentationSlider
