import { mdiCellphone, mdiClock } from "@mdi/js"
import Icon from "@mdi/react"

import type { AgentValue } from "@/types/agent.type"

const ContactLocationGoogle = ({ agentData }: { agentData: AgentValue }) => {
  const lat =
    agentData.coordinates && agentData.coordinates.latitude
      ? agentData.coordinates.latitude
      : 39.68714

  const lng =
    agentData.coordinates && agentData.coordinates.longitude
      ? agentData.coordinates.longitude
      : -75.65853

  return (
    <div className={"relative flex w-full items-center justify-center"}>
      <iframe
        title="google map"
        className="pointer-events-none size-full h-[480px] rounded-md"
        loading="lazy"
        allowFullScreen={false}
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&q=${lat}, ${lng}
              &center=${lat}, ${lng}&zoom=10`}
      />
      <div
        aria-label="agent location"
        className="bg-neutral-gradient absolute z-50 mb-60 flex flex-col items-center justify-center gap-3 rounded-[15px] px-[13px] py-[19px] text-[15px] text-white shadow-primary"
      >
        <span className="line-clamp-3 max-w-[400px] text-start font-bold">
          {agentData.full_address}
        </span>
        <div className="flex w-full flex-col items-start justify-between gap-1 sm:flex-row sm:items-center sm:gap-5">
          <div className="flex items-center justify-center gap-1">
            <Icon size={0.8} path={mdiCellphone} />
            <span>Phone Number</span>
          </div>
          <a href={`tel:${agentData.professional_phone}`}>
            {agentData.professional_phone}
          </a>
        </div>
        <div className="flex w-full flex-col items-start justify-between gap-1 sm:flex-row sm:items-center sm:gap-5">
          <div className="flex items-center justify-center gap-1">
            <Icon size={0.8} path={mdiClock} />
            <span>Business Hours</span>
          </div>
          <span>Sun – Friday , 09:00 AM – 08:00 PM</span>
        </div>
      </div>

      <svg
        className="absolute bottom-0 z-[1002] w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        width="1598"
        height="100"
        viewBox="0 0 1598 100"
        fill="none"
      >
        <path
          d="M0 0L133.333 25.5797C266.667 50.2031 533.333 102.797 800 102.08C1066.67 102.797 1333.33 50.2031 1466.67 25.5797L1600 0V612H1466.67C1333.33 612 1066.67 612 800 612C533.333 612 266.667 612 133.333 612H0V0Z"
          fill="white"
        />
      </svg>
    </div>
  )
}

export default ContactLocationGoogle
