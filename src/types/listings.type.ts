export interface MapMarker {
  Latitude: number
  ListPrice: number
  ListingKey: string
  Longitude: number
  Coordinates: number[]
}

export interface ListingsData {
  "@odata.count": number
  "@odata.nextLink": string
  value: ListingsValue[]
}

export interface ListingsValue {
  Count: number
  MFR_CalculatedListPriceByCalculatedSqFt: number
  MLSStatus: string
  "@odata.id": string
  AccessibilityFeatures: null
  AdditionalParcelsYN?: boolean
  Appliances: string[] | string | null
  ArchitecturalStyle: null
  AssociationAmenities: string[] | null
  AssociationFee: null
  AssociationFeeFrequency: null
  AssociationFeeIncludes: string[] | null
  AssociationName?: string
  AssociationYN: boolean | null
  AttachedGarageYN: boolean | null
  AvailabilityDate?: Date
  Basement: null
  BathroomsFull: number | null
  BathroomsHalf: number | null
  BathroomsOneQuarter: number | null
  BathroomsPartial: number | null
  BathroomsThreeQuarter: number | null
  BathroomsTotalDecimal: number | null
  BathroomsTotalInteger: number
  BedroomsTotal: number | null
  BodyType: null
  BuildingAreaTotal: number | null
  BuildingAreaUnits: null | string
  BusinessType: string[] | null
  BuyerAgencyCompensation: null | string
  BuyerAgentFirstName: null
  BuyerAgentFullName: null
  BuyerAgentLastName: null
  BuyerAgentMlsId: null
  BuyerOfficeMlsId: null
  BuyerOfficeName: null
  CarportSpaces: null
  CarportYN?: boolean
  City: null | string
  CloseDate: null
  ClosePrice: null
  CoBuyerAgentFirstName: null
  CoBuyerAgentFullName: null
  CoBuyerAgentLastName: null
  CoBuyerAgentMlsId: null
  CoBuyerOfficeMlsId: null
  CoBuyerOfficeName: null
  CoListAgentDirectPhone?: string
  CoListAgentFirstName: null
  CoListAgentFullName: null
  CoListAgentLastName: null
  CoListAgentMlsId: null
  CoListOfficeMlsId: null
  CoListOfficeName: null
  CommunityFeatures: string[] | null
  ConstructionMaterials: string[] | null
  Cooling: string[] | null
  CoolingYN: null
  Coordinates: number[]
  Country: string
  CountyOrParish: string
  CumulativeDaysOn: null
  CumulativeDaysOnMarket: number
  CurrentUse: string[] | null
  CustomFields: { [key: string]: string }
  DaysOnMarket: number
  DirectionFaces: null
  Directions: string
  Disclosures?: string[]
  DistanceToPhoneServiceNumeric: null
  DistanceToPhoneServiceUnits: null
  Electric: string[] | null
  ElementarySchool: null | string
  ElementarySchoolDistrict: null
  ExteriorFeatures: string[] | null
  Fencing: null
  FireplaceFeatures: null
  FireplaceYN: boolean | null
  FireplacesTotal: null
  Flooring: string[] | null
  FoundationDetails: null
  Furnished?: string
  GarageSpaces: number | null
  GarageYN?: boolean
  GreenBuildingVerificationKey?: null
  GreenBuildingVerificationType: null
  GreenVerificationBody?: null
  GreenVerificationMetric?: null
  GreenVerificationRating?: null
  GreenVerificationSource?: null
  GreenVerificationStatus?: null
  GreenVerificationURL?: null
  GreenVerificationVersion?: null
  GreenVerificationYear?: null
  Heating: string[] | null
  HeatingYN: null
  HighSchool: null | string
  HighSchoolDistrict: null
  HomeWarrantyYN: boolean
  IDXOfficeParticipationYN?: null
  ImageHeight?: null
  ImageOf?: null
  ImageSizeDescription?: null
  ImageWidth?: null
  InteriorFeatures: string[] | null
  InternetAddressDisplayYN: boolean
  InternetAutomatedValuationDisplayYN: boolean | null
  InternetConsumerCommentYN: boolean | null
  InternetEntireListingDisplayYN: boolean
  Latitude: number
  LaundryFeatures: null
  LeasableArea?: number
  LeasableAreaUnits?: string
  LeaseAmountFrequency?: string
  LeaseTerm?: string
  Levels: string[] | null
  ListAOR: string
  ListAgentAOR: string
  ListAgentDirectPhone: string
  ListAgentEmail: string
  ListAgentFax: string
  ListAgentFirstName: null
  ListAgentFullName: string
  ListAgentKey: string
  ListAgentLastName: null
  ListAgentMlsId: string
  ListAgentOfficePhoneExt: string
  ListAgentPager: string
  ListAgentPreferredPhone: null
  ListAgentURL?: string
  ListOfficeEmail: null
  ListOfficeFax?: string
  ListOfficeKey: string
  ListOfficeMlsId: string
  ListOfficeName: string
  ListOfficePhone: string
  ListOfficeURL?: string
  ListPrice: number
  ListingAgreement?: string
  ListingContractDate?: Date
  ListingId: string
  ListingKey: string
  ListingTerms?: string[]
  LivingArea: number | null
  LivingAreaSource: null
  LivingAreaUnits?: null
  LongDescription?: null
  Longitude: number
  LotFeatures: string[] | null
  LotSizeAcres: number
  LotSizeArea: number | null
  LotSizeDimensions: null | string
  LotSizeSquareFeet: number
  LotSizeUnits: null
  MLSAreaMajor: string
  MainOfficeKey?: null
  MainOfficeMlsId?: null
  MajorChangeType: null
  Media: Media[]
  MediaCategory?: null
  MediaKey?: null
  MediaModificationTimestamp?: null
  MediaStatus?: null
  MediaURL?: null
  MemberEmail?: null
  MemberFirstName?: null
  MemberFullName?: null
  MemberKey?: null
  MemberLastName?: null
  MemberLoginId?: null
  MemberMiddleName?: null
  MemberMlsId?: null
  MemberNameSuffix?: null
  MemberNickname?: null
  MemberPreferredPhone?: null
  MemberPreferredPhoneExt?: null
  MemberStateLicense?: null
  MemberStateLicenseState?: null
  MemberStatus?: null
  MiddleOrJuniorSchool: null | string
  MiddleOrJuniorSchoolDistrict: null
  MlgCanUse: string[]
  MlgCanView: boolean
  MlsStatus: string
  MobileLength: null
  MobileWidth: null
  ModificationTimestamp: Date
  NewConstructionYN: boolean | null
  NumberOfUnitsTotal: null
  OccupantType?: string
  OfficeAddress1?: null
  OfficeAddress2?: null
  OfficeBrokerKey?: null
  OfficeCity?: null
  OfficeKey?: null
  OfficeMlsId?: null
  OfficeName?: null
  OfficePhone?: null
  OfficePostalCode?: null
  OfficePostalCodePlus4?: null
  OfficeStateOrProvince?: null
  OfficeStatus?: null
  OnMarketDate: null
  OpenHouseDate?: null
  OpenHouseEndTime?: null
  OpenHouseKey?: null
  OpenHouseRemarks?: null
  OpenHouseStartTime?: null
  OpenHouseStatus?: null
  OpenHouseType?: null
  Order?: null
  OriginalEntryTimestamp: Date
  OriginalListPrice: number
  OriginatingSystemID?: null
  OriginatingSystemKey: string
  OriginatingSystemMediaKey?: null
  OriginatingSystemMemberKey?: null
  OriginatingSystemName: string
  OriginatingSystemOfficeKey?: null
  OtherEquipment?: string[]
  OtherStructures?: string[]
  OwnerPays?: string[]
  Ownership?: string
  ParcelNumber: string
  ParkName: null
  ParkingFeatures: string[] | null
  PatioAndPorchFeatures: string[] | null
  PetsAllowed?: string[]
  PhotosChangeTimestamp: Date
  PhotosCount: number
  PoolFeatures: string[] | null
  PoolPrivateYN: boolean | null
  PossibleUse: null
  PostalCode: null | string
  PostalCodePlus4: null | string
  PreviousListPrice: number
  PriceChangeTimestamp: Date
  PrivateRemarks?: string
  PropertyAttachedYN: null
  PropertyCondition?: string[]
  PropertySubType: null | string
  PropertyType: string
  PublicRemarks: string
  PublicSurveyRange?: string
  PublicSurveySection?: string
  Refreshments?: null
  RentIncludes: null
  ResourceName?: null
  ResourceRecordID?: null
  ResourceRecordKey?: null
  RoadFrontageType?: string[]
  Roof: string[] | null
  RoomType: null
  RoomsTotal: null
  SecurityFeatures?: string[]
  SeniorCommunityYN: boolean | null
  Sewer: string[] | null
  StructureType?: string
  ShortDescription?: null
  ShowingAgentKey?: null
  ShowingEndTime: null
  ShowingRequirements: string[]
  ShowingStartTimeLotSizeSquareFeet: null
  Skirt: null
  SourceSystemID?: null
  SourceSystemKey?: null
  SourceSystemMediaKey?: null
  SourceSystemMemberKey?: null
  SourceSystemName?: null
  SourceSystemOfficeKey?: null
  SpaFeatures: string[] | null
  SpaYN?: boolean
  SpecialListingConditions: string[] | null
  StandardStatus: string
  StateOrProvince: string
  StatusChangeTimestamp: Date
  Stories: null
  StoriesTotal: number | null
  StreetDirPrefix: null | string
  StreetDirSuffix: null
  StreetName: string
  StreetNumber: string
  StreetNumberNumeric: null
  StreetSuffix: null | string
  StreetSuffixModifier: null
  SubdivisionName: null | string
  TaxAnnualAmount: number
  TaxBlock?: string
  TaxBookNumber?: string
  TaxLegalDescription?: string
  TaxLot?: string
  TaxYear: number
  TenantPays?: string[]
  Topography: null
  Township?: string
  TransactionBrokerCompensation?: string
  UnitNumber: null | string
  UnitTypeType: null
  UniversalPropertyId: string
  UnparsedAddress: string
  Utilities: string[] | null
  Vegetation?: string[]
  View: string[] | null
  VirtualTourURLUnbranded: string
  WaterBodyName: null
  WaterSource: string[] | null
  WaterfrontFeatures?: string[]
  WaterfrontYN: boolean
  WindowFeatures: string[] | null
  YearBuilt: number | null
  YearBuiltEffective: null
  Zoning: null | string
  coordinates?: number[]
  full_address?: string
  latitude?: number
  location_extra_data?: LocationExtraData
  longitude?: number
  provider_name?: string
}

export interface Media {
  ImageHeight: number
  ImageSizeDescription: string
  ImageWidth: number
  LongDescription?: string
  MediaKey: string
  MediaModificationTimestamp: Date
  MediaType: string
  MediaURL: string
  Order: number
  Thumbnail: string
}

export interface LocationExtraData {
  osm_id: number
  osm_type: string
  place_id: number
  source: string
}
