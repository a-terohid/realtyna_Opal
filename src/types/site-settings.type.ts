type SiteIdentity = {
  light_logo: string
  dark_logo: string
  site_icon: string
  siteName: string
  title: string
  description: string
}

type Styles = {
  primary_color_hover: string
  primary_color_from: string
  primary_color_to: string
  secondary_color_hover: string
  secondary_color_from: string
  secondary_color_to: string
  neutral_color_hover: string
  neutral_color_from: string
  neutral_color_to: string
}

type Menus = {
  main_menu: string[]
  sidebar_blog_menu: string[]
  footer_menu: string[] | null
}

export type CountItem = {
  title: string
  subtitle: string
  id: string
}

type ServiceItem = {
  image_url: string
  id: string
}

export type Section = {
  title: string
  shadowTitle: string
  description?: string
  bgImage?: string
  bg_image?: string
  count?: CountItem[]
  video?: string
}

export type THomeData = {
  search: Section & {
    searchOnly: string
    titleDisplay: string
    subTitle: string
  }
  agency: Section & { image: string }
  solutions: Section
  services: Omit<Section, "count"> & { count: ServiceItem[] }
  blog_posts: Section & { buttonText: string }
  listings: Section
  cities: Section
  agents: Section
}

export type TSiteSettings = {
  site_identity: SiteIdentity
  styles: Styles
  menus: Menus
  home_sections: string[]
  home_data: THomeData
}
