import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'src/app/styles'),
    },
    extensions: ['.mjs', '.js', '.json'],
  },

  plugins: [
    tsconfigPaths({
      loose: true,
      extensions: ['.mjs', '.js', '.json'],
    }),
  ],
})
