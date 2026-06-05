/* eslint-disable no-inner-declarations */
import { useQuery } from "@tanstack/react-query"
import Highcharts from "highcharts"
import sunburst from "highcharts/modules/sunburst"
import HighchartsReact from "highcharts-react-official"
import { useState } from "react"

import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { getDemographic } from "@/services/listings/getDemographic"
import type { ListingsValue } from "@/types/listings.type"
import { cn } from "@/utils/helpers"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../common/Select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../common/Tabs"
import DemographicIcon from "./DemographicIcon/DemographicIcon"

interface IProps {
  className?: string
  listings: ListingsValue[]
}

type TabList = {
  tabName: string
  mainEndpoint: string
  subEndpoint: {
    [key: string]: {
      value: string
    }
  }
}

const tabList: TabList[] = [
  {
    tabName: "Population",
    mainEndpoint: "population-and-people",
    subEndpoint: {
      "Age & Sex": {
        value: "age-and-sex"
      },
      Ancestry: {
        value: "selected-social-characteristics/ancestry"
      },
      "Language Spoken at Home": {
        value: "selected-social-characteristics/language-spoken-at-home"
      },
      "US Citizenship Status": {
        value: "selected-social-characteristics/us-citizenship-status"
      },
      "Residential Mobility": {
        value: "residential-mobility"
      },
      "Population 1 Year and Over": {
        value: "residential-mobility/population-1-year-over"
      },
      "Veteran Status": {
        value: "veteran"
      }
    }
  },
  {
    tabName: "Income & Poverty",
    mainEndpoint: "income-and-poverty",
    subEndpoint: {
      "Income in the Past 12 Months": {
        value: "income-in-the-past-12-month"
      },
      "Median Income": {
        value: "income-in-the-past-12-month/median-income"
      },
      // Todo : need to check
      /* "Poverty Status in the Past 12 Months": {
        value: "poverty-status-in-the-past-12-month"
      }, */
      "Poverty by Age": {
        value: "poverty-status-in-the-past-12-month/age"
      }
    }
  },
  {
    tabName: "Education",
    mainEndpoint: "education",
    subEndpoint: {
      "Educational Attainment": {
        value: "educational-attainment"
      },
      "Attainment 25 Years and Older": {
        value: "educational-attainment/25-years-and-older"
      },
      "School Enrollment": {
        value: "school-enrollment"
      },
      "Enrollment 3 Years and Older": {
        value: "school-enrollment/population-3-years-and-older"
      }
    }
  },
  {
    tabName: "Employment",
    mainEndpoint: "employment",
    subEndpoint: {
      "Occupation by Class of Worker": {
        value: "occupation-by-class-of-worker"
      },
      /* Commuting: {
        value: "commuting"
      }, */
      "Workers 16 Years and Older": {
        value: "commuting/workers-16-year-and-older"
      },
      "Employment and Labor": {
        value: "employment-and-labor"
      },
      "Labor Time Series": {
        value: "employment-and-labor/time-series"
      },
      Industry: {
        value: "industry"
      }
      /* Occupation: {
        value: "occupation"
      }, */
      /*  "Civilian Workers 16 Years and Older": {
        value: "occupation/civilian-workers-16-year-and-older"
      }, */
      /*  "Work Experience": {
        value: "work-experience"
      } */
    }
  },
  {
    tabName: "Housing",
    mainEndpoint: "housing",
    subEndpoint: {
      "Selected Housing Characteristics": {
        value: "selected-housing-characteristics"
      },
      "Occupied Units Paying Rent": {
        value: "selected-housing-characteristics/occupied-units-paying-rent"
      },
      "Housing Value": {
        value: "selected-housing-characteristics/value"
      },
      /*  "Demographic Characteristics for Occupied": {
        value: "demographic-characteristics-for-occupied"
      }, */
      "Housing Physical Characteristics": {
        value: "housing-physical"
      }
      /*  Bedrooms: {
        value: "housing-physical/bedrooms"
      } */
    }
  },
  {
    tabName: "Health",
    mainEndpoint: "health",
    subEndpoint: {
      Disability: {
        value: "disability"
      },
      /* Fertility: {
        value: "fertility"
      }, */
      Insurance: {
        value: "insurance"
      }
      /*  "Insurance Time Series": {
        value: "insurance/time-series"
      } */
    }
  },
  {
    tabName: "Family & Living",
    mainEndpoint: "family-and-living-arrangement",
    subEndpoint: {
      /* "Demographic Housing Estimates": {
        value: "demographic-housing-estimates"
      }, */
      /* "Total Population": {
        value: "demographic-housing-estimates/total-population"
      }, */
      "Family and Household": {
        value: "family-and-household"
      },
      "Marital Status": {
        value: "material-status"
      }
    }
  }
]

const Demographic: React.FC<IProps> = ({ className, listings }) => {
  const [selectedTab, setSelectedTab] = useState("Employment")
  const [selectedSubEndpoint, setSelectedSubEndpoint] = useState("occupation-by-class-of-worker")
  const [selectedSubEndpointSubKey, setSelectedSubEndpointSubKey] = useState<Highcharts.Options>()

  const [isInView, ref] = useIntersectionObserver()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["demographic", selectedTab, selectedSubEndpoint],
    queryFn: async () => {
      let zcta = null

      for (let i = 0; i < 5; i++) {
        if (listings[i].PostalCode) {
          zcta = listings[i].PostalCode
          break
        }
      }

      const tab = tabList.find((tab) => tab.tabName === selectedTab)!

      if (zcta) {
        const data = await getDemographic({
          endpoint: tab?.mainEndpoint + "/" + selectedSubEndpoint,
          zcta
        })

        return data
      } else {
        return null
      }
    },
    enabled: isInView && listings.length > 0
  })

  function changeTab(tabName: string) {
    setSelectedTab(tabName)

    if (tabList.find((tab) => tab.tabName === tabName)) {
      const tab = tabList.find((tab) => tab.tabName === tabName)!
      setSelectedSubEndpoint(tab?.subEndpoint[Object.keys(tab?.subEndpoint)[0]].value)
    }
  }

  function dataRenderer({ data, endpoint }: any) {
    const pieOptions = (data: any): Highcharts.Options => {
      return {
        tooltip: {
          valueSuffix: "%"
        },
        title: {
          text: ""
        },
        legend: {
          enabled: true,
          layout: "horizontal",
          verticalAlign: "bottom",
          align: "center"
        },
        series: [
          {
            tooltip: {
              pointFormat: "<b>{point.percentage:.1f}%</b>"
            },
            dataLabels: [
              {
                enabled: true,
                distance: 20
              },
              {
                enabled: true,
                distance: -25,
                format: "{point.percentage:.1f}%",
                style: {
                  opacity: 0.7
                }
              }
            ],
            colors: Highcharts.getOptions().colors?.map((color) => Highcharts.color(color).setOpacity(0.5).get()) || [],
            type: "pie",
            showInLegend: true,
            data
          }
        ]
      }
    }

    const barOptions = (data: any, categories: string[]): Highcharts.Options => {
      return {
        chart: {
          type: "bar"
        },
        title: {
          text: ""
        },
        xAxis: {
          categories
        },
        yAxis: {
          min: 0
        },
        legend: {
          reversed: false
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true
            }
          }
        },
        series: data
      }
    }

    const sunburstOptions = (data: any): Highcharts.Options => {
      return {
        title: {
          text: ""
        },
        series: [
          {
            allowTraversingTree: true,
            type: "sunburst",
            data: data,
            cursor: "pointer",
            keys: ["id", "parent", "value", "name"],

            dataLabels: {
              format: "{point.name}",
              overflow: "justify"
            },
            levels: [
              {
                level: 1
              },
              {
                level: 2,
                colorByPoint: true
              },
              {
                level: 3,
                colorVariation: {
                  key: "brightness",
                  to: -0.5
                }
              },
              {
                level: 4,
                colorVariation: {
                  key: "brightness",
                  to: 0.5
                }
              }
            ]
          }
        ]
      }
    }

    switch (endpoint) {
      case "age-and-sex": {
        const age = pieOptions(
          Object.entries(data?.result?.Percent?.["Total population"]?.AGE)
            .filter(([_, value]: any) => value?.Estimate)
            .map(([key, { Estimate }]: any) => ({ name: key, y: Estimate }))
        )

        const malePercentage =
          (data?.result?.Male?.["Total population"].Estimate / data?.result?.Total?.["Total population"].Estimate) * 100
        const femalePercentage =
          (data?.result?.Female?.["Total population"].Estimate / data?.result?.Total?.["Total population"].Estimate) *
          100

        const sex = pieOptions([
          {
            name: "Male",
            y: malePercentage
          },
          {
            name: "Female",
            y: femalePercentage
          }
        ])

        return (
          <>
            <HighchartsReact highcharts={Highcharts} options={age} />
            <HighchartsReact highcharts={Highcharts} options={sex} />
          </>
        )
      }

      case "selected-social-characteristics/ancestry": {
        const ancestry = pieOptions(
          Object.entries(data?.result?.ANCESTRY?.["Total population"])
            .filter(([_, value]: any) => value?.Estimate)
            .map(([key, { Estimate }]: any) => ({ name: key, y: Estimate }))
        )

        return (
          <>
            <HighchartsReact highcharts={Highcharts} options={ancestry} />
          </>
        )
      }

      case "selected-social-characteristics/language-spoken-at-home": {
        const language = pieOptions(
          Object.entries(data?.result?.["LANGUAGE SPOKEN AT HOME"]?.["Population 5 years and over"])
            .filter(([_, value]: any) => value?.Estimate)
            .map(([key, { Estimate }]: any) => ({ name: key, y: Estimate }))
        )

        return (
          <>
            <HighchartsReact highcharts={Highcharts} options={language} />
          </>
        )
      }

      case "selected-social-characteristics/us-citizenship-status": {
        const citizenship = pieOptions(
          Object.entries(data?.result?.["U.S. CITIZENSHIP STATUS"]?.["Foreign-born population"])
            .filter(([_, value]: any) => value?.Estimate)
            .map(([key, { Estimate }]: any) => ({ name: key, y: Estimate }))
        )

        return (
          <>
            <HighchartsReact highcharts={Highcharts} options={citizenship} />
          </>
        )
      }

      case "residential-mobility": {
        function handleResidentialMobility(subDataKey: string) {
          const subData = Object.entries(data["result"]["Total"][subDataKey])[0][1] as any

          setSelectedSubEndpointSubKey(
            pieOptions(
              Object.entries(subData)
                .filter(([_, value]: any) => value?.Estimate)
                .map(([key, { Estimate }]: any) => ({ name: key, y: Estimate }))
            )
          )
        }

        return (
          <>
            <Select onValueChange={(value) => handleResidentialMobility(value)}>
              <SelectTrigger aria-label="change sub data" className="max-w-fit">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.entries(data?.result?.Total)
                    .filter(([key]) => key !== "Population 1 year and over" && key !== "PERCENT ALLOCATED")
                    .map(([key]) => {
                      return (
                        <SelectItem key={key} value={key}>
                          {key.slice(0, 1).toUpperCase() + key.slice(1).toLowerCase()}
                        </SelectItem>
                      )
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <HighchartsReact highcharts={Highcharts} options={selectedSubEndpointSubKey} />
          </>
        )
      }

      case "residential-mobility/population-1-year-over": {
        function handlePopulation1YearOver(subDataKey: string) {
          const subData = data["result"]["Total"]["Population 1 year and over"][subDataKey]

          setSelectedSubEndpointSubKey(
            pieOptions(
              Object.entries(subData)
                .filter(([_, value]: any) => value?.Estimate)
                .map(([key, { Estimate }]: any) => ({ name: key, y: Estimate }))
            )
          )
        }

        return (
          <>
            <Select onValueChange={(value) => handlePopulation1YearOver(value)}>
              <SelectTrigger aria-label="change sub data" className="max-w-fit">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.entries(data?.result?.Total?.["Population 1 year and over"]).map(([key, value]) => {
                    return typeof value !== "object" ? null : (
                      <SelectItem key={key} value={key}>
                        {key.slice(0, 1).toUpperCase() + key.slice(1).toLowerCase()}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <HighchartsReact highcharts={Highcharts} options={selectedSubEndpointSubKey} />
          </>
        )
      }

      case "veteran": {
        function handleVeteran(subDataKey: string) {
          const subData = Object.entries(data?.result?.Veterans[subDataKey])[0][1] as any

          setSelectedSubEndpointSubKey(
            pieOptions(
              Object.entries(subData)
                .filter(([_, value]: any) => value?.Estimate)
                .map(([key, { Estimate }]: any) => ({ name: key, y: Estimate }))
            )
          )
        }

        return (
          <>
            <Select onValueChange={(value) => handleVeteran(value)}>
              <SelectTrigger aria-label="change sub data" className="max-w-fit">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.entries(data?.result?.Veterans)
                    .filter(([key]) => key !== "Civilian population 18 years and over" && key !== "EMPLOYMENT STATUS")
                    .map(([key, value]) => {
                      return typeof value !== "object" ? null : (
                        <SelectItem key={key} value={key}>
                          {key.slice(0, 1).toUpperCase() + key.slice(1).toLowerCase()}
                        </SelectItem>
                      )
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <HighchartsReact highcharts={Highcharts} options={selectedSubEndpointSubKey} />
          </>
        )
      }

      case "income-in-the-past-12-month": {
        const categories = Object.keys(data?.result).filter((key) => key !== "ZCTA")

        const meanIncomeData = categories.map((category) => data?.result[category]?.["Mean income (dollars)"].Estimate)
        const medianIncomeData = categories.map(
          (category) => data?.result[category]?.["Median income (dollars)"].Estimate
        )

        const income = barOptions(
          [
            {
              name: "Mean Income",
              data: meanIncomeData
            },
            {
              name: "Median Income",
              data: medianIncomeData
            }
          ],
          categories
        )

        return (
          <>
            <HighchartsReact highcharts={Highcharts} options={income} />
          </>
        )
      }

      case "income-in-the-past-12-month/median-income": {
        const categories = Object.keys(data?.result).filter((key) => key !== "ZCTA")

        const medianIncomeData = categories.map(
          (category) => data?.result[category]?.["Median income (dollars)"].Estimate
        )

        const income = barOptions(
          [
            {
              name: "Median Income",
              data: medianIncomeData
            }
          ],
          categories
        )

        return (
          <>
            <HighchartsReact highcharts={Highcharts} options={income} />
          </>
        )
      }

      case "poverty-status-in-the-past-12-month/age": {
        const flattenAgeData = (data: any) => {
          const result = []

          for (const ageGroup in data) {
            const groupData = data[ageGroup]
            const { Estimate, "Margin of Error": marginOfError, ...subcategories } = groupData

            result.push({
              AgeGroup: ageGroup,
              Estimate
            })

            for (const subcategory in subcategories) {
              result.push({
                AgeGroup: subcategory,
                Estimate: subcategories[subcategory].Estimate
              })
            }
          }

          return { categories: result.map((row) => row.AgeGroup), data: result }
        }

        const { categories, data: flattenedData } = flattenAgeData(
          data?.result?.Total?.["Population for whom poverty status is determined"].AGE
        )

        const income = barOptions(
          [
            {
              name: "Median Income",
              data: flattenedData.map((row) => row.Estimate)
            }
          ],
          categories
        )

        return (
          <>
            <HighchartsReact highcharts={Highcharts} options={income} />
          </>
        )
      }

      case "educational-attainment": {
        const flattenDataForChart = (data: any) => {
          const categories = []
          const series: any = {}

          for (const ageGroup in data) {
            categories.push(ageGroup)

            for (const eduLevel in data[ageGroup]) {
              if (eduLevel === "Estimate" || eduLevel === "Margin of Error") continue

              const estimate = data[ageGroup][eduLevel].Estimate

              if (!series[eduLevel]) {
                series[eduLevel] = { name: eduLevel, data: [] }
              }
              series[eduLevel].data.push(estimate)
            }
          }

          return { categories, series: Object.values(series) }
        }

        const { categories, series } = flattenDataForChart(data?.result?.Total["AGE BY EDUCATIONAL ATTAINMENT"])

        const income = barOptions(series, categories)

        return (
          <>
            <HighchartsReact highcharts={Highcharts} options={income} />
          </>
        )
      }

      case "educational-attainment/25-years-and-older": {
        const education = pieOptions(
          Object.entries(data?.result?.Total?.["AGE BY EDUCATIONAL ATTAINMENT"]?.["Population 25 years and over"])
            .filter(([_, value]: any) => value?.Estimate)
            .map(([key, { Estimate }]: any) => ({ name: key, y: Estimate }))
        )

        return (
          <>
            <HighchartsReact highcharts={Highcharts} options={education} />
          </>
        )
      }

      case "school-enrollment": {
        const education = pieOptions(
          Object.entries(data?.result?.Total)
            .filter(([_, value]: any) => value?.Estimate)
            .map(([key, { Estimate }]: any) => ({ name: key, y: Estimate }))
        )

        return (
          <>
            <HighchartsReact highcharts={Highcharts} options={education} />
          </>
        )
      }

      case "school-enrollment/population-3-years-and-older": {
        const education = pieOptions(
          Object.entries(data?.result?.Total?.["Population 3 years and over enrolled in school"])
            .filter(([_, value]: any) => value?.Estimate)
            .map(([key, { Estimate }]: any) => ({ name: key, y: Estimate }))
        )

        return (
          <>
            <HighchartsReact highcharts={Highcharts} options={education} />
          </>
        )
      }

      case "occupation-by-class-of-worker": {
        const education = pieOptions(
          Object.entries(data?.result?.Total?.["Civilian employed population 16 years and over"])
            .filter(([_, value]: any) => value?.Estimate)
            .map(([key, { Estimate }]: any) => ({ name: key, y: Estimate }))
        )

        return (
          <>
            <HighchartsReact highcharts={Highcharts} options={education} />
          </>
        )
      }

      case "commuting/workers-16-year-and-older": {
        function handleCommutingSelect(subDataKey: string) {
          const subData = data?.result?.Total?.["Workers 16 years and over"][subDataKey]

          setSelectedSubEndpointSubKey(
            pieOptions(
              Object.entries(subData)
                .filter(([_, value]: any) => value?.Estimate)
                .map(([key, { Estimate }]: any) => ({ name: key, y: Estimate }))
            )
          )
        }

        return (
          <>
            <Select onValueChange={(value) => handleCommutingSelect(value)}>
              <SelectTrigger aria-label="change sub data" className="max-w-fit">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.entries(data?.result?.Total?.["Workers 16 years and over"]).map(([key, value]) => {
                    return typeof value !== "object" ? null : (
                      <SelectItem key={key} value={key}>
                        {key.slice(0, 1).toUpperCase() + key.slice(1).toLowerCase()}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <HighchartsReact highcharts={Highcharts} options={selectedSubEndpointSubKey} />
          </>
        )
      }

      case "employment-and-labor": {
        sunburst(Highcharts)

        const processData = (data: any, parent = null) => {
          const sunburstData: any = []

          const extractData = (obj: any, parentId: any) => {
            Object.keys(obj).forEach((key) => {
              const value = obj[key]

              if (typeof value === "object" && value !== null) {
                if ("Estimate" in value) {
                  sunburstData.push({
                    id: key,
                    parent: parentId,
                    value: value.Estimate,
                    name: key
                  })
                }

                const children = Object.keys(value).filter(
                  (childKey) => childKey !== "Estimate" && typeof value[childKey] === "object"
                )
                children.forEach((childKey) => {
                  extractData({ [childKey]: value[childKey] }, key)
                })
              }
            })
          }

          extractData(data, parent)
          return sunburstData
        }

        function handleEmploymentSelect(subDataKey: string) {
          const subData = processData(data?.result?.[subDataKey])
          setSelectedSubEndpointSubKey(sunburstOptions(subData))
        }

        return (
          <>
            <Select onValueChange={(value) => handleEmploymentSelect(value)}>
              <SelectTrigger aria-label="change sub data" className="max-w-fit">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.entries(data?.result).map(([key, value]) => {
                    return typeof value !== "object" ? null : (
                      <SelectItem key={key} value={key}>
                        {key.slice(0, 1).toUpperCase() + key.slice(1).toLowerCase()}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <HighchartsReact highcharts={Highcharts} options={selectedSubEndpointSubKey} />
          </>
        )
      }

      case "employment-and-labor/time-series": {
        const prepareChartData = (data: any) => {
          const years = Object.keys(data).filter((year) => year !== "ZCTA")
          const categories = [
            ...new Set(
              Object.values(data).flatMap((yearData: any) => {
                if (yearData && yearData["EMPLOYMENT STATUS"]) {
                  return Object.keys(yearData["EMPLOYMENT STATUS"])
                }
                return []
              })
            )
          ]

          const seriesData = categories.map((status) => {
            return {
              name: status,
              data: years.map((year) => {
                const yearData = data[year]?.["EMPLOYMENT STATUS"]
                return yearData && yearData[status] ? yearData[status].Estimate : 0
              })
            }
          })

          return { categories: years, series: seriesData }
        }

        const { categories, series } = prepareChartData(data?.result)

        const labor = barOptions(series, categories)

        return (
          <>
            <HighchartsReact highcharts={Highcharts} options={labor} />
          </>
        )
      }

      case "industry": {
        const education = pieOptions(
          Object.entries(data?.result?.Total?.["Full-time, year-round civilian employed population 16 years and over"])
            .filter(([_, value]: any) => value?.Estimate)
            .map(([key, { Estimate }]: any) => ({ name: key, y: Estimate }))
        )

        return (
          <>
            <HighchartsReact highcharts={Highcharts} options={education} />
          </>
        )
      }

      case "selected-housing-characteristics": {
        function handleSelectedHousingSelect(subDataKey: string) {
          const subData = Object.entries(data?.result[subDataKey])[0][1] as any

          setSelectedSubEndpointSubKey(
            pieOptions(
              Object.entries(subData)
                .filter(([_, value]: any) => value?.Estimate)
                .map(([key, { Estimate }]: any) => ({ name: key, y: Estimate }))
            )
          )
        }

        return (
          <>
            <Select onValueChange={(value) => handleSelectedHousingSelect(value)}>
              <SelectTrigger aria-label="change sub data" className="max-w-fit">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.entries(data?.result)
                    .filter(([key]) => key !== "Civilian population 18 years and over" && key !== "EMPLOYMENT STATUS")
                    .map(([key, value]) => {
                      return typeof value !== "object" ? null : (
                        <SelectItem key={key} value={key}>
                          {key.slice(0, 1).toUpperCase() + key.slice(1).toLowerCase()}
                        </SelectItem>
                      )
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <HighchartsReact highcharts={Highcharts} options={selectedSubEndpointSubKey} />
          </>
        )
      }

      case "selected-housing-characteristics/occupied-units-paying-rent": {
        const education = pieOptions(
          Object.entries(data?.result?.["GROSS RENT"]?.["Occupied units paying rent"])
            .filter(([_, value]: any) => value?.Estimate)
            .map(([key, { Estimate }]: any) => ({ name: key, y: Estimate }))
        )

        return (
          <>
            <HighchartsReact highcharts={Highcharts} options={education} />
          </>
        )
      }

      case "selected-housing-characteristics/value": {
        const education = pieOptions(
          Object.entries(data?.result?.["VALUE"]?.["Owner-occupied units"])
            .filter(([_, value]: any) => value?.Estimate)
            .filter(([key]) => key !== "Median (dollars)")
            .map(([key, { Estimate }]: any) => ({ name: key, y: Estimate }))
        )

        return (
          <>
            <HighchartsReact highcharts={Highcharts} options={education} />
          </>
        )
      }

      case "housing-physical": {
        function handleHousingPhysical(subDataKey: string) {
          const subData = data?.result?.["Occupied housing units"]?.["Occupied housing units"][subDataKey]

          setSelectedSubEndpointSubKey(
            pieOptions(
              Object.entries(subData)
                .filter(([_, value]: any) => value?.Estimate)
                .map(([key, { Estimate }]: any) => ({ name: key, y: Estimate }))
            )
          )
        }

        return (
          <>
            <Select onValueChange={(value) => handleHousingPhysical(value)}>
              <SelectTrigger aria-label="change sub data" className="max-w-fit">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.entries(data?.result?.["Occupied housing units"]?.["Occupied housing units"]).map(
                    ([key, value]) => {
                      return typeof value !== "object" ? null : (
                        <SelectItem key={key} value={key}>
                          {key.slice(0, 1).toUpperCase() + key.slice(1).toLowerCase()}
                        </SelectItem>
                      )
                    }
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            <HighchartsReact highcharts={Highcharts} options={selectedSubEndpointSubKey} />
          </>
        )
      }

      case "disability": {
        function handleDisability(subDataKey: string) {
          const subData =
            data?.result?.["With a disability"]?.["Total civilian noninstitutionalized population"][subDataKey]

          setSelectedSubEndpointSubKey(
            pieOptions(
              Object.entries(subData)
                .filter(([_, value]: any) => value?.Estimate)
                .map(([key, { Estimate }]: any) => ({ name: key, y: Estimate }))
            )
          )
        }

        return (
          <>
            <Select onValueChange={(value) => handleDisability(value)}>
              <SelectTrigger aria-label="change sub data" className="max-w-fit">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.entries(
                    data?.result?.["With a disability"]?.["Total civilian noninstitutionalized population"]
                  ).map(([key, value]) => {
                    return typeof value !== "object" ? null : (
                      <SelectItem key={key} value={key}>
                        {key.slice(0, 1).toUpperCase() + key.slice(1).toLowerCase()}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <HighchartsReact highcharts={Highcharts} options={selectedSubEndpointSubKey} />
          </>
        )
      }

      case "insurance": {
        const insured =
          (data?.result?.Insured?.["Civilian noninstitutionalized population"].Estimate /
            data?.result?.Total?.["Civilian noninstitutionalized population"].Estimate) *
          100
        const uninsured =
          (data?.result?.Uninsured?.["Civilian noninstitutionalized population"].Estimate /
            data?.result?.Total?.["Civilian noninstitutionalized population"].Estimate) *
          100

        const insurance = pieOptions([
          {
            name: "Insured",
            y: insured
          },
          {
            name: "Uninsured",
            y: uninsured
          }
        ])

        return (
          <>
            <HighchartsReact highcharts={Highcharts} options={insurance} />
          </>
        )
      }

      case "family-and-household": {
        const prepareChartData = (data: any) => {
          const types = Object.keys(data).filter((t) => t !== "ZCTA" && t !== "Total")

          const categories = ["AGE OF OWN CHILDREN", "FAMILIES", "HOUSEHOLDS"]

          const seriesData = categories.map((name) => {
            const subCategoryName =
              name === "AGE OF OWN CHILDREN"
                ? "Households with own children"
                : name === "FAMILIES"
                  ? "Average family size"
                  : "Average household size"

            return {
              name: subCategoryName,
              data: types.map((type) => {
                const typeData = data[type]

                return name === "AGE OF OWN CHILDREN"
                  ? typeData[name]["Households with own children of the householder under 18 years"][
                      "Under 6 years and 6 to 17 years"
                    ].Estimate
                  : name === "FAMILIES"
                    ? typeData[name]["Average family size"].Estimate
                    : typeData[name]["Average household size"].Estimate
              })
            }
          })

          return { categories: types, series: seriesData }
        }

        const { categories, series } = prepareChartData(data?.result)

        const household = barOptions(series, categories)

        return (
          <>
            <HighchartsReact highcharts={Highcharts} options={household} />
          </>
        )
      }

      case "material-status": {
        const prepareChartData = (data: any) => {
          const categories = ["Divorced", "Never married", "Now married", "Separated", "Widowed", "Total"]
          const series = [
            {
              name: "Females 16 years and over",
              data: categories.map(
                (status) => data[status]?.["LABOR FORCE PARTICIPATION"]?.["Females 16 years and over"]?.Estimate || 0
              )
            },
            {
              name: "Males 16 years and over",
              data: categories.map(
                (status) => data[status]?.["LABOR FORCE PARTICIPATION"]?.["Males 16 years and over"]?.Estimate || 0
              )
            }
          ]
          return { categories, series }
        }

        const { categories, series } = prepareChartData(data?.result)

        const household = barOptions(series, categories)

        return (
          <>
            <HighchartsReact highcharts={Highcharts} options={household} />
          </>
        )
      }

      default:
        return <div>Unsupported data type</div>
    }
  }

  return (
    <div ref={ref} className={cn("w-full box-container grid gap-5", className)}>
      <span className="flex items-center justify-start gap-2 text-2xl font-bold text-gray-18">
        <DemographicIcon />
        Demographic Analysis
      </span>
      <Tabs className="flex flex-col" onValueChange={(e) => changeTab(e)} value={selectedTab} defaultValue="Population">
        <TabsList className="h-fit flex-wrap gap-y-2 rounded-md" aria-label="Select Demographic Type">
          <div className="flex w-full md:hidden">
            <Select value={selectedTab} onValueChange={(e) => changeTab(e)}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {tabList.map((item) => (
                  <SelectItem key={item.tabName} value={item.tabName}>
                    <TabsTrigger value={item.tabName} key={item.tabName}>
                      {item.tabName}
                    </TabsTrigger>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="hidden h-fit w-full flex-wrap md:flex">
            {tabList.map((item) => (
              <TabsTrigger
                className={"data-[state=active]:bg-primary-gradient w-fit flex-1"}
                value={item.tabName}
                key={item.tabName}
              >
                {item.tabName}
              </TabsTrigger>
            ))}
          </div>
        </TabsList>
        {tabList.map((item) => (
          <TabsContent value={item.tabName} key={item.tabName}>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error</p>}

            {data && (
              <div className="flex h-full flex-col gap-5 overflow-hidden">
                <Select value={selectedSubEndpoint} onValueChange={(value) => setSelectedSubEndpoint(value)}>
                  <SelectTrigger aria-label="change sub endpoint" className="max-w-fit">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.entries(item.subEndpoint).map(([key, value]) => {
                        return (
                          <SelectItem key={key} value={value.value}>
                            {key}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {dataRenderer({ data, endpoint: selectedSubEndpoint })}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default Demographic
