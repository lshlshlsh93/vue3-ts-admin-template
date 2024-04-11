import instance from '@/plugins/request'

/**
 * 用户登录
 * @param data
 */
function useLoginApi(data: any) {
  return instance.request({
    url: '/base/user/login/',
    method: 'POST',
    data
  })
}

/**
 * 用户退出登录
 */
function useLogoutApi() {
  return instance.request({
    url: '/base/user/logout/',
    method: 'POST'
  })
}

export { useLoginApi, useLogoutApi }
