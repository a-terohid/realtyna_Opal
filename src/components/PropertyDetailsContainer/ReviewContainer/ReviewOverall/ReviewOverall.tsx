/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

import LinePercentage from "./LinePercentage/LinePercentage"
import OverallCircle from "./OverallCircle/OverallCircle"

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  overallData: any
}

const ReviewOverall: React.FC<IProps> = ({ overallData }) => {
  const { items } = overallData
  const labels = [
    "Check-in",
    "Communication",
    "Location",
    "Value",
    "Accuracy ",
    "Cleanliness"
  ]

  return (
    <section className="flex w-full flex-1 flex-col">
      <div className="relative flex w-full items-center justify-center">
        <OverallCircle score={overallData.percentage} />
        <div className="bg-primary-gradient absolute flex flex-col !bg-clip-text text-center font-extrabold text-transparent">
          <span className="text-sm font-normal">Overall</span>
          <span className="text-2xl leading-[25px]">
            {overallData.percentage}
            <span className="text-sm">%</span>
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-[.5rem]">
        {Object.entries(items).map(([key, value]: any, index) => (
          <LinePercentage key={key} data={value} label={labels[index]} />
        ))}
      </div>
    </section>
  )
}

export default ReviewOverall
