import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    open: true,
    host: true,
    // Faster startup - disable overlay for speed
    hmr: {
      overlay: false
    },
    // Optimize for faster startup
    warmup: {
      clientFiles: ['./src/main.tsx']
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    // Optimize for faster builds
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@tabler/icons-react', 'lucide-react'],
          three: ['three', '@react-three/fiber', '@react-three/postprocessing']
        }
      }
    }
  },
  optimizeDeps: {
    // Only include essential dependencies for faster startup
    include: ['react', 'react-dom'],
    // Disable force pre-bundling for faster startup
    force: false
  },
  // Enable faster file watching
  watch: {
    usePolling: false
  },
  // Disable source maps in development for speed
  esbuild: {
    sourcemap: false
  }
})
