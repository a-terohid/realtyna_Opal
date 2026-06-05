const FooterTag = ({ tag }: { tag: string }) => {
  return (
    <div className="flex h-10 w-fit items-center justify-center whitespace-nowrap rounded-[11.1875rem] border-[.0375rem] border-gray-7/85 bg-gray-2/10 p-[.625rem] shadow-primary">
      <span className="text-sm font-normal capitalize text-gray-1 text-opacity-[0.85]">
        {tag}
      </span>
    </div>
  )
}

export default FooterTag
