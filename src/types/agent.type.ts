export interface AgentData {
  error: string
  is_success: boolean
  message_code: string
  result: AgentValue
}

export interface AgentValue {
  area_of_interest: string[]
  bio: string
  company: string
  coordinates: Coordinates
  email: string
  expertise: string[]
  facebook: string
  first_name: string
  full_address: string
  id: number
  instagram: string
  last_name: string
  linkedin: string
  mls_logo: string
  personal_phone: string
  professional_phone: string
  professional_email: string
  profile_picture: string
  tiktok: string
  twitter: string
  url: string
  user_config: UserConfig
  user_professions: string
  username: string
  youtube: string
}

export interface Coordinates {
  latitude: number
  longitude: number
}

export interface UserConfig {
  creation_date: Date
  filters_and_limitations: FiltersAndLimitations
  media_source: string
  modification_date: Date
  username: string
}

export interface FiltersAndLimitations {
  "3": The3
}

export interface The3 {
  filters: Filters
  limitations: Limitations
  mls_name: string
}

export interface Filters {
  ListPrice: Limitations
}

export interface Limitations {}
