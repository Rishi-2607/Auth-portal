/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    './pages/**/*.{html,js,ts,jsx,tsx}',
    './components/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', ...fontFamily.serif],
        playwrite: ['"Playwrite IS"', ...fontFamily.sans],
        mono: ['"B612 Mono"', ...fontFamily.mono],
      },
    },
  },
  plugins: [],
};