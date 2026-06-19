import { cn } from "@/utils/helpers"

interface IProps {
  label: string
  value: number | boolean | string[] | null | string | Date
  className?: string
  isDate?: boolean
  isMulti?: boolean
}

const isEmpty = (value: IProps["value"]) => {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  )
}

const DetailRow: React.FC<IProps> = ({
  label,
  value,
  isDate,
  className,
  isMulti
}) => {
  if (isEmpty(value)) return null

  const renderValue = () => {
    // Multi values (array)
    if (isMulti && Array.isArray(value)) {
      return value.join(" - ")
    }

    // Date handling
    if (isDate) {
      const date = value instanceof Date ? value : new Date(value as string)
      if (isNaN(date.getTime())) return "-"
      return Intl.DateTimeFormat("en-US").format(date)
    }

    // Boolean handling
    if (typeof value === "boolean") {
      return value ? "Yes" : "No"
    }

    // Default safe render
    return String(value)
  }

  return (
    <div
      className={cn(
        "row-span-1 flex w-full justify-between gap-2 text-sm text-black",
        className
      )}
    >
      <span className="font-normal">{label}</span>

      <span className="break-all text-end font-semibold">
        {renderValue()}
      </span>
    </div>
  )
}

export default DetailRow