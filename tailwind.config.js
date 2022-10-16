/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "white-custom": "#f6f6f8",
      },
      minHeight: {
        "h-sc-50": "50vh",
        "h-sc-40": "40vh",
      },
    },
  },
  plugins: [],
};
