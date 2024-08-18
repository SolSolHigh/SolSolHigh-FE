/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        screens: {
          mob: "480px",
          tablet: "768px",
          desktop: "1280px",
      },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
