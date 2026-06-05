import { useSearchParams } from "next/navigation"
import type { ParsedUrlQuery } from "querystring"

export const useSubscribedSearchParams = (): ParsedUrlQuery => {
  const _searchParams = useSearchParams()

  return Object.fromEntries(_searchParams.entries()) as ParsedUrlQuery
}
