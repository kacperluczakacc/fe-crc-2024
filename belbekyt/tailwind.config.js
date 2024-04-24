/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        secondary: "#FEF7FF",
        primary: "#68548e"
      },
      textColor: {
        secondary: "#FEF7FF",
        primary: "#68548e"
      }
    },
  },
  plugins: [],
}

