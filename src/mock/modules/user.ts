import type { MockMethod } from 'vite-plugin-mock'

import { user, accessToken, refreshToken } from '../data/userData'

export default [
  {
    url: '/base/user/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '登录成功',
        data: {
          accessToken,
          refreshToken
        }
      }
    }
  },
  {
    url: '/base/user/logout',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '退出登录成功',
        data: null
      }
    }
  },
  {
    url: '/base/user/:id/',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: user
      }
    }
  }
] as MockMethod[]
