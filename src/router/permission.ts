import type { NavigationGuardNext, RouteLocationNormalized, Router, RouteRecordNormalized } from 'vue-router'
import { useUser } from '@/stores'

export default function createRouterGuide(router: Router) {
  const whiteList: string[] = ['/login', '/404']

  router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {

    // 改变页面标题
    document.title = '管理系统-' + to.meta.name

    const hasToken = useUser().accessToken
    if (hasToken) {
      if (to.path === '/login') {
        return '/'
      }

      // 前往白名单页
      if (whiteList.indexOf(to.path) !== -1) {
        return true
      }

      // 第一次登录
      // const path = await $firstLogin(to, router)
      // 重新跳转，防止动态路由没匹配到
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        return
      }
      return '/login'
    }

  })
}

async function $firstLogin(to: RouteLocationNormalized, router: Router) {
  let loadingInstance
  try {
    loadingInstance = ElLoading.service({
      lock: true,
      text: '初始化数据中',
      background: 'rgba(0, 0, 0, 0.7)'
    })

    // 添加404
    router.addRoute({
      path: '/:pathMatch(.*)*',
      name: 'not-found-page',
      redirect: '/404'
    })

    loadingInstance.close()
    return to.path
  } catch (error) {
    console.log(error)
    loadingInstance?.close()
    return '/login'
  }
}
