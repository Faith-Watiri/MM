/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6F3744',
        secondary: '#FFFAF8',
        tertiary: '#090013',
        giray: '#F9F9F9',
      },
    },
  },
  plugins: [],
};
