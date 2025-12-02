import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert(), // Создает локальный HTTPS сертификат
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true, // Включаем PWA в режиме dev
      },
      manifest: {
        name: 'Electrolysis Service',
        short_name: 'ElectroApp',
        description: 'Сервис заказа услуг электролиза',
        theme_color: '#003366',
        background_color: '#ffffff',
        start_url: '/', // Важно: корневой путь
        display: 'standalone', // Убирает интерфейс браузера (выглядит как приложение)
        orientation: 'portrait',
        icons: [
          {
            src: '/logo/logo192.png', // Путь относительно public
            type: 'image/png',
            sizes: '192x192',
            purpose: 'any maskable'
          },
          {
            src: '/logo/logo512.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    port: 3000,
    // Включаем https для dev-сервера
    https: true, 
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Или твой IP, если нужно
        changeOrigin: true,
      },
    },
  },
});
  