import { ref, type Ref } from 'vue'

type IFunType = () => void
type IReturnFunType = [Ref<boolean>, IFunType, IFunType, IFunType]

/**
 * @description 自定义boolean类型的hook函数
 * @param initValue 初始值 默认为false
 * @return 返回一个元组 [值,设置为true,设置为false,取反]
 * @author lishaohui
 * @since 2024-03-14
 */
export const useBoolean = (initValue: boolean = false): IReturnFunType => {
  const bool = ref(initValue)

  function setTrue(): void {
    bool.value = true
  }

  function setFalse(): void {
    bool.value = false
  }

  function toggle(): void {
    bool.value = !bool.value
  }

  return [bool, setTrue, setFalse, toggle] as IReturnFunType
}
