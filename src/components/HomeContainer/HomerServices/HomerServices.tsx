import dynamic from "next/dynamic"
import Image from "next/image"

import placeholder from "@/assets/images/placeholder.png"
import HomeSectionTitle from "@/components/common/HomeSectionTitle/HomeSectionTitle"
import type { THomeData } from "@/types/site-settings.type"

const HomeVideo = dynamic(() => import("./HomeVideo/HomeVideo"), {
  ssr: false
})

interface IProps {
  data: THomeData["services"]
}

const HomeServices: React.FC<IProps> = ({ data }) => {
  return (
    <section className="relative z-[1] flex w-full flex-col items-center justify-end gap-16">
      {/* {data.video && <HomeVideo video={data.video} />} */}
      <div className="relative flex w-full flex-col items-center justify-start bg-primary-1 pb-[110px] pt-[230px]">
        <svg
          role="presentation"
          className="absolute top-0 h-20 w-full fill-white sm:h-32 lg:h-[200px]"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 1600 200"
        >
          <path
            d="M0,0l133.3,22.4C266.7,43.9,533.3,90,800,89.3c266.7,0.6,533.3-45.4,666.7-66.9L1600,0v200H0L0,0z M1600,0H0
	          v200h1600V0z"
          />
        </svg>

        <div className="flex w-full max-w-[850px] flex-col gap-10 px-2">
          <div className="relative flex w-full flex-col items-center justify-center gap-5 gap-y-3 text-center text-white md:flex-row md:justify-end md:text-start">
            <HomeSectionTitle
              borderedClassName="text-[28px] sm:text-[32px] md:text-[26px] lg:text-[28px]"
              isWhite
              titleClassName="md:max-w-[40%]"
              title={data.title}
              borderedTitle={data.shadowTitle}
            />

            <p className="max-w-[490px] text-base font-normal capitalize">
              {data.description}
            </p>
          </div>
          <div className="flex w-full flex-wrap items-center justify-between">
            {data.count &&
              data.count.length > 0 &&
              data.count.map((img, index) =>
                img.image_url ? (
                  <div
                    key={index}
                    className="relative flex w-2/4 items-center justify-center sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/5"
                  >
                    <Image
                      draggable="false"
                      sizes="(max-width: 576px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      className="w-full max-w-[135px] shrink-0 select-none object-contain"
                      width={140}
                      height={105}
                      src={img.image_url || placeholder}
                      alt={"service " + index}
                    />
                  </div>
                ) : (
                  ""
                )
              )}
          </div>
        </div>
        <svg
          version="1.1"
          className="absolute bottom-0 -mb-px w-full bg-transparent fill-[#F4F4F4]"
          role="presentation"
          id="Layer_1"
          preserveAspectRatio="none"
          viewBox="0 0 1600 89.3"
        >
          <path
            d="M0,0l133.3,22.4C266.7,43.9,533.3,90,800,89.3c266.7,0.6,533.3-45.4,666.7-66.9L1600,0v89.3
	          c0,0-516.6,0-783.3,0C550,89.3,0,89.3,0,89.3V0z"
          />
        </svg>
      </div>
    </section>
  )
}

export default HomeServices
