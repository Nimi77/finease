/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        PTSans: ["PT Sans", "sans-serif"],
        NotoSans: ["Noto Sans JP", "sans-serif"]
      },
      backgroundColor: {
        primary: "#FFFFFF",
        secondary: "#2A3B39",
        active: "#425C5A"
      },
      colors : {
        textG: "#2A3B39"
      }
    },
  },
  plugins: [],
}

