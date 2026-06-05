import React from 'react'

interface IProps {
  score: number
}

const OverallCircle: React.FC<IProps> = ({ score }) => {
  //Define the radius of the circle
  const radius = (120 - 10) / 2
  // Calculate the circumference of the circle
  const circumference = 2 * Math.PI * radius
  // Calculate the progress (the amount of the circle to be filled) based on the score
  // Divided by 2 so eachside of circle get equal amount of progress
  const progress = ((100 - score / 2) / 100) * circumference

  return (
    <svg
      viewBox='0 0 136 136'
      width='136'
      height='136'
      transform='rotate(-90)'
    >
      <linearGradient
        id='circleGradient'
        x1='100%'
        y1='100%'
        x2='0%'
        y2='100%'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='rgb(var(--color-accent-gradient-from))' />
        <stop
          offset='100%'
          stopColor='rgb(var(--color-accent-gradient-to))'
        />
      </linearGradient>
      <circle
        cx='68'
        cy='68'
        r={radius}
        fill='none'
        opacity='10%'
        stroke='url(#circleGradient)'
        strokeWidth='15'
      />
      <circle
        cx='68'
        cy='68'
        r={radius}
        fill='none'
        stroke='url(#circleGradient)'
        strokeWidth='6'
        strokeDasharray={`${circumference} ${circumference}`}
        // -progress to fill anti clockwise
        strokeDashoffset={-progress}
        strokeLinecap='round'
      />
      <circle
        cx='68'
        cy='68'
        r={radius}
        fill='none'
        stroke='url(#circleGradient)'
        strokeWidth='6'
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={progress}
        strokeLinecap='round'
      />
    </svg>
  )
}

export default OverallCircle
