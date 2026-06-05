export type TPropertyType = {
  propSubTypes: string[]
  propTypes: { forRent: string[]; forSale: string[] }
  id: string
  name: string
}

export const propertyTypesCommercialData: TPropertyType[] = [
  {
    id: "Retail",
    name: "Retail",
    propSubTypes: ["Retail"],
    propTypes: {
      forRent: ["CommercialLease"],
      forSale: ["CommercialSale"]
    }
  },
  {
    id: "MultiFamilyCommercial",
    name: "Multi Family",
    propSubTypes: ["MultiFamily"],
    propTypes: {
      forRent: ["CommercialLease"],
      forSale: ["CommercialSale"]
    }
  },
  {
    id: "Office",
    name: "Office",
    propSubTypes: ["Office"],
    propTypes: {
      forRent: ["CommercialLease", "BusinessOpportunity"],
      forSale: ["CommercialSale", "BusinessOpportunity"]
    }
  },
  {
    id: "Industrial",
    name: "Industrial",
    propSubTypes: ["Industrial"],
    propTypes: {
      forRent: ["CommercialLease", "BusinessOpportunity"],
      forSale: ["CommercialSale", "BusinessOpportunity"]
    }
  },
  {
    id: "Hospitality",
    name: "Hospitality",
    propSubTypes: ["HotelMotel"],
    propTypes: {
      forRent: ["CommercialLease", "BusinessOpportunity"],
      forSale: ["CommercialSale", "BusinessOpportunity"]
    }
  },
  {
    id: "MixedUse",
    name: "Mixed Use",
    propSubTypes: ["MixedUse"],
    propTypes: {
      forRent: ["CommercialLease", "BusinessOpportunity"],
      forSale: ["CommercialSale", "BusinessOpportunity"]
    }
  },
  {
    id: "Business",
    name: "Business",
    propSubTypes: ["Business"],
    propTypes: {
      forRent: ["CommercialLease", "BusinessOpportunity", "ManufacturedInPark"],
      forSale: ["CommercialSale", "BusinessOpportunity", "ManufacturedInPark"]
    }
  },
  {
    id: "WareHouse",
    name: "WareHouse",
    propSubTypes: ["Warehouse"],
    propTypes: {
      forRent: ["CommercialLease", "BusinessOpportunity"],
      forSale: ["CommercialSale", "BusinessOpportunity"]
    }
  },
  {
    id: "Land",
    name: "Land",
    propSubTypes: ["Agriculture", "UnimprovedLand"],
    propTypes: {
      forRent: ["CommercialLease", "Land", "Farm"],
      forSale: ["CommercialSale", "BusinessOpportunity", "Land", "Farm"]
    }
  }
]

export const propertyTypesResidentialData: TPropertyType[] = [
  {
    id: "SingleFamilyResidence",
    name: "SingleFamily",
    propSubTypes: ["SingleFamilyResidence"],
    propTypes: {
      forRent: ["ResidentialLease"],
      forSale: ["Residential"]
    }
  },
  {
    id: "House",
    name: "House",
    propSubTypes: ["Duplex", "Quadruplex", "Triplex"],
    propTypes: {
      forRent: ["ResidentialLease"],
      forSale: ["Residential", "ResidentialIncome"]
    }
  },
  {
    id: "Apartment",
    name: "Apartment",
    propSubTypes: ["Apartment"],
    propTypes: {
      forRent: ["ResidentialLease"],
      forSale: ["Residential"]
    }
  },

  {
    id: "Townhouse",
    name: "Townhouse",
    propSubTypes: ["Townhouse"],
    propTypes: {
      forRent: ["ResidentialLease"],
      forSale: ["Residential"]
    }
  },
  {
    id: "Condo",
    name: "Condo",
    propSubTypes: ["Condominium"],
    propTypes: {
      forRent: ["ResidentialLease"],
      forSale: ["Residential"]
    }
  },
  {
    id: "Manufactured",
    name: "Manufactured",
    propSubTypes: ["ManufacturedHome", "ManufacturedOnLand", "MobileHome"],
    propTypes: {
      forRent: ["ResidentialLease"],
      forSale: ["Residential", "ManufacturedInPark"]
    }
  },
  {
    id: "Co-op",
    name: "Co-op",
    propSubTypes: ["StockCooperative"],
    propTypes: {
      forRent: ["ResidentialLease"],
      forSale: ["Residential"]
    }
  },
  {
    id: "Ranch/Farm",
    name: "Ranch/Farm",
    propSubTypes: ["Ranch"],
    propTypes: {
      forRent: ["Land", "Farm", "ResidentialLease"],
      forSale: ["Land", "Farm", "Residential"]
    }
  },
  {
    id: "Other",
    name: "Other",
    propSubTypes: [
      "BoatSlip",
      "Cabin",
      "OwnYourOwn",
      "Timeshare",
      "DeededParking"
    ],
    propTypes: {
      forRent: ["ResidentialLease", "Land", "Farm", "BusinessOpportunity"],
      forSale: ["Residential", "Land", "Farm", "BusinessOpportunity"]
    }
  }
]
