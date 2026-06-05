const LinePercentage = ({
  data,
  label
}: {
  data: {
    percentage: number
    votes: number
  }
  label: string
}) => {
  //Calculate the line width
  const fillWidth = (250 * data.percentage) / 100

  return (
    <div className="flex w-full items-end justify-between gap-[.3125rem]">
      <div className="flex w-full flex-col items-start justify-center gap-[.125rem]">
        <div className="flex w-full items-center justify-between">
          <span className="text-xs font-normal">{label}</span>
          <span className="text-2xs font-normal">{data.votes} Votes</span>
        </div>
        <div className="bg-primary-gradient flex h-[.625rem] w-full items-center justify-start rounded-xl shadow-primary">
          <div
            className="ml-[.125rem] h-[.375rem] rounded-xl bg-white shadow-primary"
            style={{ width: fillWidth }}
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-xs font-bold">
          {data.percentage}
          <span className="text-2xs">%</span>
        </span>
      </div>
    </div>
  )
}

export default LinePercentage
