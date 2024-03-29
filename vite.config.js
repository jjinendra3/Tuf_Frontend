import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
import tailwindcss from 'tailwindcss';


dotenv.config();
export default defineConfig({
  plugins: [react()],
  define: {
    __VALUE__: `"${process.env.VITE_APIURL}"`,
    __JUDGEVALUE__: `"${process.env.VITE_JUDGEAPI}"`,
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
})
