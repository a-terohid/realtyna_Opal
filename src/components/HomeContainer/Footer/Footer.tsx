import Image from "next/image"
import Link from "next/link"

import footerBg from "@/assets/images/footer-map.webp"
import Logo from "@/components/common/Logo/Logo"
import { cityListData } from "@/data/home_city_data"
import { navLinks } from "@/data/nav_links"
import type { TSiteSettings } from "@/types/site-settings.type"

import FooterTag from "./FooterTag/FooterTag"

const tags = [
  "Renters",
  "Buyers/Sellers",
  "Housing Guide",
  "Fair Housing",
  "Market Report",
  "Chief Economist"
]

interface IProps {
  siteSettings: TSiteSettings
}

const Footer: React.FC<IProps> = async ({ siteSettings }) => {
  const enabledNavLinks = navLinks.filter((link) =>
    siteSettings.menus?.main_menu?.includes(link.id)
  )

  const footer_links = [
    {
      label: "Navigation",
      links: enabledNavLinks
    },
    {
      label: "Userful Links",
      links: [
        { label: "Terms", href: "/#" },
        { label: "Privacy Policy", href: "/#" },
        { label: "Compliance", href: "/#" },
        { label: "Shop", href: "/#" }
      ]
    },
    {
      label: "Popular Cities",
      links: cityListData
        .flat()
        .slice(0, 5)
        .map((city) => ({
          label: city.title,
          href: city.neighborhood
            ? `/neighborhood/${city.state}/${city.city.replace(/ /g, "-")}/${city.neighborhood.replace(/ /g, "-")}?viewport=${JSON.stringify(city.viewport)}`
            : `/city/${city.state}/${city.city.replace(/ /g, "-")}?viewport=${JSON.stringify(city.viewport)}`
        }))
    }
  ]

  return (
    <footer className="box-container mx-auto">
      <div className="relative flex w-full flex-col items-center justify-center gap-[55px] overflow-hidden rounded-t-[35px] bg-primary-1 px-20 pb-[15px] pt-[30px] xl:pt-[65px]">
        <Image
          src={footerBg}
          alt="footer_bg"
          className="absolute size-full object-cover"
        />
        <div className="relative z-[1] flex w-full flex-col items-center justify-center gap-5 xl:flex-row xl:gap-16">
          <Logo isHomePage={true} siteSettings={siteSettings} />
          <div className="grid items-start justify-center gap-8 text-white sm:grid-cols-2 md:grid-cols-3 lg:gap-16">
            {footer_links.map((col) => (
              <div
                key={col.label}
                className="col-span-1 flex flex-col justify-center gap-[.625rem] text-center lg:items-start"
              >
                <h3 className="text-base lg:text-lg">{col.label}</h3>
                <nav className="flex flex-col items-center justify-center gap-[.625rem] text-center text-[15px] opacity-85 lg:items-start lg:text-start lg:text-base">
                  {col.links.map((link, index) => (
                    <Link
                      className="w-full transition-colors duration-200 hover:text-gray-2"
                      key={index}
                      href={`${link.href}`}
                    >
                      {"label" in link ? link.label : link.title}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
          <div className="flex max-w-[250px] flex-wrap items-center justify-center gap-[.2188rem]">
            {tags.map((tag, index) => (
              <FooterTag key={index} tag={tag} />
            ))}
          </div>
        </div>
        <span className="self-center text-center text-[15px] font-normal text-white opacity-85">
          Copyright OpalRealtyna © 2024 {siteSettings.site_identity.siteName}{" "}
          Inc. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
export default Footer
