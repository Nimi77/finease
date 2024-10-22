/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        NotoSans: ["Noto Sans JP", "sans-serif"]
      },
      backgroundColor: {
        primary: "#FAFEFE",
        secondary: "#2A3B39",
        secondary2: "#51726C",
        active: "#425C5A"
      },
      colors : {
        textG: "#2A3B39"
      }
    },
  },
  plugins: [],
}

