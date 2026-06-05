import type { StateCreator } from "zustand"

export type CoordinatePair = { lat: number; lng: number }

export interface MapFilters {
  coordination: { lat: number; lng: number } | null
  viewport: {
    northeast: {
      lat: number
      lng: number
    }
    southwest: {
      lat: number
      lng: number
    }
  } | null
  polygon: CoordinatePair[] | null
}

export const initialState: MapFilters = {
  coordination: null,
  viewport: null,
  polygon: null
}

export interface MapFiltersSlice {
  mapFilters: MapFilters
  reset: () => void
  setViewport: (
    payload: {
      northeast: {
        lat: number
        lng: number
      }
      southwest: {
        lat: number
        lng: number
      }
    } | null
  ) => void
  setCoordination: (payload: { lat: number; lng: number } | null) => void
  setPolygon: (payload: CoordinatePair[] | null) => void
}

export const createMapFiltersSlice: StateCreator<MapFiltersSlice> = (set) => ({
  mapFilters: initialState,
  reset: () =>
    set(() => ({
      mapFilters: {
        coordination: null,
        viewport: null,
        polygon: null
      }
    })),
  setCoordination: (payload) =>
    set((state) => ({
      mapFilters: {
        ...state.mapFilters,
        coordination: payload
      }
    })),
  setViewport: (payload) =>
    set((state) => ({
      mapFilters: {
        ...state.mapFilters,
        viewport: payload
      }
    })),
  setPolygon: (payload) =>
    set((state) => ({
      mapFilters: {
        ...state.mapFilters,
        polygon: payload
      }
    }))
})
