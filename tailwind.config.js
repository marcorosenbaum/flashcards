/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    // colors: {
    //   'light-navy': '#0C2D57',
    //   'call-to-action': '#FC6736',
    //   'light-pink': '#FFB0B0',
    //   'light-grey': '#EFECEC'
    // },
    extend: {
      borderColor: {
        DEFAULT: '#1c1c1c'
      }
    }
  },
  plugins: []
}
