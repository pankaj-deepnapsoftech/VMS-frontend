/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0d1141",
        input: "#1f2937",
        table: "#050b20",
        tablecolor : "#0c1120",
        button: "#3533cc",
        cards:"#0a0f39",
        light:"#4A4A4A"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        lexendDeca: ["lexendDeca", "sans-serif"],
      },
      backgroundImage: {
        "gradient-custom":
          "linear-gradient(to top left, #0a0f39, #080d27, #050b20)",

        "gradient-image": "url('/bgleft.png')",
      },
    },
  },
  plugins: [],
};
