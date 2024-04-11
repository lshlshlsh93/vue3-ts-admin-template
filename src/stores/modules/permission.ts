import { defineStore } from 'pinia'

export const permissionStore = defineStore({
  id: 'app-permission',
  state: () => ({
    /**
     * 权限筛选后的路由信息
     */
    authRoutes: [],
    /**
     * 左侧导航栏路由信息
     */
    sidebarRoutes: [],
    /**
     * tab路由信息
     */
    tabRoutes: [],
    /**
     * 一级路由信息
     */
    firstRoutes: {}
  }),
  actions: {},
  getters: {}
})
