/** @type {import('tailwindcss').Config} */
const { blackA } = require("@radix-ui/colors");

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...blackA, // Extends the blackA colors from Radix UI for custom black transparency levels
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // Adds custom scrollbar styling
  ],
};
