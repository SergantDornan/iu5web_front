import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  // --- ВАЖНО: БАЗОВЫЙ ПУТЬ ДЛЯ GITHUB PAGES ---
  base: '/iu5web_front_electrolysis/', 
  // --------------------------------------------

  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Electrolysis Service',
        short_name: 'ElectroApp',
        description: 'Сервис заказа услуг электролиза',
        theme_color: '#003366',
        background_color: '#ffffff',
        
        // Используем относительные пути или совпадающие с base
        start_url: './', 
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'logo/logo192.png', // Убрал начальный слеш, чтобы путь был относительным
            type: 'image/png',
            sizes: '192x192',
            purpose: 'any maskable'
          },
          {
            src: 'logo/logo512.png',
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
  //  https: true, 
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
