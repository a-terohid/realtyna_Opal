import { zodResolver } from '@hookform/resolvers/zod'
import { mdiAccount, mdiEmail, mdiText } from '@mdi/js'
import React from 'react'
import { useForm } from 'react-hook-form'

import type { ReviewValidateSchema} from '@/utils/zodSchema';
import { reviewValidateSchema } from '@/utils/zodSchema'

const WriteReview: React.FC = () => {
  //React hook form hook with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ReviewValidateSchema>({
    resolver: zodResolver(reviewValidateSchema)
  })

  const onSubmit = (data: ReviewValidateSchema) => console.log(data)

  return (
    <section className='flex w-full items-start justify-between pt-[2.1875rem] '>
      <div className='flex w-full flex-col items-start justify-center gap-4 md:gap-9'>
        <h2 className='text-2xl font-bold text-black'>Write A Review</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid w-full grid-cols-2 items-start justify-center gap-[.6875rem]'
        >
          <div className='col-span-2 flex w-full items-start justify-center gap-[10px] lg:flex-col 2xl:flex-row'>
            {/*  <InputField
              id='user_name'
              v1WrapperClass='shadow-input rounded-[18.75rem] h-[2.1875rem] py-[.375rem] px-[.7188rem] bg-gray-3 bg-opacity-[0.15]'
              inputClass='placeholder:text-gray-14 placeholder:text-opacity-[0.6] bg-transparent'
              iconClass='text-gray-14 opacity-[0.6]'
              icon={mdiAccount}
              variant='v1'
              placeholder='Name'
              type='text'
              required={true}
              {...register('name')}
              error={errors?.name}
            />
            <InputField
              id='user_email'
              v1WrapperClass='shadow-input rounded-[18.75rem] h-[2.1875rem] py-[.375rem] px-[.7188rem] bg-gray-3 bg-opacity-[0.15]'
              inputClass='placeholder:text-gray-14 placeholder:text-opacity-[0.6] bg-transparent'
              iconClass='text-gray-14 opacity-[0.6]'
              icon={mdiEmail}
              variant='v1'
              placeholder='Email'
              type='text'
              required={true}
              {...register('email')}
              error={errors?.email}
            /> */}
          </div>
          {/* <InputField
            id='review_text'
            wrapperClass='col-span-2'
            v1WrapperClass='shadow-input rounded-[.9375rem] py-[.625rem] px-[.75rem] bg-gray-3 bg-opacity-[0.15]'
            inputClass='h-[8.125rem] placeholder:text-gray-14 placeholder:text-opacity-[0.6] bg-transparent'
            iconClass='self-start text-gray-14 opacity-[0.6]'
            icon={mdiText}
            iconSize={0.8}
            variant='v1'
            placeholder='Please Write Your Review ...'
            type='textarea'
            required={true}
            {...register('review')}
            error={errors?.review}
          />
          <Button className='w-[8.75rem] col-span-2 h-[2.5rem] text-white text-sm font-semibold self-start shadow-primary mt-[.1875rem]'>
            Submit Review
          </Button> */}
        </form>
      </div>
    </section>
  )
}

export default WriteReview
