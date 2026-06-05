export type Post = {
  id: number
  date: string
  date_gmt: string
  guid: {
    rendered: string
  }
  modified: string
  modified_gmt: string
  slug: string
  status: string
  type: string
  link: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
    protected: boolean
  }
  excerpt: {
    rendered: string
    protected: boolean
  }
  author: number
  featured_media: number
  comment_status: string
  ping_status: string
  template: string
  meta: unknown[] // You can specify the type of meta if known
  categories: number[]
  tags: unknown[] // You can specify the type of tags if known
  acf: unknown[] // You can specify the type of acf if known
  x_categories: string
  x_tags: string
  x_featured_media: string
  x_featured_media_medium: string
  x_featured_media_large: string
  x_featured_media_original: string
  x_date: string
  x_author: string
  x_gravatar: string
  x_metadata: {
    _thumbnail_id: string
  }
  _links: {
    self: unknown[] // You can specify the type of self if known
    collection: unknown[] // You can specify the type of collection if known
    about: unknown[] // You can specify the type of about if known
    author: {
      href: string
    }[] // You can specify the type of author if known
    replies: unknown[] // You can specify the type of replies if known
    "wp:featuredmedia": unknown[] // You can specify the type of wp:featuredmedia if known
    "wp:attachment": unknown[] // You can specify the type of wp:attachment if known
    "wp:term": unknown[] // You can specify the type of wp:term if known
    curies: unknown[] // You can specify the type of curies if known
  }
  _embedded: {
    author: unknown[] // You can specify the type of author if known
    "wp:featuredmedia": unknown[] // You can specify the type of wp:featuredmedia if known
    "wp:term": unknown[] // You can specify the type of wp:term if known
  }
}

export type BlogTag = {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: string
  meta: unknown[] // You can define the appropriate type for the 'meta' property if needed
  _links: {
    self: {
      href: string
    }[]
    collection: {
      href: string
    }[]
    about: {
      href: string
    }[]
    "wp:post_type": {
      href: string
    }[]
    curies: {
      name: string
      href: string
      templated: boolean
    }[]
  }
}

export type BlogData = {
  posts: Array<Post>
  totalPosts: number | string
}
