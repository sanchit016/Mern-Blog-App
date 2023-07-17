import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.md'],
  css: {
    modules: true, 
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://mern-blog-app-vvpv.onrender.com',
        changeOrigin: true,
      },
    },
    middleware: (req, res, next) => {
      // Redirect all requests to index.html
      if (req.url !== '/' && !req.url.includes('.')) {
        req.url = '/';
      }
      next();
    },
  },
})
