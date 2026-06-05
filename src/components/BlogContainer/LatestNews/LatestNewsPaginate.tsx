"use client"

import { mdiChevronDoubleLeft, mdiChevronDoubleRight } from "@mdi/js"
import Icon from "@mdi/react"
import { useRouter, useSearchParams } from "next/navigation"
import ReactPaginate from "react-paginate"

const LatestNewsPaginate = ({ totalPosts }: { totalPosts: number }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <ReactPaginate
      className="flex w-full flex-wrap items-center justify-center gap-1 text-primary-1/80"
      pageLinkClassName="px-3 py-1.5 max-h-[30px] flex justify-center items-center"
      breakLinkClassName="px-2 grid place-items-center"
      nextLabel={
        <Icon
          path={mdiChevronDoubleRight}
          size={1}
          className="text-primary-1"
        />
      }
      activeClassName="bg-primary-1 rounded-lg text-white"
      onPageChange={(item) => router.push(`/blog?page=${item.selected + 1}`)}
      forcePage={
        searchParams.get("page") ? parseInt(searchParams.get("page")!) - 1 : 0
      }
      pageRangeDisplayed={1}
      marginPagesDisplayed={3}
      disabledClassName="opacity-30 [&>*]:cursor-not-allowed"
      pageCount={totalPosts ? Math.ceil(totalPosts / 6) : 0}
      previousLabel={
        <Icon path={mdiChevronDoubleLeft} size={1} className="text-primary-1" />
      }
    />
  )
}

export default LatestNewsPaginate
