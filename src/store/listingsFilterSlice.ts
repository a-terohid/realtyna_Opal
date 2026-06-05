import type { StateCreator } from "zustand"

import type { TStatusFilter } from "@/types/filter.type"

export interface ListingsFilter {
  location: string
  status: TStatusFilter
  listingsType: "For Any" | "For Sale" | "For Rent"
  bedrooms: string[]
  exactBedrooms: boolean
  bathrooms: string[]
  exactBathrooms: boolean
  filterTab: "Residential" | "Commercial"
  propertyType: {
    [key: string]: string[]
  }
  propertySubType: string
  priceRange: string[]
  sortBy: { label: string; value: string }
}

export const initialState: ListingsFilter = {
  location: "",
  status: ["Active"],
  listingsType: "For Sale",
  bedrooms: ["Any"],
  exactBedrooms: true,
  bathrooms: ["Any"],
  exactBathrooms: true,
  filterTab: "Residential",
  propertyType: {
    Residential: [],
    Commercial: []
  },
  propertySubType: "",
  priceRange: ["", ""],
  sortBy: { label: "Latest", value: "OriginalEntryTimestamp desc" }
}

export interface ListingsFilterSlice {
  listingsFilter: ListingsFilter
  resetFilters: () => void
  setSortBy: (payload: { label: string; value: string }) => void
  setLocation: (payload: string) => void
  setStatus: (payload: ["Active" | "Pending" | "Sold"]) => void
  setListingsType: (payload: "For Any" | "For Sale" | "For Rent") => void
  setBedrooms: (payload: string[]) => void
  setExactBedrooms: (payload: boolean) => void
  setExactBathrooms: (payload: boolean) => void
  setBathrooms: (payload: string[]) => void
  setFilterTab: (payload: "Residential" | "Commercial") => void
  setPropertyType: (payload: { [key: string]: string[] }) => void
  setPropertySubType: (payload: string) => void
  setPriceRange: (payload: [string, string]) => void
}

export const createListingsFilterSlice: StateCreator<ListingsFilterSlice> = (
  set
) => ({
  listingsFilter: initialState,
  resetFilters: () =>
    set((state) => ({
      listingsFilter: {
        sortBy: { label: "Latest", value: "OriginalEntryTimestamp desc" },
        status: ["Active"],
        listingsType: "For Sale",
        priceRange: ["", ""],
        exactBedrooms: true,
        exactBathrooms: true,
        bedrooms: ["Any"],
        bathrooms: ["Any"],
        filterTab: "Residential",
        propertyType: {
          Residential: [],
          Commercial: []
        },
        propertySubType: "",
        location: state.listingsFilter.location,
        queryFilter: []
      }
    })),
  setSortBy: (payload) =>
    set((state) => ({
      listingsFilter: {
        ...state.listingsFilter,
        sortBy: payload
      }
    })),
  setStatus: (payload) =>
    set((state) => ({
      listingsFilter: {
        ...state.listingsFilter,
        status: payload
      }
    })),
  setListingsType: (payload) =>
    set((state) => ({
      listingsFilter: {
        ...state.listingsFilter,
        listingsType: payload
      }
    })),
  setBedrooms: (payload) =>
    set((state) => ({
      listingsFilter: {
        ...state.listingsFilter,
        bedrooms: payload
      }
    })),
  setExactBedrooms: (payload) =>
    set((state) => ({
      listingsFilter: {
        ...state.listingsFilter,
        exactBedrooms: payload
      }
    })),
  setExactBathrooms: (payload) =>
    set((state) => ({
      listingsFilter: {
        ...state.listingsFilter,
        exactBathrooms: payload
      }
    })),
  setBathrooms: (payload) =>
    set((state) => ({
      listingsFilter: {
        ...state.listingsFilter,
        bathrooms: payload
      }
    })),
  setFilterTab: (payload) =>
    set((state) => ({
      listingsFilter: {
        ...state.listingsFilter,
        filterTab: payload
      }
    })),
  setPropertyType: (payload) =>
    set((state) => ({
      listingsFilter: {
        ...state.listingsFilter,
        propertyType: payload
      }
    })),
  setPropertySubType: (payload) =>
    set((state) => ({
      listingsFilter: {
        ...state.listingsFilter,
        propertySubType: payload
      }
    })),
  setLocation: (payload) => {
    set((state) => {
      return {
        listingsFilter: {
          ...state.listingsFilter,
          location: payload
        }
      }
    })
  },
  setPriceRange: (payload) =>
    set((state) => ({
      listingsFilter: {
        ...state.listingsFilter,
        priceRange: payload
      }
    }))
})
