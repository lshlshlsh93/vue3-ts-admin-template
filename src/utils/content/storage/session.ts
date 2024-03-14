/**
 * @classdesc 使用sessionStorage进行封装缓存
 * @methodOf getCache 获取缓存信息
 * @methodOf setCache 设置缓存信息
 * @methodOf removeCache 删除单个缓存信息
 * @methodOf clearCache 清空缓存信息
 * @author lishaohui
 * @since 2024-03-14
 */
class SessionCache {

  constructor() {
  }

  getCache<T>(key: string) {
    const valueStr = window.sessionStorage.getItem(key)
    if (!valueStr) {
      return null
    }
    const value = JSON.parse(valueStr)
    return value as T
  }

  setCache<T>(key: string, value: T) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  }

  removeCache(key: string) {
    window.sessionStorage.removeItem(key)
  }

  clearCache() {
    window.sessionStorage.clear()
  }
}

const sessionCache = new SessionCache()
export { sessionCache }
