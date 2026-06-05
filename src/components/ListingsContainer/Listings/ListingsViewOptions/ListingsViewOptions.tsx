import { mdiMap, mdiViewGrid, mdiViewList } from "@mdi/js"
import Icon from "@mdi/react"

import { Button } from "@/components/common/Button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/common/Select"
import { useInvalidateQueries } from "@/hooks/useInvalidateQueries"
import { useQueryParams } from "@/hooks/useQueryParams"
import useStore from "@/store/useStore"

const orderList = [
  { label: "Latest", value: "OriginalEntryTimestamp desc" },
  { label: "Highest Price", value: "ListPrice desc" },
  { label: "Lowest Price", value: "ListPrice asc" },
  { label: "Lot Size", value: "LotSizeArea desc" },
  { label: "Living Area ", value: "LivingArea desc" }
]

const ListingsViewOptions = () => {
  const { get, set } = useQueryParams()
  const invalidateQueries = useInvalidateQueries()

  const viewMode = useStore((state) => state.viewMode)
  const setViewMode = useStore((state) => state.setViewMode)
  const setMobileView = useStore((state) => state.setMobileView)

  // handle sort method
  const handleSortBy = async (value: string) => {
    const selected = orderList.find((item) => item.value === value)
    set(
      "sortBy",
      selected ? selected.value : "OriginalEntryTimestamp desc"
    ).then((res) => {
      invalidateQueries(res)
    })
  }

  return (
    <div className="flex w-full flex-wrap-reverse items-center justify-between gap-3">
      <div className="flex items-center justify-center gap-2">
        <span className="shrink-0 text-sm font-normal">Sort By</span>
        <Select
          defaultValue={get("sortBy")}
          value={get("sortBy")}
          onValueChange={handleSortBy}
        >
          <SelectTrigger
            aria-label="change order"
            className="border-none p-0 font-semibold shadow-none"
          >
            <SelectValue placeholder="Sort By ..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {orderList.map((item) => {
                return (
                  <SelectItem key={item.label} value={item.value}>
                    {item.label}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-center gap-[.3125rem]">
        <Button
          gradient={viewMode === "map" ? "secondary" : "primary"}
          onClick={() => {
            setViewMode("map")
            setMobileView("mapOnly")
          }}
          aria-label="map view"
          size={"icon"}
        >
          <Icon path={mdiMap} size={0.8} />
        </Button>

        <div className="flex items-center justify-center gap-[.3125rem]">
          <Button
            gradient={viewMode === "list" ? "secondary" : "primary"}
            onClick={() => {
              setViewMode("list")
              setMobileView("none")
            }}
            aria-label="list view"
            size={"icon"}
          >
            <Icon path={mdiViewList} size={0.8} />
          </Button>
          <Button
            gradient={viewMode === "grid" ? "secondary" : "primary"}
            onClick={() => {
              setViewMode("grid")
              setMobileView("none")
            }}
            aria-label="grid view"
            size={"icon"}
          >
            <Icon path={mdiViewGrid} size={0.8} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ListingsViewOptions
