import {
  mdiCellphoneText,
  mdiEmailNewsletter,
  mdiMapMarker,
  mdiWeb
} from "@mdi/js"
import Icon from "@mdi/react"
import { memo } from "react"

import { cn } from "@/utils/helpers"

interface IProps {
  phone?: string
  website?: string
  email?: string
  address?: string
  iconSize?: number
  iconClass?: string
  textClass?: string
  wrapperClass?: string
}

const AgentContacts: React.FC<IProps> = memo(
  ({ phone, website, address, email, iconClass, iconSize = 1, textClass }) => {
    const agentContactInfo = [
      {
        label: "Phone",
        value: phone,
        icon: mdiCellphoneText
      },
      {
        label: "Email",
        value: email,
        icon: mdiEmailNewsletter
      },
      {
        label: "Website",
        value: website,
        icon: mdiWeb
      },
      {
        label: "Address",
        value: address,
        icon: mdiMapMarker
      }
    ]

    return (
      <>
        {agentContactInfo.map((item) => {
          return (
            item.value && (
              <div
                key={item.label}
                className="flex items-center justify-start gap-[.3125rem] text-gray-18 [&>*]:cursor-pointer"
              >
                <Icon
                  path={item.icon}
                  size={iconSize}
                  className={cn(iconClass, "shrink-0")}
                />
                {item.label === "Phone" && item.value && (
                  <a
                    aria-label={`Call ${item.value} (opens in a new tab)`}
                    aria-disabled="true"
                    target="_blank"
                    className={cn(
                      "line-clamp-3 max-w-[300px] hover:underline",
                      textClass
                    )}
                    rel="noreferrer"
                    href={`tel:${item.value}`}
                  >
                    {item.value}
                  </a>
                )}
                {item.label === "Email" && item.value && (
                  <a
                    aria-label={`Email ${item.value} (opens in a new tab)`}
                    aria-disabled="true"
                    target="_blank"
                    className={cn(
                      "line-clamp-3 max-w-[300px] hover:underline",
                      textClass
                    )}
                    rel="noreferrer"
                    href={`mailto:${item.value}`}
                  >
                    {item.value}
                  </a>
                )}
                {item.label === "Website" && item.value && (
                  <a
                    aria-label={`Visit ${item.value} (opens in a new tab)`}
                    aria-disabled="true"
                    href={item.value}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "line-clamp-3 max-w-[300px] hover:underline",
                      textClass
                    )}
                  >
                    {item.value}
                  </a>
                )}
                {item.label === "Address" && item.value && (
                  <span
                    aria-disabled="true"
                    className={cn("line-clamp-3 max-w-[300px]", textClass)}
                  >
                    {item.value}
                  </span>
                )}
              </div>
            )
          )
        })}
      </>
    )
  }
)

AgentContacts.displayName = "AgentContacts"

export default AgentContacts
