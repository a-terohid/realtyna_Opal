import Icon from "@mdi/react"
import { type EmblaCarouselType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import React, { useCallback, useEffect, useState } from "react"

import CarouselDot from "@/components/common/CarouselDot/CarouselDot"
import { cn } from "@/utils/helpers"

interface IProps {
  data: {
    name: string
    icon: string
    count: number
  }[]
}

const PropertyNearbySlider: React.FC<IProps> = ({ data }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true
  })
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  useEffect(() => {
    if (!emblaApi) return
    onInit(emblaApi)
    onSelect()
    emblaApi.on("reInit", onInit)
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect, onInit])

  return (
    <>
      <div
        className="flex w-full items-center justify-center overflow-hidden"
        ref={emblaRef}
      >
        <div className="flex size-full">
          {data.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-[0_0_100%] select-none items-stretch justify-center rounded-[.625rem] px-[.375rem] py-3 outline-none sm:flex-[0_0_50%] md:flex-[0_0_33.333%] xl:flex-[0_0_20%]"
            >
              <div
                className={cn(
                  "relative flex h-[7.5rem] w-full flex-col items-center justify-center gap-[.2813rem] rounded-[.625rem] text-center shadow-primary"
                )}
                key={index}
              >
                <Icon
                  path={item.icon}
                  size={1.8}
                  /*  className={cn(item !== selected && 'text-gray-16')} */
                />
                <span className="text-sm font-normal">{item.name}</span>
                <span className="text-xs font-semibold">( {item.count} )</span>
                {/* <Button
              aria-label='select nearby'
              onClick={() => setSelected(item)}
              backgroundColor={cn(item === selected ? 'bg-white' : 'black')}
              hoverClass={cn(item === selected ? 'bg-white' : 'black')}
              className={cn(
                'absolute rounded-full w-[1.2188rem] h-[1.2188rem] flex justify-center items-center -bottom-[9px] z-10 right-5 shadow-primary'
              )}
            >
              <IconWrapper
                icon={mdiPlus}
                iconSize={0.7}
                iconClass={cn(item !== selected && 'fill-white')}
                gradient={item === selected ? 'black' : undefined}
              />
            </Button>  */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex h-3 w-full items-center justify-center gap-4">
        {scrollSnaps.map((_, index) => (
          <CarouselDot
            aria-label="nearby properties slide dot"
            key={index}
            index={index}
            scrollTo={scrollTo}
            selectedIndex={selectedIndex}
          />
        ))}
      </div>
    </>
  )
}

export default PropertyNearbySlider
