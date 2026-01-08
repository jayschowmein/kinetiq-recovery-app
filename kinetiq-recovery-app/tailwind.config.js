/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#3B82F6',
          green: '#10B981',
          lightBlue: '#60A5FA',
          lightGreen: '#34D399',
        }
      },
      animation: {
        'confetti': 'confetti 0.5s ease-out',
      },
      keyframes: {
        confetti: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-100vh) rotate(720deg)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
