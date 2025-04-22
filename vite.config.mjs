import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/app/styles'),
    },
  },

  plugins: [
    tsconfigPaths({
      loose: true,
    }),
  ],
})
