import Image from "next/image"
import Link from "next/link"

import type { TSiteSettings } from "@/types/site-settings.type"

interface IProps {
  siteSettings: TSiteSettings
}

const FooterLogo: React.FC<IProps> = async ({ siteSettings }) => {
  return (
    <Link
      href={"/"}
      className="relative flex size-full max-w-[150px] items-center justify-center"
    >
      <Image
        width={130}
        height={105}
        src={siteSettings && siteSettings.site_identity.light_logo}
        alt="footer_logo"
        className="size-full object-contain"
      />
    </Link>
  )
}

export default FooterLogo
