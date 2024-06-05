/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#68548E",
        secondary: "#FEF7FF",
        thirdly: "#D0C2E2"
      },
      textColor: {
        secondary: "#FEF7FF",
        primary: "#68548E"
      }
    },
  },
  plugins: [],
}
