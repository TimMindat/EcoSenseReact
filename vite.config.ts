import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'lucide-react': ['lucide-react'],
          firebase: ['firebase/app', 'firebase/auth'],
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['lucide-react']
  },
  // Ensure .well-known directory is copied to build output
  publicDir: 'public',
  // Configure static asset handling
  assetsInclude: ['**/*.json'],
});