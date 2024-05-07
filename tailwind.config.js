/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
      }
    }
  },
  plugins: []
}
