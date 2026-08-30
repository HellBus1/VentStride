/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#10140F',
          card: '#151C14',
          surface: '#1A2318',
          border: '#2A3828',
          text: '#E8E4D9',
          muted: '#8A9986',
          subtle: '#5A6856',
          gold: '#DDB967',
          moss: '#4A5D45',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"General Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        ventstride: {
          "primary": "#DDB967",
          "primary-content": "#10140F",
          "secondary": "#4A5D45",
          "secondary-content": "#E8E4D9",
          "accent": "#DDB967",
          "neutral": "#1A2318",
          "neutral-content": "#E8E4D9",
          "base-100": "#10140F",
          "base-200": "#151C14",
          "base-300": "#1A2318",
          "base-content": "#E8E4D9",
          "info": "#6B8CA8",
          "success": "#4A5D45",
          "warning": "#C47A5A",
          "error": "#A86B7A",
        },
      },
    ],
    base: false,
  },
}

