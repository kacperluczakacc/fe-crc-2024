/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        light: '#FEF7FF',
        dark: '#68548E'
      },
      textColor: {
        light: '#FEF7FF',
        dark: '#68548E'
      }
    },
  },
  plugins: [],
}

