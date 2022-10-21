/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      peach: "hsl(11, 73%, 66%)",
      black: "hsl(270, 3%, 11%)",
      trueblack: "hsl(0, 0%, 0%)",
      white: "hsl(0, 0%, 100%)",
      cream: "hsl(14, 76%, 97%)",
      "light-peach": "hsl(11, 100%, 80%)",
      "dark-grey": "hsl(264, 5%, 20%)",
      "light-grey": "hsl(210, 17%, 95%)",
      transparent: "transparent",
    },
    fontFamily: {
      sans: ["Jost", "Jost-fallback"],
    },
    fontSize: {
      h1: [
        "calc(48rem/16)",
        { lineHeight: 1, letterSpacing: 0, fontWeight: 500 },
      ],
      h2: [
        "calc(40rem/16)",
        {
          lineHeight: "calc(48rem/16)",
          letterSpacing: "calc(2rem/16)",
          fontWeight: 500,
        },
      ],
      h3: [
        "calc(32rem/16)",
        {
          lineHeight: "calc(36rem/16)",
          letterSpacing: 0,
          fontWeight: 500,
        },
      ],
      h4: [
        "calc(24rem/16)",
        {
          lineHeight: "calc(25rem/16)",
          letterSpacing: "calc(2rem/16)",
          fontWeight: 400,
        },
      ],
      h5: [
        "calc(20rem/16)",
        {
          lineHeight: "calc(26rem/16)",
          letterSpacing: "calc(5rem/16)",
          fontWeight: 500,
        },
      ],
      h6: [
        "calc(15rem/16)",
        {
          letterSpacing: "calc(1rem/16)",
          fontWeight: 500,
        },
      ],
      body: [
        "calc(16rem/16)",
        {
          lineHeight: "calc(26rem/16)",
          letterSpacing: 0,
          fontWeight: 400,
        },
      ],
      body2: [
        "calc(15rem/16)",
        {
          lineHeight: "calc(25rem/16)",
          letterSpacing: 0,
          fontWeight: 400,
        },
      ],
      body3: [
        "calc(14rem/16)",
        {
          lineHeight: "calc(14rem/16)",
          letterSpacing: "calc(2rem/16)",
          fontWeight: 400,
        },
      ],
    },
    screens: {
      tablet: "768px",
      desktop: "1440px",
    },
    extend: {
      spacing: {
        3.5: "0.875rem",
        7.5: "1.875rem",
        17: "4.25rem",
        18: "4.5rem",
        25: "6.25rem",
        26: "6.5rem",
        41: "10.25rem",
        50: "12.5rem",
        93: "23.25rem",
      },
      transitionProperty: {
        visibility: "visibility, opacity",
      },
      animation: {
        fadeIn: "fadeIn 300ms ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      dropShadow: {
        hero: "20px -40px 80px rgba(93, 2, 2, 0.7)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-logical"),
    require("tailwindcss-skip-link")(),
  ],
};
