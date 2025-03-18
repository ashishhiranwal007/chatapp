/** @type {import('tailwindcss').Config} */
import daisy from "daisyui";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
      primary: "#6667AB", // Change to your primary color
    },},
  },
  plugins: [daisy],
}