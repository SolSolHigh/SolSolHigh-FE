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
  plugins: [],
};
