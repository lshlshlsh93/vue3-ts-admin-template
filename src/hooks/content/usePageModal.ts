import { useLoading } from '@/hooks'
import type { IModalActionParam } from './types'


/**
 * @description 表格数据变更的hook
 * @callback  createAction 创建数据的api函数
 * @callback editAction 编辑数据的api函数
 * @callback deleteAction 删除数据的api函数
 * @callback deleteAction 数据完成修改后的回调函数
 * @author lishaohui
 * @since 2024-03-14
 */
export function usePageModalAction(option: IModalActionParam = {}) {
  let createPageDataAction
  let updatePageDataAction
  let deletePageDataAction
  const [loading, startLoading, endLoading] = useLoading(false)
  if (option.createAction) {
    // 新增
    createPageDataAction = async (data: any) => {
      try {
        startLoading()
        const res = await option.createAction!(data)
        // TODO: 利用其他消息提示形式替代
        alert('创建成功')
        if (option.pageModalRef && option.pageModalRef.value) {
          option.pageModalRef.value.dialogVisible = false
        }
        option.callback && option.callback()
        return res
      } catch (error) {
        console.log(error)
      } finally {
        endLoading()
      }
    }
  }

  if (option.editAction) {
    // 编辑
    updatePageDataAction = async (data: any) => {
      try {
        startLoading()
        const res = await option.editAction!(data)
        // TODO: 利用其他消息提示形式替代
        alert('修改成功')
        if (option.pageModalRef && option.pageModalRef.value) {
          option.pageModalRef.value.dialogVisible = false
        }
        option.callback && option.callback()
        return res.data
      } catch (error) {
        console.log(error)
      } finally {
        endLoading()
      }
    }
  }

  if (option.deleteAction) {
    // 删除
    deletePageDataAction = async (data: any) => {
      try {
        startLoading()
        const res = await option.deleteAction!(data)
        // TODO: 利用其他消息提示形式替代
        alert('删除成功')
        option.callback && option.callback()
        return res?.data
      } catch (error) {
        console.log(error)
      } finally {
        endLoading()
      }
    }
  }

  const nullFoo = () => {
  }

  return {
    createPageDataAction: createPageDataAction || nullFoo,
    updatePageDataAction: updatePageDataAction || nullFoo,
    deletePageDataAction: deletePageDataAction || nullFoo,
    modalLoading: loading
  }
}
