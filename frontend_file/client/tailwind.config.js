/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-dark": "#16161a",
        "sub-dark": "#242629",
        "custom-purple": "#7f5af0",
      },
      width: {
        "128": "32rem",
        "86" : '21.5rem',
        '92' : '23rem',
        '200' : '50rem',
        '232' : '58rem',
        '248' : '62rem'
      },
      backgroundColor: {
        "main-dark": "#16161a",
        "sub-dark": "#242629",
        "custom-purple": "#7f5af0",
      },
      textColor: {
        "dark-text": "#fffffe",
        "dark-subtext": "#94a1b2",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};
