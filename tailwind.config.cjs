/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      boxShadow: {
        'l-white': '-10px 0 10px white'
      },
      animation: {
        'slide-in-up': 'slideInUp 0.3s linear both',
        'fade-in': 'fadeIn 0.3s linear both'
      },
      keyframes: {
        'slideInUp': {
          '0%': {
            transform: 'translate3d(0,10%,0)'
          },
          'to': {
            transform: 'translateZ(0)'
          }
        },
        'fadeIn': {
          '0%': {
            opacity: '0.6'
          },
          'to': {
            opacity: '1'
          }
        }
      }
    },
  },
  plugins: [],
}
