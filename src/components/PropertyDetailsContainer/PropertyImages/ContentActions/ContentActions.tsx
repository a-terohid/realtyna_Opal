"use client"

import { mdiCompare, mdiSelectCompare, mdiShareVariant } from "@mdi/js"
import Icon from "@mdi/react"
import { isEqual, some } from "lodash"
import { useRouter } from "next/navigation"
import React from "react"

import { Button } from "@/components/common/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/common/Dropdown"
import useStore from "@/store/useStore"
import type { AgentValue } from "@/types/agent.type"
import type { ListingsValue } from "@/types/listings.type"

import SocialSlider from "./SocialSlider/SocialSlider"

interface IProps {
  details: ListingsValue
}

const ContentActions: React.FC<IProps> = ({ details }) => {
  const router = useRouter()

  const compareList = useStore((state) => state.compareList)
  const setCompareList = useStore((state) => state.setCompareList)

  const isExistCmp = some(compareList, (item) => isEqual(item, details))

  //=============================================================

  // Handle property to compare
  const handleCompare = () => {
    const emptyIndex = compareList.findIndex((item) => item === "empty")

    if (some(compareList, (item) => isEqual(item, details))) {
      router.push("/compare")
      return
    }

    if (emptyIndex !== -1) {
      compareList[emptyIndex] = { property: details }
      setCompareList(compareList)
    } else {
      compareList.push({ property: details })
      setCompareList(compareList)
    }
    router.push("/compare")
  }

  return (
    <div className="fixed bottom-1 right-2 z-[1001] flex flex-col items-center justify-center gap-[.625rem] lg:absolute lg:right-[-3.3rem] lg:top-0 lg:justify-start xl:right-[-4.375rem]">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            className="size-[2.875rem] shrink-0"
            gradient="neutral"
            aria-label="share property"
            size={"icon"}
          >
            <Icon path={mdiShareVariant} size={1} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-full" side="top" align="center">
          <SocialSlider />
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        gradient="neutral"
        className="size-[2.875rem] shrink-0"
        size={"icon"}
        disabled={isExistCmp}
        aria-label="compare property"
        onClick={() => handleCompare()}
      >
        {isExistCmp ? (
          <Icon size={1} path={mdiCompare} />
        ) : (
          <Icon size={1} path={mdiSelectCompare} />
        )}
      </Button>
    </div>
  )
}

export default ContentActions
