export type TCoordinationFilter = {
  lat: string | number
  lng: string | number
}

export type TViewportFilter = {
  northeast: TCoordinationFilter
  southwest: TCoordinationFilter
}

export type TPropertyTypeFilter = {
  Residential: string[]
  Commercial: string[]
  [key: string]: string[]
}

export type TStatusFilter = ("Active" | "Pending" | "Sold")[]

export type TSortByFilter = string

export type TPriceRangeFilter = string[]

/* export type TOpenHouseFilter = DateRange */

export type TBedroomsFilter = string[]

export type TBathroomsFilter = string[]

export type TPolygonFilter = {
  lat: number
  lng: number
}[]

export type TSearchParamsObject = {
  [k: string]: string
}

export type TLocationSuggestionOSM = {
  address: {
    county: string
    state: string
    postcode: string
    country: string
    country_code: string
  }
  geojson: {
    type: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    coordinates: any
  }
  boundingbox: string[]
  category: string
  display_name: string
  importance: number
  lat: string
  lon: string
  place_id: number
  place_rank: number
  type: string
}

export type TLocationSuggestionGoogle = {
  predictions: TLocationGooglePrediction[]
  status: "string "
}

export type TLocationGooglePrediction = {
  description: string
  place_id: string
  types: string[]
}

export type TLocationResult = {
  result: TLocationDetails
}

export type TLocationDetails = {
  address_components: {
    long_name: string
    short_name: string
    types: string[]
  }[]
  adr_address: string
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
    viewport: {
      northeast: {
        lat: number
        lng: number
      }
      southwest: {
        lat: number
        lng: number
      }
    }
  }

  icon: string
  icon_background_color: string
  icon_mask_base_uri: string
  name: string
  place_id: string
  reference: string
  types: string[]
  url: string
  utc_offset: number
  vicinity: string
}

export type TNeighborhood = {
  type: string
  properties: {
    State: string
    County: string
    City: string
    Name: string
    RegionID: string
    Shape_Length: number
    Shape_Area: number
  }
  geometry: {
    type: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    coordinates: any[]
  }
}

export type TGoogleGeocodeResult = {
  results: TGoogleGeocode[]
  status: string
}

export type TGoogleGeocode = {
  address_components: {
    long_name: string
    short_name: string
    types: string[]
  }[]
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
    location_type: string
    viewport: {
      northeast: {
        lat: number
        lng: number
      }
      southwest: {
        lat: number
        lng: number
      }
    }
    bounds: {
      northeast: {
        lat: number
        lng: number
      }
      southwest: {
        lat: number
        lng: number
      }
    }
  }
  place_id: string
  types: string[]
}
