/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor : {
        'primary': '#68548E', 
        'secondary': '#FEF7FF',
        'white': '#FEFEFE',
      },
      textColor: {
        'primary': '#68548E',
        'secondary': '#FEF7FF',
        'white': '#FEFEFE',
        'error': '#BA1A1A',
      },
      borderColor: {
        'primary': '#68548E',
        'secondary': '#FEF7FF',
        'white': '#FEFEFE',
        'error': '#BA1A1A',
      },
      outlineColor: {
        'error': '#BA1A1A',
      },
      fontFamily: {
        'body': ['Poppins'],
        'heading': ['Poppins'],
      },
    },
  },
  plugins: [],
}