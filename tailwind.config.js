/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                customBlue: "#cce0ff",
                customBlueDark: "#0052cc",
                customBlueLight: "#e9f2ff",
            },
        },
    },
    plugins: [],
};
