"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useReCaptcha } from "next-recaptcha-v3"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { Button } from "@/components/common/Button"
import { InputV2 } from "@/components/common/FormInput/FormInputV2"
import Loading from "@/components/common/Loading"
import { cn } from "@/utils/helpers"
import type { ContactAgentValidateSchema } from "@/utils/zodSchema"
import { contactAgentValidateSchema } from "@/utils/zodSchema"

const ContactAgent = () => {
  const { executeRecaptcha } = useReCaptcha()

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: async (
      formData: ContactAgentValidateSchema & { token: string | undefined }
    ) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`,
        formData,
        {
          params: { formName: "Contact Agent" }
        }
      )
      return res
    }
  })

  //React hook form hook with zod validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactAgentValidateSchema>({
    resolver: zodResolver(contactAgentValidateSchema)
  })
  const onSubmit = async (data: ContactAgentValidateSchema) => {
    let token
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)
      token = await executeRecaptcha("form_submit")

    mutate(
      {
        fullname: data.fullname,
        phone_number: data.phone_number,
        email: data.email,
        message: data.message,
        token
      },
      {
        onSuccess: () => {
          toast.success("Your message has been sent successfully")
          reset()
        },
        onError: (error) => {
          console.error(error)
          toast.error(error.message || "Something went wrong")
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
          Contact Agent
        </h3>
        <span className='flex w-full items-center justify-center after:block after:h-[.0625rem] after:w-full after:bg-black after:opacity-30 after:content-[""]' />
      </div>
      <div className="w-full ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start justify-center gap-[1.0625rem]"
        >
          <InputV2
            required
            id="fullname"
            autoComplete="new-password"
            label="Fullname"
            placeholder="Enter your full name"
            {...register("fullname")}
          />
          {errors && errors.fullname?.message && (
            <span className="font-sans text-xs font-medium text-red-500 sm:text-sm">
              {errors.fullname.message}
            </span>
          )}

          <InputV2
            id="email"
            required
            autoComplete="new-password"
            label="Email"
            type="email"
            placeholder="Enter your email address"
            {...register("email")}
          />
          {errors && errors.email?.message && (
            <span className="font-sans text-xs font-medium text-red-500 sm:text-sm">
              {errors.email.message}
            </span>
          )}
          <InputV2
            required
            id="phone_number"
            type="number"
            autoComplete="new-password"
            label="Phone"
            placeholder="Enter your phone number"
            {...register("phone_number")}
          />
          {errors && errors.phone_number?.message && (
            <span className="font-sans text-xs font-medium text-red-500 sm:text-sm">
              {errors.phone_number.message}
            </span>
          )}

          <InputV2
            required
            id="message"
            label="Message"
            type="textarea"
            placeholder="I'm intersted in ..."
            {...register("message")}
          />
          {errors && errors.message?.message && (
            <span className="font-sans text-xs font-medium text-red-500 sm:text-sm">
              {errors.message.message}
            </span>
          )}

          <Button
            disabled={isPending || isSuccess}
            className="relative h-[2.8125rem] w-full text-center text-base font-semibold text-white"
          >
            {isSuccess ? "Thanks for contacting us!" : "Send Message"}
            {isPending && (
              <Loading wrapperClass="absolute right-2" className="size-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ContactAgent
