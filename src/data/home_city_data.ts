import type { StaticImageData } from "next/image"

import city_1 from "@/assets/images/city-1.webp"
import city_2 from "@/assets/images/city-2.webp"
import city_3 from "@/assets/images/city-3.webp"
import city_4 from "@/assets/images/city-4.webp"
import city_5 from "@/assets/images/city-5.webp"
import city_6 from "@/assets/images/city-6.webp"
import city_7 from "@/assets/images/city-7.webp"
import city_8 from "@/assets/images/city-8.webp"
import city_9 from "@/assets/images/city-9.webp"
import agent from "@/assets/images/listing_agent_3.png"
import agent1 from "@/assets/images/listing_agent_4.png"
import agent2 from "@/assets/images/listing_agent_5.png"
import agent9 from "@/assets/images/listing_agent_6.png"
import agent7 from "@/assets/images/listing_agent_7.png"
import agent8 from "@/assets/images/listing_agent_8.png"
import agent6 from "@/assets/images/listing_agent_9.png"
import agent3 from "@/assets/images/listing_agent_10.png"
import agent5 from "@/assets/images/listing_agent_11.png"
import agent4 from "@/assets/images/listing_agent_13.png"

export type TCityData = (typeof cityListData)[number][number]

export const cityListData = [
  [
    {
      img: city_1,
      title: "Los Angeles",
      desc: " Los Angeles, California, United States",
      state: "CA",
      city: "Los Angeles",
      neighborhood: "",
      agents: [agent, agent1, agent2, agent3, agent4],
      listings: 96,
      gallery: 69,
      justify: "justify-end",
      customClass: "h-[295px]",
      center: {
        lat: 34.052235,
        lng: -118.243683
      },
      viewport: {
        northeast: { lat: 34.259148, lng: -118.223021 },
        southwest: { lat: 33.763591, lng: -118.459162 }
      }
    },
    {
      img: city_2,
      title: "Chicago",
      desc: "Chicago, Illinois, United States",
      city: "Chicago",
      neighborhood: "",
      state: "IL",
      agents: [agent5, agent6, agent7, agent8, agent9],
      listings: 96,
      gallery: 69,
      justify: "justify-end",
      customClass: "h-[426px]",
      center: {
        lat: 41.878114,
        lng: -87.629798
      },
      viewport: {
        northeast: { lat: 42.060257, lng: -87.497918 },
        southwest: { lat: 41.71161, lng: -87.931657 }
      }
    }
  ],
  [
    {
      img: city_3,
      title: "Philadelphia",
      desc: "Philadelphia, Pennsylvania, United States",
      city: "Philadelphia",
      neighborhood: "",
      state: "PA",
      agents: [agent2, agent3, agent7, agent1, agent4],
      listings: 96,
      gallery: 69,
      justify: "justify-between",
      customClass: "h-[217px]",
      center: {
        lat: 39.952583,
        lng: -75.165222
      },
      viewport: {
        northeast: { lat: 40.09908, lng: -74.924533 },
        southwest: { lat: 39.791071, lng: -75.318796 }
      }
    },
    {
      img: city_4,
      title: "Dallas",
      desc: "Dallas, Texas, United States",
      city: "Dallas",
      neighborhood: "",
      state: "TX",
      agents: [agent2, agent3, agent7, agent1, agent4],
      listings: 96,
      gallery: 69,
      justify: "justify-end",
      customClass: "h-[225px]",
      center: {
        lat: 32.776664,
        lng: -96.796988
      },
      viewport: {
        northeast: { lat: 32.801379, lng: -96.769985 },
        southwest: { lat: 32.748993, lng: -96.880982 }
      }
    },
    {
      img: city_5,
      title: "Atlanta",
      desc: "Atlanta, Georgia, United States",
      city: "Atlanta",
      neighborhood: "",
      state: "GA",
      agents: [agent2, agent3, agent7, agent1, agent4],
      listings: 96,
      gallery: 69,
      justify: "justify-between",
      customClass: "h-[253px]",
      center: {
        lat: 33.748995,
        lng: -84.387982
      },
      viewport: {
        northeast: { lat: 33.805423, lng: -84.323453 },
        southwest: { lat: 33.708719, lng: -84.483355 }
      }
    }
  ],
  [
    {
      img: city_6,
      title: "New York",
      desc: "New York, New York, United States",
      neighborhood: "",
      city: "New York",
      state: "NY",
      agents: [agent2, agent3, agent7, agent1, agent4],
      listings: 96,
      gallery: 69,
      justify: "justify-end",
      customClass: "h-[402px]",
      center: {
        lat: 40.73061,
        lng: -73.935242
      },
      viewport: {
        northeast: { lat: 40.776745, lng: -73.810433 },
        southwest: { lat: 40.484086, lng: -74.280779 }
      }
    },
    {
      img: city_7,
      title: "San Francisco",
      desc: "San Francisco, California, United States",
      city: "San Francisco",
      neighborhood: "",
      state: "CA",
      agents: [agent2, agent3, agent7, agent1, agent4],
      listings: 96,
      gallery: 69,
      justify: "justify-between",
      customClass: "h-[319px]",
      center: {
        lat: 37.774929,
        lng: -122.419418
      },
      viewport: {
        northeast: { lat: 37.839876, lng: -122.32526 },
        southwest: { lat: 37.696369, lng: -122.545813 }
      }
    }
  ],
  [
    {
      img: city_8,
      title: "Seattle",
      desc: "Seattle, Washington, United States",
      city: "Seattle",
      neighborhood: "",
      state: "WA",
      agents: [agent2, agent3, agent7, agent1, agent4],
      listings: 96,
      gallery: 69,
      justify: "justify-between",
      customClass: "h-[465px]",
      center: {
        lat: 47.606209,
        lng: -122.332071
      },
      viewport: {
        northeast: { lat: 47.72888, lng: -122.22185 },
        southwest: { lat: 47.45581, lng: -122.53896 }
      }
    },
    {
      img: city_9,
      title: "Miami",
      desc: "Miami, Florida, United States",
      city: "Miami",
      neighborhood: "",
      state: "FL",
      agents: [agent6, agent3, agent4, agent, agent1],
      listings: 96,
      gallery: 69,
      justify: "justify-between",
      customClass: "h-[256px]",
      center: {
        lat: 25.761681,
        lng: -80.191788
      },
      viewport: {
        northeast: { lat: 25.85577296340989, lng: -80.13915704434103 },
        southwest: { lat: 25.7090419531335, lng: -80.3197599155301 }
      }
    }
  ]
]
