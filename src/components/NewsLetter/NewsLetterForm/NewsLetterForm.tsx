"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { mdiEmailNewsletter } from "@mdi/js"
import Icon from "@mdi/react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import React from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import Button from "@/components/common/Button"
import Loading from "@/components/common/Loading"
import type { NewsletterValidateSchema } from "@/utils/zodSchema"
import { newsletterValidateSchema } from "@/utils/zodSchema"

const NewsLetterForm = () => {
  const { register, handleSubmit, reset } = useForm<NewsletterValidateSchema>({
    resolver: zodResolver(newsletterValidateSchema)
  })

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (formData: { email: string }) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`,
        formData,
        {
          params: { formName: "Newsletter" }
        }
      )
      return res
    }
  })

  const onSubmit = (data: NewsletterValidateSchema) => {
    mutate(
      {
        email: data.email.toLowerCase()
      },
      {
        onSuccess: (res) => {
          const data = res.data
          if (data.success) {
            toast.success(
              "Thank you for signing up. Be on the lookout for our monthly newsletter!"
            )
            reset()
          } else {
            throw new Error(
              "Something went wrong while sending message , please try again later"
            )
          }
        },
        onError: (error) => {
          console.error(error)

          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.validation_messages)
          } else {
            toast.error(
              "Something went wrong while sending message , please try again later"
            )
          }
        }
      }
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex h-[4.75rem] w-full max-w-[26rem] items-center justify-center rounded-full border-2 px-[.625rem] py-2 shadow-primary"
    >
      <div className="relative flex size-full items-center justify-start gap-[.4375rem] rounded-[18.75rem] bg-white px-[.625rem] py-5 shadow-primary sm:gap-[.8125rem] sm:px-[1.375rem]">
        <Icon size={1} path={mdiEmailNewsletter} className="text-gray-16" />
        <input
          autoComplete="on"
          aria-label="newsletter"
          type="email"
          id="newsletter"
          className="h-12 w-full text-sm font-normal text-black outline-none placeholder:text-gray-9 md:text-base "
          placeholder="Enter Your Email Address"
          {...register("email")}
        />
      </div>
      <Button
        type="submit"
        disabled={isPending || isSuccess}
        gradient={"secondary"}
        className="absolute right-[1.125rem] flex h-[2.375rem] w-24 items-center justify-center text-sm font-normal text-white shadow-primary sm:w-[7.375rem]"
      >
        Submit
        {isPending && (
          <Loading wrapperClass="absolute right-2" className="size-5" />
        )}
      </Button>
    </form>
  )
}

export default NewsLetterForm
