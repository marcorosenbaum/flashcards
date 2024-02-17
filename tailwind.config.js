/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: '#36A2EB'
      },
      colors: {
        'light-navy': '#0d3262',
        'call-to-action': '#FC6736',
        'light-pink': '#FFB0B0',
        'light-grey': '#EFECEC',
        'light-blue': '#36A2EB'
      },
      rounded: {
        '4xl': '5rem'
      }
    }
  },
  plugins: []
}
