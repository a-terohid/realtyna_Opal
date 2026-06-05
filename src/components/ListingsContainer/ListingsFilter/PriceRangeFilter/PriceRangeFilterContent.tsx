import { mdiSort } from "@mdi/js"
import Icon from "@mdi/react"
import type { Dispatch, SetStateAction } from "react"
import toast from "react-hot-toast"

import type { TUrlSearchParams } from "@/components/HomeContainer/Hero/HeroFilters/HeroFilters"
import { useQueryParams } from "@/hooks/useQueryParams"

interface IProps {
  isHome?: boolean
  urlSearchParams?: TUrlSearchParams
  setUrlSearchParams?: Dispatch<SetStateAction<TUrlSearchParams>>
}

const PriceRangeFilterContent: React.FC<IProps> = ({
  setUrlSearchParams,
  urlSearchParams,
  isHome
}) => {
  const { get, set } = useQueryParams()

  function handleMinPrice(value: string) {
    if (
      get("priceRange")[1] &&
      get("priceRange")[1].length > 0 &&
      +value > +get("priceRange")[1]
    ) {
      toast.error("Max Price must be greater than Min Price")
      return
    }
    isHome && setUrlSearchParams
      ? setUrlSearchParams((prev) => ({
          ...prev,
          priceRange: [value, prev.priceRange[1]]
        }))
      : set("priceRange", [value, get("priceRange")[1]])
  }

  function handleMaxPrice(value: string) {
    isHome && setUrlSearchParams
      ? setUrlSearchParams((prev) => ({
          ...prev,
          priceRange: [prev.priceRange[0], value]
        }))
      : set("priceRange", [get("priceRange")[0], value])
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <div className="flex h-[2.1875rem] w-full items-center justify-center gap-[.375rem] rounded-full border border-black/10 px-[.625rem]">
        <Icon path={mdiSort} size={1} />
        <input
          onChange={(e) => {
            const inputValue = +e.target.value.replaceAll(",", "") // remove comma before dispatch
            if (!isNaN(inputValue)) {
              handleMinPrice(inputValue.toString())
            }
          }}
          value={
            isHome
              ? urlSearchParams &&
                urlSearchParams.priceRange &&
                urlSearchParams.priceRange[0].length > 0
                ? Number(urlSearchParams.priceRange[0]).toLocaleString()
                : ""
              : get("priceRange")[0] && get("priceRange")[0].length > 0
                ? Number(get("priceRange")[0]).toLocaleString()
                : ""
          }
          type="text"
          pattern="[0-9]+([,][0-9]{1,2})?"
          autoComplete="off"
          className="w-full bg-transparent text-[.9375rem] font-normal text-black outline-none placeholder:text-black/50"
          id="minPrice"
          placeholder="Min Price"
        />
      </div>
      <div className="flex h-[2.1875rem] w-full items-center justify-center gap-[.375rem] rounded-full border border-black/10 px-[.625rem]">
        <Icon path={mdiSort} size={1} />
        <input
          onChange={(e) => {
            const inputValue = +e.target.value.replaceAll(",", "")
            if (!isNaN(inputValue)) {
              handleMaxPrice(inputValue.toString())
            }
          }}
          value={
            isHome
              ? urlSearchParams &&
                urlSearchParams.priceRange &&
                urlSearchParams.priceRange[1].length > 0
                ? Number(urlSearchParams.priceRange[1]).toLocaleString()
                : ""
              : get("priceRange")[1] && get("priceRange")[1].length > 0
                ? Number(get("priceRange")[1]).toLocaleString()
                : ""
          }
          pattern="[0-9]+([,][0-9]{1,2})?"
          type="text"
          autoComplete="off"
          className="w-full bg-transparent text-[.9375rem] font-normal text-black outline-none placeholder:text-black/50"
          id="maxPrice"
          placeholder="Max Price"
        />
      </div>
    </div>
  )
}

export default PriceRangeFilterContent
