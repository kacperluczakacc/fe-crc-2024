/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        secoundary: "#FEF7FF",
        primary: "#68548E"
      },
      textColor: {
        secoundary: "#FEF7FF",
        primary: "#68548E"
      }
    },
  },
  plugins: [],
}