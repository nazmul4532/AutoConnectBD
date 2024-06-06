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
        "theme-yellow": "#FFB100",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
      },
    },
  },
  variants: {},
  plugins: [],
};
