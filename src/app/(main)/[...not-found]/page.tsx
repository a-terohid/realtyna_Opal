import Image from "next/image"
import Link from "next/link"

import notFoundRectImg from "@/assets/images/404-rect.svg"
import NotFoundSvg from "@/components/common/404/404SVG"

export default function NotFound() {
  return (
    <main className="flex w-full flex-col items-center justify-center gap-14 px-3 py-40">
      <div className="relative flex w-full items-center justify-center text-secondary-1">
        <NotFoundSvg />
        <Image src={notFoundRectImg} alt="404-bg" fill />
      </div>
      <Link
        className="flex h-[45px] items-center justify-center rounded-full bg-secondary-1 px-5 text-center text-base font-medium text-white ring-2 ring-secondary-1 ring-offset-4"
        href="/"
      >
        Back To Homepage
      </Link>
    </main>
  )
}
