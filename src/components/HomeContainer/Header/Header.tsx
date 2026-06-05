"use server"

import type { FC } from "react"

import Logo from "@/components/common/Logo/Logo"
import { getSiteSettings } from "@/services/theme/getSiteSettings"
import { cn } from "@/utils/helpers"

import MobileNavbar from "./MobileNavbar/MobileNavbar"
import Navbar from "./Navbar/Navbar"

interface IProps {
  isHomePage?: boolean
}

const Header: FC<IProps> = async ({ isHomePage }) => {
  const siteSettings = await getSiteSettings()

  return (
    <header
      id="header"
      className={cn(
        "relative z-[1001] flex w-full items-center justify-center",
        !isHomePage && "z-[1003] shadow-secondary"
      )}
    >
      <div
        className={cn(
          "box-container relative mx-auto text-white flex h-[5.625rem] w-full items-center justify-between",
          !isHomePage && "text-black"
        )}
      >
        <Logo isHomePage={isHomePage} siteSettings={siteSettings} />
        <Navbar siteSettings={siteSettings} />
        <MobileNavbar siteSettings={siteSettings} />
        {/* <Auth isHomePage={isHomePage} /> */}
      </div>
    </header>
  )
}

export default Header
