type StateSubRoutesParams = {
  state?: string
  sitename?: string
  total?: number
}

export type StateSubRoutes = {
  [key: string]: (params: StateSubRoutesParams) => {
    filter: Record<string, string>
    title: string
    description: string
    isRemoveNumbers?: boolean
  }
}

export const statePageSubRoutes: StateSubRoutes = {
  "for-rent": ({ state, sitename, total }) => ({
    filter: {
      listingsType: "For Rent"
    },
    title: `${state} Real Estate & Homes for Rent | ${sitename}`,
    description: `There are currently ${total} homes for sale in ${state}. Explore and find your perfect match. View listing photos, Review property details, and Contact a ${sitename} agent for more information`
  }),

  "new-listings": ({ state, sitename, total }) => ({
    filter: {
      listingsDOM: "15"
    },
    title: `New ${state} Real Estate Listings | ${sitename}`,
    description: `Find new Homes for sale in ${state}. There are ${total} homes for sale in ${state} that haves been here for only the past 14 days.Contact a ${sitename} agent for more information`
  }),

  land: ({ state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      propertyType: `{"Residential":[],"Commercial":["Land"]}`
    },
    isRemoveNumbers: true,
    title: `${state} Land & Lots For Sale - ${total} Listings | ${sitename}`,
    description: `Search for land & lots for sale at ${sitename}, including lots, acreage, and rural lots. Whether you're looking to build your dream home, invest in land, or simply enjoy the great outdoors, we got you covered.`
  }),

  "cheap-homes": ({ state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      priceRange: `["","450000"]`
    },
    isRemoveNumbers: true,
    title: `${total} Cheap Homes for Sale in ${state} | ${sitename}`,
    description: `Find Cheap Homes for sale in ${state}. There are ${total} cheap homes for sale in ${state}. Contact a ${sitename} agent for more information`
  }),

  apartments: ({ state, sitename, total }) => ({
    filter: {
      listingsType: "For Rent",
      propertyType: `{"Residential":["Apartment"],"Commercial":[]}`
    },
    isRemoveNumbers: true,
    title: `Apartments for Rent in ${state} - ${total} Rentals in ${state} | ${sitename}`,
    description: `Explore ${total} apartments for rent in ${state} with photos, floor plans, and more. Contact a ${sitename} agent for full information`
  }),

  "luxury-homes": ({ state, sitename }) => ({
    filter: {
      listingsType: "For Sale",
      priceRange: `["850000",""]`
    },
    title: `Luxury Homes for Sale in ${state} | ${sitename}`,
    description: `Experience the exclusive world of ${state} luxury homes. Browse properties, check out photos, and make offers with ${sitename} agents`
  }),

  townhomes: ({ state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      propertyType: `{"Residential":["Townhouse"],"Commercial":[]}`
    },
    title: `${state} Townhomes & Townhouses For Sale | ${sitename}`,
    description: `Explore ${total} townhomes for sale in ${state} with photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  "townhomes-for-rent": ({ state, sitename, total }) => ({
    filter: {
      listingsType: "For Rent",
      propertyType: `{"Residential":["Townhouse"],"Commercial":[]}`
    },
    title: `${state} Townhomes & Townhouses For Rent | ${sitename}`,
    description: `Explore ${total} townhomes for rent in ${state} with photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  vintage: ({ state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      yearBuilt: `["","1960"]`
    },
    title: `${state} Old and Vintage Homes For Sale | ${sitename}`,
    description: `Explore ${total} Old and Vintage homes for sale in ${state} with photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  condo: ({ state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      propertyType: `{"Residential":["Condo"],"Commercial":[]}`
    },
    title: `${state} Condos For Sale | ${sitename}`,
    description: `Explore ${total} Condos for sale in ${state} with photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  "with-pool": ({ state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      features: `{"pool":true}`
    },
    title: `Homes For Sale in ${state} With Pool | ${sitename}`,
    description: `Explore ${total} homes for sale in ${state} with a pool, explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  /* "with-basement": ({ state, sitename, total }) => ({
    filter: {
      features: `{"basement":true}`
    },
    title: `Homes For Sale in ${state} With Basement | ${sitename}`,
    description: `Explore ${total} homes for sale in ${state} with a basement, explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }), */

  garage: ({ state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      features: `{"garage":true}`
    },
    title: `Homes For Sale in ${state} With Garage | ${sitename}`,
    description: `Explore ${total} homes for sale in ${state} with a garage, explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  "with-air-conditioning": ({ state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      features: `{"airConditioning":true}`
    },
    title: `Homes For Sale in ${state} With Air Conditioning | ${sitename}`,
    description: `Explore ${total} homes for sale in ${state} with Air Conditioning system, explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  "1-bedroom": ({ state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      beds: `["1"]`
    },
    title: `1 Bedroom Homes For Sale in ${state} | ${sitename}`,
    description: `Explore ${total} 1-bedroom homes for sale in ${state} with Air Conditioning system, explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  "2-bedrooms": ({ state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      beds: `["2"]`
    },
    title: `2 Bedrooms Homes For Sale in ${state} | ${sitename}`,
    description: `Explore ${total} 2-bedrooms homes for sale in ${state} with Air Conditioning system, explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  "3-bedrooms": ({ state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      beds: `["3"]`
    },
    title: `3 Bedrooms Homes For Sale in ${state} | ${sitename}`,
    description: `Explore ${total} 3-bedrooms homes for sale in ${state} with Air Conditioning system, explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  "4-bedrooms": ({ state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      beds: `["4"]`
    },
    title: `4 Bedrooms Homes For Sale in ${state} | ${sitename}`,
    description: `Explore ${total} 4-bedrooms homes for sale in ${state} with Air Conditioning system, explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  "5-bedrooms": ({ state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      beds: `["5"]`
    },
    title: `5 Bedrooms Homes For Sale in ${state} | ${sitename}`,
    description: `Explore ${total} 5-bedrooms homes for sale in ${state} with Air Conditioning system, explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  })
}
