export interface MenuItem {
  id: string
  title: string
  href?: string
  type: "link" | "dropdown"
  options?: MenuItem[]
  description?: string
}

export const navLinks: MenuItem[] = [
  {
    id: "Listings",
    title: "Listings",
    href: "/listings",
    type: "link"
  },
  {
    id: "Agents",
    title: "Agents",
    href: "/agents",
    type: "link"
  },
  {
    id: "Contact",
    title: "Contact",
    href: "/contact",
    type: "link"
  },
  {
    id: "Blog",
    title: "Blog",
    href: "/blog",
    type: "link"
  }
]
