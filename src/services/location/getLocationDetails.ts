import axios from "axios"

export const getLocationDetails = ({ id }: { id: string }) =>
  axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/location`, {
    params: { id, type: "details" }
  })
