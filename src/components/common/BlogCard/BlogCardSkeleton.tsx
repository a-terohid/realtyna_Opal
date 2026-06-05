import React from 'react'

import { cn } from '@/utils/helpers'

import { Skeleton } from '../Skeleton'

interface IProps {
  className?: string
}

const BlogCardSkeleton: React.FC<IProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'flex flex-col min-h-[350px] h-[350px] max-h-[410px] justify-between gap-3 items-center relative w-full cursor-pointer',
        className
      )}
    >
      <Skeleton className='size-full' />
      <Skeleton className='h-[12%] w-full' />
      <Skeleton className='h-1/5 w-full' />
      <Skeleton className='h-[8%] w-full' />
    </div>
  )
}

export default BlogCardSkeleton
