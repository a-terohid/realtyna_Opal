"use client"

import cn from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface IBreadcrumb {
  name: string
  href: string
}

interface IBreadcrumbProps {
  breadcrumbs: IBreadcrumb[]
}

const Breadcrumb: React.FC<IBreadcrumbProps> = ({ breadcrumbs }) => {
  const pathname = usePathname()

  const renderBreadcrumbItem = (breadcrumb: IBreadcrumb, index: number) => {
    // check if this is the last breadcrumb or the current path matches the breadcrumb URL
    const isLastItem = index === breadcrumbs.length - 1
    const isActive = isLastItem || pathname === breadcrumb.href

    return (
      <li
        key={breadcrumb.href}
        className={cn(
          "flex-wrap text-sm font-normal duration-300 sm:text-[15px]",
          isActive
            ? "text-black"
            : "whitespace-nowrap text-gray-16 hover:text-gray-21"
        )}
        aria-current={isActive ? "page" : undefined}
      >
        {isActive ? (
          <span>{breadcrumb.name}</span>
        ) : (
          <Link href={breadcrumb.href}>{breadcrumb.name} /&nbsp;</Link>
        )}
      </li>
    )
  }

  return (
    <nav
      aria-label="breadcrumb"
      className="mx-auto flex w-full items-center justify-center bg-gray-1 py-1"
    >
      <ol className="no-scrollbar flex w-full max-w-[90rem] items-start justify-start overflow-x-scroll px-3 sm:px-[25px] md:px-[40px] lg:px-[55px] xl:px-[4.375rem]">
        {breadcrumbs.map((breadcrumb, index) =>
          renderBreadcrumbItem(breadcrumb, index)
        )}
      </ol>
    </nav>
  )
}

export default Breadcrumb
