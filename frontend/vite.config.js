import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Customize chunking here
          // For example:
          // vendor: ['react', 'react-dom'],
        },
      },
      chunkSizeWarningLimit: 1000, // Adjust chunk size limit
    },
  },
})

