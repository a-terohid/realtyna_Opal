import { mdiCloseCircle } from "@mdi/js"
import Icon from "@mdi/react"

import { Button } from "@/components/common/Button"
import { useQueryParams } from "@/hooks/useQueryParams"
import type { ListingsFilter } from "@/store/listingsFilterSlice"
import { initialState } from "@/store/listingsFilterSlice"
import { capitalize, compareFilters, priceFormatter } from "@/utils/helpers"

interface IProps {
  handleSearch: () => void
}

const FiltersList: React.FC<IProps> = ({ handleSearch }) => {
  const { get, set } = useQueryParams()

  const listingsFilters = {
    features: get("features"),
    listingsType: get("listingsType"),
    bedrooms: get("beds"),
    bathrooms: get("baths"),
    propertyType: get("propertyType"),
    priceRange: get("priceRange"),
    status: get("status")
  }

  const existFilters = compareFilters(initialState, listingsFilters)

  function displayObjectValues(obj: Partial<ListingsFilter>) {
    const result: {
      key: string
      nested?: {
        key: string
        value: string | boolean
      }
      value: string | boolean
    }[] = []

    Object.entries(obj).forEach(([key, value]) => {
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        displayObjectValues(value as Partial<ListingsFilter>).forEach(
          (nestedValue) => {
            if (nestedValue.value === null) return
            if (key === "features") {
              result.push({
                key,
                nested: nestedValue,
                value: `${capitalize(nestedValue.key)} : ${nestedValue.value}`
              })
            } else {
              result.push({
                key,
                nested: nestedValue,
                value: nestedValue.value
              })
            }
          }
        )
      } else if (Array.isArray(value)) {
        if (key === "priceRange") {
          if (value[0]) {
            result.push({
              key: "minPrice",
              value: `Min Price: $${priceFormatter.format(Number(value[0]))}`
            })
          }
          if (value[1]) {
            result.push({
              key: "maxPrice",
              value: `Max Price: $${priceFormatter.format(Number(value[1]))}`
            })
          }
        } else if (key === "bedrooms" || key === "bathrooms") {
          const formattedValue =
            value.length === 1
              ? value[0]
              : `${value[0]}-${value[value.length - 1]}`
          result.push({
            key: `${key}`,
            value: `${formattedValue} ${key}`
          })
        } else {
          value.forEach((val) => result.push({ key, value: val }))
        }
      } else {
        if (value === null) return
        result.push({ key, value })
      }
    })

    return result
  }

  const handleRemoveFilter = async (filter: {
    key: string
    nested?: {
      key: string
      value: string | boolean
    }
    value: string | boolean
  }) => {
    let propertyTypes

    switch (filter.key) {
      case "status":
        await set("status", ["Active"])
        handleSearch()
        break
      case "minPrice":
        await set("priceRange", ["", get("priceRange")[1]])
        handleSearch()
        break
      case "maxPrice":
        await set("priceRange", [get("priceRange")[0], ""])
        handleSearch()
        break
      case "bedrooms":
        await set("beds", null)
        handleSearch()
        break
      case "bathrooms":
        await set("baths", null)
        handleSearch()
        break
      case "listingsType":
        await set("listingsType", null)
        handleSearch()
        break
      case "propertyType":
        propertyTypes = get("propertyType")[filter.nested!.key].filter(
          (item) => item !== filter.value
        )
        await set(
          "propertyType",
          propertyTypes.length > 0
            ? { ...get("propertyType"), [filter.nested!.key]: propertyTypes }
            : null
        )
        handleSearch()
        break
      case "features":
        await set("features", {
          ...get("features"),
          [filter.nested!.key]: null
        })
        handleSearch()
        break
    }
  }

  return (
    <>
      {existFilters && displayObjectValues(existFilters).length > 0 && (
        <div className="box-container flex w-full flex-wrap items-center justify-start gap-2 py-4">
          {displayObjectValues(existFilters).map((item, index) => (
            <Button
              variant={"default"}
              gradient="neutral"
              size={"sm"}
              textSize={"sm"}
              className="cursor-default gap-1 py-0.5 pl-3 pr-1"
              key={index}
            >
              {item.value}
              <span
                className="flex items-center justify-center p-0"
                onClick={() => handleRemoveFilter(item)}
              >
                <Icon
                  size={0.75}
                  path={mdiCloseCircle}
                  className="cursor-pointer"
                />
              </span>
            </Button>
          ))}
        </div>
      )}
    </>
  )
}

export default FiltersList
