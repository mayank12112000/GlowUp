import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0', // This allows access from your local network
    port: 3000,      // You can use any port you like
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
