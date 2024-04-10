import { defineStore } from 'pinia'

export const appStore = defineStore({
  id: 'app-application',
  state: () => ({
    sidebarOpened: true, // 侧边栏展开状态
    device: 'desktop' // 设备类型
  }),
  actions: {
    toggleSidebarOpened(): void {
      this.sidebarOpened = !this.sidebarOpened
    }
  },
  getters: {
    curDeviceType(): string {
      return this.device
    }
  }
})
