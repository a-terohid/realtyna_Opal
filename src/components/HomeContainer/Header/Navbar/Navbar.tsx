import Link from "next/link"
import { forwardRef } from "react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/common/NavMenu"
import type { MenuItem } from "@/data/nav_links"
import { navLinks } from "@/data/nav_links"
import type { TSiteSettings } from "@/types/site-settings.type"
import { cn } from "@/utils/helpers"

interface IProps {
  siteSettings: TSiteSettings
}

const Navbar: React.FC<IProps> = ({ siteSettings }) => {
  const enabledNavLinks = navLinks.filter((link) =>
    siteSettings.menus?.main_menu?.includes(link.id)
  )

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {enabledNavLinks.map((item, index) =>
          item.type === "link" ? (
            <NavigationMenuItem key={index}>
              <Link href={item.href!} legacyBehavior passHref>
                <NavigationMenuLink
                  className={
                    "group relative flex w-max items-center justify-center px-2 text-base font-normal text-inherit outline-none transition-all after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:rounded-full after:bg-secondary-1 after:duration-150 hover:opacity-80 hover:after:w-[90%] focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:no-underline"
                  }
                >
                  {item.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ) : (
            <li key={index}>
              <NestedNavigationMenu item={item} />
            </li>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Navbar

const NestedNavigationMenu = ({ item }: { item: MenuItem }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {item.options?.map((subItem, index) =>
                subItem.type === "dropdown" ? (
                  <NestedNavigationMenu item={subItem} key={index} />
                ) : (
                  <ListItem
                    key={subItem.title}
                    title={subItem.title}
                    href={subItem.href!}
                  >
                    {subItem.description}
                  </ListItem>
                )
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.PropsWithChildren<{ className?: string; title: string; href: string }>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="flex size-full items-center justify-center">
      <Link
        ref={ref}
        legacyBehavior
        passHref
        className="flex size-full items-center justify-center"
        {...props}
      >
        <NavigationMenuLink>
          <div
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-800",
              className
            )}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug">{children}</p>
          </div>
        </NavigationMenuLink>
      </Link>
    </li>
  )
})
ListItem.displayName = "ListItem"
