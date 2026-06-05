import Link from "next/link"

const BlogResearch = () => {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-[10px] rounded-[15px] p-3 shadow-primary">
      <div className="flex w-full items-center justify-center gap-2">
        <span className="whitespace-nowrap text-lg font-bold text-black">
          Blog Research
        </span>
        <span className='flex w-full items-center justify-center after:block after:h-px after:w-full after:bg-black after:opacity-30 after:content-[""]' />
      </div>
      <ul className="grid w-full list-inside list-disc grid-cols-1 items-start justify-items-start gap-1 text-[15px] font-normal text-gray-20 marker:text-gray-17">
        <li className="">
          <Link href={"/#"}>Buyers/Sellers</Link>
        </li>
        <li>
          <Link href={"/#"}>Renters</Link>
        </li>
        <li>
          <Link href={"/#"}>Policy/Politics</Link>
        </li>
        <li>
          <Link href={"/#"}>Fair Housing</Link>
        </li>
        <li>
          <Link href={"/#"}>Presentations</Link>
        </li>
        <li>
          <Link href={"/#"}>Market Reports</Link>
        </li>
        <li>
          <Link href={"/#"}>Exclusives</Link>
        </li>
      </ul>
    </div>
  )
}

export default BlogResearch
