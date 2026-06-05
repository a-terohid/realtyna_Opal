/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH.slice(0, -1) || "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH.slice(0, -1) || "",
  images: {
    minimumCacheTTL: 3600, // 1 hour
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "openweathermap.org",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "dx41nk9nsacii.cloudfront.net",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "deandevsite.realtyna.info",
        pathname: "/**"
      },
      {
        protocol: "http",
        hostname: "deandevsite.realtyna.info",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "realtyfeed.s3.amazonaws.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "**.realtyna.info",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "cdn.realtyfeed.com",
        pathname: "/**"
      }
    ]
  }
}

module.exports = nextConfig