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

const BlogSocials: React.FC<IProps> = ({ agentData }) => {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-[10px] rounded-[15px] p-3 shadow-primary">
      <div className="flex w-full items-center justify-center gap-2">
        <span className="whitespace-nowrap text-lg font-bold text-black">
          Follow Up
        </span>
        <span className='flex w-full items-center justify-center after:block after:h-px after:w-full after:bg-black after:opacity-30 after:content-[""]' />
      </div>
      <div className="flex w-full items-center justify-center gap-[5px] py-3 font-normal text-white">
        {agentData.facebook && (
          <a
            rel="noreferrer noopener"
            target="_blank"
            href={agentData.facebook}
            aria-label="facebook link"
            className="bg-primary-gradient rounded-full p-3 transition-colors"
          >
            <Icon path={mdiFacebook} size={1} />
          </a>
        )}

        {agentData.twitter && (
          <a
            rel="noreferrer noopener"
            target="_blank"
            href={agentData.twitter}
            aria-label="twitter link"
            className="bg-primary-gradient rounded-full p-3 transition-colors"
          >
            <Icon path={mdiTwitter} size={1} />
          </a>
        )}
        {agentData.instagram && (
          <a
            rel="noreferrer noopener"
            target="_blank"
            href={agentData.instagram}
            aria-label="instagram link"
            className="bg-primary-gradient rounded-full p-3 transition-colors"
          >
            <Icon path={mdiInstagram} size={1} />
          </a>
        )}

        {agentData.youtube && (
          <a
            rel="noreferrer noopener"
            target="_blank"
            href={agentData.youtube}
            aria-label="skype link"
            className="bg-primary-gradient rounded-full p-3 transition-colors"
          >
            <Icon path={mdiYoutube} size={1} />
          </a>
        )}
      </div>
    </div>
  )
}

export default BlogSocials
