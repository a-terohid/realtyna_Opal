import { cn } from "@/utils/helpers"

interface IProps {
  label: string
  value: number | boolean | string[] | null | string | Date
  className?: string
  isDate?: boolean
  isMulti?: boolean
}

const DetailRow: React.FC<IProps> = ({
  label,
  value,
  isDate,
  className,
  isMulti
}) => {
  return (
    <div
      className={cn(
        "row-span-1 gap-2 flex w-full justify-between text-sm text-black",
        className
      )}
    >
      <span className="font-normal">{label}</span>

      {isMulti && Array.isArray(value) ? (
        <p className="text-end font-semibold">
          {value.map((item: string, index: number, array: string[]) => {
            return index === array.length - 1 ? item : item + " - "
          })}
        </p>
      ) : (
        <span className="break-all text-end font-semibold">
          {isDate
            ? Intl.DateTimeFormat("en-US").format(new Date(value as Date))
            : (value as string)}
        </span>
      )}
    </div>
  )
}
DetailRow
export default DetailRow
