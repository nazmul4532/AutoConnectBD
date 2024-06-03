import tailwindcss from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-bg": "url('/bgImage.jpg')",
      },
      colors: {
        "theme-black": "#171717",
        "theme-gray": "#444444",
        "theme-red": "#DA0037",
        "theme-white": "#EDEDED",
        "theme-blue": "#3B8EA5",
      },
    },
  },
  plugins: [],
};
