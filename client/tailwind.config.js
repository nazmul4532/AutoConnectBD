/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "theme-black": "#171717",
        "theme-gray": "#444444",
        "theme-red": "#DA0037",
        "theme-white": "#EDEDED",
      },
    },
  },
  plugins: [],
};
