import type { MapynaGoogleConfig } from "mapyna"

import { getPropertyDetails } from "@/services/listings/getPropertyDetails"
import { getToken } from "@/services/listings/getToken"
import type { ListingsValue } from "@/types/listings.type"

import { removeCommaAndWhitespaceAtStart } from "./helpers"

export const handleMapConfig = async (lat: number, lng: number): Promise<MapynaGoogleConfig> => {
  return {
    elementId: "mapyna",
    gMapId: "81da06f4d5348d4c",
    clustering: {
      enabled: true
    },
    scrollWheel: false,
    defaultZoom: 10,
    defaultCenter: {
      lat,
      lng
    },
    dataSourceKey: {
      latitudeKey: "Latitude",
      longitudeKey: "Longitude",
      priceKey: "ListPrice",
      idKey: "ListingKey"
    },
    markerStyles: [
      {
        type: "price",
        textColor: "white",
        fontSize: 12,
        fontWeight: "700",
        stroke: 1,
        strokeColor: "rgb(var(--color-primary-gradient-hover))",
        fillColor: "rgb(var(--color-primary-gradient-from))",
        opacity: 1
      }
    ],
    spiderfy: {
      enabled: true,
      zoom: 13,
      options: {
        markersWontMove: true,
        markersWontHide: true,
        keepSpiderfied: true,
        circleSpiralSwitchover: 12,
        spiralFootSeparation: 20,
        spiralLengthStart: 11,
        spiralLengthFactor: 3.5,
        circleFootSeparation: 35,
        nearbyDistance: 10
      }
    },

    priceRender: (price: number) => {
      return Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      }).format(price)
    },
    rfEnabled: true,
    rfIntegration: {
      token: await getToken()
    },

    infoWindow: {
      enabled: true,
      trigger: "click",
      dataKey: "info_window",
      render: infoWindowHtml,
      caching: true
    },
    layers: {
      neighbourhoods: {
        enabled: true
      },
      schools: {
        enabled: true
      },
      zipcodes: {
        enabled: true
      }
    }
  }
}

async function infoWindowHtml(data: ListingsValue) {
  const property = await getPropertyDetails({
    id: data.ListingKey
  })

  const [address, subAddress] = removeCommaAndWhitespaceAtStart(property.UnparsedAddress).split(",", 2)

  const html = `
      <a class="grid bg-white rounded-md overflow-hidden shadow-sm" href="${`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listings/${property.ListingKey}${
        address ? `-${(address + subAddress).replace(/\s+/g, "-").replace(/[/\\]/g, "-")}` : ""
      }`}" target="_blank" title="${property.UnparsedAddress || ""}">
              <div class="w-full h-40" >
                ${property && property.Media && property.Media.length > 0 && `<img  src="${property.Media[0].Thumbnail}" class="w-full h-full object-cover"/>`}
              </div>
              <div class="grid gap-2 p-2">
                  <div class="grid gap-1">
                      <span class="font-bold text-primary-1">$${Intl.NumberFormat("en-US").format(property.ListPrice)}</span>
                      <div class="flex gap-2 text-sm font-medium text-gray-16">
                          <span>${property.BedroomsTotal || 0} Bed</span>
                          <span>${property.BathroomsTotalInteger || 0} Bath</span>
                      </div>
                  </div>
                  <div class="grid gap-1 text-sm text-gray-20">
                      <span>${property.UnparsedAddress.split(",")[0]}</span>
                      <span> ${property.City || ""} ${property.StateOrProvince || ""} ${property.PostalCode || ""}</span>
                  </div>
              </div>
      </a>
`

  return html
}
