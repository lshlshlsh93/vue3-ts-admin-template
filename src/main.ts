import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 测试获取.env文件内容
console.log(import.meta.env.VITE_APP_TITLE)
console.log(import.meta.env.VITE_APP_BASE_URL)
console.log(import.meta.env.VITE_APP_URL)

app.use(createPinia())
app.use(router)

app.mount('#app')
