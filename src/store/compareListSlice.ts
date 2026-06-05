import type { StateCreator } from "zustand"

import type { TCompareList } from "@/types/compare.type"

export interface CompareListingsSlice {
  compareList: TCompareList
  setCompareList: (payload: TCompareList) => void
}

export const createCompareListingsSlice: StateCreator<CompareListingsSlice> = (set) => ({
  compareList: ["empty", "empty", "empty", "empty"],
  setCompareList: (payload) =>
    set(() => ({
      compareList: payload
    }))
})
