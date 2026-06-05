import { globby } from "globby"

export const dynamic = "force-dynamic"

export async function GET() {
  const generateSitemap = async () => {
    const files = await globby([
      "src/app/\\(main\\)/**/*.{js,jsx,ts,tsx}",
      "!src/app/\\(main\\)/**/layout.{js,jsx,ts,tsx}",
      "!src/app/\\(main\\)/**/error.{js,jsx,ts,tsx}",
      "!src/app/\\(main\\)/**/api/**",
      "!src/app/\\(main\\)/**/[[]*]/**/*.{js,jsx,ts,tsx}",
      "!src/app/\\(main\\)/not-found.{js,jsx,ts,tsx}"
    ])

    return files
      .map((file) => {
        const url = file
          .replace("src/app/(main)", "")
          .replace(/\\/g, "/")
          .replace(".tsx", "")
          .replace(".ts", "")
          .replace(".jsx", "")
          .replace("/page", "")

        return `<url><loc>${process.env.NEXT_PUBLIC_BASE_URL}${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod></url>`
      })
      .join("\n")
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
