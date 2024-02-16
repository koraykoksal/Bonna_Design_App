import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: { outDir: "./build" },
  server: {
    proxy: {
      // Proxy ayarları
      // TWISER sistmeine istek atıldığınzaman farklı veri kaynaklarından veri aldığı için CORS (cross-origin-resource-sharing) işlemi yapılıyor. bundan dolayı proxy ayarı yapılması gerekir

      // '/identity': {
      //   target: 'https://api.twiser.com',
      //   changeOrigin: true,
      //   secure: false,
      // },
      // '/wokr': {
      //   target: 'https://api.twiser.com',
      //   changeOrigin: true,
      //   secure: false,
      // }
    }
  }
})
