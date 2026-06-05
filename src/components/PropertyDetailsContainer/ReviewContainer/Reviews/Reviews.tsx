/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

import Review from "./Review/Review"

interface IProps {
  reviewsData: any
}

const Reviews: React.FC<IProps> = ({ reviewsData }) => {
  // a recursive function that generates an array of Review components
  function gen_comments(reviewsData: any, path: []) {
    return reviewsData.map((review: any, index: number) => {
      return (
        <Review
          name={review.name}
          img={review.img}
          date={review.date}
          description={review.description}
          stars={review.stars}
          genFunc={gen_comments}
          key={index}
          path={[...path, index]}
          replies={review.replies}
        />
      )
    })
  }

  return (
    <section className="w-full">
      <h3 className='before:bg-primary-gradient relative w-fit pb-[.5rem] text-sm font-semibold text-black before:absolute before:-bottom-px before:h-[.0625rem] before:w-full before:content-[""]'>
        {reviewsData.length} <span>Reviews</span>
      </h3>
      <div className="grid border-t border-gray-2">
        {gen_comments(reviewsData, [])}
      </div>
    </section>
  )
}

export default Reviews
