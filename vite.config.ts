import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/vue3-ts-vite-admin/' : '/',
  server: {
    host: '0.0.0.0',
    port: 4000,
    open: false, // 是否自动打开浏览器
    cors: true, // 跨域设置允许
    strictPort: false // 端口被占用 是否直接退出
  },
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}))
