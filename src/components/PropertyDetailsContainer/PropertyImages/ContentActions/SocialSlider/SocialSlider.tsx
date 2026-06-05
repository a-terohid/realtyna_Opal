import { mdiFacebook, mdiLinkedin, mdiTwitter } from "@mdi/js"
import Icon from "@mdi/react"
import Link from "next/link"
import React from "react"

const SocialSlider: React.FC = () => {
  const shareUrl = window.location.href

  const socialMediaIcons = [
    {
      name: "facebook",
      iconClass: "mdiFacebook",
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`
    },
    {
      name: "twitter",
      iconClass: "mdiTwitter",
      shareUrl: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}`
    },
    {
      name: "linkedin",
      iconClass: "mdiLinkedin",
      shareUrl: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
        shareUrl
      )}`
    }
  ]

  const icons = [mdiFacebook, mdiTwitter, mdiLinkedin]

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {socialMediaIcons.map((icon, index) => (
        <Link
          aria-label="social link"
          target="_blank"
          rel="noreferrer noopener"
          className=" bg-primary-gradient group-hover:bg-primary-gradient-hover flex size-[2.1875rem] items-center justify-center rounded-full text-white shadow-primary"
          key={icon.name}
          href={icon.shareUrl}
        >
          <Icon size={1} path={icons[index]} />
        </Link>
      ))}
    </div>
  )
}

export default SocialSlider
