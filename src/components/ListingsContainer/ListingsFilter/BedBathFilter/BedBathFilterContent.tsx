/* eslint-disable react-hooks/exhaustive-deps */
import "rc-slider/assets/index.css"

import dynamic from "next/dynamic"
import type { Dispatch, SetStateAction } from "react"

import { Checkbox } from "@/components/common/Checkbox"
import { Toggle } from "@/components/common/Toggle"
import type { TUrlSearchParams } from "@/components/HomeContainer/Hero/HeroFilters/HeroFilters"
import { useQueryParams } from "@/hooks/useQueryParams"
import { calculateNumbersInRange, cn, convertToNumber } from "@/utils/helpers"
const Slider = dynamic(() => import("rc-slider"), { ssr: false })

interface IProps {
  isHome?: boolean
  urlSearchParams?: TUrlSearchParams
  setUrlSearchParams?: Dispatch<SetStateAction<TUrlSearchParams>>
}

const marksExact = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5"
}

const marks = {
  0: "0+",
  1: "1+",
  2: "2+",
  3: "3+",
  4: "4+",
  5: "5+"
}

const BedBathFilterContent: React.FC<IProps> = ({
  isHome,
  urlSearchParams,
  setUrlSearchParams
}) => {
  const { get, set } = useQueryParams()

  const isExactBeds =
    isHome && urlSearchParams ? urlSearchParams.exactBeds : get("exactBeds")
  const isExactBaths =
    isHome && urlSearchParams ? urlSearchParams.exactBaths : get("exactBaths")

  const isAnyBeds =
    isHome && urlSearchParams ? urlSearchParams.anyBeds : get("anyBeds")
  const isAnyBaths =
    isHome && urlSearchParams ? urlSearchParams.anyBaths : get("anyBaths")

  const handleBeds = (newRangeValue: number | number[]) => {
    if (isExactBeds) {
      if (Array.isArray(newRangeValue) && newRangeValue.length > 1) {
        const numbers = calculateNumbersInRange(newRangeValue)

        isHome && setUrlSearchParams
          ? setUrlSearchParams((prev) => ({
              ...prev,
              beds: numbers
            }))
          : set("beds", numbers)
      } else {
        isHome && setUrlSearchParams
          ? setUrlSearchParams((prev) => ({
              ...prev,
              beds: [newRangeValue.toString()]
            }))
          : set("beds", [newRangeValue.toString()])
      }
    } else {
      isHome && setUrlSearchParams
        ? setUrlSearchParams((prev) => ({
            ...prev,
            beds: [newRangeValue.toString() + "+"]
          }))
        : set("beds", [newRangeValue.toString() + "+"])
    }
  }

  const handleBaths = (newRangeValue: number | number[]) => {
    if (isExactBaths) {
      if (Array.isArray(newRangeValue) && newRangeValue.length > 1) {
        const numbers = calculateNumbersInRange(newRangeValue)

        isHome && setUrlSearchParams
          ? setUrlSearchParams((prev) => ({
              ...prev,
              baths: numbers
            }))
          : set("baths", numbers)
      } else {
        isHome && setUrlSearchParams
          ? setUrlSearchParams((prev) => ({
              ...prev,
              baths: [newRangeValue.toString()]
            }))
          : set("baths", [newRangeValue.toString()])
      }
    } else {
      isHome && setUrlSearchParams
        ? setUrlSearchParams((prev) => ({
            ...prev,
            baths: [newRangeValue.toString() + "+"]
          }))
        : set("baths", [newRangeValue.toString() + "+"])
    }
  }

  function onChangeAnyBedrooms(e: boolean) {
    if (e) {
      if (isHome && setUrlSearchParams) {
        setUrlSearchParams((prev) => ({ ...prev, beds: ["Any"], anyBeds: e }))
      } else {
        set("beds", ["Any"])
        set("anyBeds", e)
      }
    } else {
      if (isExactBeds) {
        if (isHome && setUrlSearchParams) {
          setUrlSearchParams((prev) => ({
            ...prev,
            beds: ["0", "0"],
            anyBeds: e
          }))
        } else {
          set("beds", ["0", "0"])
          set("anyBeds", e)
        }
      } else {
        if (isHome && setUrlSearchParams) {
          setUrlSearchParams((prev) => ({
            ...prev,
            beds: ["0+"],
            anyBeds: e
          }))
        } else {
          set("beds", ["0+"])
          set("anyBeds", e)
        }
      }
    }
  }

  function onChangeAnyBathrooms(e: boolean) {
    if (e) {
      if (isHome && setUrlSearchParams) {
        setUrlSearchParams((prev) => ({
          ...prev,
          baths: ["Any"],
          anyBaths: e
        }))
      } else {
        set("anyBaths", e)
        set("baths", ["Any"])
      }
    } else {
      if (isExactBaths) {
        if (isHome && setUrlSearchParams) {
          setUrlSearchParams((prev) => ({
            ...prev,
            baths: ["0", "0"],
            anyBaths: e
          }))
        } else {
          set("baths", ["0", "0"])
          set("anyBaths", e)
        }
      } else {
        if (isHome && setUrlSearchParams) {
          setUrlSearchParams((prev) => ({
            ...prev,
            baths: ["0+"],
            anyBaths: e
          }))
        } else {
          set("baths", ["0+"])
          set("anyBaths", e)
        }
      }
    }
  }

  function onExactChangeBedrooms(e: boolean) {
    if (e) {
      if (isHome && setUrlSearchParams) {
        setUrlSearchParams((prev) => ({
          ...prev,
          beds: ["0", "0"],
          exactBeds: e
        }))
      } else {
        set("beds", ["0", "0"])
        set("exactBeds", e as boolean)
      }
    } else {
      if (isHome && setUrlSearchParams) {
        setUrlSearchParams((prev) => ({
          ...prev,
          beds: ["0+"],
          exactBeds: e
        }))
      } else {
        set("beds", ["0+"])
        set("exactBeds", e as boolean)
      }
    }
  }

  function onExactChangeBathrooms(e: boolean) {
    if (e) {
      if (isHome && setUrlSearchParams) {
        setUrlSearchParams((prev) => ({
          ...prev,
          baths: ["0", "0"],
          exactBaths: e
        }))
      } else {
        set("baths", ["0", "0"])
        set("exactBaths", e as boolean)
      }
    } else {
      if (isHome && setUrlSearchParams) {
        setUrlSearchParams((prev) => ({
          ...prev,
          baths: ["0+"],
          exactBaths: e
        }))
      } else {
        set("baths", ["0+"])
        set("exactBaths", e as boolean)
      }
    }
  }

  return (
    <div className="grid w-full gap-3">
      <div id="beds" className="grid w-full gap-3 border-b border-gray-2 pb-3">
        <span className="w-[13.75rem] text-base font-medium text-gray-21">
          Bedrooms
        </span>
        <div className="flex w-full items-center justify-start gap-3">
          <Toggle
            className={
              isHome
                ? "data-[state=on]:bg-secondary-gradient"
                : "data-[state=on]:bg-primary-gradient"
            }
            defaultPressed={
              isHome
                ? urlSearchParams?.beds?.includes("Any")
                : get("beds").includes("Any")
            }
            onPressedChange={(e) => onChangeAnyBedrooms(e)}
            size={"sm"}
          >
            Any
          </Toggle>
          {isExactBeds ? (
            <Slider
              className="relative flex items-center [&>div>span]:border-gray-3"
              trackStyle={{ backgroundColor: "gray" }}
              handleStyle={{
                width: ".75rem",
                height: ".75rem",
                background: "white",
                opacity: 1,
                borderColor: "gray",
                padding: 0,
                margin: 0
              }}
              railStyle={{
                height: ".3125rem",
                borderColor: "red"
              }}
              min={0}
              disabled={isAnyBeds}
              max={5}
              value={convertToNumber(
                isHome && urlSearchParams?.beds
                  ? urlSearchParams?.beds
                  : get("beds")
              )}
              marks={marksExact}
              range
              dots
              defaultValue={[0, 0]}
              onChange={(value) => handleBeds(value)}
              allowCross={false}
            />
          ) : (
            <Slider
              className="relative flex items-center [&>div>span]:border-gray-3"
              trackStyle={{ backgroundColor: "gray" }}
              handleStyle={{
                width: ".75rem",
                height: ".75rem",
                background: "white",
                opacity: 1,
                borderColor: "gray",
                padding: 0,
                margin: 0
              }}
              railStyle={{
                height: ".3125rem",
                borderColor: "red"
              }}
              disabled={isAnyBeds}
              min={0}
              value={convertToNumber(
                isHome && urlSearchParams?.beds
                  ? urlSearchParams?.beds
                  : get("beds")
              )}
              marks={marks}
              max={5}
              step={1}
              dots
              defaultValue={[0]}
              onChange={(value) => handleBeds(value)}
            />
          )}
        </div>

        <div className="mt-2 flex items-center justify-start gap-1">
          <Checkbox
            className={
              isHome
                ? "data-[state=checked]:bg-secondary-gradient"
                : "data-[state=checked]:bg-primary-gradient"
            }
            defaultChecked={isExactBeds}
            disabled={isAnyBeds}
            onCheckedChange={onExactChangeBedrooms}
            id="exact_beds"
          />
          <label
            className={cn(get("beds").includes("Any") && "opacity-30")}
            htmlFor="exact_beds"
          >
            Exact
          </label>
        </div>
      </div>
      <div className="grid w-full gap-3 pb-3">
        <span className="text-base font-medium text-gray-21">Bathrooms</span>
        <div className="flex w-full items-center justify-start gap-3">
          <Toggle
            className={
              isHome
                ? "data-[state=on]:bg-secondary-gradient"
                : "data-[state=on]:bg-primary-gradient"
            }
            defaultPressed={
              isHome
                ? urlSearchParams?.baths?.includes("Any")
                : get("baths").includes("Any")
            }
            onPressedChange={(e) => onChangeAnyBathrooms(e)}
            size={"sm"}
          >
            Any
          </Toggle>
          {isExactBaths ? (
            <Slider
              className="relative flex items-center [&>div>span]:border-gray-3"
              trackStyle={{ backgroundColor: "gray" }}
              handleStyle={{
                width: ".75rem",
                height: ".75rem",
                background: "white",
                opacity: 1,
                borderColor: "gray",
                padding: 0,
                margin: 0
              }}
              railStyle={{
                height: ".3125rem",
                borderColor: "red"
              }}
              disabled={isAnyBaths}
              min={0}
              max={5}
              value={convertToNumber(
                isHome && urlSearchParams?.baths
                  ? urlSearchParams?.baths
                  : get("baths")
              )}
              marks={marksExact}
              range
              dots
              step={1}
              defaultValue={[0, 0]}
              onChange={(value) => handleBaths(value)}
              allowCross={false}
            />
          ) : (
            <Slider
              className="relative flex items-center [&>div>span]:border-gray-3"
              trackStyle={{ backgroundColor: "gray" }}
              handleStyle={{
                width: ".75rem",
                height: ".75rem",
                background: "white",
                opacity: 1,
                borderColor: "gray",
                padding: 0,
                margin: 0
              }}
              railStyle={{
                height: ".3125rem",
                borderColor: "red"
              }}
              disabled={isAnyBaths}
              min={0}
              value={convertToNumber(
                isHome && urlSearchParams?.baths
                  ? urlSearchParams?.baths
                  : get("baths")
              )}
              marks={marks}
              max={5}
              step={1}
              dots
              defaultValue={[0]}
              onChange={(value) => handleBaths(value)}
            />
          )}
        </div>
        <div className="mt-2 flex items-center justify-start gap-1">
          <Checkbox
            className={
              isHome
                ? "data-[state=checked]:bg-secondary-gradient"
                : "data-[state=checked]:bg-primary-gradient"
            }
            defaultChecked={isExactBaths}
            disabled={isAnyBaths}
            onCheckedChange={onExactChangeBathrooms}
            id="exact_baths"
          />
          <label
            className={cn(get("baths").includes("Any") && "opacity-30")}
            htmlFor="exact_baths"
          >
            Exact
          </label>
        </div>
      </div>
    </div>
  )
}

export default BedBathFilterContent
