import { getListingsData } from "@/services/listings/getListings"
import { removeCommaAndWhitespaceAtStart } from "@/utils/helpers"

export const dynamic = "force-dynamic"

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id.replace(/[^0-9]/g, "")

  const generateSitemap = async () => {
    const start = (+id - 1) * 5000
    const listings = await getListingsData({
      query: `?$top=2000&$skip=${start}&$orderby=OriginalEntryTimestamp desc&$select=ListingKey,UnparsedAddress,OriginalEntryTimestamp`
    })

    return listings.value
      .map((listing) => {
        const [address, subAddress] = removeCommaAndWhitespaceAtStart(
          listing.UnparsedAddress
        ).split(",", 2)

        return `<url><loc>${process.env.NEXT_PUBLIC_BASE_URL}/listings/${listing.ListingKey}${
          address
            ? `-${(address + subAddress).replace(/\s+/g, "-").replace(/[/\\]/g, "-").replace(/&/g, "&amp;")}`
            : ""
        }</loc>
        <lastmod>${listing.OriginalEntryTimestamp}</lastmod></url>`;
      })
      .join("");
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${await generateSitemap()}
    </urlset>`

  const response = new Response(xml, {
    status: 200,
    statusText: "ok"
  })

  response.headers.append("content-type", "text/xml")

  return response
}
