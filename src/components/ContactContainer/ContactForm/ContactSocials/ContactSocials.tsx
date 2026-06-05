import {
  mdiFacebook,
  mdiInstagram,
  mdiSkype,
  mdiTwitter,
  mdiYoutube
} from "@mdi/js"
import Icon from "@mdi/react"

import type { AgentValue } from "@/types/agent.type"

interface IProps {
  agentData: AgentValue
}

const ContactSocials: React.FC<IProps> = ({ agentData }) => {
  const social = [
    { icon: mdiInstagram, href: agentData?.instagram },
    { icon: mdiFacebook, href: agentData?.facebook },
    { icon: mdiYoutube, href: agentData?.youtube },
    { icon: mdiTwitter, href: agentData?.twitter }
  ]

  return (
    <div className="relative z-10 flex w-max flex-wrap items-center justify-center gap-2 empty:hidden lg:absolute lg:left-8 lg:flex-col xl:bottom-2 xl:left-auto xl:right-[-70px]">
      {social.map(
        (item, index) =>
          item.href && (
            <a
              aria-label="social link"
              target="_blank"
              rel="noreferrer noopener"
              className="bg-primary-gradient flex size-[45px] items-center justify-center rounded-full text-white shadow-primary transition-colors"
              key={index}
              href={item.href}
            >
              <Icon size={1} path={item.icon} />
            </a>
          )
      )}
    </div>
  )
}

export default ContactSocials
