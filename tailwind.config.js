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
      },
      boxShadow: {
        around: '0 0 5px 3px rgba(0, 0, 0, 0.2), 0 0 10px 1px rgba(0, 0, 0, 0.14)'
        // Adjust the shadow values as needed to achieve the desired effect
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.reset-input': {
          appearance: 'none',
          'background-color': 'transparent',
          'border-width': '0',
          color: 'inherit',
          '&::placeholder': {
            color: 'inherit'
          },
          '&:focus': {
            outline: 'none',
            ring: '0'
          }
        }
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ]
}
