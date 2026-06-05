import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import dayjs from "dayjs"
import { Controller, useForm } from "react-hook-form"

import { Button } from "@/components/common/Button"
import Loading from "@/components/common/Loading"
import { cn } from "@/utils/helpers"
import type { ScheduleFormValidateSchema } from "@/utils/zodSchema"
import { scheduleFormValidateSchema } from "@/utils/zodSchema"

import DatePicker from "./DatePicker/DatePicker"

const ScheduleTour = () => {
  // Get next 30 days
  const today = dayjs() // Use dayjs for the current date
  const days = Array.from(
    { length: 30 },
    (_, i) => today.add(i, "day").format("MMM D ddd MM DD YYYY") // Use dayjs methods for adding days and formatting
  )

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: async (formData: ScheduleFormValidateSchema) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`,
        formData
      )
      return res
    }
  })

  //React hook form hook with zod validation
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ScheduleFormValidateSchema>({
    resolver: zodResolver(scheduleFormValidateSchema)
  })
  const onSubmit = async (data: ScheduleFormValidateSchema) => {
    mutate(
      {
        date: data.date,
        fullname: data.fullname,
        time: data.time,
        email: data.email,
        phone_number: data.phone_number
      },
      {
        onError: (error) => {
          console.log(error)
        }
      }
    )
  }

  return (
    <div
      className={cn(
        "flex w-full flex-col items-start justify-center gap-5 rounded-[.9375rem] px-[.9375rem] py-[1.25rem] shadow-primary"
      )}
    >
      <div className="mb-[.9375rem] flex w-full gap-[1.125rem]">
        <h3 className="min-w-fit self-start text-base font-semibold text-black">
          Schedule Tour
        </h3>
        <span className='flex w-full items-center justify-center after:block after:h-[.0625rem] after:w-full after:bg-black after:opacity-30 after:content-[""]' />
      </div>
      <div className="w-full ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start justify-center gap-[1.0625rem]"
        >
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                days={days}
                selectedDate={field.value}
                setSelectedDate={(date) => field.onChange(date)}
              />
            )}
          />
          <div className="relative flex w-full flex-col items-center justify-center">
            <label
              className="absolute -top-4 left-2 z-10 mt-2 self-start rounded-full bg-white px-2 text-[.8125rem] font-semibold text-gray-16 text-opacity-80"
              htmlFor="fullname"
            >
              Fullname <span className="text-red-500">*</span>
            </label>
            <input
              className="group relative flex h-12 w-full items-center justify-start gap-1 rounded-lg border border-gray-16 px-4 py-3 text-sm font-semibold text-black text-opacity-80 placeholder:text-gray-4 md:text-base"
              id="fullname"
              placeholder="Enter your fullname"
              type="text"
              {...register("fullname")}
            />
          </div>
          <div className="relative flex w-full flex-col items-center justify-center">
            <label
              className="absolute -top-4 left-2 z-10 mt-2 self-start rounded-full bg-white px-2 text-[.8125rem] font-semibold text-gray-16 text-opacity-80"
              htmlFor="time"
            >
              Time <span className="text-red-500">*</span>
            </label>
            <input
              className="group relative flex h-12 w-full items-center justify-start gap-1 rounded-lg border border-gray-16 px-4 py-3 text-sm font-semibold text-black text-opacity-80 placeholder:text-gray-4 md:text-base"
              id="time"
              placeholder="Choose a time"
              type="time"
              {...register("time")}
            />
          </div>
          <div className="relative flex w-full flex-col items-center justify-center">
            <label
              className="absolute -top-4 left-2 z-10 mt-2 self-start rounded-full bg-white px-2 text-[.8125rem] font-semibold text-gray-16 text-opacity-80"
              htmlFor="phone_number"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              className="group relative flex h-12 w-full items-center justify-start gap-1 rounded-lg border border-gray-16 px-4 py-3 text-sm font-semibold text-black text-opacity-80 placeholder:text-gray-4 md:text-base"
              id="phone_number"
              placeholder="Enter your Phone Number"
              type="number"
              {...register("phone_number")}
            />
          </div>
          <div className="relative flex w-full flex-col items-center justify-center">
            <label
              className="absolute -top-4 left-2 z-10 mt-2 self-start rounded-full bg-white px-2 text-[.8125rem] font-semibold text-gray-16 text-opacity-80"
              htmlFor="email"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              className="group relative flex h-12 w-full items-center justify-start gap-1 rounded-lg border border-gray-16 px-4 py-3 text-sm font-semibold text-black text-opacity-80 placeholder:text-gray-4 md:text-base"
              id="email"
              placeholder="Enter your email address"
              autoComplete="true"
              type="email"
              {...register("email")}
            />
          </div>
          <Button
            disabled={isPending}
            className="relative h-[2.8125rem] w-full text-center text-base font-semibold text-white"
          >
            {isSuccess ? "Thanks for contacting us!" : "Schedule a Tour"}
            {isPending && (
              <Loading wrapperClass="absolute right-2" className="size-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ScheduleTour
