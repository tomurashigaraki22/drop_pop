/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f27e05',
        white: '#ffffff',
        black: '#000000',
      },
    },
  },
  plugins: [],
} 