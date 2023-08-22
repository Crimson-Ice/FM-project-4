/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            Purple: "hsl(259, 100%, 65%)",
            "Light-red": "hsl(0, 100%, 67%)",
            White: "hsl(0, 0%, 100%)",
            "Off-white": "hsl(0, 0%, 94%)",
            "Light-grey": "hsl(0, 0%, 86%)",
            "Smokey-grey": "hsl(0, 1%, 44%)",
            "Off-black": "hsl(0, 0%, 8%)",
        },
        extend: {
            screens: {
                xs: "540px",
            },
        },
    },
    plugins: [],
};
