import type { Config } from "tailwindcss"

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        xs: "460px",
        sm: "576px"
      },
      boxShadow: {
        primary: "0px 0px 10px 0px rgba(0, 0, 0, 0.15)",
        secondary: "0px 2px 12px rgba(20, 20, 43, 0.08)",
        input: "0px 0px 5px rgba(0, 0, 0, 0.1)",
        search: "0px 0px 10px 1px rgba(0, 0, 0, 0.03)",
        "hero-filter": "0px 0px 15px 0px rgba(0, 0, 0, 0.15)",
        "about-img":
          "0px 14px 64px -4px rgba(24, 39, 75, 0.12), 0px 8px 22px -6px rgba(24, 39, 75, 0.12)",
        "services-video":
          "0px 14px 64px -4px rgba(24, 39, 75, 0.12), 0px 8px 22px -6px rgba(24, 39, 75, 0.12)",
        "home-agent-card": "0px 0px 45px 0px rgba(0, 0, 0, 0.25)"
      },
      colors: {
        primary: {
          1: "rgb(var(--color-primary-gradient-from))"
        },
        secondary: {
          1: "rgb(var(--color-secondary-gradient-from))"
        },
        gray: {
          1: "#F5F5F5",
          2: "#E6E6E6",
          3: "#D9D9D9",
          4: "#A7A7A7",
          5: "#A5A5A5",
          6: "#A4A4A4",
          7: "#9D9D9D",
          8: "#878787",
          9: "#7E7E7E",
          10: "#7D7D7D",
          11: "#737373",
          12: "#666666",
          13: "#646464",
          14: "#565656",
          15: "#555555",
          16: "#505050",
          17: "#454545",
          18: "#3C3C3C",
          19: "#373737",
          20: "#353535",
          21: "#333333",
          22: "#323232"
        }
      },

      backgroundImage: {
        solutionBg: "url('../assets/images/path.png')",
        servicesBg: "url('../assets/images/vector.svg')",
        "gradient-1":
          "linear-gradient(112deg, rgb(var(--color-primary-gradient-from)) 0%, rgb(var(--color-secondary-gradient-to)) 125.84%)",
        "gradient-3":
          "linear-gradient(126deg, rgb(var(--color-secondary-gradient-from)) 0%, rgb(var(--color-secondary-gradient-to)) 95.07%)",
        cityCardOverlay:
          "linear-gradient(180deg, rgb(var(--color-black-gradient-from) / 60%) 0%, rgb(var(--color-black-gradient-to) / 60%) 100%)",
        cityCardOverlayHover:
          "linear-gradient(180deg, rgb(var(--color-primary-gradient-from) / 50%) 0%, rgb(var(--color-secondary-gradient-from) / 60%) 100%)",
        presentationBgOverlay:
          "linear-gradient(180deg, rgb(var(--color-black-gradient-from) / 60%) 0%, rgb(var(--color-black-gradient-to) / 60%) 100%)",
        presentationOverlay:
          "linear-gradient(180deg, rgb(var(--color-secondary-gradient-from) / 40%) 0%, rgb(var(--color-secondary-gradient-to) / 40%) 100%)"
      },

      fontFamily: {
        sans: ["var(--font-open_sans)"]
      },
      fontSize: {
        "2xs": ".625rem", // 10px
        xs: ".75rem", // 12px
        sm: ".875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.375rem", // 22px
        "3xl": "1.5rem", // 24px
        "4xl": "1.75rem", // 28px
        "5xl": "2.25rem", // 36px
        "6xl": "3rem", // 48px
        "7xl": "4rem" // 64px
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries")
  ]
} satisfies Config
