import React from "react"

import type { ListingsValue } from "@/types/listings.type"

import DetailRow from "../PropertyBasicDetails/DetailRow/DetailRow"

interface IProps {
  details: ListingsValue
}

const PropertySchoolInfo: React.FC<IProps> = ({ details }) => {
  const data = [
    {
      key: 1,
      value: details.ElementarySchool,
      title: "Elementary School",
      isMulti: false
    },
    {
      key: 2,
      value: details.ElementarySchoolDistrict,
      title: "Elementary School District",
      isMulti: false
    },
    {
      key: 3,
      value: details.HighSchool,
      title: "High School",
      isMulti: false
    },
    {
      key: 4,
      value: details.HighSchoolDistrict,
      title: "High School District",
      isMulti: false
    },
    {
      key: 5,
      value: details.MiddleOrJuniorSchool,
      title: "Middle Or Junior School",
      isMulti: false
    },
    {
      key: 6,
      value: details.MiddleOrJuniorSchoolDistrict,
      title: "Middle Or Junior School District",
      isMulti: false
    }
  ]

  const newData = data.filter((val) => {
    if (val.value && val.value !== "NONE") {
      return val
    }
  })

  return (
    <>
      {newData?.length > 0 ? (
        <section className="col-span-full flex flex-col items-start justify-center gap-[.875rem]">
          <h2 className="text-2xl font-bold text-black">
            Property School Info
          </h2>
          <div className="grid w-full grid-cols-1 gap-[25px] rounded-[.9375rem] p-[.9375rem] shadow-primary md:grid-cols-2">
            {newData.map((item) => {
              return (
                <DetailRow
                  label={item.title}
                  key={item.key}
                  value={item.value}
                  isMulti={item.isMulti}
                />
              )
            })}
          </div>
        </section>
      ) : null}
    </>
  )
}

export default PropertySchoolInfo
