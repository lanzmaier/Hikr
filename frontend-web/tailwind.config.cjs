/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Hikr brand / admin palette
        'forest-dark':  '#1a2e1a', // mobile header & bottom nav
        'forest-mid':   '#2d4a2d', // mobile nav hover
        'forest':       '#0d1a0d', // desktop sidebar bg
        'forest-light': '#1b2e1b', // desktop sidebar hover
        'forest-green': '#4a7c4a', // badges, chart bars (was forest-light in design 2)
        'moss':         '#60a05b', // active states, accents
        'moss-bright':  '#82c97b', // logo accent
        'primary':      '#2d5a27', // brand primary
        'nature-bg':    '#f8faf8', // page background
        'accent-earth': '#a67c52', // earthy accent
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
