import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tsconfigPaths()],
  build: {
    target: 'esnext',
    outDir: '../../../dashboard',
    emptyOutDir: true,
    rollupOptions: {
      external: [/^node:.*/],
      input: {
        main: resolve(__dirname, 'main.html'),
        settings: resolve(__dirname, 'settings.html'),
      },
    },
  },
})
