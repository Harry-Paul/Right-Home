/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'root': "url('https://res.cloudinary.com/dstxl4pzw/image/upload/v1693992788/lycs-architecture-kUdbEEMcRwE-unsplash_2_zhjq78.jpg')",
        'login': "url('https://res.cloudinary.com/dstxl4pzw/image/upload/v1693992923/Screenshot_2023-08-28_171314_npalkh.png')"
      },
    },
  },
  plugins: [],
}

