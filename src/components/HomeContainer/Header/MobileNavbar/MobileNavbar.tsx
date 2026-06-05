"use client"

import { mdiMenu } from "@mdi/js"
import Icon from "@mdi/react"
import Link from "next/link"
import type { Dispatch, SetStateAction } from "react"
import { useState } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/common/Accordion"
import Logo from "@/components/common/Logo/Logo"
import { Sheet, SheetContent, SheetTrigger } from "@/components/common/Sheet"
import type { MenuItem } from "@/data/nav_links"
import { navLinks } from "@/data/nav_links"
import type { TSiteSettings } from "@/types/site-settings.type"

interface IProps {
  siteSettings: TSiteSettings
}

const MobileNavbar: React.FC<IProps> = ({ siteSettings }) => {
  const [value, setValue] = useState(["item-1"])
  const [isOpen, setIsOpen] = useState(false)

  const enabledNavLinks = navLinks.filter((link) =>
    siteSettings.menus.main_menu?.includes(link.id)
  )

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger aria-label="mobile nav" className="flex md:hidden">
        <Icon path={mdiMenu} size={1.4} />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="flex flex-col items-start justify-self-start pb-4"
      >
        <Logo siteSettings={siteSettings} isHomePage={false} />
        <nav className="flex size-full flex-col items-center justify-between gap-2">
          <div className="flex w-full flex-col items-center justify-start gap-2">
            {enabledNavLinks &&
              enabledNavLinks.map((item) =>
                item.type === "dropdown" ? (
                  <NestedAccordion
                    key={item.title}
                    items={[item]}
                    value={value}
                    onValueChange={setValue}
                    setIsOpen={setIsOpen}
                  />
                ) : (
                  <Link
                    className="w-full py-2 text-start text-base font-medium text-gray-21 duration-200 hover:opacity-80"
                    key={item.title}
                    href={item.href!}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                )
              )}
          </div>
          {/*  <Auth isHomePage={false} isMobile={true} /> */}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavbar

const NestedAccordion = ({
  items,
  value,
  onValueChange,
  setIsOpen,
  level = 0
}: {
  items: MenuItem[]
  value: string[]
  onValueChange: React.Dispatch<React.SetStateAction<string[]>>
  level?: number
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <Accordion
      type="multiple"
      value={value}
      onValueChange={onValueChange}
      className="flex w-full flex-col items-center justify-start gap-2 bg-transparent"
    >
      {items.map((item) => {
        return item.type === "dropdown" ? (
          <AccordionItem
            /* style={{ paddingLeft }} */
            key={item.title}
            value={item.title}
            className="w-full rounded-2xl"
          >
            <AccordionTrigger className="w-full items-center justify-between py-2 text-center text-sm font-medium text-gray-21 no-underline">
              {item.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="border-l-4 border-gray-21 pl-2">
                {item.type === "dropdown" ? (
                  <NestedAccordion
                    items={item.options!}
                    value={value}
                    setIsOpen={setIsOpen}
                    onValueChange={onValueChange}
                    level={level + 1}
                  />
                ) : (
                  <Link
                    onClick={() => setIsOpen(false)}
                    className="flex w-full py-2 text-center text-sm font-medium text-gray-21"
                    key={item.title}
                    href={item.href!}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ) : (
          <Link
            className="flex w-full py-2 text-center text-sm font-medium text-gray-21"
            key={item.title}
            onClick={() => setIsOpen(false)}
            href={item.href!}
          >
            {item.title}
          </Link>
        )
      })}
    </Accordion>
  )
}
