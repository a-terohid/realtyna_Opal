import Image from "next/image"

import placeholder from "@/assets/images/placeholder.png"
import { getSiteSettings } from "@/services/theme/getSiteSettings"

import NewsLetter from "../NewsLetter/NewsLetter"
import FeaturedAgents from "./FeaturedAgents/FeaturedAgents"
import Header from "./Header/Header"
import Hero from "./Hero/Hero"
import HomeAgency from "./HomeAgency/HomeAgency"
import HomeListings from "./HomeListings/HomeListings"
import HomeServices from "./HomerServices/HomerServices"
import HomeSolutions from "./HomeSolutions/HomeSolutions"
import LatestBlogPosts from "./LatestBlogPosts/LatestBlogPosts"
import PopularCities from "./PopularCities/PopularCities"

const HomeContainer = async () => {
  const { home_data, home_sections } = await getSiteSettings()

  return (
    <div className="flex w-full flex-col items-center justify-start gap-7">
      <div className="relative w-full bg-black">
        {(home_data.search.bgImage || home_data.search.bg_image) && (
          <Image
            className="object-cover"
            priority={true}
            fill
            src={home_data.search.bgImage || home_data.search.bg_image || placeholder}
            alt="hero_bg"
          />
        )}
        {(home_data.search.bgImage || home_data.search.bg_image) && (
          <div className="absolute inset-0 bg-black mix-blend-multiply after:absolute after:inset-0 after:bg-secondary-1" />
        )}

        <Header isHomePage={true} />
        <Hero />
      </div>
      <div className="flex w-full flex-col items-center justify-start gap-24">
        {home_sections.includes("agency") && (
          <HomeAgency agencyData={home_data.agency} />
        )}
        {home_sections.includes("solutions") && (
          <HomeSolutions data={home_data.solutions} />
        )}
        {(home_sections.includes("services") ||
          home_sections.includes("listings")) && (
          <div className="flex w-full flex-col items-center justify-start">
            {home_sections.includes("services") && (
              <HomeServices data={home_data.services} />
            )}
            {home_sections.includes("listings") && (
              <HomeListings
                data={home_data.listings}
                isServicesExist={home_sections.includes("services")}
              />
            )}
          </div>
        )}
        {home_sections.includes("cities") && (
          <PopularCities data={home_data.cities} />
        )}
        {home_sections.includes("agents") && (
          <FeaturedAgents data={home_data.agents} />
        )}
        {home_sections.includes("blog-posts") && (
          <LatestBlogPosts data={home_data.blog_posts} />
        )}
      </div>
      <NewsLetter />
    </div>
  )
}

export default HomeContainer
