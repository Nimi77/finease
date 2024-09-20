/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        PTSans: ["PT Sans", "sans-serif"],
        NotoSans: ["Noto Sans JP", "sans-serif"]
      },
    },
  },
  plugins: [],
}

