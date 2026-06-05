import { mdiMagnify } from "@mdi/js"
import Icon from "@mdi/react"

const BlogSearch = () => {
  return (
    <div className="bg-primary-gradient relative flex w-full items-center justify-center rounded-full p-2 ">
      <div className="flex w-full items-center justify-center gap-2 rounded-full bg-white">
        <input
          type="search"
          className="h-7 w-full rounded-full border-none pl-3 outline-none"
          placeholder={`Research...`}
        />
        <Icon path={mdiMagnify} size={1} className="mr-3 text-gray-16" />
      </div>
    </div>
  )
}

export default BlogSearch
