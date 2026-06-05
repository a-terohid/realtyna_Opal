import { mdiChevronRight } from "@mdi/js"
import Icon from "@mdi/react"
import React from "react"

interface IProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  imagesLength: number
}

const ShowMoreOverlay: React.FC<IProps> = ({ setIsOpen, imagesLength }) => {
  return (
    <div className="absolute z-[1] flex size-full items-center justify-center rounded-[.9375rem] bg-black/40">
      <button
        onClick={() => setIsOpen(true)}
        className="flex cursor-pointer flex-col items-center justify-center rounded-[15px]  bg-gray-20/80 px-5 py-2 text-base font-semibold text-gray-2"
      >
        <span className="font-normal text-gray-4">{imagesLength} Images</span>
        <div className="flex items-center justify-center gap-1">
          <span>View More</span>
          <Icon
            path={mdiChevronRight}
            size={1}
            className="mt-px fill-gray-18"
          />
        </div>
      </button>
    </div>
  )
}

export default ShowMoreOverlay
