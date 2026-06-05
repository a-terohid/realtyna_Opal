/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { mdiChevronLeft, mdiChevronRight } from "@mdi/js"
import Icon from "@mdi/react"

/* import { DayPicker } from "react-day-picker" */
import { cn } from "@/utils/helpers"

/* export type CalendarProps = React.ComponentProps<typeof DayPicker> */

function Calendar(
  {
    className,
    classNames,
    showOutsideDays = true,
    ...props
  }: any /* CalendarProps */
) {
  return {
    /* <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        day_range_end: "day-range-end",
        day_selected:
          "bg-gray-200 text-primary-1 hover:bg-gray-300 hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-gray-100 aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <Icon path={mdiChevronLeft} size={1} className="size-4" />
        ),
        IconRight: ({ ...props }) => (
          <Icon path={mdiChevronRight} size={1} className="size-4" />
        )
      }}
      {...props}
    /> */
  }
}
Calendar.displayName = "Calendar"

export { Calendar }
