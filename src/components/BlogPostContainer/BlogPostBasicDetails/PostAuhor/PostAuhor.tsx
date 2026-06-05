"use server"

import Image from "next/image"

async function getAuthorData(authorLink: string) {
  const res = await fetch(`${authorLink}`, {
    next: {
      revalidate: 3600
    }
  })
  return res.json()
}

export default async function PostAuthor({
  authorLink
}: {
  authorLink: string
}) {
  const authorData = await getAuthorData(authorLink)

  return (
    <div className="absolute bottom-[-25px] left-0 flex w-full max-w-max items-center justify-center gap-4 rounded-l-none rounded-r-full bg-white p-2 pr-4 shadow-secondary md:left-10 md:rounded-full">
      <div className="relative flex size-[48px] items-center justify-center">
        <Image
          fill
          sizes="3vw"
          className="size-full rounded-full shadow-primary"
          src={authorData.avatar_urls["48"]}
          alt={`${authorData.name}`}
        />
      </div>
      <span className="flex flex-col items-start justify-center text-sm capitalize text-black">
        {authorData.name}
      </span>
    </div>
  )
}
