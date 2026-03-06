/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'wine-black': '#000000',
        'wine-burgundy': '#4A0404',
        'wine-gold': '#D4AF37',
        'wine-slate': '#1A1A1B',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(250px)' },
        }
      }
    },
  },
  plugins: [],
}
