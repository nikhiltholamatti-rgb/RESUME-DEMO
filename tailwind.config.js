/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FEFDF5',
          100: '#FEFCE0',
          200: '#FBF9C7',
          300: '#F7F39E',
        },
        forge: {
          yellow: '#F5D100',
          gold: '#FFE45C',
          dark: '#18181B',
          amber: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        merriweather: ['Merriweather', 'serif'],
        lato: ['Lato', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        dmserif: ['"DM Serif Display"', 'serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 12px 40px 0 rgba(245, 209, 0, 0.15)',
        'sheet': '0 20px 45px -10px rgba(0, 0, 0, 0.15), 0 8px 20px -8px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
