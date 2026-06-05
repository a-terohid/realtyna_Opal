import { RadioGroup, RadioGroupItem } from "@/components/common/RadioGroup"
import { useQueryParams } from "@/hooks/useQueryParams"

const states = [
  { id: "1", name: "For Any" },
  { id: "2", name: "For Sale" },
  { id: "3", name: "For Rent" }
]

const ListingsTypeFilterContent = () => {
  const { get, set } = useQueryParams()

  return (
    <RadioGroup
      defaultValue={get("listingsType")}
      onValueChange={(e) =>
        set("listingsType", e as "For Any" | "For Sale" | "For Rent")
      }
      aria-label="change listings type"
    >
      {states.map((item) => (
        <div
          className="flex w-full items-center justify-start gap-2"
          key={Number(item.id)}
        >
          <RadioGroupItem value={item.name} id={item.id} />
          <label className="cursor-pointer select-none" htmlFor={item.id}>
            {item.name}
          </label>
        </div>
      ))}
    </RadioGroup>
  )
}

export default ListingsTypeFilterContent
