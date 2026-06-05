"use client"

import Image from "next/image"
import Link from "next/link"

import type { TSiteSettings } from "@/types/site-settings.type"
import { cn } from "@/utils/helpers"

const Logo = ({
  isHomePage,
  siteSettings,
  className
}: {
  isHomePage?: boolean | undefined
  className?: string
  siteSettings: TSiteSettings
}) => {
  return (
    <Link
      href={"/"}
      className={cn(
        className,
        "flex w-full max-w-[150px] items-center justify-center"
      )}
    >
      {siteSettings && (
        <Image
          width={130}
          height={105}
          src={
            isHomePage
              ? siteSettings && siteSettings.site_identity.light_logo
              : siteSettings && siteSettings.site_identity.dark_logo
          }
          alt={siteSettings.site_identity.siteName + "_logo"}
          className="size-full object-contain"
        />
      )}
    </Link>
  )
}

export default Logo
