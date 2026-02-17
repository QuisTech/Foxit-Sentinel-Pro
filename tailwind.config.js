/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", // In case components are in root/components
    "./*.{js,ts,jsx,tsx}" // App.tsx, index.tsx, etc.
  ],
  theme: {
    extend: {
      colors: {
        foxit: {
          orange: '#fc6408',
          purple: '#3e1841'
        }
      }
    },
  },
  plugins: [],
}
