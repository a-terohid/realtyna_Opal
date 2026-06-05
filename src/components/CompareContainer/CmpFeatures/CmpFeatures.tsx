import {
  mdiAirFilter,
  mdiCheck,
  mdiCountertop,
  mdiDishwasher,
  mdiElevatorPassenger,
  mdiFridge,
  mdiFridgeIndustrial,
  mdiGasBurner,
  mdiGrill,
  mdiHomePlus,
  mdiHvac,
  mdiMicrowave,
  mdiPipeValve,
  mdiStove,
  mdiToasterOven,
  mdiTumbleDryer,
  mdiWashingMachine,
  mdiWaterBoiler,
  mdiWifi
} from "@mdi/js"
import Icon from "@mdi/react"
import React from "react"

import type { TCompareList } from "@/types/compare.type"

interface IProps {
  compareList: TCompareList
}

const CmpFeatures = React.forwardRef(({ compareList }: IProps, ref) => {
  const appliancesList = [
    { name: "Barbecue", icon: mdiGrill },
    { name: "Counter Top", icon: mdiCountertop },
    { name: "Dishwasher", icon: mdiDishwasher },
    { name: "Disposal", icon: mdiPipeValve },
    { name: "Double Oven", icon: mdiToasterOven },
    { name: "Dryer", icon: mdiTumbleDryer },
    { name: "Electric Oven", icon: mdiStove },
    { name: "Elevator", icon: mdiElevatorPassenger },
    { name: "Gas Cooktop", icon: mdiGasBurner },
    { name: "Gas Water Heater", icon: mdiWaterBoiler },
    { name: "Ice Maker", icon: mdiFridgeIndustrial },
    { name: "Internet Exclusive", icon: mdiWifi },
    { name: "Microwave", icon: mdiMicrowave },
    { name: "Oven", icon: mdiToasterOven },
    { name: "Range Hood", icon: mdiAirFilter },
    { name: "Refrigerator", icon: mdiFridge },
    { name: "Vented Exhaust Fan", icon: mdiHvac },
    { name: "Washer", icon: mdiWashingMachine }
  ]

  return (
    <div className="flex w-full flex-col items-center justify-center gap-[2.1875rem]">
      <div className="flex w-full items-center justify-start gap-5">
        <div className="bg-primary-gradient flex aspect-square size-[3.75rem] items-center justify-center rounded-full text-white">
          <Icon size={1.2} path={mdiHomePlus} className="" />
        </div>
        <span className="whitespace-nowrap text-base font-bold text-black">
          Appliances & Features
        </span>
        <span className="relative w-full before:absolute before:h-px before:w-full before:bg-black/10" />
      </div>
      <div className="relative flex w-full items-center justify-center">
        <div className="flex w-1/3 flex-col items-start justify-center md:w-1/4 ">
          {appliancesList.map((item) => (
            <React.Fragment key={item.name}>
              <div className="flex h-28 w-full flex-col items-start justify-center gap-[.625rem] text-start sm:flex-row sm:items-center sm:justify-start md:h-20 ">
                <div className="flex size-10 items-center justify-center rounded-full bg-white text-gray-17 shadow-primary">
                  <Icon size={1} path={item.icon} />
                </div>
                <span className="text-sm font-normal md:text-base">
                  {item.name}
                </span>
              </div>
              <span className="relative z-10 h-px w-full bg-black/10" />
            </React.Fragment>
          ))}
        </div>
        <div
          className="flex w-full items-center justify-center overflow-hidden"
          ref={ref as React.RefObject<HTMLDivElement>}
        >
          <div className="flex size-full">
            {compareList.map((property, index) => {
              return typeof property === "string" ? (
                <div
                  className="flex-[0_0_80%] text-center sm:flex-[0_0_60%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]"
                  key={index}
                >
                  {appliancesList.map((item) => (
                    <React.Fragment key={item.name}>
                      <div className="flex h-28 items-center justify-center px-[.75rem] md:h-20"></div>
                      <span className="relative z-10 block h-px w-full bg-black/10" />
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div
                  className="flex-[0_0_80%] text-center sm:flex-[0_0_60%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]"
                  key={+property.property.ListingKey}
                >
                  {appliancesList.map((item) => (
                    <React.Fragment key={item.name}>
                      <div className="flex h-28 items-center justify-center px-[.75rem] md:h-20">
                        {Array.isArray(property.property?.Appliances)
                          ? property.property?.Appliances.includes(
                              item.name
                            ) && (
                              <Icon
                                size={1}
                                className="bg-primary-gradient rounded-full text-white"
                                path={mdiCheck}
                              />
                            )
                          : property.property?.Appliances?.split(",").includes(
                              item.name
                            ) && (
                              <Icon
                                size={1}
                                className="bg-primary-gradient rounded-full text-white"
                                path={mdiCheck}
                              />
                            )}
                      </div>
                      <span className="relative z-10 block h-px w-full bg-black/10" />
                    </React.Fragment>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
})

CmpFeatures.displayName = "CmpFeatures"

export default CmpFeatures
