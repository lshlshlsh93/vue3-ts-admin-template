import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

// css
import '@/styles/css/index.css'
import '@/styles/scss/index.scss'

// 移动端适配
import '@/utils/application/flexable';

// 初始化element
import initElement from './plugins/element';
// 注册全局状态数据
import { setupStore } from './stores'

const app = createApp(App)

// 测试获取.env文件内容
console.log(import.meta.env.VITE_APP_TITLE)
console.log(import.meta.env.VITE_APP_BASE_URL)
console.log(import.meta.env.VITE_APP_URL)

app.use(initElement)
app.use(setupStore)
app.use(router)
app.mount('#app')
