import type { StateCreator } from "zustand"

export interface ListingsViewSlice {
  viewMode: "grid" | "list" | "map"
  mobileView: "mapOnly" | "listOnly" | "none"
  setViewMode: (payload: "grid" | "list" | "map") => void
  setMobileView: (payload: "mapOnly" | "listOnly" | "none") => void
}

export const createListingsViewSlice: StateCreator<ListingsViewSlice> = (
  set
) => ({
  viewMode: "map",
  mobileView: "listOnly",
  setViewMode: (payload) =>
    set((state) => ({
      viewMode: payload
    })),
  setMobileView: (payload) =>
    set((state) => ({
      mobileView: payload
    }))
})
