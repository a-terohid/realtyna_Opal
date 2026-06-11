import Image from "next/image"
import React from "react"

import type { TDisclaimerValue } from "@/types/disclaimer.type"

import { Skeleton } from "../Skeleton"

interface IProps {
  disclaimer: TDisclaimerValue
  className?: string
  listOfficeName?: string
  lastUpdate?: Date
  name?: string
}

const Disclaimer: React.FC<IProps> = ({
  disclaimer,
  className,
  listOfficeName,
  lastUpdate,
  name
}) => {
  const replacedText = disclaimer.disclaimer
    .replace(/\{year\}/g, new Date().getFullYear().toString())
    .replace(/\{ListOfficeName\}/g, listOfficeName || "agent/broker")
    .replace(/\{ListOfficeNmae\}/g, listOfficeName || "agent/broker")
    .replace(/\{office_name\}/g, listOfficeName || "agent/broker")

  return (
    <ul key={disclaimer.id} className="grid gap-3 py-3">
      <li className="list-disc font-medium">
        Source Name: {name || disclaimer.name}
      </li>

      {lastUpdate && (
        <li className="list-disc font-medium">
          Last Update:{" "}
          {Intl.DateTimeFormat("en-US").format(new Date(lastUpdate))}
        </li>
      )}

      <li className="list-disc font-medium">
        Last Checked:{" "}
        {Intl.DateTimeFormat("en-US").format(new Date(disclaimer.last_updated))}
      </li>
      {<li className="mt-2 flex flex-col items-start justify-start gap-3 md:flex-row">
        {disclaimer.image  ?<Image
          className="shrink-0"
          src={disclaimer.image}
          width={100}
          height={100}
          alt={disclaimer.name}
        />:  null}
        <p className="">{replacedText}</p>
      </li>}
    </ul>
  )
}

export default Disclaimer
