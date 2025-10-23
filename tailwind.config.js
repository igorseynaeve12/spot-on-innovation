/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        din: ['"din-arabic"', 'sans-serif'],
      } 
    },
  },
  plugins: [],
};
