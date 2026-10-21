import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Path aset relatif agar hasil build bisa dibuka lewat Live Server / hosting subfolder
  base: './',
  // Konfigurasi Vitest: lingkungan DOM (jsdom) + setup jest-dom
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.js',
    css: false,
  },
})
