import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  optimizeDeps: {
    include: ['zustand', '@tanstack/react-virtual', 'date-fns', 'leaflet', 'react-leaflet']
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'map-vendor': ['leaflet', 'react-leaflet'],
          'utils': ['date-fns', 'zustand', '@tanstack/react-virtual']
        }
      }
    }
  }
});