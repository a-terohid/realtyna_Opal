import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

import type { CompareListingsSlice } from "./compareListSlice"
import { createCompareListingsSlice } from "./compareListSlice"
import type { ListingsMapSlice } from "./listingsMapSlice"
import { createListingsMapSlice } from "./listingsMapSlice"
import type { ListingsViewSlice } from "./listingsViewSlice"
import { createListingsViewSlice } from "./listingsViewSlice"
import type { MapFiltersSlice } from "./mapFilterSlice"
import { createMapFiltersSlice } from "./mapFilterSlice"

const useStore = create<
  CompareListingsSlice & ListingsViewSlice & ListingsMapSlice & MapFiltersSlice
>()(
  immer(
    persist(
      (...a) => ({
        ...createCompareListingsSlice(...a),
        ...createListingsViewSlice(...a),
        ...createListingsMapSlice(...a),
        ...createMapFiltersSlice(...a)
      }),
      {
        name: "compareListings",
        partialize: (state) => ({
          compareList: state.compareList
        })
      }
    )
  )
)

export default useStore
