/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

import ReviewOverall from "./ReviewOverall/ReviewOverall"
import Reviews from "./Reviews/Reviews"
import WriteReview from "./WriteReview/WriteReview"

interface IProps {
  overall: any
  reviews: any
}

const ReviewContainer: React.FC<IProps> = ({ overall, reviews }) => {
  return (
    <section className="col-span-full flex flex-col items-start justify-between gap-[.625rem] md:gap-[4.0625rem]">
      <div className="flex w-full flex-col items-start justify-between gap-5 md:flex-row md:gap-[30px] lg:flex-col xl:flex-row">
        <WriteReview />
        <ReviewOverall overallData={overall} />
      </div>
      <Reviews reviewsData={reviews} />
    </section>
  )
}

export default ReviewContainer
