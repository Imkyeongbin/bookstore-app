import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // ✅ 추가

export default defineConfig({
  base: "/",
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')  // ✅ @ → src 폴더로 지정
    }
  },
  server: {
    proxy: {
      // '/api': 'http://localhost:8080',  // Flask 서버 주소
      // changeOrigin: true
    }
  }
})
