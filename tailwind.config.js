/** @type {import('tailwindcss').Config} */
const { blackA } = require("@radix-ui/colors");

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...blackA, // Extends the blackA color from Radix UI colors
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // Adds the scrollbar plugin
  ],
};
