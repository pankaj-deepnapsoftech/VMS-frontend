/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background": "#2a2c2f",
        "input": "#333333",
        "table": "#2d333b"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        lexendDeca:["lexendDeca","sans-serif"]
      },
      backgroundImage: {
        "gradient-color": "linear-gradient(to right, #333333, #666666)",
        "gradient-image": "url('/bg.jpg')"
      },
    },
  },
  plugins: [],
};
