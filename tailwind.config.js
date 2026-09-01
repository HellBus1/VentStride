/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        ventstride: {
          "primary": "#E8590C",
          "primary-content": "#FFFFFF",
          "secondary": "#404040",
          "secondary-content": "#FFFFFF",
          "accent": "#E8590C",
          "neutral": "#F5F5F5",
          "neutral-content": "#171717",
          "base-100": "#FFFFFF",
          "base-200": "#FAFAFA",
          "base-300": "#F5F5F5",
          "base-content": "#171717",
          "info": "#3B82F6",
          "success": "#22C55E",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
      },
    ],
    base: false,
  },
}
