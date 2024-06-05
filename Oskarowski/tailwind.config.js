/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                secondary: "#FED7FF",
                primary: "#F327FE",
            },
            textColor: {
                secondary: "#FED7FF",
                primary: "#F327FE",
            },
        },
    },
    plugins: [],
};
