import { defineStore } from 'pinia'
import { useLoginApi, useLogoutApi } from '@/api/user'

export const userStore = defineStore({
  id: 'app-user',
  state: () => ({
    accessToken: '',
    refreshToken: '',
    userInfo: {}
  }),
  actions: {
    SET_TOKEN(accessToken: string, refreshToken: string): void {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
    },
    CLEAR_TOKEN(): void {
      this.accessToken = ''
      this.refreshToken = ''
    },
    async loginAction(loginData: any) {
      const backendServiceResult = await useLoginApi(loginData)
      const { accessToken, refreshToken } = backendServiceResult.data
      this.SET_TOKEN(accessToken, refreshToken)
    },
    async logoutAction() {
      this.CLEAR_TOKEN()
      const backendServiceResult = await useLogoutApi()
      return new Promise(resolve => {
        resolve(backendServiceResult)
      })
    }
  },
  getters: {}
})
