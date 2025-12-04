/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        din: ['"din-arabic"', 'sans-serif'],
      },
      keyframes: {
        borderRun: {
          "0%": { 
            "stroke-dashoffset": "1000" 
          },
          "100%": { 
            "stroke-dashoffset": "0" 
          }
        }
      },
      animation: {
        borderRun: "borderRun 3s linear infinite",
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
};
