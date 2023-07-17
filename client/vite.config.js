import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createProxyMiddleware } from 'http-proxy-middleware';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.md'],
  css: {
    modules: true,
  },
  server: {
    middleware: [
      createProxyMiddleware('/api', {
        target: 'https://mern-blog-app-vvpv.onrender.com',
        changeOrigin: true,
      }),
      (req, res, next) => {
        // Redirect all requests to index.html
        if (req.originalUrl !== '/' && !req.originalUrl.includes('.')) {
          req.url = '/';
        }
        next();
      },
    ],
  },
});
