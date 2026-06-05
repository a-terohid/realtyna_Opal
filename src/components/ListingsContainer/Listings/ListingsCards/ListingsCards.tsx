"use client"

import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { Fragment, useEffect, useRef, useState } from "react"

import { Button } from "@/components/common/Button"
import PropertyCard from "@/components/common/PropertyCard/PropertyCard"
import { getListingsData } from "@/services/listings/getListings"
import useStore from "@/store/useStore"
import type { ListingsData } from "@/types/listings.type"
import { cn } from "@/utils/helpers"

interface IProps {
  listingsData: ListingsData
}

const ListingsCards: React.FC<IProps> = ({ listingsData }) => {
  const [initialListings, setInitialListings] = useState(listingsData)

  useEffect(() => {
    console.log('ListingsCards received data:', {
      count: listingsData?.['@odata.count'],
      valueLength: listingsData?.value?.length,
      hasValue: !!listingsData?.value
    })
    setInitialListings(listingsData)
  }, [listingsData])

  const gridRef = useRef<HTMLDivElement>(null)
  const viewMode = useStore((state) => state.viewMode)

  /**
  |--------------------------------------------------
  | Trigger when query params change and pass data to useInfiniteQuery
  |--------------------------------------------------
  */

  const { isFetching, isLoading, isRefetching } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["latlang"],
    enabled: false
  })

  /**
  |--------------------------------------------------
  | Infinite query
  |--------------------------------------------------
  */

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["listingsData"],
    queryFn: async ({ pageParam = listingsData["@odata.nextLink"] }) => await getListingsData({ url: pageParam }),
    initialPageParams: undefined,
    //@ts-expect-error ts(2322)
    getNextPageParam: (lastPage) => {
      const nextLink = lastPage["@odata.nextLink"]
      return nextLink
    },
    enabled: false,
    gcTime: 0,
    staleTime: 0,
    initialData: () => {
      return {
        pageParams: [undefined],
        pages: [initialListings]
      }
    }
  })

  return (
    <div className="flex flex-col items-center justify-start gap-[1.6875rem]">
      <div
        ref={gridRef}
        className={cn(
          "grid w-full grid-cols-4 gap-[0.75rem]",
          (isFetchingNextPage || isFetching || isLoading || isRefetching) && "animate-pulse"
        )}
      >
        {data?.pages[0].value && data?.pages?.[0].value.length > 0 ? (
          data?.pages?.map((pageData, index: number) => (
            <Fragment key={index}>
              {pageData.value.map((item, index: number) => (
                <PropertyCard index={index} variant={viewMode} key={item.ListingKey} data={item} />
              ))}
            </Fragment>
          ))
        ) : (
          <span className="col-span-full text-center text-base font-semibold text-red-500 md:text-lg">
            No Listing found!
            <br /> Change filters and try again!
          </span>
        )}
      </div>
      {hasNextPage && (
        <Button
          className="ring-2 ring-secondary-1 ring-offset-2"
          gradient="secondary"
          size={"sm"}
          textSize={"sm"}
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? "Loading more..." : "Show More"}
        </Button>
      )}
    </div>
  )
}

export default ListingsCards
