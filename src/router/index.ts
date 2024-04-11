import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

import Layout from '@/layouts/index.vue'

import createRouterGuide from './permission'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      name: '请登录'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404/index.vue'),
    meta: {
      name: '404'
    }
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    meta: {
      name: '首页'
    },
    children: [
      {
        path: 'personCenter',
        name: 'personCenter',
        component: () => import('@/views/personCenter/index.vue'),
        meta: {
          name: '个人中心',
          icon: 'avatar'
        },
        children: [
          {
            path: 'baseInfo',
            name: 'baseInfo',
            component: () => import('@/views/personCenter/baseInfo.vue'),
            meta: {
              name: '基本信息',
              icon: 'info'
            }
          },
          {
            path: 'resetPassword',
            name: 'resetPassword',
            component: () => import('@/views/personCenter/resetPassword.vue'),
            meta: {
              name: '修改密码'
            }
          },
          {
            path: 'selfLog',
            name: 'selfLog',
            component: () => import('@/views/personCenter/selfLog.vue'),
            meta: {
              name: '我的日志'
            }
          },
          {
            path: '/contact',
            name: 'contact',
            component: () => import('@/views/personCenter/contact.vue'),
            meta: {
              name: '联系方式'
            }
          }
        ]
      }
    ]
  }
]
export const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 创建路由守卫，放在此处可以让页面刷新时也可以调用
createRouterGuide(router)

// 注册路由
export function setupRouter(app: App) {
  app.use(router)
}
