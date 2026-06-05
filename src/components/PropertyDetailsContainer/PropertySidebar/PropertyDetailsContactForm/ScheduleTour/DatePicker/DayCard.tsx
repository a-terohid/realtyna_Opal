import cn from "clsx"
import React from "react"

interface IProps {
  day: string
  selectedDate: string
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>
}

const DayCard: React.FC<IProps> = ({ day, selectedDate, setSelectedDate }) => {
  const month = day.split(" ")[0]
  const dayNum = day.split(" ")[1]
  const dayOfWeek = day.split(" ")[2]

  return (
    <button
      type="button"
      onClick={() =>
        setSelectedDate(
          `${day.split(" ")[3]}/${day.split(" ")[4]}/${day.split(" ")[5]}`
        )
      }
      className={cn(
        "mb-2 flex h-[5rem] w-full flex-col items-center justify-center rounded-[.625rem] border border-gray-2 text-base text-gray-16 lg:w-[4.3rem]",
        selectedDate ===
          `${day.split(" ")[3]}/${day.split(" ")[4]}/${day.split(" ")[5]}`
          ? "bg-gray-2 bg-opacity-[0.35]"
          : "bg-white"
      )}
    >
      <span className="font-light">{dayOfWeek}</span>
      <span className="font-normal">{dayNum}</span>
      <span className="font-light">{month}</span>
    </button>
  )
}

export default DayCard
