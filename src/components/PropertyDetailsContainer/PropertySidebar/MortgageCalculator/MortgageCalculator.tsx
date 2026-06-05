"use client"

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"

import { InputV2 } from "@/components/common/FormInput/FormInputV2"

interface IProps {
  price: number
}

const MortgageCalculator: React.FC<IProps> = ({ price }) => {
  const [total, setTotal] = useState<number>(0)
  const [downPayment, setDownPayment] = useState<number>(0)
  const [loanTerm, setLoanTerm] = useState<number>(0)
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0)
  const [interestRate, setInterestRate] = useState<number>(0)
  const [tax, setTax] = useState<number>(0)
  const [insurance, setInsurance] = useState<number>(0)

  useEffect(() => {
    //Update monthly payment whenever the dependencies change
    if (total && downPayment && loanTerm && interestRate && tax && insurance) {
      calculateMonthlyPayment()
    }
  }, [
    total,
    downPayment,
    loanTerm,
    monthlyPayment,
    interestRate,
    tax,
    insurance
  ])

  //==================================================================================

  // Calculate monthly payment and set in state
  const calculateMonthlyPayment = () => {
    const principal = total - downPayment
    const monthlyInterestRate = interestRate / 1200
    const numPayments = loanTerm * 12
    const taxes = tax / 12
    const insuranceRate = insurance / 12

    const monthlyPayment =
      (principal * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numPayments)) +
      taxes +
      insuranceRate

    setMonthlyPayment(parseInt(monthlyPayment.toFixed(2)))
  }

  //==================================================================================

  return (
    <section className="col-span-full flex flex-col gap-[1.1875rem] rounded-[.9375rem] p-5 shadow-primary sm:col-span-3 lg:col-span-full">
      <div className="mb-[.9375rem] flex gap-[1.125rem]">
        <h3 className="min-w-fit self-start text-base font-semibold text-black">
          Mortgage Calculator
        </h3>
        <span className='flex w-full items-center justify-center after:block after:h-[.0625rem] after:w-full after:bg-black after:opacity-30 after:content-[""]' />
      </div>
      <div className="grid grid-cols-2 gap-[.875rem] sm:grid-cols-1 md:grid-cols-2">
        <div className="relative flex flex-col items-start justify-center gap-[.25rem]">
          <InputV2
            id="total"
            type="number"
            autoComplete="new-password"
            placeholder={price ? price.toLocaleString() : "0"}
            onChange={(e) =>
              setTotal((e.target as HTMLInputElement).valueAsNumber)
            }
            label="Total Price"
          />
          <span className="ml-[.25rem] text-2xs font-normal text-black text-opacity-80">
            $
          </span>
        </div>

        <div className="relative flex flex-col items-start justify-center gap-[.25rem]">
          <InputV2
            id="downpayment"
            type="number"
            autoComplete="new-password"
            placeholder="10"
            onChange={(e) =>
              setDownPayment((e.target as HTMLInputElement).valueAsNumber)
            }
            label="Down Payment"
          />
          <span className="ml-[.25rem] text-2xs font-normal text-black text-opacity-80">
            %
          </span>
        </div>

        <div className="relative flex flex-col items-start justify-center gap-[.25rem]">
          <InputV2
            id="loanterm"
            type="number"
            autoComplete="new-password"
            placeholder="30"
            onChange={(e) =>
              setLoanTerm((e.target as HTMLInputElement).valueAsNumber)
            }
            label="Loan Term"
          />
          <span className="ml-[.25rem] text-2xs font-normal text-black text-opacity-80">
            years
          </span>
        </div>

        <div className="relative flex flex-col items-start justify-center gap-[.25rem]">
          <InputV2
            id="interest"
            type="number"
            autoComplete="new-password"
            placeholder="4.5"
            onChange={(e) =>
              setInterestRate((e.target as HTMLInputElement).valueAsNumber)
            }
            label="Interest Rate"
          />
          <span className="ml-[.25rem] text-2xs font-normal text-black text-opacity-80">
            %
          </span>
        </div>

        <div className="relative flex flex-col items-start justify-center gap-[.25rem]">
          <InputV2
            id="tax"
            type="number"
            autoComplete="new-password"
            placeholder="5"
            onChange={(e) =>
              setTax((e.target as HTMLInputElement).valueAsNumber)
            }
            label="Tax"
          />
          <span className="ml-[.25rem] text-2xs font-normal text-black text-opacity-80">
            % per year
          </span>
        </div>

        <div className="relative flex flex-col items-start justify-center gap-[.25rem]">
          <InputV2
            id="insurance"
            type="number"
            autoComplete="new-password"
            placeholder="3"
            onChange={(e) =>
              setInsurance((e.target as HTMLInputElement).valueAsNumber)
            }
            label="Insurance"
          />
          <span className="ml-[.25rem] text-2xs font-normal text-black text-opacity-80">
            % per year
          </span>
        </div>
      </div>
      <div className="relative flex flex-col items-start justify-center gap-[.25rem]">
        <InputV2
          id="monthly"
          type="number"
          readOnly
          autoComplete="new-password"
          placeholder="282,000"
          value={monthlyPayment && monthlyPayment}
          label="Monthly Payment"
          inputClassName="w-full"
        />
      </div>
    </section>
  )
}

export default MortgageCalculator
