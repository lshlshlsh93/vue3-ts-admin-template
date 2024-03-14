/**
 * @classdesc 使用localStorage进行封装缓存，添加有效期的选项
 * @methodOf getCache 获取缓存信息
 * @methodOf setCache 设置缓存信息
 * @methodOf removeCache 删除单个缓存信息
 * @methodOf clearCache 清空缓存信息
 * @author lishaohui
 * @since 2024-03-14
 */
class LocalStorageCache {

  constructor() {
  }

  getCache<T>(key: string) {
    const valueStr = window.localStorage.getItem(key)
    if (!valueStr) {
      return null
    }
    const value = JSON.parse(valueStr)
    if (value.time === 0) {
      return value.data as T
    }
    const now = new Date().getTime()
    if (now >= value.time) {
      this.removeCache(key)
      return null
    }
    return value.data as T
  }

  setCache(key: string, data: any, expireTime: number = 0): void {
    const obj: ICacheProps = {
      data,
      time: expireTime ? new Date().getTime() + expireTime : 0
    }
    window.localStorage.setItem(key, JSON.stringify(obj))
  }

  removeCache(key: string): void {
    window.localStorage.removeItem(key)
  }

  clearCache(): void {
    window.localStorage.clear()
  }
}

interface ICacheProps {
  data: any,
  time?: number
}

const localStorageCache = new LocalStorageCache()
export { localStorageCache }
