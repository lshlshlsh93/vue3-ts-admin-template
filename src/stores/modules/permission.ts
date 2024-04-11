import { defineStore } from 'pinia'
import type { IRouteType } from '@/router/typings'

export const permissionStore = defineStore({
  id: 'app-permission',
  state: () => ({
    /**
     * 权限筛选后的路由信息
     */
    authRoutes: [] as IRouteType[],
    /**
     * 左侧导航栏路由信息
     */
    sidebarRoutes: [] as IRouteType[],
    /**
     * tab路由信息
     */
    tabRoutes: [] as IRouteType[],
    /**
     * 一级路由信息
     */
    firstRoutes: {} as IRouteType
  }),
  actions: {},
  getters: {}
})
