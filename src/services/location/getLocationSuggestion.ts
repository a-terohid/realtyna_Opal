import axios from "axios"

export const getLocationSuggestion = ({ value }: { value: string }) =>
  axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/location`, {
    params: { value, type: "suggestion" }
  })
