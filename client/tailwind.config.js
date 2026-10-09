export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          900: '#14532d',
        },
        clay: {
          bg: '#f0f4f8',
          card: '#ffffff',
          text: '#334155'
        }
      },
      boxShadow: {
        'clay-card': '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
        'clay-btn': '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff',
        'clay-btn-pressed': 'inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff',
      },
    },
  },
  plugins: [],
}
