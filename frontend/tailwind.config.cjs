const { transform } = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,tsx,js,ts}', './public/index.html'],
  theme: {
    extend: {
      boxShadow: {
        'intense': '0 0 0.4rem 0.01rem rgba(0,0,0,0.5)',
      },
      dropShadow: {
        'glow': '0 0 0.2rem rgba(255, 255, 255, 0.5)',
      },
      colors: {
        actioncolor: '#FFC107',
        darkbg: '#1b1b1b',
        darkbglighter: '#272727',
        darktext: 'white',
      },
      keyframes: {
        scalehundredten: {
          '0%': { 
            transform: 'scale(1)' },
          '100%': { 
            transform: 'scale(1.1)', },
        },
        widein: {
          '0%': { 
            width: '0px' },
          '100%': { 
            width: 'var(--fullWidth)', },
        }
      },
      animation: {
        scalehundredten: 'scalehundredten 0.2s ease-out',
        /** Requires var(--fullWidth) to be set in the element style */ 
        widein: 'widein 0.2s ease-out',
        'wide-out-jump-out': 'widein 0.2s reverse, jump-out 0.2s'
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
}

