"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useReCaptcha } from "next-recaptcha-v3"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"

import contactFormBg from "@/assets/images/contact-form.webp"
import { Button } from "@/components/common/Button"
import HomeSectionTitle from "@/components/common/HomeSectionTitle/HomeSectionTitle"
import Loading from "@/components/common/Loading"
import { Switch } from "@/components/common/Switch"
import type { AgentValue } from "@/types/agent.type"
import type { ContactPageValidateSchema } from "@/utils/zodSchema"
import { contactPageValidateSchema } from "@/utils/zodSchema"

import { ContactFormInput } from "./ContactFormInput/ContactFormInput"
import ContactSocials from "./ContactSocials/ContactSocials"

interface IProps {
  agentData: AgentValue
}

const ContactForm: React.FC<IProps> = ({ agentData }) => {
  const { executeRecaptcha } = useReCaptcha()

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (formData: {
      fullname: string
      email: string
      message: string
      token: string | undefined
    }) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`,
        formData,
        {
          params: { formName: "Contact Us" }
        }
      )

      return res
    }
  })

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<ContactPageValidateSchema>({
    resolver: zodResolver(contactPageValidateSchema)
  })

  const onSubmit = async (data: ContactPageValidateSchema) => {
    let token
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)
      token = await executeRecaptcha("form_submit")

    mutate(
      {
        fullname: data.firstname + " " + data.lastname,
        email: data.email.toLowerCase(),
        message: data.message,
        token
      },
      {
        onSuccess: () => {
          toast.success("Your message has been sent successfully")
          reset()
        },
        onError: (error) => {
          toast.error(
            "Something went wrong while sending message , please try again later"
          )
          console.error(error)
        }
      }
    )
  }

  return (
    <section className="relative z-[1002] mt-[-120px] flex w-full max-w-[1060px] items-start justify-center px-3 lg:h-[780px]">
      <div className="relative flex size-full max-w-[600px] flex-col-reverse items-center justify-end rounded-[30px] bg-white pb-5 shadow-secondary lg:max-w-none lg:flex-row lg:items-center lg:pb-0">
        <ContactSocials agentData={agentData} />
        <div className="z-[1] flex w-full flex-col items-center justify-center gap-[75px] rounded-[15px] bg-white/80 px-5 py-[30px] backdrop-blur-md lg:absolute lg:left-10 lg:max-w-[600px] lg:px-[85px]">
          <HomeSectionTitle
            titleClassName=""
            borderedClassName=""
            title="GET IN TOUCH WITH US"
            borderedTitle={"Contact Us"}
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid w-full grid-cols-1 items-center justify-items-center gap-[25px] lg:max-w-[450px] lg:grid-cols-12"
          >
            <ContactFormInput
              className="col-span-full lg:col-span-6"
              id="firstname"
              placeholder="Shane"
              label="First Name"
              {...register("firstname")}
            />
            <ContactFormInput
              className="col-span-full lg:col-span-6"
              id="lastname"
              placeholder="Erero"
              label="Last Name"
              {...register("lastname")}
            />

            {errors && errors.firstname && (
              <span className="col-span-full text-sm text-red-500 lg:col-span-6">
                {errors.firstname?.message}
              </span>
            )}

            {errors && errors.lastname && (
              <span className="col-span-full text-sm text-red-500 lg:col-span-6">
                {errors.lastname?.message}
              </span>
            )}
            <ContactFormInput
              id="email"
              label="Email"
              placeholder="youremail@example.com"
              className="col-span-full"
              type="email"
              {...register("email")}
            />
            {errors && errors.email && (
              <span className="col-span-full text-sm text-red-500">
                {errors?.email.message}
              </span>
            )}
            <ContactFormInput
              className="col-span-full"
              inputClassName="resize-none h-[90px] w-full"
              id="message"
              label="Your Message"
              type="textarea"
              {...register("message")}
            />
            {errors && errors.message && (
              <span className="col-span-full text-sm text-red-500">
                {errors?.message.message}
              </span>
            )}
            <div className="col-span-full flex w-full flex-wrap items-center justify-start gap-2 text-sm">
              <Controller
                control={control}
                name="terms"
                key="terms"
                render={({ field }) => (
                  <Switch
                    id="terms"
                    aria-label="terms and conditions"
                    checked={field.value}
                    onCheckedChange={(terms) => field.onChange(terms)}
                  />
                )}
              />

              <span className=" whitespace-nowrap text-[#676b81]">
                I agree to the
              </span>
              <Link
                href={"/"}
                className="bg-neutral-gradient whitespace-nowrap !bg-clip-text font-bold text-transparent hover:underline hover:underline-offset-1"
              >
                Terms and Conditions
              </Link>
              {errors && errors.terms && (
                <span className="w-full text-center text-sm text-red-500">
                  {errors?.terms.message}
                </span>
              )}
            </div>
            <Button
              disabled={isPending || isSuccess || !watch("terms")}
              size={"sm"}
              className="relative col-span-full h-[3.75rem] w-full text-center text-base font-semibold text-white"
            >
              {isSuccess ? "Thanks for contacting us!" : "Send Message"}
              {isPending && (
                <Loading wrapperClass="absolute right-2" className="size-5" />
              )}
            </Button>
          </form>
        </div>
        <div className="relative mr-10 hidden size-full max-h-[710px] max-w-[540px] lg:block">
          <Image
            fill
            priority
            sizes="50vw"
            alt="contact_form_bg"
            className="rounded-[15px] object-cover shadow-secondary"
            src={contactFormBg}
          />
        </div>
      </div>
    </section>
  )
}

export default ContactForm
