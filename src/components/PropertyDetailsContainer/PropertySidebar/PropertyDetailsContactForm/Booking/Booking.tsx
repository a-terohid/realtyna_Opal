/* import {
  scheduleFormValidateSchema,
  ScheduleFormValidateSchema
} from '@/utils/zodSchema'
import { addDays, format } from 'date-fns'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/common/Button'
import DatePicker from '../ScheduleTour/DatePicker/DatePicker'

const ScheduleTour = () => {
  const [selectedDate, setSelectedDate] = useState<string>('')

  // Get next 30 days
  const today = new Date()
  const days = Array.from({ length: 30 }, (_, i) =>
    format(addDays(today, i), 'MMM d eee')
  )

  //React hook form hook with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ScheduleFormValidateSchema>({
    resolver: zodResolver(scheduleFormValidateSchema)
  })
  const onSubmit = (data: ScheduleFormValidateSchema) =>
    console.log(data, selectedDate)

  return (
    <div className='px-[.9375rem] py-[1.25rem] w-full '>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='gap-[1.0625rem] flex flex-col justify-center items-start'
      >
        <DatePicker
          days={days}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <div className='font-source_sans_pro'>
          <label htmlFor='fullname'>Fullname</label>
          <input
            id='fullname'
            type='text'
            {...register('fullname')}
          />
        </div>
        <input type='text' />

        <Button className='w-full h-[2.8125rem] text-white font-semibold text-base text-center'>
          Schedule a Tour
        </Button>
      </form>
    </div>
  )
}

export default ScheduleTour
 */
