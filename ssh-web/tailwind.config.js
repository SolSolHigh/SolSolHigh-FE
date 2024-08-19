/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      mob: '480',
      tablet: '768',
      desktop: '1280',
    },
    extend: {
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
      },
      backgroundImage: {
        'gradient-shimmer':
          'linear-gradient(90deg, #e0e0e0 25%, #e8e8e8 50%, #e0e0e0 75%)',
      },
    },
  },
  extend: {
    colors: {
      primary: {
        100: '#E6EDFF',
        200: '#B3C8FF',
        300: '#94ABFA',
        400: '#4C7DFF',
        500: '#005DF9',
        600: '#0046FF',
        700: '#0040E8',
        800: '#1539CB',
        900: '#102FA8',
      },
      secondary: {
        100: '#F3F6FB',
        200: '#EBEFF5',
        300: '#D6DBE1',
        400: '#B9C1C9',
        500: '#808892',
        600: '#565B64',
        700: '#3A3F49',
        800: '#24272D',
        900: '#121418',
      },
      danger: {
        100: '#FFF2F2',
        200: '#FFDDDD',
        300: '#FFA9A9',
        400: '#F07E7E',
        500: '#DE4141',
        600: '#D61111',
        700: '#C10F0F',
        800: '#AB0E0E',
        900: '#861E17',
      },
      warning: {
        100: '#FFF9E8',
        200: '#FFF6D1',
        300: '#FFEDBD',
        400: '#FEE580',
        500: '#FFDA4A',
        600: '#FFD158',
        700: '#F5C342',
        800: '#F1B33D',
        900: '#EA9635',
      },
    },
  },
  plugins: [],
};
