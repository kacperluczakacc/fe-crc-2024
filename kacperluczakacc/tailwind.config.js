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
        primary: "#68548E"
      },
      textColor: {
        secondary: "#FEF7FF",
        primary: "#68548E"
      },
      borderColor: {
        secondary: "#FEF7FF",
        primary: "#68548E"
      }
    },
  },
  plugins: [],
}

