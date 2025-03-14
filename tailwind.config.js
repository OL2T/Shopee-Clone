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
        'register-hero-pattern': "url('src/assets/images/hero-register.png')"
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
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px'
        }
      })
    })
  ]
}
