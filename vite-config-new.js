import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    host: true,
    port: 3000,
    open: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "bootstrap/scss/bootstrap";`
      }
    }
  },
  base: '/'
})
