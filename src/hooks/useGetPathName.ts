import { usePathname } from "next/navigation"

type TPathNameType = "state" | "city" | "neighborhood" | "listings"

type TPathName = {
  type?: TPathNameType
  state?: string
  city?: string
  neighborhood?: string
}

export const useGetPathName = (): TPathName => {
  const pathname = usePathname()
  const pathItems = pathname.split("/").filter(Boolean)
  const params: TPathName = {}
  for (let i = 0; i < pathItems.length; i++) {
    const key =
      i === 0
        ? "type"
        : i === 1
          ? "state"
          : i === 2
            ? "city"
            : i === 3
              ? "neighborhood"
              : String(i)
    params[key as keyof TPathName] = pathItems[i] as TPathNameType
  }

  return params
}
