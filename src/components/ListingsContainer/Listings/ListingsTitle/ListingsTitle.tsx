import { mdiHomeSwitch } from "@mdi/js"
import Icon from "@mdi/react"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import useStore from "@/store/useStore"

const ListingsTitle = () => {
  const [listingsTitle, setListingsTitle] = useState<string>("")

  const searchParams = useSearchParams()
  const params = useParams()

  //  Get contractType from search params
  const listingsType = decodeURIComponent(
    searchParams.get("listingsType") as string
  )

  const isForSale = listingsType === "For Sale"
  const isForRent = listingsType === "For Rent"

  const totalListings = useStore((state) => state.totalListings)

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const isRemoveNumbers = document.getElementsByName(
      "isRemoveNumbers"
    )[0] as HTMLMetaElement

    const titleFromDocument = document.title
      ? params.filter && isRemoveNumbers?.content === "true"
        ? document.title.split(" | ")[0].split("-")[0].replace(/\d+/g, "")
        : document.title.split(" | ")[0]
      : null
    setListingsTitle(
      titleFromDocument
        ? titleFromDocument
        : isForSale
          ? "For Sale Listings"
          : isForRent
            ? "Rental Listings"
            : "All Listings"
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingsType])

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center justify-start gap-4">
        <Icon path={mdiHomeSwitch} size={1} className="text-gray-19" />
        <span className="text-2xl font-bold text-gray-21">{listingsTitle}</span>
      </div>
      {totalListings && totalListings > 0 && (
        <span className="text-sm font-bold text-gray-21">
          Results: {totalListings}
        </span>
      )}
    </div>
  )
}

export default ListingsTitle
