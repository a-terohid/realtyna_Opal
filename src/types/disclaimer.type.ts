export type TDisclaimer = {
  error: string
  is_success: boolean
  message: string | null
  result: TDisclaimerValue[]
}

export type TDisclaimerValue = {
  disclaimer: string
  id: number
  image: string
  last_updated: Date
  name: string
  short_name: string
}
