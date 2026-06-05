import { Checkbox } from "@/components/common/Checkbox"
import { useQueryParams } from "@/hooks/useQueryParams"
import type { TStatusFilter } from "@/types/filter.type"

const StatusFilterContent = () => {
  const { get, set } = useQueryParams()

  return (
    <ul className="flex list-none flex-col items-start justify-center">
      {["Active", "Pending", "Sold"].map((item) => {
        const isChecked = get("status").some((i) => i === item)

        return (
          <li
            key={item}
            className="flex w-full items-center justify-start gap-2"
          >
            <Checkbox
              id={item}
              checked={isChecked}
              defaultChecked={isChecked}
              onCheckedChange={() => {
                if (isChecked) {
                  const filtered = get("status").filter((i) => i !== item)

                  set("status", filtered)
                } else {
                  set("status", [
                    ...get("status"),
                    item as TStatusFilter[number]
                  ])
                }
              }}
            />
            <label className="px-0.5 py-1" htmlFor={item}>
              {item}
            </label>
          </li>
        )
      })}
    </ul>
  )
}

export default StatusFilterContent
