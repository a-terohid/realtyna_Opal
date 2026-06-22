"use client"

import React, { useEffect, useState } from "react"

import { InputV2 } from "@/components/common/FormInput/FormInputV2"

interface IProps {
  price: number
}

const MortgageCalculator: React.FC<IProps> = ({ price }) => {
  const [total, setTotal] = useState(price)

  const [downPayment, setDownPayment] = useState(10)
  const [loanTerm, setLoanTerm] = useState(30)
  const [interestRate, setInterestRate] = useState(4.5)
  const [tax, setTax] = useState(1.2)
  const [insurance, setInsurance] = useState(0.5)

  const [monthlyPayment, setMonthlyPayment] = useState(0)

  useEffect(() => {
    setTotal(price)
  }, [price])

  useEffect(() => {
    calculateMonthlyPayment()
  }, [total, downPayment, loanTerm, interestRate, tax, insurance])

  const calculateMonthlyPayment = () => {
    if (total <= 0 || loanTerm <= 0) {
      setMonthlyPayment(0)
      return
    }

    const downPaymentAmount = total * (downPayment / 100)
    const principal = total - downPaymentAmount

    const monthlyInterestRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12

    const monthlyTax = (total * (tax / 100)) / 12
    const monthlyInsurance = (total * (insurance / 100)) / 12

    let monthlyPrincipalAndInterest = 0

    if (monthlyInterestRate === 0) {
      monthlyPrincipalAndInterest = principal / numberOfPayments
    } else {
      monthlyPrincipalAndInterest =
        (principal *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
    }

    const payment =
      monthlyPrincipalAndInterest + monthlyTax + monthlyInsurance

    setMonthlyPayment(Number(payment.toFixed(2)))
  }

  return (
    <section className="col-span-full flex flex-col gap-[1.1875rem] rounded-[.9375rem] p-5 shadow-primary sm:col-span-3 lg:col-span-full">
      <div className="mb-[.9375rem] flex gap-[1.125rem]">
        <h3 className="min-w-fit self-start text-base font-semibold text-black">
          Mortgage Calculator
        </h3>

        <span className='flex w-full items-center justify-center after:block after:h-[.0625rem] after:w-full after:bg-black after:opacity-30 after:content-[""]' />
      </div>

      <div className="grid grid-cols-2 gap-[.875rem] sm:grid-cols-1 md:grid-cols-2">
        <div className="relative flex flex-col gap-1">
          <InputV2
            id="total"
            type="number"
            value={total}
            label="Total Price"
            autoComplete="off"
            onChange={(e) =>
              setTotal((e.target as HTMLInputElement).valueAsNumber || 0)
            }
          />
          <span className="ml-1 text-2xs text-black/80">$</span>
        </div>

        <div className="relative flex flex-col gap-1">
          <InputV2
            id="downpayment"
            type="number"
            value={downPayment}
            label="Down Payment"
            autoComplete="off"
            onChange={(e) =>
              setDownPayment(
                (e.target as HTMLInputElement).valueAsNumber || 0
              )
            }
          />
          <span className="ml-1 text-2xs text-black/80">%</span>
        </div>

        <div className="relative flex flex-col gap-1">
          <InputV2
            id="loanterm"
            type="number"
            value={loanTerm}
            label="Loan Term"
            autoComplete="off"
            onChange={(e) =>
              setLoanTerm((e.target as HTMLInputElement).valueAsNumber || 0)
            }
          />
          <span className="ml-1 text-2xs text-black/80">Years</span>
        </div>

        <div className="relative flex flex-col gap-1">
          <InputV2
            id="interest"
            type="number"
            value={interestRate}
            label="Interest Rate"
            autoComplete="off"
            onChange={(e) =>
              setInterestRate(
                (e.target as HTMLInputElement).valueAsNumber || 0
              )
            }
          />
          <span className="ml-1 text-2xs text-black/80">% / year</span>
        </div>

        <div className="relative flex flex-col gap-1">
          <InputV2
            id="tax"
            type="number"
            value={tax}
            label="Property Tax"
            autoComplete="off"
            onChange={(e) =>
              setTax((e.target as HTMLInputElement).valueAsNumber || 0)
            }
          />
          <span className="ml-1 text-2xs text-black/80">% / year</span>
        </div>

        <div className="relative flex flex-col gap-1">
          <InputV2
            id="insurance"
            type="number"
            value={insurance}
            label="Home Insurance"
            autoComplete="off"
            onChange={(e) =>
              setInsurance(
                (e.target as HTMLInputElement).valueAsNumber || 0
              )
            }
          />
          <span className="ml-1 text-2xs text-black/80">% / year</span>
        </div>
      </div>

      <div className="relative flex flex-col gap-1">
        <InputV2
          id="monthly"
          type="text"
          readOnly
          label="Estimated Monthly Payment"
          value={
            monthlyPayment
              ? `$${monthlyPayment.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`
              : ""
          }
          inputClassName="w-full"
        />
      </div>
    </section>
  )
}

export default MortgageCalculator