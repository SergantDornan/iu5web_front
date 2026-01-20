// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl' // <--- 1. Импорт

export default defineConfig({
  plugins: [
    react(),
    basicSsl() // <--- 2. Добавляем плагин
  ],
  server: {
    port: 3000, 
    https: true, // Это включает использование SSL сертификата от плагина
    proxy: {
      '/api': {
        target: 'http://localhost:8080', 
        changeOrigin: true, 
      },
    },
  },
})
