import type { Ref } from 'vue'
import { useBoolean } from '@/hooks'


type IFunType = () => void
type IReturnFunType = [Ref<boolean>, IFunType, IFunType]

/**
 * @description 自定义加载中的hook方法
 * @param {Boolean} initialVal 初始值 默认值为false
 * @returns {IReturnFunType} 一个元组[值,设置为true,设置为false]
 * @author lishaohui
 * @since 2024-03-14
 */
export const useLoading = (initialVal: boolean = false): IReturnFunType => {
  const [loading, startLoading, endLoading] = useBoolean(initialVal)
  return [loading, startLoading, endLoading] as IReturnFunType
}
