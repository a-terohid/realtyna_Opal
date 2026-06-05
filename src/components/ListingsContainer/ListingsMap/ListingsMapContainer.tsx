import useStore from "@/store/useStore"
import type { ListingsData } from "@/types/listings.type"
import { cn } from "@/utils/helpers"

import ListingsMapGoogle from "./ListingsMapGoogle/ListingsMapGoogle"

interface IProps {
  listingsData: ListingsData
}

const ListingsMapContainer: React.FC<IProps> = ({ listingsData }) => {
  const viewMode = useStore((state) => state.viewMode)
  const mobileView = useStore((state) => state.mobileView)

  return (
    <div
      className={cn(
        "flex w-full min-w-full items-start justify-center overflow-hidden shadow-secondary",
        viewMode === "map"
          ? mobileView === "mapOnly"
            ? `sticky top-0 max-w-full md:w-full md:min-w-[60%] md:max-w-[60%]`
            : "absolute z-[-1] rounded-bl-2xl opacity-0 md:sticky md:top-0 md:z-0 md:w-full md:min-w-[60%] md:max-w-[60%] md:opacity-100"
          : "h-[37.5rem] max-w-full"
      )}
    >
      <ListingsMapGoogle listingsData={listingsData} />
    </div>
  )
}

export default ListingsMapContainer
