/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Playfair Display"', "Georgia", "serif"],
        script: ['"Allura"', "cursive"],
      },
      colors: {
        ink: {
          950: "#050507",
          900: "#0a0a0f",
          800: "#12121a",
          700: "#1b1b26",
        },
        gold: {
          400: "#d4af37",
          500: "#c5a028",
        },
      },
      backgroundImage: {
        noise: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        flow: {
          "0%": { transform: "translateX(-50%) translateY(-50%) rotate(0deg)" },
          "100%": { transform: "translateX(-50%) translateY(-50%) rotate(360deg)" },
        },
        aurora: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "100%": { transform: "translate(10%,-10%) scale(1.1)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        expandWidth: {
          to: { width: "100px" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        flow: "flow 3s ease-in-out infinite",
        aurora: "aurora 10s ease infinite alternate",
        floaty: "floaty 8s ease-in-out infinite",
        expandWidth: "expandWidth 2s ease-out forwards",
      },
    },
  },
  plugins: [],
};
