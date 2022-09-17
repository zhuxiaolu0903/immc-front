/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      boxShadow: {
        'l-white': '-10px 0 10px white'
      }
    },
  },
  plugins: [],
}
