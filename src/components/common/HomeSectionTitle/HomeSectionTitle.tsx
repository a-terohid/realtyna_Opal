import { cn } from "@/utils/helpers"

interface IProps {
  title: string
  borderedTitle: string
  titleClassName?: string
  borderedClassName?: string
  isWhite?: boolean
}

const HomeSectionTitle: React.FC<IProps> = ({
  title,
  borderedTitle,
  borderedClassName,
  titleClassName,
  isWhite
}) => {
  return (
    <h2
      className={cn(
        "relative mt-4 w-full text-center text-2xl font-bold capitalize md:text-3xl",
        titleClassName,
        isWhite ? "text-white" : "text-gray-19"
      )}
    >
      {title && title}
      <span
        aria-hidden="true"
        aria-disabled="true"
        className={cn(
          "absolute left-0 right-0 top-[-1rem] mx-auto w-full text-[32px] font-bold leading-[1.875rem] opacity-10 sm:text-[36px] md:text-[40px] lg:text-[46px]",
          borderedClassName,
          isWhite ? "bordered-text-white" : "bordered-text"
        )}
      >
        {borderedTitle && borderedTitle}
      </span>
    </h2>
  )
}

export default HomeSectionTitle
