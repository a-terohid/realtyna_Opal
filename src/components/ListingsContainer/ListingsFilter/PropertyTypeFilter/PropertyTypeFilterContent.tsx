import type { Dispatch, SetStateAction } from "react"

import { Checkbox } from "@/components/common/Checkbox"
import { RadioGroup } from "@/components/common/RadioGroup"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/common/Tabs"
import type { TUrlSearchParams } from "@/components/HomeContainer/Hero/HeroFilters/HeroFilters"
import type { TPropertyType } from "@/data/prop_type"
import {
  propertyTypesCommercialData,
  propertyTypesResidentialData
} from "@/data/prop_type"
import { useQueryParams } from "@/hooks/useQueryParams"

const propertyOptions = {
  Residential: propertyTypesResidentialData.map(
    (obj: TPropertyType) => obj.name
  ),
  Commercial: propertyTypesCommercialData.map((obj: TPropertyType) => obj.name)
}

interface IProps {
  isHome?: boolean
  urlSearchParams?: TUrlSearchParams
  setUrlSearchParams?: Dispatch<SetStateAction<TUrlSearchParams>>
}

const PropertyTypeFilterContent: React.FC<IProps> = ({
  isHome,
  urlSearchParams,
  setUrlSearchParams
}) => {
  const { get, set } = useQueryParams()

  const handleCheckboxChange = (
    tab: "Residential" | "Commercial",
    option: string
  ) => {
    const newSelected =
      isHome && urlSearchParams
        ? { ...urlSearchParams.propertyType }
        : { ...get("propertyType") }
    if (!newSelected[tab].includes(option)) {
      newSelected[tab] = [...newSelected[tab], option]
    } else {
      newSelected[tab] = newSelected[tab].filter((item) => item !== option)
    }
    isHome && setUrlSearchParams
      ? setUrlSearchParams((prev) => ({ ...prev, propertyType: newSelected }))
      : set("propertyType", newSelected)
  }

  return (
    <Tabs defaultValue="residential">
      <TabsList aria-label="Select Property Type">
        <TabsTrigger
          className={
            isHome
              ? "data-[state=active]:bg-secondary-gradient"
              : "data-[state=active]:bg-primary-gradient"
          }
          value="residential"
        >
          Residential
        </TabsTrigger>
        <TabsTrigger
          className={
            isHome
              ? "data-[state=active]:bg-secondary-gradient"
              : "data-[state=active]:bg-primary-gradient"
          }
          value="commercial"
        >
          Commercial
        </TabsTrigger>
      </TabsList>
      <TabsContent value="residential">
        <RadioGroup
          defaultValue="default"
          aria-label="View residential type"
          className="flex w-full flex-col items-start justify-center gap-3"
        >
          {propertyOptions["Residential"].map((item) => (
            <div
              key={item}
              className="flex w-full items-center justify-start gap-2"
            >
              <Checkbox
                className={
                  isHome
                    ? "data-[state=checked]:bg-secondary-gradient"
                    : "data-[state=checked]:bg-primary-gradient"
                }
                id={item}
                checked={
                  isHome && urlSearchParams
                    ? urlSearchParams.propertyType["Residential"].includes(item)
                    : get("propertyType")["Residential"].includes(item)
                }
                onCheckedChange={() =>
                  handleCheckboxChange("Residential", item)
                }
              />
              <label className="cursor-pointer select-none" htmlFor={item}>
                {item}
              </label>
            </div>
          ))}
        </RadioGroup>
      </TabsContent>
      <TabsContent value="commercial">
        <RadioGroup
          defaultValue="default"
          aria-label="View commercial type"
          className="flex w-full flex-col items-start justify-center gap-3"
        >
          {propertyOptions["Commercial"].map((item) => (
            <div
              key={item}
              className="flex w-full items-center justify-start gap-2"
            >
              <Checkbox
                className={
                  isHome
                    ? "data-[state=checked]:bg-secondary-gradient"
                    : "data-[state=checked]:bg-primary-gradient"
                }
                id={item}
                checked={
                  isHome && urlSearchParams
                    ? urlSearchParams.propertyType["Commercial"].includes(item)
                    : get("propertyType")["Commercial"].includes(item)
                }
                onCheckedChange={() => handleCheckboxChange("Commercial", item)}
              />
              <label className="cursor-pointer select-none" htmlFor={item}>
                {item}
              </label>
            </div>
          ))}
        </RadioGroup>
      </TabsContent>
    </Tabs>
  )
}

export default PropertyTypeFilterContent
