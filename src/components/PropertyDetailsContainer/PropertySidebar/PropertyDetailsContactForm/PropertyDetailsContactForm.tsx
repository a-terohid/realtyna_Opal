import { ReCaptchaProvider } from "next-recaptcha-v3"

import ContactAgent from "./ContactAgent/ContactAgent"

const PropertyDetailsContactForm = () => {
  return (
    <section className="col-span-full flex flex-col items-start justify-center">
      {/* <ScheduleTour /> */}
      <ReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
      >
        <ContactAgent />
      </ReCaptchaProvider>
    </section>
  )
}

export default PropertyDetailsContactForm
