import { getListingsData } from "@/services/listings/getListings"

export async function GET() {
  const listings = await getListingsData({})

  const listingsPageCount = listings["@odata.count"] / 5000

  const sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url><loc>${process.env.NEXT_PUBLIC_BASE_URL}/pages-sitemap.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
     </url>
        ${Array.from({ length: listingsPageCount }, (_, i) => i + 1)
          .map(
            (id) =>
              ` <url><loc>${process.env.NEXT_PUBLIC_BASE_URL}/listings-sitemap/${id}.xml</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
            </url>`
          )
          .join("")} 
    </urlset>`

  return new Response(sitemapIndexXML, {
    headers: { "Content-Type": "text/xml" }
  })
}
