import { ref } from 'vue'

import { useLoading } from '@/hooks'
import type { IModelParam, IPageInfo, ISearchParam } from './types'

const DEFAULT_PAGE: number = 1
const DEFAULT_PAGE_SIZE: number = 10

/**
 * @description 分页查询的hook方法
 * @param {IModelParam} option 选项
 * @author lishaohui
 * @since 2024-03-14
 */
export const usePageSearch = (option: IModelParam) => {
  /** 表格数据 */
  const tableData = ref<any[]>([])
  /** 总页数 */
  const total = ref<number>(0)
  /** 总页数 */
  const [loading, startLoading, endLoading] = useLoading(false)
  /** 搜索数据 */
  const searchRef = option.model ? ref<InstanceType<typeof option.model>>() : ref()
  /** 查询携带参数 当前页、页大小... */
  const searchParams = ref<ISearchParam>({ page: DEFAULT_PAGE, size: DEFAULT_PAGE_SIZE })

  /**
   * 查询数据行为
   * @param searchParams 搜索携带参数
   * @returns
   */
  const queryDataAction = async (searchParams: any = {}): Promise<any> => {
    try {
      startLoading()
      const { data: result } = await option.queryAction(searchParams)
      // 此处result中row,count等信息是与后端协调好返回的数据字段名
      tableData.value = result?.row
      total.value = result?.count
      // 将其他返回结果进行填充（非必需）
      /* empty */
      return result
    } catch (error) {
      /* empty */
    } finally {
      endLoading()
    }
  }

  /**
   * 搜索的回调
   * @param args 参数
   */
  const handleSearch = (args: any = {}): void => {
    searchParams.value = {
      page: searchParams.value.page,
      size: searchParams.value.size,
      ...args
    }
    queryDataAction(searchParams.value)
  }

  /**
   * 处理分页的回调函数
   */
  const handlePageChange = (pageInfo: IPageInfo): void => {
    if (pageInfo.page) {
      searchParams.value.page = pageInfo.page
    }
    if (pageInfo.size) {
      searchParams.value.size = pageInfo.size
    }
    // 分页参数发生变化时的回调行为
    // 此处采用重新拉取数据的回调行为
    queryDataAction(searchParams.value)
  }

  return {
    isLoading: loading,
    tableData,
    total,
    searchParams,
    searchRef,
    handleSearch,
    handlePageChange,
    queryDataAction
  }
}
