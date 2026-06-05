import { mdiStar } from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'

import { cn } from '@/utils/helpers'

interface Rating {
  rating: number
  color?: string
  iconSize?: number
}

const Rating: React.FC<Rating> = ({
  rating,
  iconSize = 0.5,
  color = 'text-yellow-400'
}) => {
  return (
    <div className='flex'>
      {[...Array(5)].map((_, i) => {
        const filledStar = i < rating
        return (
          <React.Fragment key={i}>
            <Icon
              path={mdiStar}
              size={iconSize}
              className={cn(filledStar ? color : 'text-gray-14')}
            />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Rating
