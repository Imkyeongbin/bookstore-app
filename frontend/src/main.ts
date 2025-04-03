// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 앱 생성 및 마운트
const app = createApp(App)
app.use(router)
app.mount('#app')
