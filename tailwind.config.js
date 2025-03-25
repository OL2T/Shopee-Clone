/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      width: {
        1024: '1024px',
        68: '68px'
      },
      maxWidth: {
        container: '1200px'
      },
      colors: {
        orange: '#ee4d2d',
        redRegister: 'rgb(208, 1, 27)'
      },
      height: {
        header: '84px',
        600: '600px'
      },
      margin: {
        18: '18px'
      },
      backgroundImage: {
        'register-hero-pattern-normal-day':
          "url('public/assets/images/hero-register-normal-day.png')",
        'register-hero-pattern-sale-day':
          "url('public/assets/images/hero-register.png')"
      },
      spacing: {
        top50: '50px'
      },
      opacity: {
        54: '.54',
        9: '0.09'
      },
      padding: {
        // 5: '5px',
        6.5: '25px'
      },
      borderWidth: {
        0.5: '0.5px'
      },
      animation: {
        shake: 'shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)'
      },
      keyframes: {
        shake: {
          '10%, 90%': {
            transform: 'translate3d(-1px, 0, 0)'
          },
          '20%, 80%': {
            transform: 'translate3d(2px, 0, 0)'
          },
          '30%, 50%, 70%': {
            transform: 'translate3d(-4px, 0, 0)'
          },
          '40%, 60%': {
            transform: 'translate3d(4px, 0, 0)'
          }
        }
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '1232px',
          margin: '0 auto',
          padding: '0 16px'
        }
      })
    })
  ]
}
