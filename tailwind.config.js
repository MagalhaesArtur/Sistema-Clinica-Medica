/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {},
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      telaMedia: "1200px",
      telaGrande: "1400px",
      telaGG: "1600px",
      telaXG: "1700px",

      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
