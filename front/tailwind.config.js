/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            blue: "#6599FF",
            blueAcc: "#3F7CF3",
            purple: "#7e5bef",
            pink: "#ff49db",
            error: "#FF614B",
            orange: "#ff7849",
            green: "#13ce66",
            yellow: "#ffc82c",
            "gray-dark": "#273444",
            gray: "#A0A7BA",
            "gray-light": "#d3dce6",
            white: "#fff",
            black: "#070707",
        },
        fontFamily: {
            sans: ["Poppins", "sans-serif"],
        },
        extend: {
            keyframes: {
                loading: {
                    "0%": { left: "-100%" },
                    "50%": { left: "100%" },
                    "100%": { left: "-100%" },
                },
            },
            animation: {
                loading: "loading 3s linear infinite",
            },
        },
        screens: {
            laptop: { raw: "(min-height: 700px)" },
            desktop: { raw: "(min-height: 1024px)" },
            // sm: "640px",
            sm: { raw: "(max-width: 640px)" },

            // bigDesktop: { raw: "(min-height: 2000px)" },

            // => @media (min-width: 640px) { ... }

            md: "768px",
            // => @media (min-width: 768px) { ... }

            lg: "1024px",
            // => @media (min-width: 1024px) { ... }

            xl: "1280px",
            // => @media (min-width: 1280px) { ... }

            "2xl": "1536px",

            // => @media (min-width: 1536px) { ... }
        },
    },
    plugins: [],
};
