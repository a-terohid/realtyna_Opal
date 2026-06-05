"use client"

import { mdiFacebook, mdiLinkedin, mdiTwitter, mdiWhatsapp } from "@mdi/js"
import Icon from "@mdi/react"
import Link from "next/link"

const PostShare = () => {
  const shareUrl = window.location.href

  const socialMediaIcons = [
    {
      name: "linkedin",
      iconClass: mdiLinkedin,
      shareUrl: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
        shareUrl
      )}`
    },
    {
      name: "facebook",
      iconClass: mdiFacebook,
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`
    },
    {
      name: "whatsapp",
      iconClass: mdiWhatsapp,
      shareUrl: `https://api.whatsapp.com/send?text=$${encodeURIComponent(
        shareUrl
      )}`
    },
    {
      name: "twitter",
      iconClass: mdiTwitter,
      shareUrl: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}`
    }
  ]

  return (
    <div className="absolute bottom-16 left-0 flex items-center justify-center gap-2  rounded-full rounded-l-none bg-white px-3 py-[15px] shadow-none md:bottom-[-25px] md:left-auto md:right-10 md:rounded-l-full md:shadow-primary">
      <span className="text-gray-14">Share</span>
      <div className="flex items-center justify-center gap-1">
        {socialMediaIcons.map((icon, index) => (
          <Link
            aria-label="social link"
            target="_blank"
            rel="noreferrer noopener"
            className=" bg-primary-gradient group-hover:bg-primary-gradient-hover flex size-[2.1875rem] items-center justify-center rounded-full text-white shadow-primary"
            key={icon.name}
            href={icon.shareUrl}
          >
            <Icon size={1} path={icon.iconClass} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PostShare
