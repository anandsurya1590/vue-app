import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'node:fs'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],
    server: {
      proxy: {
        '/api': 'http://localhost:3000',
      },
      https: {
        key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
      },
      port: 2000,
    },
    build: {
      outDir: 'dist',
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/index.scss";`,
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
