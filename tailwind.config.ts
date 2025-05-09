import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "var(--primary-color)",
          foreground: "hsl(var(--primary-foreground))",
          light: "var(--primary-light)",
          dark: "var(--primary-dark)",
        },
        secondary: {
          DEFAULT: "var(--secondary-color)",
          foreground: "hsl(var(--secondary-foreground))",
          dark: "var(--secondary-dark)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "var(--accent-color)",
          foreground: "hsl(var(--accent-foreground))",
          light: "var(--accent-light)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        text: {
          DEFAULT: "var(--text-color)",
          light: "var(--text-light)",
        },
        "light-text": "var(--light-text)",
        border2: "var(--border-color)",
        error: "var(--error-color)",
        "success-color": "var(--success-color)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)"],
        greatVibes: ["var(--font-great-vibes)"],
        montserrat: ["var(--font-montserrat)"],
      },
      animation: {
        pulse: "pulse 1.5s infinite alternate",
        float: "float 1s ease-out",
        shake: "shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both",
      },
      keyframes: {
        pulse: {
          "0%": { opacity: "0.7", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1.05)" },
        },
        float: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shake: {
          "10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
          "20%, 80%": { transform: "translate3d(2px, 0, 0)" },
          "30%, 50%, 70%": { transform: "translate3d(-4px, 0, 0)" },
          "40%, 60%": { transform: "translate3d(4px, 0, 0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
