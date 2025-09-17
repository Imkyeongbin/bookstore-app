import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: "/",
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 서버 주소
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // 필요 시 경로 정리
      }
    }
  }
})
