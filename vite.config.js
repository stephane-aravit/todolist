import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Import du plugin Vite Tailwind CSS
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),  /* Ajout du plugin Tailwind CSS */
  ],
})
