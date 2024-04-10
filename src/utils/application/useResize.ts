import { onBeforeMount, onBeforeUnmount, onMounted } from 'vue'
import { useApplication } from '@/stores'

/**
 * @description 监听页面的窗口大小变化，判断是 PC 还是 移动端
 * @author lishaohui
 * @since 2024-03-14
 */
export const useResizeHandle = () => {
  const appStore = useApplication()
  const { body } = document
  const WIDTH: number = 992

  onBeforeMount((): void => {
    window.addEventListener('resize', $resizeHandler)
  })
  onBeforeUnmount((): void => {
    window.addEventListener('resize', $resizeHandler)
  })
  onMounted((): void => {
    $resizeHandler()
  })

  // 判断窗口宽度是否为移动端
  const $isMobile = (): boolean => {
    const rect: DOMRect = body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  // 监听窗口大小，判断终端
  const $resizeHandler = (): void => {
    if (!document.hidden) {
      const isMobile: boolean = $isMobile()
      // 利用pinia管理终端类型
      appStore.device = isMobile ? 'mobile' : 'desktop'
      if (isMobile) {
        appStore.sidebarOpened = false
      }
    }
  }

}
