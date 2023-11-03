/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // fontFamily:{
      //   urban:['Urbanist', sans-serif]
      // }
    },
    colors:{
      'green': '#54B175',
      "white": '#fff',
      "brown":"#88653E",
      "lightgray":"#F7F8F9",
      "bordergray":"#E8ECF4",
      "linegray":"#C4C4C4",
      "black":"#000",
      "white":"#fff",
      "lightText":"#64748B",
      "buttongray":"#F1F5F9",
      

     },
     boxShadow: {
      'freshoxl': '4px 4px 6px rgba(0, 0, 0, 1)',
    },

  },
  plugins: [],
}

