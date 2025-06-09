/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background": "#0d1141",
        "input": "#333333",
        "table": "#2d333b",
        "button": "#3533cc"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        lexendDeca:["lexendDeca","sans-serif"]
      },
      backgroundImage: {
        "gradient-color":  'linear-gradient(to bottom right, #0f172a, #111827, #000000)',
        "gradient-image": "url('/bg.jpg')"
      },
    },
  },
  plugins: [],
};
