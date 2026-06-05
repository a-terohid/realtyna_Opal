import axios from 'axios'

export const getBlogPosts = async ({
  url,
  query
}: Partial<{
  url: string
  query: string
}>) => {
  return axios.get(url ?? `${process.env.NEXT_PUBLIC_WP_URL}${query ?? ''}`)
}
