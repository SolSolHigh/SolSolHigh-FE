/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      mob: { max: '767px' },
      tablet: { max: '1279px' },
      desktop: { min: '1280px' },
    },
    extend: {
      colors: {
        'primary-100': '#E6EDFF',
        'primary-200': '#B3C8FF',
        'primary-300': '#94ABFA',
        'primary-400': '#4C7DFF',
        'primary-500': '#005DF9',
        'primary-600': '#0046FF',
        'primary-700': '#0040E8',
        'primary-800': '#1539CB',
        'primary-900': '#102FA8',

        'secondary-100': '#F3F6FB',
        'secondary-200': '#EBEFF5',
        'secondary-300': '#D6DBE1',
        'secondary-400': '#B9C1C9',
        'secondary-500': '#808892',
        'secondary-600': '#565B64',
        'secondary-700': '#3A3F49',
        'secondary-800': '#24272D',
        'secondary-900': '#121418',

        'danger-100': '#FFF2F2',
        'danger-200': '#FFDDDD',
        'danger-300': '#FFA9A9',
        'danger-400': '#F07E7E',
        'danger-500': '#DE4141',
        'danger-600': '#D61111',
        'danger-700': '#C10F0F',
        'danger-800': '#AB0E0E',
        'danger-900': '#861E17',

        'warning-100': '#FFF9E8',
        'warning-200': '#FFF6D1',
        'warning-300': '#FFEDBD',
        'warning-400': '#FEE580',
        'warning-500': '#FFDA4A',
        'warning-600': '#FFD158',
        'warning-700': '#F5C342',
        'warning-800': '#F1B33D',
        'warning-900': '#EA9635',
      },
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
  plugins: [],
};
