/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        display: [
          "Public Sans",
          "var(--font-supreme)",
          ...defaultTheme.fontFamily.sans,
        ],
        sans: [
          "Public Sans",
          "var(--font-bespoke)",
          ...defaultTheme.fontFamily.sans,
        ],
        serif: ["Literata", ...defaultTheme.fontFamily.serif],
        mono: ["var(--font-jetbrains)", ...defaultTheme.fontFamily.serif],
      },
      boxShadow: {
        "4xl": [
          "0 10px 35px rgba(0, 0, 0, 0.05)",
          "0 10px 85px rgba(0, 0, 0, 0.05)",
        ],
      },
      width: {
        128: "32rem",
        144: "36rem",
        160: "40rem",
      },
      height: {
        128: "32rem",
        144: "36rem",
        160: "40rem",
      },
      maxHeight: {
        100: "28rem",
        128: "32rem",
        144: "36rem",
        160: "40rem",
      },
      maxWidth: {
        128: "32rem",
        144: "36rem",
        160: "40rem",
      },
      borderWidth: {
        12: "12px",
      },
      animation: {
        "come-in-out": "comeInOut 1200ms forwards",
        "sparkle-spin": "spin 1000ms linear",
      },
      keyframes: {
        comeInOut: {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(180deg)" },
        },
      },
    },
    colors: {
      transparent: "transparent",
      base: {
        black: "#100F0F",
        950: "#1C1B1A",
        900: "#282726",
        850: "#343331",
        800: "#403E3C",
        700: "#575653",
        600: "#6F6E69",
        500: "#878580",
        300: "#B7B5AC",
        200: "#CECDC3",
        150: "#DAD8CE",
        100: "#E6E4D9",
        50: "#F2F0E5",
        paper: "#FFFCF0",
      },
      red: {
        DEFAULT: "#AF3029",
        light: "#D14D41",
      },
      orange: {
        DEFAULT: "#BC5215",
        light: "#DA702C",
      },
      yellow: {
        DEFAULT: "#AD8301",
        light: "#D29614",
      },
      green: {
        DEFAULT: "#66800B",
        light: "#879A39",
      },
      cyan: {
        DEFAULT: "#24837B",
        light: "#3AA99F",
      },
      blue: {
        DEFAULT: "#205EA6",
        light: "#4385BE",
      },
      purple: {
        DEFAULT: "#5E409D",
        light: "#8B7EC8",
      },
      magenta: {
        DEFAULT: "#A02F6F",
        light: "#CE5D97",
      },
      blueColl: {
        DEFAULT: "#009CFF",
        light: "#009CFF",
      },
      tealColl: {
        DEFAULT: "#008C7D",
        light: "#008C7D",
      },
      greenColl: {
        DEFAULT: "#009343",
        light: "#009343",
      },
      oliveColl: {
        DEFAULT: "#9ABC32",
        light: "#9ABC32",
      },
      yellowColl: {
        DEFAULT: "#EEDA0B",
        light: "#EEDA0B",
      },
      orangeColl: {
        DEFAULT: "#FF980B",
        light: "#FF980B",
      },
      redColl: {
        DEFAULT: "#FF5D08",
        light: "#FF5D08",
      },
    },
  },
  plugins: [],
};
