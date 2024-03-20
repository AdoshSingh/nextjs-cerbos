/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Define custom colors by inspecting the screenshot and adding them here
        cerbosYellow: '#ffb901',
        cerbosDarkYellow: '#CE9400',
        cerbosDark: '#0F172A',
        // ...other colors
      },
      fontFamily: {
        // Define custom fonts if needed
        sans: ['Inter', 'sans-serif'],
        // ...other font families
      },
    },
  },
  plugins: [],
};
