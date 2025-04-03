import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// console.log('API 주소:', import.meta.env.VITE_API_URL)
createApp(App).use(router).mount('#app')
