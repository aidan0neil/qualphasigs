import type { Config } from "tailwindcss";

/**
 * Design system for the Alpha Sigma Phi – Theta Tau chapter site.
 *
 * Palette is intentionally restrained and institutional:
 *  - `navy`      → deep, near-black base used for hero + footer
 *  - `cardinal`  → Alpha Sigma Phi's Cardinal accent (used sparingly)
 *  - `stone`     → warm neutral grays for body + surfaces
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        navy: {
          50: "#f2f5f9",
          100: "#e3e9f1",
          200: "#c3cfe0",
          300: "#94a8c6",
          400: "#5f7aa4",
          500: "#3f5885",
          600: "#31456b",
          700: "#293857",
          800: "#1c2740",
          900: "#111a2e",
          950: "#0a1120",
        },
        cardinal: {
          50: "#fcf3f4",
          100: "#fae4e6",
          200: "#f4ccd1",
          300: "#eba7b0",
          400: "#dd7583",
          500: "#c94a5c",
          600: "#a4243b",
          700: "#8c1d2c",
          800: "#761c29",
          900: "#651b27",
          950: "#380a11",
        },
        stone: {
          50: "#faf9f7",
          100: "#f3f1ed",
          200: "#e7e3dc",
          300: "#d5cec2",
          400: "#b3a996",
          500: "#968b76",
          600: "#7c715e",
          700: "#655c4d",
          800: "#544d42",
          900: "#48423a",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["Georgia", "'Times New Roman'", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,17,32,0.04), 0 8px 24px -12px rgba(10,17,32,0.15)",
        "card-hover":
          "0 2px 4px rgba(10,17,32,0.06), 0 16px 40px -16px rgba(10,17,32,0.28)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
