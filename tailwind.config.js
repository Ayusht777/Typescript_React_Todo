/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#09090B",
        border: "#27272A",
        text: "#FAFAFA",
        text2: "#717177",
        Bg: "#141417",
      },
    },
  },
  plugins: [],
};
