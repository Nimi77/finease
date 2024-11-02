/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        NotoSans: ["Noto Sans JP", "sans-serif"],
      },
      fontSize: {
        msm: "0.92rem",
      },
      backgroundColor: {
        primary: "#FAFEFE",
        secondary: "#2A3B39",
        secondary2: "#51726C",
        active: "#425C5A",
        loading: "#8EA19D",
      },
      colors: {
        primaryText: "#2A3B39",
        linkText: "#425C5A",
        focusColor: "#3A4B48",
      },
    },
  },
  plugins: [],
};
