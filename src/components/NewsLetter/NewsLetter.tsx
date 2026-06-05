"use server"

import { mdiEmailNewsletter } from "@mdi/js"
import Icon from "@mdi/react"

import { getSiteSettings } from "@/services/theme/getSiteSettings"

import NewsLetterForm from "./NewsLetterForm/NewsLetterForm"

const NewsLetter = async () => {
  const {
    site_identity: { siteName }
  } = await getSiteSettings()

  return (
    <section className="mt-10 flex w-full flex-col items-center justify-center gap-[1.0625rem] bg-white">
      <Icon
        size={5.5}
        path={mdiEmailNewsletter}
        className="absolute text-8xl opacity-5"
      />
      <div className="flex flex-col items-center justify-center gap-[.125rem]">
        <label htmlFor="newsletter" className="text-2xl font-bold text-black">
          {siteName} Newsletter
        </label>
        <span className="max-w-[19.4375rem] text-center text-sm font-normal text-gray-16">
          Get easy-to-deliver newsletter content powered by the latest housing
          market insights
        </span>
      </div>
      <NewsLetterForm />
    </section>
  )
}

export default NewsLetter
