import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        ripple: {
          '0%': { width: '0px', height: '0px', opacity: "0.5" },  
          '100%': { width: '500px', height: '500px', opacity: "0" },  
        },
      },
      animation: {
        ripple: 'ripple 1s linear forwards',
      },
      colors: {
        primary: '#3674B5',
        secondary: '#578FCA',
        bluelight: '#A1E3F9',
        bluethin : '#D1F8EF',
        text: '#000000',
        background: '#F7F7F7',
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"], 
      },
    },
  },
  plugins: [],
} satisfies Config;
