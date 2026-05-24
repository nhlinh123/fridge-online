import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'FridgeOS',
        short_name: 'FridgeOS',
        description: 'Tủ lạnh thông minh — Gợi ý món ăn từ nguyên liệu bạn có',
        start_url: '/',
        display: 'standalone',
        background_color: '#0F1A0F',
        theme_color: '#2ECC6E',
        icons: []
      }
    })
  ]
});
