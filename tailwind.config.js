/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        copper: {
          DEFAULT: '#c8956c',
          dark: '#a67850',
          light: 'rgba(200, 149, 108, 0.1)',
        },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
