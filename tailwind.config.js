module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: { 
        poppins: ["Poppins", "sans-serif"] 
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
};
