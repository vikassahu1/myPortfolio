/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/index.html"],
  theme: {
    extend: {
      fontFamily: {
        pataka: ['Instrument Sans'], 
      },
      colors: {
        cynthia: {
          DEFAULT: '#a6a6a6', 
        },
      },
    },
  },
  plugins: [],
}

