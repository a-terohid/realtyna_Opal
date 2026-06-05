import { mdiChevronLeft, mdiChevronRight } from "@mdi/js"
import Icon from "@mdi/react"
import { useState } from "react"

import DayCard from "./DayCard"

interface CarouselProps {
  days: string[]
  selectedDate: string
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>
}

const DatePicker: React.FC<CarouselProps> = ({
  days,
  selectedDate,
  setSelectedDate
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1)
  }

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1)
  }

  const currentDays = days.slice(currentIndex, currentIndex + 5)

  return (
    <div className="relative flex w-full items-center justify-between">
      <button
        aria-label="previous day button"
        type="button"
        onClick={handlePrevClick}
        className="absolute -left-2 flex size-5 items-center justify-center rounded-full border border-gray-2 bg-white shadow-primary"
        disabled={currentIndex === 0}
      >
        <Icon className="text-gray-16" path={mdiChevronLeft} size={1} />
      </button>
      <div className="flex w-full justify-between gap-[.6613rem] text-lg font-medium">
        {currentDays.map((day) => (
          <DayCard
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            key={day}
            day={day}
          />
        ))}
      </div>
      <button
        aria-label="next day button"
        type="button"
        onClick={handleNextClick}
        className="absolute -right-2 flex size-5 items-center justify-center rounded-full border border-gray-2 bg-white shadow-primary"
        disabled={currentIndex === days.length - 1}
      >
        <Icon className="text-gray-16" path={mdiChevronRight} size={1} />
      </button>
    </div>
  )
}

export default DatePicker
