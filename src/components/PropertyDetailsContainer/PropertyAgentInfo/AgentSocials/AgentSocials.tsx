import { mdiFacebook, mdiInstagram, mdiTwitter, mdiYoutube } from "@mdi/js"
import Icon from "@mdi/react"
import React from "react"

interface IProps {
  instagram: string
  facebook: string
  youtube: string
  twitter: string
}

const AgentSocials: React.FC<IProps> = (props) => {
  const icons = [mdiInstagram, mdiFacebook, mdiYoutube, mdiTwitter]

  return (
    <>
      {Object.entries(props).map(
        (item, index) =>
          (props.facebook ||
            props.youtube ||
            props.instagram ||
            props.twitter) && (
            <a
              aria-label="social link"
              target="_blank"
              rel="noreferrer noopener"
              className="bg-primary-gradient ml-px flex size-[2.1875rem] items-center justify-center rounded-full text-white shadow-primary transition-colors"
              key={index}
              href={item[1]}
            >
              <Icon size={1} path={icons[index]} />
            </a>
          )
      )}
    </>
  )
}

export default AgentSocials
