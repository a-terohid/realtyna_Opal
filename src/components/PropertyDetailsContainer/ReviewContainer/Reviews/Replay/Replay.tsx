import { zodResolver } from '@hookform/resolvers/zod'
import { mdiText } from '@mdi/js'
import React from 'react'
import { useForm } from 'react-hook-form'

import type { ReplyValidateSchema} from '@/utils/zodSchema';
import { replyValidateSchema } from '@/utils/zodSchema'

interface IProps {
  isReply: boolean
}

const Replay: React.FC<IProps> = ({ isReply }) => {
  //React hook form hook with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ReplyValidateSchema>({
    resolver: zodResolver(replyValidateSchema)
  })
  const onSubmit = (data: ReplyValidateSchema) => console.log(data)

  return (
    <>
      {isReply ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex w-full flex-col items-start justify-center gap-2 rounded-[.9375rem] p-2'
          onClick={(e) => e.stopPropagation()}
        >
          {/*  <InputField
            id='review'
            v1WrapperClass='shadow-input rounded-[.9375rem] py-[.625rem] px-[.75rem] bg-gray-3 bg-opacity-[0.15]'
            inputClass='h-[2.5rem] placeholder:text-gray-14 placeholder:text-opacity-[0.6] bg-transparent text-sm'
            iconClass='self-start text-gray-14 opacity-[0.6] mt-[.25rem]'
            iconSize={0.6}
            icon={mdiText}
            variant='v1'
            placeholder='Please Write Your Review ...'
            type='textarea'
            required={true}
            {...register('review')}
            error={errors?.review}
          />
          <Button className='w-[110px] h-[30px] text-white text-xs font-semibold self-start mt-[.1875rem]'>
            Submit Review
          </Button> */}
        </form>
      ) : (
        ''
      )}
    </>
  )
}

export default Replay
