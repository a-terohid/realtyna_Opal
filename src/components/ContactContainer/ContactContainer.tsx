import Image from "next/image"
import { ReCaptchaProvider } from "next-recaptcha-v3"

import contactBg from "@/assets/images/Map.webp"
import type { AgentValue } from "@/types/agent.type"

import ContactForm from "./ContactForm/ContactForm"
import ContactLocation from "./ContactLocation/ContactLocation"

interface IProps {
  agentData: AgentValue
}

const ContactContainer: React.FC<IProps> = ({ agentData }) => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <ContactLocation agentData={agentData} />
      <ReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
      >
        <ContactForm agentData={agentData} />
      </ReCaptchaProvider>
      <Image
        priority
        className="mx-auto hidden object-cover md:flex"
        src={contactBg}
        alt="contact_page_bg"
      />
    </div>
  )
}

export default ContactContainer
