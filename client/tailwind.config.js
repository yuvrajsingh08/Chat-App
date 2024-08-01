/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00acb4",
        secondary: "#058187",
      },
      backgroundImage: {
        "hero-pattern": "url('./assets/wbg.jpg')"
      },
    },
  },
  plugins: [],
};

