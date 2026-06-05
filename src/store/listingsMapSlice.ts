/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StateCreator } from "zustand"

export interface ListingsMapSlice {
  mapyna: any | null
  setMapyna: (payload: any | null) => void
  totalListings: number | null
  setTotalListings: (payload: number | null) => void
}

export const createListingsMapSlice: StateCreator<ListingsMapSlice> = (
  set
) => ({
  totalListings: null,
  mapyna: null,
  setMapyna: (payload) =>
    set(() => ({
      mapyna: payload
    })),
  setTotalListings: (payload) =>
    set(() => ({
      totalListings: payload
    }))
})
