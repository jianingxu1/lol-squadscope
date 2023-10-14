/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          100: '#CDFAFA',
          200: '#0AC8B9', // blue gradient: to
          300: '#0397AB',
          400: '#005A82', // blue gradient: from
          500: '#0A323C',
          600: '#091428', // dark blue gradient: to
          700: '#0A1428', // dark blue gradient: from
        },
        gold: {
          100: '#F0E6D2',
          200: '#C8AA6E',
          300: '#C8AA6E',
          400: '#C89B3C', // gold gradient: to
          500: '#785A28', // gold gradient: from
          600: '#463714',
          700: '#32281E',
        },
        grey: {
          100: '#A09B8C',
          200: '#5B5A56',
          300: '#3C3C41',
          400: '#1E2328',
          500: '#1E282D',
        },
        hexblack: '#010A13',
      },
      fontFamily: {
        beaufort: ['Beaufort'],
        spiegel: ['Spiegel'],
      },
    },
  },
  plugins: [],
}
