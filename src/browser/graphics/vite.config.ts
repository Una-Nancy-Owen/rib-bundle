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
    outDir: '../../../graphics',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        square_one: resolve(__dirname, 'square_one.html'),
        square_one_no_timer: resolve(__dirname, 'square_one_no_timer.html'),
        square_one_self_timer: resolve(__dirname, 'square_one_self_timer.html'),
        square_two: resolve(__dirname, 'square_two.html'),
        square_three: resolve(__dirname, 'square_three.html'),
        square_three_metal_max: resolve(__dirname, 'square_three_metal_max.html'),
        square_four: resolve(__dirname, 'square_four.html'),
        square_next: resolve(__dirname, 'square_next.html'),
        wide_one: resolve(__dirname, 'wide_one.html'),
        wide_one_no_timer: resolve(__dirname, 'wide_one_no_timer.html'),
        wide_one_self_timer: resolve(__dirname, 'wide_one_self_timer.html'),
        wide_two: resolve(__dirname, 'wide_two.html'),
        wide_three: resolve(__dirname, 'wide_three.html'),
        wide_four: resolve(__dirname, 'wide_four.html'),
        wide_next: resolve(__dirname, 'wide_next.html'),
        standby: resolve(__dirname, 'standby.html'),
      },
    },
  },
})
