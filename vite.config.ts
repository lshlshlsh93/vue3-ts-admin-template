import { fileURLToPath, URL } from 'node:url'

import { defineConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import autoprefixer from 'autoprefixer'
import * as path from 'node:path'

const pathSrc = path.resolve(__dirname, './src')

// https://vitejs.dev/config/
export default defineConfig(({ command }: ConfigEnv) => ({
  base: command === 'build' ? '/vue3-ts-vite-admin/' : '/',
  server: {
    host: '0.0.0.0',
    port: 4000,
    open: false, // 是否自动打开浏览器
    cors: true, // 跨域设置允许
    strictPort: false // 端口被占用 是否直接退出
  },
  // css处理
  css: {
    postcss: {
      plugins: [autoprefixer()]
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [ElementPlusResolver()],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],
      dts: path.resolve(pathSrc, 'components.d.ts'),
      exclude: ['src/components']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}))
