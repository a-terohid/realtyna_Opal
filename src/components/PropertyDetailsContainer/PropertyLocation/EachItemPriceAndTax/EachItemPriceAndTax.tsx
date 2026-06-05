import type { FC } from "react"

interface EachItemPriceAndTaxType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  text: any
  title: string
  isMulti: boolean
  isFullWidth?: boolean
}

const EachItemPriceAndTax: FC<EachItemPriceAndTaxType> = ({
  text,
  title,
  isMulti,
  isFullWidth
}) => {
  return (
    <li
      className={`flex font-[600] ${
        isFullWidth ? "w-full" : "w-full sm:w-[48%]"
      }  justify-between`}
    >
      <h4 className="flex w-1/2 items-start text-[14px] font-[600] text-[#1D1929]">
        {title}
      </h4>
      {isMulti && Array.isArray(text) ? (
        <p className="w-1/2 text-[14px] font-[400] text-[#3A3A3C]">
          {text.map((item: string, index: number, array: string[]) => {
            return index === array.length - 1 ? item : item + " , "
          })}
        </p>
      ) : (
        <p className="w-1/2 text-[14px] font-[400] text-[#3A3A3C]">{text}</p>
      )}
    </li>
  )
}

export default EachItemPriceAndTax
