import groupLogo from "@/assets/images/group-logo.png"
import agent1 from "@/assets/images/listing_agent_1.png"
import agent2 from "@/assets/images/listing_agent_2.png"
import agent3 from "@/assets/images/listing_agent_3.png"
import agent4 from "@/assets/images/listing_agent_4.png"
import agent5 from "@/assets/images/listing_agent_5.png"
import agent6 from "@/assets/images/listing_agent_6.png"
import agent7 from "@/assets/images/listing_agent_7.png"
import agent8 from "@/assets/images/listing_agent_8.png"
import agent9 from "@/assets/images/listing_agent_9.png"
import agent10 from "@/assets/images/listing_agent_10.png"

export type TAgentFeatured = (typeof agentsInfo.featured)[number]
export type TAgentSimple = (typeof agentsInfo.simple)[number]

export const agentsInfo = {
  featured: [
    {
      name: "Amy Lugand",
      photo: agent1,
      group: `site Agent`,
      rating: 5,
      group_logo: groupLogo,
      mlsAgentId: "1",
      phone: "(757) 696-1793",
      email: `AmyLugand@site.net`,
      about: "https://www.example.com/agent/amy-lugand",
      address: "11835 Fishing Point Drive, Newport News, VA 23606",
      website: ""
    },
    {
      name: "Lou Chirgott",
      photo: agent2,
      group: `site Agent`,
      rating: 5,
      group_logo: groupLogo,
      mlsAgentId: "2",
      phone: "(410) 216-5796",
      email: `LouChirgott@site.net`,
      about: "https://www.example.com/agent/lou-chirgott",
      address: "10766 York Rd Cockeysville MD 21030",
      website: ""
    }
  ],
  simple: [
    {
      name: "Harris M. Weingrad",
      photo: agent3,
      group: "RE/MAX Allegiance",
      rating: 5,
      mlsAgentId: "3",
      phone: "(202) 883-8572",
      email: `HarrisWeingrad@site.net`,
      about: "https://www.example.com/agent/harris-weingrad",
      address: "1720 Wisconsin Ave NW Washington, DC 20007",
      website: ""
    },
    {
      name: "Lenna Andreou",
      photo: agent4,
      group: "Centric Property Group",
      rating: 5,
      mlsAgentId: "",
      phone: "(410) 216-5796",
      email: "LennaAndreou@Centric.net",
      about: "https://www.example.com/agent/lenna-andreou",
      address: "Centric Property Group 1075 E Putnam Ave",
      website: ""
    },
    {
      name: "Jim Ward",
      photo: agent5,
      group: "Williams Properties",
      rating: 5,
      mlsAgentId: "",
      phone: "(917) 817-7385",
      email: `JimWard@site.net`,
      about: "https://www.example.com/agent/jim-ward",
      address: "Williams Properties 2777 Summer Street, Suite 700",
      website: ""
    },
    {
      name: "Lou Chirgott",
      photo: agent6,
      group: `site Agent`,
      rating: 5,
      mlsAgentId: "",
      phone: "(410) 216-5796",
      email: `LouChirgott@site.net`,
      about: "https://www.example.com/agent/lou-chirgott",
      address: "10766 York Rd Cockeysville MD 21030",
      website: ""
    },
    {
      name: "Lou Chirgott",
      photo: agent7,
      group: `site Agent`,
      rating: 5,
      mlsAgentId: "",
      phone: "(410) 216-5796",
      email: `LouChirgott@site.net`,
      about: "https://www.example.com/agent/lou-chirgott",
      address: "10766 York Rd Cockeysville MD 21030",
      website: ""
    },
    {
      name: "Lou Chirgott",
      photo: agent8,
      group: `site Agent`,
      rating: 5,
      mlsAgentId: "",
      phone: "(410) 216-5796",
      email: `LouChirgott@site.net`,
      about: "https://www.example.com/agent/lou-chirgott",
      address: "10766 York Rd Cockeysville MD 21030",
      website: ""
    },
    {
      name: "Lou Chirgott",
      photo: agent9,
      group: `site Agent`,
      rating: 5,
      mlsAgentId: "",
      phone: "(410) 216-5796",
      email: `LouChirgott@site.net`,
      about: "https://www.example.com/agent/lou-chirgott",
      address: "10766 York Rd Cockeysville MD 21030",
      website: ""
    },
    {
      name: "Lou Chirgott",
      photo: agent10,
      group: `site Agent`,
      rating: 5,
      mlsAgentId: "",
      phone: "(410) 216-5796",
      email: `LouChirgott@site.net`,
      about: "https://www.example.com/agent/lou-chirgott",
      address: "10766 York Rd Cockeysville MD 21030",
      website: ""
    }
  ]
}
