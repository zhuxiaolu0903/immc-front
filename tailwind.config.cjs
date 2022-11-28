/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      height: {
        header: '80px',
        main: 'calc(100vh - 80px)'
      },
      fontSize: {
        xs: ['0.25rem', '0.35rem'],
        sm: ['0.35rem', '0.45rem'],
        base: ['0.45rem', '0.55rem'],
        lg: ['0.55rem', '0.65rem'],
        xl: ['0.65rem', '0.75rem']
      },
      colors: {
        main: '#f44c58',
        'hover-main': '#f32836',
        'hover-l-main': '#FFC2D1FF',
        'success-100': '#F2F9EC',
        'success-200': '#E4F2DB',
        'success-300': '#7EC050',
        'warn-100': '#FCF6ED',
        'warn-200': '#F8ECDA',
        'warn-300': '#DCA550',
        'error-100': '#ED7456',
        'error-200': '#f3471c',
        'error-300': '#ffffff'
      },
      boxShadow: {
        'l-white': '-10px 0 10px white',
        'bottom': 'inset 0 -1px 0 rgb(0, 0, 0, 0.08)',
        'box': '0 2px 8px rgb(28 31 35 / 3%), 0 16px 48px 8px rgb(28 31 35 / 8%)'
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
