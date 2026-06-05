type citySubRoutesParams = {
  city?: string
  state?: string
  sitename?: string
  total?: number
}

export type citySubRoutes = {
  [key: string]: (params: citySubRoutesParams) => {
    filter: Record<string, string>
    title: string
    description: string
    isRemoveNumbers?: boolean
  }
}

export const cityPageSubRoutes: citySubRoutes = {
  "for-rent": ({ city, state, sitename, total }) => ({
    filter: {
      listingsType: "For Rent"
    },
    title: `${city}, ${state} Homes for Rent | ${sitename}`,
    description: `There are currently ${total} homes for sale in ${city}, ${state}. Explore and find your perfect match. View listing photos, Review property details, and Contact a ${sitename} agent for more information`
  }),

  "new-listings": ({ city, state, sitename, total }) => ({
    filter: {
      listingsDOM: "15"
    },
    title: `New ${city}, ${state} Real Estate Listings | ${sitename}`,
    description: `Find new Homes for sale in ${city}, ${state}. There are ${total} homes for sale in ${city}, ${state} that haves been here for only the past 14 days.Contact a ${sitename} agent for more information`
  }),

  land: ({ city, state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      propertyType: `{"Residential":[],"Commercial":["Land"]}`
    },
    isRemoveNumbers: true,
    title: `${city}, ${state} Land & Lots For Sale - ${total} Listings | ${sitename}`,
    description: `Search for land & lots for sale at ${sitename}, including lots, acreage, and rural lots. Whether you're looking to build your dream home, invest in land, or simply enjoy the great outdoors, we got you covered.`
  }),

  "cheap-homes": ({ city, state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      priceRange: `["","450000"]`
    },
    isRemoveNumbers: true,
    title: `${total} Cheap Homes for Sale in ${city}, ${state} | ${sitename}`,
    description: `Find Cheap Homes for sale in ${city}, ${state}. There are ${total} cheap homes for sale in ${city}, ${state}. Contact a ${sitename} agent for more information`
  }),

  apartments: ({ city, state, sitename, total }) => ({
    filter: {
      listingsType: "For Rent",
      propertyType: `{"Residential":["Apartment"],"Commercial":[]}`
    },
    isRemoveNumbers: true,
    title: `Apartments for Rent in ${city}, ${state} - ${total} Rentals in ${city}, ${state} | ${sitename}`,
    description: `Explore ${total} apartments for rent in ${city}, ${state} with photos, floor plans, and more. Contact a ${sitename} agent for full information`
  }),

  "luxury-homes": ({ city, state, sitename }) => ({
    filter: {
      listingsType: "For Sale",
      priceRange: `["850000",""]`
    },
    title: `Luxury Homes for Sale in ${city}, ${state} | ${sitename}`,
    description: `Experience the exclusive world of ${city}, ${state} luxury homes. Browse properties, check out photos, and make offers with ${sitename} agents`
  }),

  townhomes: ({ city, state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      propertyType: `{"Residential":["Townhouse"],"Commercial":[]}`
    },
    title: `${city}, ${state} Townhomes & Townhouses For Sale | ${sitename}`,
    description: `Explore ${total} townhomes for sale in ${city}, ${state} with photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  "townhomes-for-rent": ({ city, state, sitename, total }) => ({
    filter: {
      listingsType: "For Rent",
      propertyType: `{"Residential":["Townhouse"],"Commercial":[]}`
    },
    title: `${city}, ${state} Townhomes & Townhouses For Rent | ${sitename}`,
    description: `Explore ${total} townhomes for rent in ${city}, ${state} with photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  vintage: ({ city, state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      yearBuilt: `["","1960"]`
    },
    title: `${city}, ${state} Old and Vintage Homes For Sale | ${sitename}`,
    description: `Explore ${total} Old and Vintage homes for sale in ${city}, ${state} with photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  condo: ({ city, state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      propertyType: `{"Residential":["Condo"],"Commercial":[]}`
    },
    title: `${city}, ${state} Condos For Sale | ${sitename}`,
    description: `Explore ${total} Condos for sale in ${city}, ${state} with photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  "with-pool": ({ city, state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      features: `{"pool":true}`
    },
    title: `Homes For Sale in ${city}, ${state} With Pool | ${sitename}`,
    description: `Explore ${total} homes for sale in ${city}, ${state} with a pool, explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  /* "with-basement": ({ city, state, sitename, total }) => ({
      filter: {
        features: `{"basement":true}`
      },
      title: `Homes For Sale in ${city}, ${state} With Basement | ${sitename}`,
      description: `Explore ${total} homes for sale in ${city}, ${state} with a basement, explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
    }), */

  garage: ({ city, state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      features: `{"garage":true}`
    },
    title: `Homes For Sale in ${city}, ${state} With Garage | ${sitename}`,
    description: `Explore ${total} homes for sale in ${city}, ${state} with a garage, explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  "with-air-conditioning": ({ city, state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      features: `{"airConditioning":true}`
    },
    title: `Homes For Sale in ${city}, ${state} With Air Conditioning | ${sitename}`,
    description: `Explore ${total} homes for sale in ${city}, ${state} with Air Conditioning system, explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  "1-bedroom": ({ city, state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      beds: `["1"]`
    },
    title: `1 Bedroom Homes For Sale in ${city}, ${state} | ${sitename}`,
    description: `Explore ${total} 1-bedroom homes for sale in ${city}, ${state} with Air Conditioning system, explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  "2-bedrooms": ({ city, state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      beds: `["2"]`
    },
    title: `2 Bedrooms Homes For Sale in ${city}, ${state} | ${sitename}`,
    description: `Explore ${total} 2-bedrooms homes for sale in ${city}, ${state} with Air Conditioning system, explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  "3-bedrooms": ({ city, state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      beds: `["3"]`
    },
    title: `3 Bedrooms Homes For Sale in ${city}, ${state} | ${sitename}`,
    description: `Explore ${total} 3-bedrooms homes for sale in ${city}, ${state} with Air Conditioning system, explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  "4-bedrooms": ({ city, state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      beds: `["4"]`
    },
    title: `4 Bedrooms Homes For Sale in ${city}, ${state} | ${sitename}`,
    description: `Explore ${total} 4-bedrooms homes for sale in ${city}, ${state} with Air Conditioning system, explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  "5-bedrooms": ({ city, state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      beds: `["5"]`
    },
    title: `5 Bedrooms Homes For Sale in ${city}, ${state} | ${sitename}`,
    description: `Explore ${total} 5-bedrooms homes for sale in ${city}, ${state} with Air Conditioning system, explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  "under-500000": ({ city, state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      priceRange: `["","500000"]`
    },
    title: `Homes for sale Under $500k in ${city}, ${state} | ${sitename}`,
    description: `Explore ${total} homes for sale under 500K in San Diego. Explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  "under-600000": ({ city, state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      priceRange: `["","600000"]`
    },
    title: `Homes for sale Under $600k in ${city}, ${state} | ${sitename}`,
    description: `Explore ${total} homes for sale under 600K in San Diego. Explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  "under-700000": ({ city, state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      priceRange: `["","700000"]`
    },
    title: `Homes for sale Under $700k in ${city}, ${state} | ${sitename}`,
    description: `Explore ${total} homes for sale under 700K in San Diego. Explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  "under-800000": ({ city, state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      priceRange: `["","800000"]`
    },
    title: `Homes for sale Under $800k in ${city}, ${state} | ${sitename}`,
    description: `Explore ${total} homes for sale under 800K in San Diego. Explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  }),

  "under-900000": ({ city, state, sitename, total }) => ({
    filter: {
      listingsType: "For Sale",
      priceRange: `["","900000"]`
    },
    title: `Homes for sale Under $900k in ${city}, ${state} | ${sitename}`,
    description: `Explore ${total} homes for sale under 900K in San Diego. Explore photos, floor plans, and more. Contact a ${sitename} agent for full information.`
  })
}
