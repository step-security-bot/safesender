/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            blue: "#2367EA",
            purple: "#7e5bef",
            pink: "#ff49db",
            orange: "#ff7849",
            green: "#13ce66",
            yellow: "#ffc82c",
            "gray-dark": "#273444",
            gray: "#8492a6",
            "gray-light": "#d3dce6",
            white: '#fff',
        },
        fontFamily: {
            sans: ["Poppins", "sans-serif"],
        },
        extend: {},
    },
    plugins: [],
};
