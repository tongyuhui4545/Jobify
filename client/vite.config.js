import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5100/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/,''),
      }
    }
  }
=======
  proxy: {
    '/api': {
      target: 'http://localhost:5100/api',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
>>>>>>> 5be76ac8dd8d2d2c3a3b694e721af8a8a3c2aa44
})
