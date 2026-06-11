import {
  mdiBed,
  mdiCompare,
  mdiRulerSquare,
  mdiSelectCompare,
  mdiShowerHead
} from "@mdi/js"
import Icon from "@mdi/react"
import { isEqual, some } from "lodash"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import placeholder from "@/assets/images/placeholder.png"
import type { TAgentSimple } from "@/data/agents_data"
import { agentsInfo } from "@/data/agents_data"
import useStore from "@/store/useStore"
import type { ListingsValue } from "@/types/listings.type"
import {
  cn,
  getDateSince,
  removeCommaAndWhitespaceAtStart
} from "@/utils/helpers"

import ImageWithFallback from "../ImageWithFallback"

interface IProps {
  data: ListingsValue
  variant: "map" | "grid" | "list" | "compare"
  index?: number
}

const PropertyCard: React.FC<IProps> = ({ data, variant, index }) => {
  const router = useRouter()

  const compareList = useStore((state) => state.compareList)
  const setCompareList = useStore((state) => state.setCompareList)

  useEffect(() => {
    useStore.persist.rehydrate()
  }, [])

  const agentsList = [...agentsInfo.featured, ...agentsInfo.simple]

  const agentInfo = agentsList.find(
    (agent: TAgentSimple) => agent.mlsAgentId === data.ListAgentMlsId
  )

  const agentImg = agentInfo ? agentInfo.photo : placeholder

  const isExistCmp = some(compareList, (item) => {
    if (typeof item === "string") return false
    return isEqual(item.property, data)
  })

  const handleCompare = () => {
    const emptyIndex = compareList.findIndex((item) => item === "empty")

    if (
      some(compareList, (item) => {
        if (typeof item === "string") return false
        return isEqual(item.property, data)
      })
    ) {
      router.push("/compare")
      return
    }

    if (emptyIndex !== -1) {
      compareList[emptyIndex] = { property: data }
      setCompareList(compareList)
    } else {
      compareList.push({ property: data })
      setCompareList(compareList)
    }
    router.push("/compare")
  }

  const [address, subAddress] = removeCommaAndWhitespaceAtStart(
    data.UnparsedAddress
  ).split(",", 2)

  const daysOnMarket = getDateSince(data.OriginalEntryTimestamp)

  return (
    <div
      className={cn(
        "col-span-4 flex gap-3 rounded-[.9375rem] border border-gray-2 bg-white p-[10px] shadow-search",
        variant === "grid" && "w-full flex-col sm:col-span-2 lg:col-span-1",
        variant === "list" &&
          "col-span-full flex-col sm:flex-row lg:col-span-2",
        variant === "compare" && "h-full flex-col",
        variant === "map" &&
          "flex-col sm:col-span-2 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-2"
      )}
    >
      <Link
        className={cn(
          "group/img relative flex h-full min-h-[200px] w-full items-center justify-center",
          variant === "compare" ? "h-max items-center" : "items-center",
          variant === "list" && "min-w-[50%]",
          variant === "grid" && "h-[12rem]"
        )}
        href={`/listings/${data.ListingKey}${
          address
            ? `-${(address + subAddress).replace(/\s+/g, "-").replace(/[/\\]/g, "-")}`
            : ""
        }`}
      >
        {daysOnMarket !== undefined && daysOnMarket !== null && (
          <span className="absolute left-1 top-1 z-10 select-none rounded-lg bg-white px-2 py-1 text-xs font-semibold text-gray-19">
            {daysOnMarket <= 2 || daysOnMarket === 0
              ? "New"
              : `${daysOnMarket} days on market`}
          </span>
        )}

        <span className="peer absolute inset-x-0 z-[1] mx-auto w-max rounded-full border border-gray-3 bg-gray-18/70 px-4 py-1.5 text-[15px] font-light text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover/img:opacity-100">
          View More
        </span>
        <ImageWithFallback
          priority={index === 0 || index === 1 || index === 2 || index === 3}
          src={data?.Media?.[0]?.Thumbnail ?? placeholder}
          alt={data.ListingId}
          sizes={
            variant === "grid"
              ? "(max-width: 576px) 100vw,(max-width: 1024px) 45vw, 20vw"
              : variant === "list"
                ? "(max-width: 1024px) 45vw, 20vw"
                : variant === "map"
                  ? "(max-width: 576px) 88vw,(max-width: 768px) 45vw,(max-width: 1024px) 33vw,(max-width: 1024px) 33vw, 17vw"
                  : "(max-width: 1024px) 80vw, 40vw"
          }
          fill={true}
          style={cn(
            "h-full w-full cursor-pointer shadow-primary rounded-[.75rem] object-cover duration-300 group-hover/img:opacity-30",
            data?.Media && data?.Media?.length > 0 && "shadow-primary"
          )}
        />
      </Link>
      <div
        className={cn(
          "flex h-full w-full grow flex-col items-start justify-center",
          variant === "list" &&
            "max-w-full gap-2 sm:max-w-[50%] sm:gap-3 sm:pr-3",
          variant === "grid" && "justify-between gap-2",
          variant === "map" && "justify-between gap-1",
          variant === "compare" && "flex-1 justify-between gap-1"
        )}
      >
        <span className="text-lg font-bold text-primary-1">
          {data.ListPrice &&
            data.ListPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0
            })}
        </span>
        <div className="grid gap-x-0.5 [&>span]:line-clamp-3 [&>span]:w-full">
          <span className="text-base font-semibold text-gray-16">
            {address}
          </span>
          <span className="text-sm font-medium text-gray-14 empty:hidden">
            {[data.City, data.StateOrProvince, data.PostalCode]
              .filter(Boolean)
              .join(", ")}
          </span>
        </div>
        <div
          className={cn(
            "my-2 flex justify-start gap-2 empty:hidden",
            variant === "compare" ? "flex-wrap" : "items-center"
          )}
        >
          {data.LivingArea && (
            <div className="flex items-center justify-center gap-[.3125rem]">
              <Icon
                path={mdiRulerSquare}
                size={0.88}
                className="text-sm font-normal text-secondary-1 text-opacity-[0.85]"
              />
              <span className="text-sm font-normal text-gray-17 text-opacity-[0.85]">
                {data.LivingArea
                  ? `${data.LivingArea.toLocaleString("en-US")} ${
                      data?.LivingAreaUnits ?? "Sqft"
                    }`
                  : "--"}
              </span>
            </div>
          )}
          {data.BedroomsTotal && (
            <div className="flex items-center justify-center gap-[.3125rem]">
              <Icon
                path={mdiBed}
                size={1}
                className="text-sm font-normal text-secondary-1 text-opacity-[0.85]"
              />
              <span className="text-sm font-normal text-gray-17 text-opacity-[0.85]">
                {data.BedroomsTotal}
              </span>
            </div>
          )}
          {data.BathroomsTotalInteger && (
            <div className="flex items-center justify-center gap-[.3125rem]">
              <Icon
                path={mdiShowerHead}
                size={0.9}
                className="text-sm font-normal text-secondary-1 text-opacity-[0.85]"
              />
              <span className="text-sm font-normal text-gray-17 text-opacity-[0.85]">
                {data.BathroomsTotalInteger}
              </span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "mb-0 flex w-full justify-between",
            variant === "list" ? "items-end" : "items-center"
          )}
        >
          <div
            className={cn(
              "flex flex-wrap items-center justify-start gap-[.3125rem]"
            )}
          >
            {agentImg && (
              <div className="relative flex min-h-8 min-w-8 items-center justify-center overflow-hidden">
                <Image
                  src={agentImg}
                  alt={`${data?.ListAgentFullName}_photo`}
                  fill
                  sizes="5vw"
                  className="rounded-full object-fill"
                />
              </div>
            )}
            <div className="flex flex-col items-start justify-center">
              {(data?.ListAgentFullName || data?.ListAgentFirstName) && (
                <span className="block text-xs font-normal text-gray-16">
                  {data.ListAgentFullName ||
                    data.ListAgentFirstName + " " + data.ListAgentLastName}
                </span>
              )}
            </div>
          </div>
          <div
            className={cn(
              "flex w-fit flex-row items-center justify-center gap-1"
            )}
          >
            {/*  <button
              aria-label="like"
              className="flex w-full items-center justify-center"
            >
              <Icon
                path={mdiHeartOutline}
                size={1}
                className="text-primary-1"
              />
            </button> */}
            <button
              aria-label="compare"
              className="flex w-full items-center justify-center"
              onClick={() => handleCompare()}
            >
              {isExistCmp ? (
                <Icon size={1} path={mdiCompare} className="text-secondary-1" />
              ) : (
                <Icon
                  size={1}
                  path={mdiSelectCompare}
                  className="text-secondary-1"
                />
              )}
            </button>
          </div>
        </div>
        {data.ListOfficeName && (
          <span className="mt-1.5 text-xs text-gray-12">
            {data.ListOfficeName}
          </span>
        )}
      </div>
    </div>
  )
}

export default PropertyCard
