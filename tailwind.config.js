/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/react-app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00d9ff',
        secondary: '#b24bf3',
        accent: '#ff2e97',
        success: '#00ff88',
        error: '#ff4757',
        warning: '#ffd93d',
        dark: {
          100: '#252540',
          200: '#1a1a2e',
          300: '#0a0a0f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
